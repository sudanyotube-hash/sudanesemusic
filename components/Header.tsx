import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';

export const Header: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window as any).navigator.standalone;

    if (isIOS && !isStandalone) {
      setShowIOSHint(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <header className="py-6 px-4 md:px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-red-600 to-red-500 rounded-xl shadow-lg shadow-red-900/20">
            <Icons.Youtube className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TubeBooster AI
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">أرشفة الأغاني السودانية</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 animate-pulse"
            >
              <Icons.Download className="w-4 h-4" />
              <span>تثبيت التطبيق</span>
            </button>
          )}

          {/* iOS Install Hint for Mobile */}
          {showIOSHint && (
            <button
              onClick={() => alert("للتثبيت على الآيفون:\n1. اضغط على زر المشاركة (Share) في المتصفح\n2. اختر 'إضافة إلى الشاشة الرئيسية' (Add to Home Screen)")}
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 text-indigo-400 text-xs font-bold"
            >
              <Icons.Download className="w-4 h-4" />
              <span>تثبيت</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-400">
            <Icons.Sparkles className="w-4 h-4 text-yellow-500" />
            <span>مدعوم بـ Gemini 2.5</span>
          </div>
        </div>
      </div>
    </header>
  );
};