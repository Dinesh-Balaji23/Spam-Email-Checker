import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

export function AIBot({ isAnalyzing }: { isAnalyzing: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const particleRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (sphereRef.current) {
      // Floating up and down
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      
      // Rotation effect when analyzing
      if (isAnalyzing) {
        sphereRef.current.rotation.y += 0.05;
        sphereRef.current.rotation.x += 0.03;
      }
    }

    // Animate orbiting particles
    particleRefs.current.forEach((particle, i) => {
      const angle = state.clock.elapsedTime + i * (Math.PI / 3);
      particle.position.x = Math.cos(angle) * 1.5;
      particle.position.z = Math.sin(angle) * 1.5;
    });
  });

  return (
    <motion.group
      initial={{ scale: 0 }}
      animate={{ scale: isAnalyzing ? 1.2 : 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Main AI Sphere */}
      <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={isAnalyzing ? "#ff00ff" : "#9d00ff"} // Dynamic color change
          emissive={isAnalyzing ? "#ff00ff" : "#9d00ff"} // Glowing effect
          emissiveIntensity={1}
          speed={isAnalyzing ? 5 : 2}
          distort={isAnalyzing ? 0.6 : 0.4}
          radius={1}
        />
      </Sphere>

      {/* Orbiting Particles */}
      {[...Array(6)].map((_, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            if (el) particleRefs.current[i] = el;
          }}
          args={[0.1, 16, 16]}
          position={[Math.cos(i) * 1.5, 0, Math.sin(i) * 1.5]}
        >
          <meshStandardMaterial color="#ffffff" emissive="#ff00ff" emissiveIntensity={0.8} />
        </Sphere>
      ))}
    </motion.group>
  );
}
