import React, { useState } from 'react';
import { Play, Lock, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoPlayerProps {
  videoId: string;
  isPremium: boolean;
  isUnlocked: boolean;
  onUnlock: () => void;
  tokenCost?: number;
}

export default function VideoPlayer({ videoId, isPremium, isUnlocked, onUnlock, tokenCost }: VideoPlayerProps) {
  const streamDomain = process.env.CLOUDFLARE_STREAM_DOMAIN || 'iframe.videodelivery.net';

  if (isPremium && !isUnlocked) {
    return (
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-squirrely-dark flex flex-col items-center justify-center text-white border-4 border-squirrely-pink/30">
        <div className="absolute inset-0 opacity-20 grayscale">
           <img src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center p-8">
           <div className="w-16 h-16 bg-squirrely-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-squirrely-pink/50">
             <Lock className="w-8 h-8" />
           </div>
           <h3 className="font-display font-bold text-2xl mb-2">Premium Video Content</h3>
           <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm italic">"Exclusive vlogs and BTS content. Unlock this stream with Squirrely tokens."</p>
           <button 
            onClick={onUnlock}
            className="token-gradient px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
           >
             Unlock for {tokenCost || 50} Tokens
           </button>
           <p className="mt-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center justify-center gap-2">
             <Shield className="w-3 h-3" /> Secure Cloudflare Stream
           </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-white"
    >
      <iframe
        src={`https://${streamDomain}/${videoId}/iframe?preload=true`}
        style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
    </motion.div>
  );
}
