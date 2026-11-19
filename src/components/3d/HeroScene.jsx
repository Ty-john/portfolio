import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Layered Iridescent Core with cursor-follow tilt, scroll parallax & idle float
function IridescentCore({ mouseRef, reducedMotion, isMobile, scrollYRef, theme }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const wireframeRef = useRef();

  const basePosition = isMobile ? [0, 0.85, 0] : [0, 0, 0];
  const baseScale = isMobile ? 0.85 : 1.42;

  const isDark = theme === 'dark';
  const wireframeColor = isDark ? '#E8D48A' : '#0B1F3A';
  const wireframeOpacity = isDark ? 0.25 : 0.22;

  // In dark mode: raise opacity to ~0.85 and slightly brighten the gold so it reads as gold, not gray-olive
  const sphereColor = isDark ? '#F5D061' : '#E0C366';
  const sphereEmissive = isDark ? '#E5A924' : '#C9A227';
  const sphereEmissiveIntensity = isDark ? 0.22 : 0.12;
  const sphereOpacity = isDark ? 0.85 : 1.0;
  const sphereTransparent = isDark;

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    const scrollY = scrollYRef.current || 0;

    // 1. Active continuous rotation
    meshRef.current.rotation.y += delta * 0.85;
    meshRef.current.rotation.x += delta * 0.40;

    // 2. Smooth vertical float
    const idleFloat = Math.sin(state.clock.elapsedTime * 1.4) * 0.15;

    // 3. Responsive tilt toward cursor
    const mx = mouseRef.current.isTouch ? 0 : mouseRef.current.x;
    const my = mouseRef.current.isTouch ? 0 : mouseRef.current.y;

    const targetTiltX = -my * 0.60;
    const targetTiltY = mx * 0.75;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetTiltY, 0.06);

    // 4. Scroll parallax
    const scrollDriftY = scrollY * 0.0012;
    const scrollDriftZ = scrollY * 0.0008;
    const scrollScale = Math.max(0.75, 1 - scrollY * 0.0004);

    const targetPosX = basePosition[0] + mx * 0.25;
    const targetPosY = basePosition[1] + idleFloat + my * 0.18 - scrollDriftY;
    const targetPosZ = basePosition[2] - scrollDriftZ;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.06);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.06);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.06);
    groupRef.current.scale.setScalar(baseScale * scrollScale);

    // 5. Wireframe counter-rotation
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.65;
      wireframeRef.current.rotation.z += delta * 0.45;
      wireframeRef.current.rotation.x = THREE.MathUtils.lerp(wireframeRef.current.rotation.x, -my * 0.30, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={basePosition} scale={baseScale}>
      {/* Gold Faceted Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color={sphereColor}
          emissive={sphereEmissive}
          emissiveIntensity={sphereEmissiveIntensity}
          metalness={isDark ? 0.22 : 0.28}
          roughness={isDark ? 0.28 : 0.35}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
          flatShading={true}
          reflectivity={0.8}
          opacity={sphereOpacity}
          transparent={sphereTransparent}
        />
      </mesh>

      {/* Wireframe Cage */}
      <mesh ref={wireframeRef}>
        <octahedronGeometry args={[1.22, 1]} />
        <meshBasicMaterial
          color={wireframeColor}
          wireframe={true}
          transparent={true}
          opacity={wireframeOpacity}
        />
      </mesh>
    </group>
  );
}

// Subtle Floating Ambient Dust Particles with Layered Parallax
function ParticleField({ mouseRef, count = 45, reducedMotion, scrollYRef }) {
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

    const scrollY = scrollYRef.current || 0;
    pointsRef.current.rotation.y += delta * 0.18;
    pointsRef.current.rotation.x -= delta * 0.10;

    const mx = mouseRef.current.isTouch ? 0 : mouseRef.current.x;
    const my = mouseRef.current.isTouch ? 0 : mouseRef.current.y;

    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, -mx * 0.20, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, -my * 0.15 - scrollY * 0.0005, 0.05);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A227"
        size={0.032}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.28}
      />
    </Points>
  );
}

export default function HeroScene({ mouseRef: externalMouseRef, theme = 'light' }) {
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
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="ring" color="#FFF2A3" intensity={5.0} scale={5} position={[3, 5, -2]} target={[0, 0, 0]} />
            <Lightformer form="rect" color="#FFE07A" intensity={4.0} scale={[6, 3]} position={[-4, 3, -1]} />
            <Lightformer form="circle" color="#ffffff" intensity={4.5} scale={4} position={[0, 5, 2]} />
            <Lightformer form="rect" color="#E8D48A" intensity={3.5} scale={[5, 6]} position={[4, -2, 2]} />
          </group>
        </Environment>

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
          theme={theme}
        />

        <ParticleField
          mouseRef={mouseRef}
          count={isMobile ? 18 : 45}
          reducedMotion={reducedMotion}
          scrollYRef={scrollYRef}
        />
      </Canvas>
    </div>
  );
}
