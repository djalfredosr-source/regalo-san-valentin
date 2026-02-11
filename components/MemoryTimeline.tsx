
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface Memory {
    id: string;
    date: string;
    description: string;
    media_url: string;
    type: 'image' | 'video';
    created_at: string;
}

export default function MemoryTimeline({ key }: { key: number }) {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMemories = async () => {
        try {
            const { data, error } = await supabase
                .from('memories')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setMemories(data || []);
        } catch (error) {
            console.error('Error fetching memories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemories();
    }, [key]);

    if (loading) return <div className="text-center text-pink-500 animate-pulse">Loading memories... 💖</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-4">
            <AnimatePresence>
                {memories.map((memory, index) => (
                    <motion.div
                        key={memory.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-pink-100 group"
                    >
                        <div className="aspect-video relative overflow-hidden bg-pink-50">
                            {memory.type === 'image' ? (
                                <img
                                    src={memory.media_url}
                                    alt={memory.description}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <video
                                    src={memory.media_url}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-pink-600 shadow-sm flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(memory.date).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-700 font-medium leading-relaxed">{memory.description}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            {memories.length === 0 && (
                <div className="col-span-full text-center text-pink-400 py-10">
                    No memories yet. Add your first one above! ✨
                </div>
            )}
        </div>
    );
}
