import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Layered Iridescent Core with cursor-follow tilt, scroll parallax & idle float
function IridescentCore({ mouseRef, reducedMotion, isMobile, scrollYRef }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const wireframeRef = useRef();

  // On mobile (<768px), positioned behind the top third of the content [0, 0.95, 0]
  // On desktop, centered [0, 0, 0] and scaled to ~70% of hero height
  const basePosition = isMobile ? [0, 0.95, 0] : [0, 0, 0];
  const baseScale = isMobile ? 0.85 : 1.4;

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    const scrollY = scrollYRef.current;

    // 1. Reduced motion mode: disable cursor jump & scroll drift, but show an obvious subtle idle float
    if (reducedMotion) {
      const subtleFloat = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x = 0.18;
      groupRef.current.position.set(basePosition[0], basePosition[1] + subtleFloat, basePosition[2]);
      groupRef.current.rotation.set(0.1, meshRef.current.rotation.y, 0);
      groupRef.current.scale.setScalar(baseScale);
      return;
    }

    // 2. Continuous idle motion
    meshRef.current.rotation.y += delta * 0.20;
    meshRef.current.rotation.x += delta * 0.10;
    const idleFloat = Math.sin(state.clock.elapsedTime * 0.85) * 0.12;

    // 3. Pointer values: on touch devices or inactive cursor, use idle motion & scroll parallax only
    const mx = mouseRef.current.isTouch ? 0 : mouseRef.current.x;
    const my = mouseRef.current.isTouch ? 0 : mouseRef.current.y;

    // 4. Cursor-follow tilt on main shape
    const targetTiltX = -my * 0.75;
    const targetTiltY = mx * 0.95;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetTiltY, 0.08);

    // 5. Scroll parallax: shape drifts downwards and scales down slightly as user scrolls
    const scrollDriftY = scrollY * 0.0015;
    const scrollDriftZ = scrollY * 0.0010;
    const scrollScale = Math.max(0.75, 1 - scrollY * 0.0005);

    const targetPosX = basePosition[0] + mx * 0.40;
    const targetPosY = basePosition[1] + idleFloat + my * 0.30 - scrollDriftY;
    const targetPosZ = basePosition[2] - scrollDriftZ;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.08);
    groupRef.current.scale.setScalar(baseScale * scrollScale);

    // 6. Layered parallax on wireframe cage
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.16;
      wireframeRef.current.rotation.z += delta * 0.08;
      wireframeRef.current.rotation.x = THREE.MathUtils.lerp(wireframeRef.current.rotation.x, -my * 0.35, 0.1);
      wireframeRef.current.position.x = THREE.MathUtils.lerp(wireframeRef.current.position.x, -mx * 0.12, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={basePosition} scale={baseScale}>
      {/* Softened Metallic Gold Faceted Icosahedron (lighter gold, no dark browns) */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#E0C366"
          emissive="#C9A227"
          emissiveIntensity={0.12}
          metalness={0.25}
          roughness={0.35}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
          flatShading={true}
          reflectivity={0.8}
        />
      </mesh>

      {/* Navy Thin Wireframe Cage for Structural Contrast (#0B1F3A with softened opacity) */}
      <mesh ref={wireframeRef}>
        <octahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial
          color="#0B1F3A"
          wireframe={true}
          transparent={true}
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}

// Subtle Floating Ambient Dust Particles with Layered Parallax
function ParticleField({ mouseRef, count = 55, reducedMotion, scrollYRef }) {
  const pointsRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    if (reducedMotion) {
      pointsRef.current.rotation.y += delta * 0.015;
      return;
    }

    const scrollY = scrollYRef.current;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x -= delta * 0.010;

    const mx = mouseRef.current.isTouch ? 0 : mouseRef.current.x;
    const my = mouseRef.current.isTouch ? 0 : mouseRef.current.y;

    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, -mx * 0.30, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, -my * 0.20 - scrollY * 0.0006, 0.05);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A227"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.32}
      />
    </Points>
  );
}

