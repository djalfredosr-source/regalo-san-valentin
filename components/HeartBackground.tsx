
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const HeartBackground = () => {
    const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: [0, 1, 0] }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'linear',
                    }}
                    style={{ left: `${heart.left}%` }}
                    className="absolute text-pink-300/30"
                >
                    <Heart size={32} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

export default HeartBackground;
