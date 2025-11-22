import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function BorderEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    line: THREE.Line;
    material: THREE.ShaderMaterial;
    animationId: number | null;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (window.innerWidth < 768) return; // Only on md+ screens

    const canvas = canvasRef.current;
    const isDark = () => document.documentElement.classList.contains('dark');

    // Scene setup
    const scene = new THREE.Scene();

    // Orthographic camera for 2D rendering
    const camera = new THREE.OrthographicCamera(
      0,
      window.innerWidth,
      window.innerHeight,
      0,
      0.1,
      1000
    );
    camera.position.z = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create border path vertices
    const createBorderPath = (width: number, height: number, segments: number) => {
      const points: THREE.Vector3[] = [];
      const margin = 0; // Distance from edge

      // Top edge (left to right)
      const topSegments = Math.floor(segments * 0.3);
      for (let i = 0; i <= topSegments; i++) {
        const t = i / topSegments;
        points.push(new THREE.Vector3(margin + t * (width - margin * 2), margin, 0));
      }

      // Right edge (top to bottom)
      const rightSegments = Math.floor(segments * 0.25);
      for (let i = 1; i <= rightSegments; i++) {
        const t = i / rightSegments;
        points.push(new THREE.Vector3(width - margin, margin + t * (height - margin * 2), 0));
      }

      // Bottom edge (right to left)
      const bottomSegments = Math.floor(segments * 0.3);
      for (let i = 1; i <= bottomSegments; i++) {
        const t = i / bottomSegments;
        points.push(new THREE.Vector3(
          width - margin - t * (width - margin * 2),
          height - margin,
          0
        ));
      }

      // Left edge (bottom to top)
      const leftSegments = segments - topSegments - rightSegments - bottomSegments;
      for (let i = 1; i < leftSegments; i++) {
        const t = i / leftSegments;
        points.push(new THREE.Vector3(margin, height - margin - t * (height - margin * 2), 0));
      }

      return points;
    };

    const segments = 800;
    let points = createBorderPath(window.innerWidth, window.innerHeight, segments);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create arrays for wave animation
    const basePositions = new Float32Array(points.length * 3);
    const pathProgress = new Float32Array(points.length);

    points.forEach((point, i) => {
      basePositions[i * 3] = point.x;
      basePositions[i * 3 + 1] = point.y;
      basePositions[i * 3 + 2] = point.z;
      pathProgress[i] = i / points.length;
    });

    geometry.setAttribute('pathProgress', new THREE.BufferAttribute(pathProgress, 1));

    // Custom shader material
    const vertexShader = `
      attribute float pathProgress;
      uniform float time;
      uniform vec2 resolution;
      varying float vProgress;
      varying float vIntensity;

      void main() {
        vProgress = pathProgress;

        // Multiple sine waves for organic movement
        float wave1 = sin(pathProgress * 20.0 + time * 2.0) * 8.0;
        float wave2 = sin(pathProgress * 15.0 - time * 1.5) * 5.0;
        float wave3 = sin(pathProgress * 30.0 + time * 3.0) * 3.0;
        float wave = wave1 + wave2 + wave3;

        // Calculate perpendicular offset
        vec2 pos = position.xy;
        vec2 nextPos = pos;

        // Offset perpendicular to border
        vec2 center = resolution * 0.5;
        vec2 toCenter = normalize(center - pos);
        vec2 perpendicular = vec2(-toCenter.y, toCenter.x);

        pos += perpendicular * wave;

        vIntensity = abs(wave) / 16.0;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, position.z, 1.0);
        gl_PointSize = 2.0 + vIntensity * 3.0;
      }
    `;

    const fragmentShader = `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float time;
      varying float vProgress;
      varying float vIntensity;

      void main() {
        // Gradient between two colors
        vec3 color = mix(color1, color2, sin(vProgress * 3.14159 + time) * 0.5 + 0.5);

        // Intensity-based opacity
        float alpha = 0.3 + vIntensity * 0.7;

        // Glow effect
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);

        alpha *= glow;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    // Get colors from CSS custom properties
    const getColor = (property: string): THREE.Color => {
      const style = getComputedStyle(document.documentElement);
      const colorString = style.getPropertyValue(property).trim();

      // Parse OKLCH color
      const match = colorString.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/);
      if (match) {
        // Convert OKLCH to RGB (simplified - for accurate conversion you'd need a proper library)
        // For now, we'll use approximate colors
        return isDark()
          ? new THREE.Color(0.38, 0.48, 0.4) // sage green for dark
          : new THREE.Color(0.35, 0.45, 0.38); // sage green for light
      }

      return new THREE.Color(0.4, 0.5, 0.4);
    };

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        color1: { value: getColor('--color-accent') },
        color2: { value: getColor('--color-secondary') }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false
    });

    const line = new THREE.Line(geometry, material);
    line.renderOrder = 999;
    scene.add(line);

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      line,
      material,
      animationId: null
    };

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (!sceneRef.current) return;

      const time = clock.getElapsedTime();
      material.uniforms.time.value = time;

      // Update colors if theme changed
      const newColor1 = getColor('--color-accent');
      const newColor2 = getColor('--color-secondary');
      material.uniforms.color1.value.lerp(newColor1, 0.1);
      material.uniforms.color2.value.lerp(newColor2, 0.1);

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.left = 0;
      camera.right = width;
      camera.top = height;
      camera.bottom = 0;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      material.uniforms.resolution.value.set(width, height);

      // Recreate path
      const newPoints = createBorderPath(width, height, segments);
      const newPositions = new Float32Array(newPoints.length * 3);
      newPoints.forEach((point, i) => {
        newPositions[i * 3] = point.x;
        newPositions[i * 3 + 1] = point.y;
        newPositions[i * 3 + 2] = point.z;
      });
      geometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 'var(--z-overlay)' }}
    />
  );
}
