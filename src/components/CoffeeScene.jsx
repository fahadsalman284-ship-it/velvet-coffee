"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Cup() {
  const cup = useRef();
  const handle = useRef();
  useFrame(({ pointer, clock, camera }) => {
    if (!cup.current) return;
    const progress = typeof window === "undefined" ? 0 : THREE.MathUtils.clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, 1);
    cup.current.rotation.y = THREE.MathUtils.lerp(cup.current.rotation.y, pointer.x * 0.2 + Math.sin(clock.elapsedTime * 0.35) * 0.035, 0.04);
    cup.current.rotation.x = THREE.MathUtils.lerp(cup.current.rotation.x, -pointer.y * 0.08, 0.04);
    cup.current.position.y = THREE.MathUtils.lerp(cup.current.position.y, -0.15 - progress * 0.58, 0.035);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.18, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.2 - progress * 0.3 + pointer.y * 0.08, 0.025);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.25 - progress * 0.38, 0.025);
    camera.lookAt(0, -0.05 - progress * 0.25, 0);
    if (handle.current) handle.current.rotation.y = cup.current.rotation.y;
  });
  return <Float speed={1.1} rotationIntensity={0.035} floatIntensity={0.12}>
    <group ref={cup} position={[0, -0.15, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.05, 0.76, 1.45, 96, 1, true]} />
        <meshPhysicalMaterial color="#e6d5bd" roughness={0.19} metalness={0.04} clearcoat={0.65} clearcoatRoughness={0.16} side={THREE.DoubleSide} />
      </mesh>
      <mesh castShadow position={[0, -0.72, 0]}><cylinderGeometry args={[0.77, 0.77, 0.08, 96]} /><meshStandardMaterial color="#d6c4aa" roughness={0.25} /></mesh>
      <mesh position={[0, 0.67, 0]}><torusGeometry args={[1.025, 0.055, 16, 96]} /><meshPhysicalMaterial color="#f3e7d5" roughness={0.16} clearcoat={0.8} /></mesh>
      <mesh position={[0, 0.605, 0]}><cylinderGeometry args={[0.94, 0.94, 0.035, 96]} /><meshStandardMaterial color="#29140d" roughness={0.22} /></mesh>
      <mesh position={[0, 0.626, 0]}><circleGeometry args={[0.78, 64]} /><meshStandardMaterial color="#66361f" roughness={0.26} /></mesh>
      <mesh position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[0.45, 0.018, 10, 64]} /><meshBasicMaterial color="#d6a365" transparent opacity={0.75} /></mesh>
      <group ref={handle} position={[1.02, 0.02, 0]}>
        <mesh castShadow><torusGeometry args={[0.48, 0.115, 24, 64]} /><meshPhysicalMaterial color="#e1cfb5" roughness={0.2} clearcoat={0.7} /></mesh>
      </group>
    </group>
    <group position={[0, 1, 0]}>
      {[0, 1, 2].map((i) => <mesh key={i} position={[(i - 1) * 0.2, i * 0.27, 0]} scale={[0.08 + i * 0.012, 0.32 + i * 0.045, 0.08]}>
        <sphereGeometry args={[1, 12, 16]} /><meshBasicMaterial color="#d8b995" transparent opacity={0.11 - i * 0.022} />
      </mesh>)}
    </group>
  </Float>;
}

function CoffeeBean({ position, scale = 1, delay = 0 }) {
  const ref = useRef();
  const { shell, seam } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.33);
    shape.bezierCurveTo(-0.31, -0.34, -0.42, 0.06, -0.22, 0.29);
    shape.bezierCurveTo(-0.08, 0.46, 0.20, 0.38, 0.31, 0.16);
    shape.bezierCurveTo(0.43, -0.07, 0.23, -0.31, 0, -0.33);
    const shell = new THREE.ExtrudeGeometry(shape, { depth: 0.16, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.045, bevelThickness: 0.05, curveSegments: 16 });
    shell.center();
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0.02, -0.31, 0.1), new THREE.Vector3(-0.12, -0.16, 0.12), new THREE.Vector3(-0.02, 0, 0.13), new THREE.Vector3(0.13, 0.15, 0.12), new THREE.Vector3(0.12, 0.29, 0.08)]);
    const seam = new THREE.TubeGeometry(curve, 24, 0.018, 6, false);
    return { shell, seam };
  }, []);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.68) * 0.12;
    ref.current.rotation.x = pointer.y * 0.12 + Math.sin(t * 0.3) * 0.08;
    ref.current.rotation.y = t * 0.16 + pointer.x * 0.15;
  });
  return <group ref={ref} position={position} scale={scale}>
    <mesh geometry={shell} castShadow><meshPhysicalMaterial color="#58301b" roughness={0.36} clearcoat={0.2}/></mesh>
    <mesh geometry={seam}><meshStandardMaterial color="#c08b57" roughness={0.5}/></mesh>
  </group>;
}

function AmbientDust() {
  const points = useMemo(() => {
    const positions = new Float32Array(260 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (((i * 37) % 101) / 100 - 0.5) * 8;
      positions[i + 1] = (((i * 53) % 97) / 96 - 0.5) * 5;
      positions[i + 2] = (((i * 29) % 89) / 88 - 0.5) * 5;
    }
    return positions;
  }, []);
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]}/></bufferGeometry><pointsMaterial color="#d6a878" size={0.018} transparent opacity={0.46} sizeAttenuation/></points>;
}

export default function CoffeeScene() {
  return <Canvas shadows dpr={[1, 1.3]} camera={{ position: [0, 1.2, 6.25], fov: 37 }} gl={{ antialias: true, alpha: true }}>
    <Suspense fallback={<Html center><span className="scene-loading">Preparing your coffee…</span></Html>}>
      <ambientLight intensity={0.7} /><spotLight position={[-4, 6, 4]} intensity={95} angle={0.48} penumbra={0.8} castShadow />
      <pointLight position={[4, 2, -2]} intensity={22} color="#d08a42" /><pointLight position={[0, -1, 4]} intensity={8} color="#f4dfc6" />
      <Cup />
      <CoffeeBean position={[-1.65, 0.9, -0.25]} scale={0.64} delay={0}/><CoffeeBean position={[1.75, 0.15, -0.6]} scale={0.5} delay={2.3}/><CoffeeBean position={[-1.4, -0.1, 0.8]} scale={0.42} delay={4.2}/><CoffeeBean position={[1.55, 1.4, 0.5]} scale={0.56} delay={1.2}/>
      <AmbientDust/><ContactShadows position={[0, -1.15, 0]} opacity={0.5} scale={5} blur={2.4} far={2.5}/>
      <Environment resolution={64}><Lightformer form="rect" intensity={3.5} position={[0, 4, -3]} scale={[8, 1, 1]} color="#e7c49e"/><Lightformer form="rect" intensity={2} position={[-4, 1, 2]} scale={[2, 4, 1]} color="#fff0d9"/></Environment>
    </Suspense>
  </Canvas>;
}
