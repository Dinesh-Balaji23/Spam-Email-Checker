import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ThreeScene } from "./ThreeScene";
import { useEffect } from "react";

// Hero Section
export function Hero() {
  useEffect(() => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  
  return (
    <section id="home" className="h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70" />
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ThreeScene />
        </Canvas>
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4 text-white">Welcome to 3D World</h1>
          <p className="text-xl text-white">Explore the possibilities of 3D on the web</p>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
export function About() {
  return (
    <section id="about" className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We create immersive 3D experiences for the modern web
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive",
              description: "Engage with dynamic 3D elements",
              image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
            },
            {
              title: "Responsive",
              description: "Perfect experience on any device",
              image: "https://images.unsplash.com/photo-1618788372246-79faff0c3742"
            },
            {
              title: "Modern",
              description: "Using cutting-edge web technologies",
              image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Showcase Section
export function Showcase() {
  return (
    <section id="showcase" className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Showcase</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Check out our latest 3D creations
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ThreeScene />
            </Canvas>
          </div>
          <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ThreeScene />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
