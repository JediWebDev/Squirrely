import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Coins, 
  Star, 
  Search, 
  Menu, 
  User, 
  Lock, 
  ChevronRight,
  TrendingUp,
  Heart,
  Image as ImageIcon,
  Sparkles,
  MessageSquare,
  Globe,
  ShieldCheck,
  Zap,
  Twitter,
  Youtube,
  Send as SendIcon,
  Mail,
  Info,
  Phone,
  FileText
} from 'lucide-react';
import { MOCK_CONTENT } from './constants';
import { ContentItem, UserProfile } from './types';
import AIChat from './components/AIChat';
import WalletConnect from './components/WalletConnect';

export default function App() {
  const [user, setUser] = useState<UserProfile>({
    username: 'AnimeLover99',
    tokens: 500,
    isPremium: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showTokenStore, setShowTokenStore] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const spendTokens = (amount: number) => {
    if (user.tokens >= amount) {
      setUser(prev => ({ ...prev, tokens: prev.tokens - amount }));
      return true;
    }
    return false;
  };

  const addTokens = (amount: number) => {
    setUser(prev => ({ ...prev, tokens: prev.tokens + amount }));
  };

  const handleWalletConnect = (address: string) => {
    setUser(prev => ({ ...prev, address }));
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 glass border-b border-squirrely-cream">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('Home')}>
              <div className="w-10 h-10 bg-squirrely-pink rounded-xl flex items-center justify-center shadow-lg rotate-3">
                 <span className="text-white font-display font-bold text-xl">S</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter hidden md:block">SQUIRRELY</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
              <button 
                onClick={() => { setActiveTab('Images'); setSelectedCategory('Poster'); }}
                className={`hover:text-squirrely-pink transition-colors ${activeTab === 'Images' ? 'text-squirrely-pink underline underline-offset-8 decoration-2' : ''}`}
              >
                Images
              </button>
              <button 
                onClick={() => { setActiveTab('Webtoons'); setSelectedCategory('Webtoon'); }}
                className={`hover:text-squirrely-pink transition-colors ${activeTab === 'Webtoons' ? 'text-squirrely-pink underline underline-offset-8 decoration-2' : ''}`}
              >
                Webtoons
              </button>
              <button 
                onClick={() => { setActiveTab('Videos'); setSelectedCategory('Vlog'); }}
                className={`hover:text-squirrely-pink transition-colors ${activeTab === 'Videos' ? 'text-squirrely-pink underline underline-offset-8 decoration-2' : ''}`}
              >
                Videos
              </button>
              <button 
                onClick={() => setActiveTab('Chat')}
                className={`hover:text-squirrely-pink transition-colors ${activeTab === 'Chat' ? 'text-squirrely-pink underline underline-offset-8 decoration-2' : ''}`}
              >
                Chat
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <WalletConnect onConnect={handleWalletConnect} />
            
            <button 
              onClick={() => setShowTokenStore(true)}
              className="flex items-center gap-2 bg-squirrely-cream/50 px-4 py-2 rounded-xl border border-squirrely-cream hover:bg-squirrely-cream transition-colors group shadow-sm"
            >
              <Coins className="w-4 h-4 text-squirrely-pink group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-sm">{user.tokens}</span>
            </button>
            
            <div className="w-10 h-10 rounded-full bg-squirrely-blue border-2 border-white shadow-md overflow-hidden cursor-pointer hover:scale-110 transition-transform hidden sm:block">
               <img src={user.avatar} alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'Home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Section */}
              <section className="relative rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl group border-4 border-white">
                <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
                   <img 
                     src="https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_0.png" 
                     alt="Hero Banner" 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent flex flex-col justify-center px-8 md:px-20 text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-2xl"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-[1px] w-12 bg-squirrely-pink" />
                          <span className="meta-label text-squirrely-pink font-display tracking-[0.2em] uppercase text-[10px] font-bold">The Squirrely Universe</span>
                        </div>
                        <h1 className="font-serif italic text-6xl md:text-8xl font-bold mb-6 leading-[0.85] tracking-tighter">
                          Lust, Lies,<br /><span className="text-squirrely-pink">&</span> Literature.
                        </h1>
                        <p className="max-w-lg text-gray-300 text-base md:text-lg mb-10 font-normal leading-relaxed">
                          Step into the sultry, high-stakes world of the web's favorite dark romance vlogger. 
                          Tokens unlock the secrets she keeps.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <button 
                            onClick={() => { setActiveTab('Webtoons'); setSelectedCategory('Webtoon'); }}
                            className="bg-squirrely-pink px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-squirrely-pink transition-all shadow-[0_10px_30px_rgba(255,133,162,0.3)] hover:-translate-y-1"
                          >
                            Read Webtoons
                          </button>
                          <button 
                            onClick={() => { setActiveTab('Videos'); setSelectedCategory('Vlog'); }}
                            className="glass px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/40"
                          >
                             <Play className="w-5 h-5 fill-white" /> Start Watching
                          </button>
                        </div>
                      </motion.div>
                   </div>
                </div>
              </section>

              {/* Stats / Web3 Bar */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                 {[
                   { icon: <Globe className="text-squirrely-blue" />, label: "Streaming Partner", val: "Cloudflare" },
                   { icon: <ShieldCheck className="text-green-400" />, label: "Wallet Security", val: "Web3 Verified" },
                   { icon: <Zap className="text-squirrely-pink" />, label: "Compute Nodes", val: "RunPod AI" }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white p-6 rounded-3xl border border-squirrely-cream flex items-center gap-4 hover:shadow-xl transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-squirrely-cream/50 flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="font-display font-bold text-lg">{stat.val}</p>
                      </div>
                   </div>
                 ))}
              </section>

              {/* Featured Content */}
              <section className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-squirrely-pink" />
                      <span className="text-squirrely-pink font-display font-bold text-xs tracking-widest uppercase">Hot Collections</span>
                    </div>
                    <h2 className="font-serif italic text-4xl md:text-5xl font-bold">Weekly Top Picks</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Poster', 'Vlog', 'Webtoon', 'Novel'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          selectedCategory === cat 
                            ? 'bg-squirrely-pink text-white shadow-lg shadow-squirrely-pink/20' 
                            : 'bg-white border border-gray-100 hover:border-squirrely-pink text-gray-400 hover:text-squirrely-pink'
                        }`}
                      >
                         {cat === 'Poster' ? 'Images' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MOCK_CONTENT.filter(item => selectedCategory === 'All' || item.category === selectedCategory).map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative"
                    >
                      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all border-2 border-transparent group-hover:border-squirrely-pink/30">
                        {item.type === 'video' ? (
                          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="w-16 h-16 rounded-full bg-squirrely-pink text-white flex items-center justify-center animate-pulse">
                               <Play className="w-8 h-8 fill-current ml-1" />
                             </div>
                          </div>
                        ) : null}
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                           <button 
                              onClick={() => item.isPremium && spendTokens(item.tokenCost || 0)}
                              className="w-full bg-white text-squirrely-dark font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-squirrely-pink hover:text-white transition-colors"
                            >
                              {item.isPremium ? <><Lock className="w-4 h-4" /> Unlock for {item.tokenCost}</> : <><Play className="w-4 h-4" /> View Now</>}
                           </button>
                        </div>
                        {item.isPremium && (
                          <div className="absolute top-4 left-4 bg-squirrely-pink text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider shadow-lg">
                            <Star className="w-3 h-3 fill-current" /> Premium
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-lg mb-1 group-hover:text-squirrely-pink transition-colors">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">{item.category}</span>
                        <div className="flex items-center gap-1 text-squirrely-pink">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold">4.9</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {(activeTab === 'Images' || activeTab === 'Webtoons' || activeTab === 'Videos') && (
            <motion.div 
               key={activeTab}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               className="py-12"
            >
              <div className="mb-12">
                <h2 className="font-serif italic text-6xl font-bold mb-4">{activeTab}</h2>
                <p className="text-gray-400">Exclusive {activeTab.toLowerCase()} content powered by Squirrely tokens.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                 {MOCK_CONTENT.filter(i => {
                   if (activeTab === 'Images') return i.type === 'image';
                   if (activeTab === 'Webtoons') return i.type === 'webtoon';
                   if (activeTab === 'Videos') return i.type === 'video';
                   return true;
                 }).map(item => (
                   <div key={item.id} className="group cursor-pointer">
                      <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-transparent hover:border-squirrely-pink transition-all shadow-lg relative">
                        <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        {item.isPremium && <div className="absolute top-4 right-4 bg-squirrely-pink p-2 rounded-full"><Lock className="w-4 h-4 text-white" /></div>}
                      </div>
                      <h4 className="mt-4 font-bold text-lg group-hover:text-squirrely-pink transition-colors">{item.title}</h4>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Chat' && (
            <motion.div 
               key="chat-page"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="py-12 text-center"
            >
               <div className="max-w-2xl mx-auto py-20 px-8 glass rounded-[3rem] border-2 border-squirrely-pink">
                 <div className="w-24 h-24 bg-squirrely-pink rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-6">
                    <MessageSquare className="w-12 h-12 text-white" />
                 </div>
                 <h2 className="font-serif text-5xl font-bold mb-6 italic">Premium AI Chat</h2>
                 <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                   Enter the high-fidelity chat experience powered by RunPod. 
                   Interact with multiple characters including Squirrely, Mika, and Elara.
                 </p>
                 <button 
                  onClick={() => setActiveTab('Home')} // Opens chat interface elsewhere
                  className="token-gradient text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-xl hover:-translate-y-1 transition-all"
                 >
                   Launch Chat Interface
                 </button>
                 <div className="mt-12 flex justify-center gap-4">
                    <div className="flex -space-x-4">
                       {[1, 4, 5].map(i => (
                         <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                           <img src={`https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_${i}.png`} className="w-full h-full object-cover" />
                         </div>
                       ))}
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-sm">3 Active AIs</p>
                       <p className="text-xs text-gray-400">10 Tokens/msg</p>
                    </div>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Spotlight - Only show on Home */}
        {activeTab === 'Home' && (
          <section className="bg-squirrely-cream/30 rounded-[3rem] p-8 md:p-16 mb-16 relative overflow-hidden mt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <span className="inline-block bg-squirrely-pink text-white px-3 py-1 rounded-lg text-xs font-bold mb-4 tracking-tighter">CHARACTER SPOTLIGHT</span>
                  <h2 className="font-serif text-5xl font-bold mb-6 italic">Meet "Squirrely"</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    The dark romance vlogger with a passion for twist endings. Unlock exclusive live-streams, 
                    private chat sessions, and early access to her upcoming novel chapters.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Interactive AI Chat Experience",
                      "Exclusive Vlogger Personal Content",
                      "Early Novel Access & Drafts",
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-squirrely-blue flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button className="token-gradient text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-squirrely-pink/40 transition-shadow">
                    Start Interactive Chat
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="rounded-3xl overflow-hidden h-64 border-4 border-white shadow-lg"
                  >
                    <img src="https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_1.png" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="rounded-3xl overflow-hidden h-64 border-4 border-white shadow-lg translate-y-8"
                  >
                    <img src="https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_5.png" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="rounded-3xl overflow-hidden h-64 border-4 border-white shadow-lg"
                  >
                    <img src="https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_3.png" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="rounded-3xl overflow-hidden h-64 border-4 border-white shadow-lg translate-y-8"
                  >
                    <img src="https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_4.png" className="w-full h-full object-cover" />
                  </motion.div>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-squirrely-blue/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-squirrely-pink/20 rounded-full blur-3xl -ml-32 -mb-32" />
          </section>
        )}
      </main>

      <footer className="bg-squirrely-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Newsletter Section */}
          <div className="bg-squirrely-pink/10 rounded-[2.5rem] p-8 md:p-12 mb-16 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center md:text-left">
              <h3 className="font-serif italic text-3xl font-bold mb-2">Join the Squirrely Squad</h3>
              <p className="text-gray-400 text-sm">Get notified about new chapters, vlog drops, and exclusive token giveaways.</p>
            </div>
            <form className="flex w-full max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-squirrely-pink transition-all"
                />
              </div>
              <button className="bg-squirrely-pink hover:bg-white hover:text-squirrely-pink text-white font-bold px-8 rounded-2xl transition-all shadow-lg shadow-squirrely-pink/20">
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-squirrely-pink rounded-xl flex items-center justify-center shadow-lg rotate-3">
                   <span className="text-white font-display font-bold text-xl">S</span>
                </div>
                <span className="font-display font-bold text-2xl tracking-tighter">SQUIRRELY</span>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Empowering creators and readers through decentralized AI interaction and premium streaming.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-squirrely-pink hover:border-squirrely-pink transition-all text-gray-400 hover:text-white" title="X (Twitter)">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-squirrely-pink hover:border-squirrely-pink transition-all text-gray-400 hover:text-white" title="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-squirrely-pink hover:border-squirrely-pink transition-all text-gray-400 hover:text-white" title="Discord">
                   <MessageSquare className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-squirrely-pink hover:border-squirrely-pink transition-all text-gray-400 hover:text-white" title="Reddit">
                   <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-[10px] text-squirrely-pink flex items-center gap-2">
                <Zap className="w-3 h-3" /> Navigation
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><button onClick={() => setActiveTab('Webtoons')} className="hover:text-white transition-colors">Webtoons</button></li>
                <li><button onClick={() => setActiveTab('Videos')} className="hover:text-white transition-colors">Videos</button></li>
                <li><button onClick={() => setActiveTab('Chat')} className="hover:text-white transition-colors">AI Chat</button></li>
                <li><button onClick={() => setActiveTab('Images')} className="hover:text-white transition-colors">Characters</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-[10px] text-squirrely-pink flex items-center gap-2">
                <Info className="w-3 h-3" /> Company
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Vision</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-[10px] text-squirrely-pink flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Legal
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DMCA Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <p>© 2024 SQUIRRELY ENTERTAINMENT. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <span>Cloudflare Stream Partner</span>
              <span>RunPod Infrastructure</span>
              <span>Ethereum Network</span>
            </div>
          </div>
        </div>
      </footer>

      <AIChat tokens={user.tokens} onSpendTokens={spendTokens} />

      <AnimatePresence>
        {showTokenStore && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTokenStore(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-squirrely-pink"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-squirrely-pink rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-lg">
                   <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-2">Buy Squirrely Tokens</h3>
                <p className="text-gray-500 text-sm mb-8">Fuel your interactive romance journey.</p>
                
                <div className="space-y-3">
                  {[
                    { amount: 100, price: '$4.99', label: 'Starter Pack' },
                    { amount: 500, price: '$19.99', label: 'Lover Pack', popular: true },
                    { amount: 1500, price: '$49.99', label: 'Whale Pack' },
                  ].map((pack) => (
                    <button 
                      key={pack.amount}
                      onClick={() => {
                        addTokens(pack.amount);
                        setShowTokenStore(false);
                      }}
                      className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all group ${
                        pack.popular ? 'border-squirrely-pink bg-squirrely-pink/5' : 'border-gray-100 hover:border-squirrely-blue'
                      }`}
                    >
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                           <span className="font-display font-bold">{pack.amount} Tokens</span>
                           {pack.popular && <span className="bg-squirrely-pink text-white text-[8px] px-2 py-0.5 rounded-full uppercase font-bold text-white">Popular</span>}
                        </div>
                        <span className="text-xs text-gray-400">{pack.label}</span>
                      </div>
                      <span className="font-bold text-squirrely-pink group-hover:scale-110 transition-transform">{pack.price}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowTokenStore(false)} className="mt-8 text-gray-400 text-sm hover:text-squirrely-dark">Maybe later</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
