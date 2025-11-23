import { useEffect, useRef } from "react";
import * as THREE from "three";

interface VignetteProps {
  intensity?: number; // 0-1, default 0.4 (optional override)
  colorTheme?: string; // Theme name to trigger color re-read
  isDark?: boolean; // Keep in sync with theme toggle
}

function getCSSColor(property: string): THREE.Color {
  const root = getComputedStyle(document.documentElement);
  const colorValue = root.getPropertyValue(property).trim();

  // Handle hex colors (for neo-brutalism)
  if (colorValue.startsWith("#")) {
    return new THREE.Color(colorValue);
  }

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

  // Fallback - try to parse as any valid color
  return new THREE.Color(colorValue);
}

export function Vignette({ intensity, colorTheme, isDark }: VignetteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);

  // Mouse tracking and physics state
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0)); // Normalized -1 to 1
  const targetOffsetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0)); // Target vignette offset
  const currentOffsetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0)); // Current vignette offset
  const velocityRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0)); // Velocity for inertia
  const isDesktopRef = useRef<boolean>(false); // Track if desktop device

  useEffect(() => {
    if (!canvasRef.current) return;
    if (materialRef.current) return; // Don't recreate if already initialized

    const canvas = canvasRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Orthographic camera covering 0..width, height..0 (top-left origin style)
    // Actually standard Three.js ortho is center based or arbitrary.
    // Previous code: 0, width, height, 0.
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -100, 100);
    camera.position.z = 10;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Get vignette colors from CSS custom properties
    const initialIsDark =
      typeof isDark === "boolean"
        ? isDark
        : document.documentElement.classList.contains("dark");
    const blendingMode = initialIsDark
      ? THREE.AdditiveBlending
      : THREE.NormalBlending;
    const vignetteColor1 = getCSSColor("--vignette-color-1");
    const vignetteColor2 = getCSSColor("--vignette-color-2");
    const vignetteColor3 = getCSSColor("--vignette-color-3") || vignetteColor2;
    const vignetteColor4 = getCSSColor("--vignette-color-4") || vignetteColor1;
    const vignetteColor5 = getCSSColor("--vignette-color-5") || vignetteColor2;
    const vignetteColor6 = getCSSColor("--vignette-color-6") || vignetteColor1;

    // Create vignette/shadow effect with flowing waves
    // Use unit plane and scale it to fit screen
    const vignetteGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const vignetteMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) },
        centerOffset: { value: new THREE.Vector2(0, 0) }, // For cursor tracking
        color1: { value: vignetteColor1 },
        color2: { value: vignetteColor2 },
        color3: { value: vignetteColor3 },
        color4: { value: vignetteColor4 },
        color5: { value: vignetteColor5 },
        color6: { value: vignetteColor6 },
        intensity: {
          value:
            intensity !== undefined
              ? intensity
              : colorTheme === "neo-brutalism"
              ? 1.0
              : 0.5,
        },
        isDark: { value: initialIsDark ? 1.0 : 0.0 },
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
        uniform vec2 centerOffset;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform vec3 color5;
        uniform vec3 color6;
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
          // Apply cursor-based offset to vignette center
          vec2 center = vec2(0.5, 0.5) + centerOffset;

          // Distance from center (vignette)
          float dist = length(uv - center);

          // Multiple flowing waves from edges
          float wave1 = sin(dist * 15.0 - time * 1.5) * 0.5 + 0.5;
          float wave2 = sin(dist * 20.0 + time * 2.0) * 0.5 + 0.5;
          float wave3 = sin(uv.x * 10.0 - time * 1.2) * sin(uv.y * 10.0 + time * 0.8);
          float wave4 = sin(uv.x * 8.0 + time * 1.8) * 0.5 + 0.5;
          float wave5 = sin(uv.y * 12.0 - time * 1.5) * 0.5 + 0.5;
          float wave6 = sin((uv.x + uv.y) * 6.0 + time * 2.2) * 0.5 + 0.5;

          // Combine waves
          float waves = wave1 * 0.25 + wave2 * 0.2 + wave3 * 0.2 + wave4 * 0.15 + wave5 * 0.1 + wave6 * 0.1;

          // Create vignette effect - stronger at edges, adjusted for light/dark mode
          float vignetteStart = isDark > 0.5 ? 0.3 : 0.25;
          float vignetteEnd = isDark > 0.5 ? 0.8 : 0.75;
          float vignette = smoothstep(vignetteStart, vignetteEnd, dist);

          // Animate vignette strength
          float pulse = sin(time * 0.8) * 0.15 + 0.85;
          vignette *= pulse;

          // Fixed, theme-driven colors (no hue cycling)
          vec3 baseColor1 = color1;
          vec3 baseColor2 = color2;
          vec3 baseColor3 = color3;
          vec3 baseColor4 = color4;
          vec3 baseColor5 = color5;
          vec3 baseColor6 = color6;

          // Light mode: desaturate a bit so it stays professional/subtle (apply to all colors)
          if (isDark < 0.5) {
            float grey1 = dot(baseColor1, vec3(0.299, 0.587, 0.114));
            float grey2 = dot(baseColor2, vec3(0.299, 0.587, 0.114));
            float grey3 = dot(baseColor3, vec3(0.299, 0.587, 0.114));
            float grey4 = dot(baseColor4, vec3(0.299, 0.587, 0.114));
            float grey5 = dot(baseColor5, vec3(0.299, 0.587, 0.114));
            float grey6 = dot(baseColor6, vec3(0.299, 0.587, 0.114));
            baseColor1 = mix(vec3(grey1), baseColor1, 0.6);
            baseColor2 = mix(vec3(grey2), baseColor2, 0.6);
            baseColor3 = mix(vec3(grey3), baseColor3, 0.6);
            baseColor4 = mix(vec3(grey4), baseColor4, 0.6);
            baseColor5 = mix(vec3(grey5), baseColor5, 0.6);
            baseColor6 = mix(vec3(grey6), baseColor6, 0.6);
          }

          // Multi-color blending using all 6 colors (neo-brutalism style for all themes)
          float mix1 = clamp(0.0 + waves * 0.3, 0.0, 1.0);
          float mix2 = clamp(0.2 + wave1 * 0.4, 0.0, 1.0);
          float mix3 = clamp(0.4 + wave2 * 0.3, 0.0, 1.0);
          float mix4 = clamp(0.6 + wave3 * 0.2, 0.0, 1.0);
          float mix5 = clamp(0.8 + wave4 * 0.1, 0.0, 1.0);
          
          vec3 c12 = mix(baseColor1, baseColor2, mix1);
          vec3 c34 = mix(baseColor3, baseColor4, mix2);
          vec3 c56 = mix(baseColor5, baseColor6, mix3);
          vec3 c1234 = mix(c12, c34, mix4);
          vec3 color = mix(c1234, c56, mix5);

          // Apply vignette with gentle wave modulation, scaled by intensity
          float alpha = vignette * intensity * (0.6 + 0.4 * waves);

          // Boost alpha slightly for light mode visibility
          if (isDark < 0.5) {
            alpha *= 1.6;
          }

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: blendingMode,
      side: THREE.DoubleSide,
    });

    const vignetteMesh = new THREE.Mesh(vignetteGeometry, vignetteMaterial);
    vignetteMesh.scale.set(width, height, 1);
    vignetteMesh.position.set(width / 2, height / 2, 0);
    scene.add(vignetteMesh);

    materialRef.current = vignetteMaterial;
    meshRef.current = vignetteMesh;

    // Animation
    const clock = new THREE.Clock();
    clockRef.current = clock;
    let isRunning = true;

    function animate() {
      if (!isRunning) return;

      animationIdRef.current = requestAnimationFrame(animate);

      if (
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current &&
        materialRef.current
      ) {
        const time = clock.getElapsedTime();
        materialRef.current.uniforms.time.value = time;

        // Apply inertia-based physics for cursor tracking (desktop only)
        if (isDesktopRef.current) {
          // Physics parameters
          const stiffness = 0.035; // How quickly it accelerates toward target
          const damping = 0.88; // Velocity decay factor (creates drift/inertia)

          // Calculate delta between target and current position
          const deltaX = targetOffsetRef.current.x - currentOffsetRef.current.x;
          const deltaY = targetOffsetRef.current.y - currentOffsetRef.current.y;

          // Apply spring force to velocity (acceleration toward target)
          velocityRef.current.x += deltaX * stiffness;
          velocityRef.current.y += deltaY * stiffness;

          // Apply damping/friction to velocity (creates inertia drift)
          velocityRef.current.multiplyScalar(damping);

          // Update current offset with velocity
          currentOffsetRef.current.x += velocityRef.current.x;
          currentOffsetRef.current.y += velocityRef.current.y;

          // Update shader uniform
          materialRef.current.uniforms.centerOffset.value.set(
            currentOffsetRef.current.x,
            currentOffsetRef.current.y
          );
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }
    animate();

    // Detect if desktop (no touch support)
    isDesktopRef.current = !("ontouchstart" in window);

    // Mouse tracking for cursor-based vignette movement (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktopRef.current) return;

      // Convert mouse position to normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1); // Invert Y

      mouseRef.current.set(x, y);

      // Calculate target offset (clamped to subtle movement: 10-15% at edges)
      // Using 0.075 means at screen edge (±1), offset is ±0.075 (7.5% of UV space)
      const maxOffset = 0.075;
      targetOffsetRef.current.set(x * maxOffset, y * maxOffset);
    };

    if (isDesktopRef.current) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Resize handler
    const handleResize = () => {
      if (
        !canvasRef.current ||
        !rendererRef.current ||
        !cameraRef.current ||
        !materialRef.current ||
        !meshRef.current
      )
        return;

      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update renderer - use false to prevent CSS style updates
      rendererRef.current.setSize(newWidth, newHeight, false);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Update camera
      const cam = cameraRef.current;
      cam.left = 0;
      cam.right = newWidth;
      cam.top = newHeight;
      cam.bottom = 0;
      cam.updateProjectionMatrix();

      // Update uniforms
      materialRef.current.uniforms.resolution.value.set(newWidth, newHeight);

      // Update mesh scale and position
      const mesh = meshRef.current;
      mesh.scale.set(newWidth, newHeight, 1);
      mesh.position.set(newWidth / 2, newHeight / 2, 0);
    };

    // Use both resize and a slight delay to catch all resize events
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      handleResize();
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    // Cleanup
    return () => {
      isRunning = false;
      window.removeEventListener("resize", debouncedResize);
      if (isDesktopRef.current) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(resizeTimeout);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      vignetteGeometry.dispose();
      vignetteMaterial.dispose();
      renderer.dispose();
      materialRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      meshRef.current = null;
      clockRef.current = null;
      animationIdRef.current = null;
    };
  }, []); // Only create once on mount

  // Update intensity and colors when props change
  useEffect(() => {
    if (
      !materialRef.current ||
      !rendererRef.current ||
      !sceneRef.current ||
      !cameraRef.current
    ) {
      return;
    }

    const material = materialRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;

    // Calculate intensity from current props (not from closure)
    const currentIntensity =
      intensity !== undefined
        ? intensity
        : colorTheme === "neo-brutalism"
        ? 1.0
        : 0.5;

    const updateUniforms = () => {
      // Update intensity with current prop value
      material.uniforms.intensity.value = currentIntensity;

      // Update colors from CSS
      const effectiveIsDark =
        typeof isDark === "boolean"
          ? isDark
          : document.documentElement.classList.contains("dark");
      const vignetteColor1 = getCSSColor("--vignette-color-1");
      const vignetteColor2 = getCSSColor("--vignette-color-2");
      const vignetteColor3 =
        getCSSColor("--vignette-color-3") || vignetteColor2;
      const vignetteColor4 =
        getCSSColor("--vignette-color-4") || vignetteColor1;
      const vignetteColor5 =
        getCSSColor("--vignette-color-5") || vignetteColor2;
      const vignetteColor6 =
        getCSSColor("--vignette-color-6") || vignetteColor1;

      material.uniforms.color1.value = vignetteColor1;
      material.uniforms.color2.value = vignetteColor2;
      material.uniforms.color3.value = vignetteColor3;
      material.uniforms.color4.value = vignetteColor4;
      material.uniforms.color5.value = vignetteColor5;
      material.uniforms.color6.value = vignetteColor6;
      material.uniforms.isDark.value = effectiveIsDark ? 1.0 : 0.0;

      // Switch blending mode based on theme
      // Light mode: NormalBlending for darker shadows/vignette
      // Dark mode: AdditiveBlending for glowing effect
      const newBlending = effectiveIsDark
        ? THREE.AdditiveBlending
        : THREE.NormalBlending;
      if (material.blending !== newBlending) {
        material.blending = newBlending;
        material.needsUpdate = true;
      }

      // Force a render to apply changes immediately
      renderer.render(scene, camera);
    };

    // Update immediately
    updateUniforms();

    // Rerun after next frame and after a short delay to catch CSS changes
    const rafId = requestAnimationFrame(updateUniforms);
    const timeoutId = setTimeout(updateUniforms, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [intensity, colorTheme, isDark]); // Depend on props directly, not calculated values

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    />
  );
}
