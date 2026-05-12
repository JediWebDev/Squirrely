
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Lock, ChevronLeft, UserCircle2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Character } from '../types';
import { CHARACTERS } from '../constants';
import { generateCharacterResponse } from '../services/runpodService';

export default function AIChat({ tokens, onSpendTokens }: { tokens: number; onSpendTokens: (amount: number) => boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const currentMessages = selectedCharacter ? messages[selectedCharacter.id] || [] : [];

  const handleSend = async () => {
    if (!input.trim() || isLoading || !selectedCharacter) return;

    const cost = 10;
    if (tokens < cost) {
      alert("Not enough Squirrely tokens! Visit the shop to top up.");
      return;
    }

    if (!onSpendTokens(cost)) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => ({
      ...prev,
      [selectedCharacter.id]: [...(prev[selectedCharacter.id] || []), userMsg]
    }));
    setInput('');
    setIsLoading(true);

    try {
      // PREMIUM: Use RunPod for character responses if configured, otherwise fallback to Gemini
      let responseText = "";
      
      if (process.env.RUNPOD_API_KEY) {
         responseText = await generateCharacterResponse(
           selectedCharacter.name,
           selectedCharacter.persona,
           currentMessages,
           input
         );
      } else {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            ...currentMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
            { role: 'user', parts: [{ text: input }] }
          ],
          config: {
            systemInstruction: `You are '${selectedCharacter.name}', ${selectedCharacter.description}. Your persona is: ${selectedCharacter.persona}. Maintain this persona strictly. Keep responses concise and engaging.`,
          }
        });
        responseText = response.text || "I'm lost in a plot twist...";
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      };

      setMessages(prev => ({
        ...prev,
        [selectedCharacter.id]: [...(prev[selectedCharacter.id] || []), assistantMsg]
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-squirrely-pink text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 group"
      >
        <MessageSquare className="w-8 h-8 group-hover:hidden" />
        <Sparkles className="w-8 h-8 hidden group-hover:block animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-96 h-[550px] glass rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border-2 border-squirrely-pink"
          >
            <div className="p-4 bg-squirrely-pink text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl" />
              <div className="flex items-center gap-3 relative z-10">
                {selectedCharacter ? (
                   <>
                    <button onClick={() => setSelectedCharacter(null)} className="hover:bg-white/20 p-1 rounded-full">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white">
                      <img src={selectedCharacter.avatar} alt={selectedCharacter.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm leading-none">{selectedCharacter.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] mt-1 bg-white/20 px-2 py-0.5 rounded-full w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
                      </div>
                    </div>
                   </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center bg-white text-squirrely-pink">
                       <UserCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-lg">Pick a Character</h3>
                  </>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full relative z-10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
              {!selectedCharacter ? (
                <div className="space-y-3">
                   {CHARACTERS.map(char => (
                     <button 
                        key={char.id}
                        onClick={() => setSelectedCharacter(char)}
                        className="w-full bg-white p-3 rounded-2xl border border-squirrely-cream flex items-center gap-4 hover:border-squirrely-pink hover:bg-squirrely-pink/5 transition-all text-left group"
                      >
                       <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-squirrely-cream group-hover:border-squirrely-pink transition-colors shrink-0">
                         <img src={char.avatar} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1">
                          <h4 className="font-display font-bold text-squirrely-dark">{char.name}</h4>
                          <p className="text-[10px] text-gray-500">{char.description}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Lock className="w-3 h-3 text-squirrely-pink" /> 
                            <span className="text-[9px] font-bold text-squirrely-pink uppercase">10 Tokens / msg</span>
                          </div>
                       </div>
                       <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
                     </button>
                   ))}
                   <div className="p-6 text-center">
                     <p className="text-xs text-gray-400 italic">"Our characters are powered by private RunPod instances for high-fidelity responses. Connect with them now."</p>
                   </div>
                </div>
              ) : (
                <>
                  {currentMessages.length === 0 && (
                    <div className="text-center py-10 px-6">
                      <div className="w-16 h-16 mx-auto bg-squirrely-cream rounded-full flex items-center justify-center mb-4 text-squirrely-pink">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <h4 className="font-display font-bold text-squirrely-dark mb-2">{selectedCharacter.name} is waiting...</h4>
                      <p className="text-sm text-gray-500 italic">"{selectedCharacter.greeting}"</p>
                    </div>
                  )}
                  {currentMessages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        m.role === 'user' 
                          ? 'bg-squirrely-pink text-white rounded-tr-none' 
                          : 'bg-white text-squirrely-dark rounded-tl-none border border-squirrely-cream'
                      }`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                </>
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-squirrely-cream">
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="flex gap-1"
                    >
                      <div className="w-2 h-2 bg-squirrely-pink rounded-full" />
                      <div className="w-2 h-2 bg-squirrely-pink rounded-full" />
                      <div className="w-2 h-2 bg-squirrely-pink rounded-full" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            {selectedCharacter && (
              <div className="p-4 bg-white border-t border-squirrely-cream">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-squirrely-pink"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-squirrely-pink text-white p-2 rounded-full hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> 10 Tokens / msg (Powered by RunPod)
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
