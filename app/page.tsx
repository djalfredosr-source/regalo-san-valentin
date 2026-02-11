
'use client';

import { useState } from 'react';
import HeartBackground from '../components/HeartBackground';
import MemoryForm from '../components/MemoryForm';
import MemoryTimeline from '../components/MemoryTimeline';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [timelineKey, setTimelineKey] = useState(0);

  const handleMemoryAdded = () => {
    setShowForm(false);
    setTimelineKey((prev) => prev + 1); // Refresh timeline
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 text-gray-800 relative font-sans">
      <HeartBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 drop-shadow-sm flex items-center justify-center gap-3">
            Our Love Story <Heart className="fill-rose-500 text-rose-500 animate-pulse" />
          </h1>
          <p className="mt-4 text-pink-700 text-lg md:text-xl font-light italic">
            "Every moment with you is a memory I treasure forever."
          </p>
        </motion.header>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            >
              <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
                <MemoryForm onMemoryAdded={handleMemoryAdded} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-pink-200/50 flex items-center gap-2 transition-all border border-pink-100 mb-10"
        >
          <Plus size={20} strokeWidth={3} /> Add New Memory
        </motion.button>

        <MemoryTimeline key={timelineKey} />
      </div>
    </main>
  );
}
