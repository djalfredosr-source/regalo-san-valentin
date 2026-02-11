
'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Upload, Calendar, FileText, Loader2 } from 'lucide-react';

export default function MemoryForm({ onMemoryAdded }: { onMemoryAdded: () => void }) {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !description || !file) return;

        setLoading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('memories')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('memories')
                .getPublicUrl(filePath);

            const { error: insertError } = await supabase
                .from('memories')
                .insert([{ date, description, media_url: publicUrl, type: file.type.startsWith('image/') ? 'image' : 'video' }]);

            if (insertError) throw insertError;

            setDate('');
            setDescription('');
            setFile(null);
            onMemoryAdded();
        } catch (error) {
            console.error('Error adding memory:', error);
            alert('Error adding memory!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md w-full mx-auto border border-pink-100"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Add a New Memory 💖</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-pink-700 mb-1 flex items-center gap-2">
                        <Calendar size={16} /> Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 rounded-lg border-pink-200 focus:ring-pink-500 focus:border-pink-500 bg-white/50"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-pink-700 mb-1 flex items-center gap-2">
                        <FileText size={16} /> Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded-lg border-pink-200 focus:ring-pink-500 focus:border-pink-500 bg-white/50 min-h-[100px]"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-pink-700 mb-1 flex items-center gap-2">
                        <Upload size={16} /> Photo/Video
                    </label>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-pink-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Save Memory ✨'}
                </button>
            </div>
        </motion.form>
    );
}
