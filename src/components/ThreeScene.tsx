import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

export function ThreeScene() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const [color, setColor] = useState("#4338ca");

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.01;
    }

    // Animate the color transition over time
    setColor(`hsl(${(state.clock.elapsedTime * 50) % 360}, 100%, 50%)`);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} />
      
      <motion.group
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.4}
            radius={1}
          />
        </Sphere>

        <Box ref={boxRef} args={[0.5, 0.5, 0.5]} position={[2, 0, 0]}>
          <meshStandardMaterial color="#ef4444" />
        </Box>
      </motion.group>

      <OrbitControls enableZoom={true} />
    </>
  );
}
