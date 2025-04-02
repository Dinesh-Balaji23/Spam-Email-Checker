import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function generateGalaxyPoints(count: number) {
  const points = new Float32Array(count * 3);
  const radius = 20; // radius of the galaxy

  for (let i = 0; i < count * 3; i += 3) {
    const angle = gsap.utils.random(0, Math.PI * 2); // random angle
    const distance = gsap.utils.random(0, radius); // distance from center
    
    points[i] = Math.cos(angle) * distance; // x position
    points[i + 1] = gsap.utils.random(-3, 3); // y position (random for height)
    points[i + 2] = Math.sin(angle) * distance; // z position
  }
  
  return points;
}

export function Background3D() {
  const pointsRef = useRef<THREE.Points>(null);
  const pointsGeometry = generateGalaxyPoints(2000);

  useFrame((state) => {
    if (pointsRef.current) {
      const elapsed = state.clock.elapsedTime;
      
      // Rotate the stars around the center of the galaxy
      pointsRef.current.rotation.x = elapsed * 0.02;
      pointsRef.current.rotation.y = elapsed * 0.015;
      
      // Simulate a slight movement towards the viewer to add depth
      pointsRef.current.position.z = Math.sin(elapsed * 0.1) * 2;

      // Twinkling effect - Randomly change some points' brightness
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.7 + Math.sin(elapsed * 3) * 0.3; // Smooth flicker
      material.color.setHSL(Math.sin(elapsed * 0.1) * 0.1 + 0.5, 1, 0.7); // Subtle color change
    }
  });

  return (
    <>
      {/* Background color */}
      <color attach="background" args={["#050514"]} />
      
      {/* Galaxy Starfield */}
      <Points ref={pointsRef} positions={pointsGeometry} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f3ff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

      {/* Ambient Light for depth */}
      <ambientLight intensity={0.5} />
    </>
  );
}
