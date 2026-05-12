import React, { useState } from 'react';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect({ onConnect }: { onConnect: (address: string) => void }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        setAddress(userAddress);
        onConnect(userAddress);
      } catch (error) {
        console.error("User rejected request", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet!");
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  if (address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] font-bold text-squirrely-pink uppercase">Wallet Connected</span>
          <span className="text-xs font-mono opacity-60">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button 
          onClick={disconnectWallet}
          className="p-2 rounded-full hover:bg-red-50 text-red-400 transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={connectWallet}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-squirrely-dark text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-squirrely-pink transition-all shadow-md active:scale-95 disabled:opacity-50"
    >
      {isConnecting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4" />
      )}
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
