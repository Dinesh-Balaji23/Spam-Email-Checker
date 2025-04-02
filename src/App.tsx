import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Shield, ShieldAlert, Loader2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import Typewriter from 'typewriter-effect';
import { Background3D } from './components/Background3D';
import { AIBot } from './components/AIBot';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | boolean>(null);

  const analyzeEmail = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResult(Math.random() > 0.5);
    setIsAnalyzing(false);
  };

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-b from-cyber-dark to-cyber-darker text-white relative overflow-hidden">
        {/* Background Canvas */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Background3D />
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="p-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className="fixed top-4 right-4 p-3 rounded-full bg-cyber-light/30 backdrop-blur-sm hover:bg-cyber-light/50 transition-all"
            >
              {isDark ? <Sun className="text-neon-blue" /> : <Moon className="text-neon-purple" />}
            </motion.button>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Cyber Spam Shield
              </h1>
              <p className="text-xl text-gray-400">
                <Typewriter
                  options={{
                    strings: ['Protect your inbox with advanced AI', 'Detect spam emails instantly', 'Stay safe in cyberspace'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </p>
            </motion.div>

            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="backdrop-blur-md bg-cyber-light/10 p-8 rounded-2xl border border-neon-blue/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                <textarea
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Paste your email content here..."
                  className="w-full h-40 bg-cyber-darker/50 text-white placeholder-gray-500 rounded-lg p-4 border border-neon-blue/30 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 outline-none transition-all mb-4"
                />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={analyzeEmail}
                  disabled={isAnalyzing || !email}
                  className="w-full py-4 px-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold 
                    disabled:opacity-50 disabled:cursor-not-allowed animate-glow"
                >
                  {isAnalyzing ? (
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        transition: { duration: 1, repeat: Infinity, ease: "linear" }
                      }}
                      className="w-6 h-6"
                    >
                      <Loader2 className="w-full h-full animate-spin mx-auto" />
                    </motion.div>
                  ) : (
                    'Analyze Email'
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Result Section */}
            <AnimatePresence>
              {result !== null && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: { duration: 0.5 }
                    }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
                      result ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-pink/20 text-neon-pink'
                    }`}
                  >
                    {result ? (
                      <Shield className="w-6 h-6" />
                    ) : (
                      <ShieldAlert className="w-6 h-6" />
                    )}
                    <span className="font-semibold">
                      {result ? 'Safe Email' : 'Spam Detected'}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Bot */}
            <div className="fixed bottom-0 right-0 w-64 h-64">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <AIBot isAnalyzing={isAnalyzing} />
              </Canvas>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
