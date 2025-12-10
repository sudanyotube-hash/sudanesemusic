import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { generateSeoData } from './services/gemini';
import { SeoResult, GenerationParams } from './types';
import { Icons } from './components/Icons';

export default function App() {
  const [result, setResult] = useState<SeoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleGenerate = async (params: GenerationParams) => {
    if (!isOnline) {
      setError('لا يوجد اتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateSeoData(params);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-[20%] w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {!isOnline && (
          <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-bold animate-pulse">
            ⚠️ لا يوجد اتصال بالإنترنت. التطبيق يعمل في وضع عدم الاتصال.
          </div>
        )}

        <main className="flex-grow px-4 md:px-8 py-10">
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              ارفع مشاهدات <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">الأغاني السودانية</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              أداة ذكية لأرشفة <strong>أغاني سودانية</strong>، حفلات، وكليبات. احصل على عناوين "ترند"، وصف احترافي، وكلمات مفتاحية تضمن لك الوصول لجمهورك.
            </p>
          </div>

          <InputSection onGenerate={handleGenerate} isLoading={loading} />

          {error && (
            <div className="max-w-2xl mx-auto bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-start gap-3 mb-8 animate-fade-in">
              <Icons.Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {result && <ResultsSection result={result} />}
        </main>
        
        <footer className="py-8 border-t border-slate-900 text-center text-slate-600 text-sm">
          <p dir="ltr">© {new Date().getFullYear()} اغاني سودانية | SudanYouTube</p>
        </footer>
      </div>
    </div>
  );
}