// Small floating gold cube for the foreground layer (z-20)
function ForegroundCubeMesh({ mouseRef, reducedMotion }) {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    if (!cubeRef.current) return;

    if (reducedMotion) {
      cubeRef.current.rotation.y += delta * 0.2;
      cubeRef.current.rotation.x = 0.2;
      return;
    }

    const mx = mouseRef?.current?.isTouch ? 0 : (mouseRef?.current?.x || 0);
    const my = mouseRef?.current?.isTouch ? 0 : (mouseRef?.current?.y || 0);

    cubeRef.current.rotation.y += delta * 0.5;
    cubeRef.current.rotation.x += delta * 0.35;
    cubeRef.current.rotation.z += delta * 0.18;

    const idleFloat = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    cubeRef.current.position.y = idleFloat - my * 0.12;
    cubeRef.current.position.x = mx * 0.12;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[0.72, 0.72, 0.72]} />
      <meshPhysicalMaterial
        color="#E8D48A"
        emissive="#C9A227"
        emissiveIntensity={0.2}
        metalness={0.35}
        roughness={0.28}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        reflectivity={0.9}
      />
    </mesh>
  );
}

/**
 * HeroForegroundCube: Foreground layer (z-20) rendering a single small gold cube
 * that slightly overlaps the edge of the name text for editorial 3D depth.
 */
export function HeroForegroundCube({ mouseRef, reducedMotion }) {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.2} color="#FFFDF5" />
        <directionalLight position={[2, 3, 4]} intensity={2.2} color="#FFF5D6" />
        <pointLight position={[-2, -1, 2]} intensity={1.5} color="#E8D48A" />

        <ForegroundCubeMesh mouseRef={mouseRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

/**
 * HeroScene: Full-hero background layer (z-0) centered behind the content stack.
 * Automatically pauses rendering when off-screen to preserve GPU performance.
 */
export default function HeroScene({ mouseRef: externalMouseRef }) {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const internalMouseRef = useRef({ x: 0, y: 0, isTouch: false });
  const mouseRef = externalMouseRef || internalMouseRef;
  const scrollYRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.isTouch = false;
    };

    const handleTouchStart = () => {
      mouseRef.current.isTouch = true;
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Pause Three.js rendering loop when hero scrolls completely out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, [mouseRef]);

  return (
    <div ref={containerRef} className="w-full h-full relative pointer-events-none">
      <Canvas
        frameloop={isIntersecting ? 'always' : 'never'}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance', toneMappingExposure: 1.25 }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.25;
        }}
      >
        {/* Soft Warm Studio Environment */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="ring" color="#FFF2A3" intensity={5.0} scale={5} position={[3, 5, -2]} target={[0, 0, 0]} />
            <Lightformer form="rect" color="#FFE07A" intensity={4.0} scale={[6, 3]} position={[-4, 3, -1]} />
            <Lightformer form="circle" color="#ffffff" intensity={4.5} scale={4} position={[0, 5, 2]} />
            <Lightformer form="rect" color="#E8D48A" intensity={3.5} scale={[5, 6]} position={[4, -2, 2]} />
          </group>
        </Environment>

        {/* Soft front lighting so facets are never black or harsh */}
        <directionalLight position={[0, 0, 5]} intensity={1.4} color="#FFFDF0" />
        <ambientLight intensity={1.1} color="#FFFDF5" />
        <pointLight position={[3, 2.5, 3]} intensity={3.5} distance={15} color="#FFE89E" />
        <pointLight position={[-3, 3, 2]} intensity={2.8} distance={12} color="#ffffff" />
        <pointLight position={[0, -3, -2]} intensity={1.8} distance={10} color="#C9A227" />

        <IridescentCore
          mouseRef={mouseRef}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
          scrollYRef={scrollYRef}
        />

        <ParticleField
          mouseRef={mouseRef}
          count={isMobile ? 20 : 55}
          reducedMotion={reducedMotion}
          scrollYRef={scrollYRef}
        />
      </Canvas>
    </div>
  );
}

