import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VignetteProps {
  intensity?: number; // 0-1, default 0.4
}

function getCSSColor(property: string): THREE.Color {
  const root = getComputedStyle(document.documentElement);
  const colorValue = root.getPropertyValue(property).trim();

  // Parse OKLCH format
  const match = colorValue.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/);
  if (match) {
    const l = parseFloat(match[1]) / 100;
    const c = parseFloat(match[2]);
    const h = parseFloat(match[3]);

    // Convert OKLCH to RGB (simplified approximation)
    const hueRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hueRad);
    const b = c * Math.sin(hueRad);

    // Very rough OKLCH to RGB conversion
    const r = Math.max(0, Math.min(1, l + a * 0.4));
    const g = Math.max(0, Math.min(1, l - a * 0.2 + b * 0.2));
    const blue = Math.max(0, Math.min(1, l - b * 0.4));

    return new THREE.Color(r, g, blue);
  }

  // Fallback
  return new THREE.Color(colorValue);
}

export function Vignette({ intensity = 0.4 }: VignetteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -100, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Get vignette colors from CSS custom properties
    const isDark = document.documentElement.classList.contains('dark');
    const vignetteColor1 = getCSSColor('--vignette-color-1');
    const vignetteColor2 = getCSSColor('--vignette-color-2');

    // Create vignette/shadow effect with flowing waves
    const vignetteGeometry = new THREE.PlaneGeometry(width, height, 1, 1);
    const vignetteMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) },
        color1: { value: vignetteColor1 },
        color2: { value: vignetteColor2 },
        intensity: { value: intensity },
        isDark: { value: isDark ? 1.0 : 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float intensity;
        uniform float isDark;
        varying vec2 vUv;

        // Convert RGB to HSV
        vec3 rgb2hsv(vec3 c) {
          vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
          vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
          vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
          float d = q.x - min(q.w, q.y);
          float e = 1.0e-10;
          return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }

        // Convert HSV to RGB
        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5, 0.5);

          // Distance from center (vignette)
          float dist = length(uv - center);

          // Multiple flowing waves from edges
          float wave1 = sin(dist * 15.0 - time * 1.5) * 0.5 + 0.5;
          float wave2 = sin(dist * 20.0 + time * 2.0) * 0.5 + 0.5;
          float wave3 = sin(uv.x * 10.0 - time * 1.2) * sin(uv.y * 10.0 + time * 0.8);

          // Combine waves
          float waves = wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3;

          // Create vignette effect - stronger at edges, adjusted for light/dark mode
          float vignetteStart = isDark > 0.5 ? 0.3 : 0.25;
          float vignetteEnd = isDark > 0.5 ? 0.8 : 0.75;
          float vignette = smoothstep(vignetteStart, vignetteEnd, dist);

          // Animate vignette strength
          float pulse = sin(time * 0.8) * 0.15 + 0.85;
          vignette *= pulse;

          // Smoothly rotate between colors in HSV space
          vec3 hsv1 = rgb2hsv(color1);
          vec3 hsv2 = rgb2hsv(color2);

          // Slowly rotate hue over time (full rotation every 20 seconds)
          float hueShift = time * 0.05;

          // Increase saturation for light mode visibility
          if (isDark < 0.5) {
            hsv1.y = min(1.0, hsv1.y * 1.4); // Boost saturation
            hsv2.y = min(1.0, hsv2.y * 1.4);
          }

          hsv1.x = fract(hsv1.x + hueShift);
          hsv2.x = fract(hsv2.x + hueShift);

          vec3 rotatedColor1 = hsv2rgb(hsv1);
          vec3 rotatedColor2 = hsv2rgb(hsv2);

          // Mix between the rotating colors based on waves
          vec3 color = mix(rotatedColor1, rotatedColor2, waves);

          // Apply vignette with wave interference, scaled by intensity
          // Use multiply blend approach for light mode (darker shadow)
          float alpha = vignette * waves * intensity;

          // Boost alpha for light mode visibility
          if (isDark < 0.5) {
            alpha *= 1.5; // Stronger effect in light mode
          }

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    const vignetteMesh = new THREE.Mesh(vignetteGeometry, vignetteMaterial);
    vignetteMesh.position.set(width / 2, height / 2, 0);
    scene.add(vignetteMesh);

    // Animation
    const clock = new THREE.Clock();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      vignetteMaterial.uniforms.time.value = time;
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      vignetteGeometry.dispose();
      vignetteMaterial.dispose();
      renderer.dispose();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 1 }}
    />
  );
}
