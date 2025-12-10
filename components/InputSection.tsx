import React, { useState } from 'react';
import { Icons } from './Icons';
import { GenerationParams } from '../types';

interface InputSectionProps {
  onGenerate: (params: GenerationParams) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    onGenerate({ topic, details, targetAudience });
  };

  return (
    <section className="w-full max-w-2xl mx-auto mb-12 animate-fade-in-up">
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50 backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Icons.Search className="w-6 h-6 text-indigo-400" />
          <span>بيانات العمل الفني</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">اسم الفنان / اسم الأغنية / الحفلة <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="مثال: جديد ندي القلعة 2025 - حفلة الرياض"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">تفاصيل العمل (كلمات، شاعر، ملحن، نوع الإيقاع)</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="اكتب مقطع من الكلمات، اسم الشاعر، أو نوع الموسيقى (زنق، سيرة، حقيبة، طرب)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[100px]"
            />
          </div>

           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">الجمهور المستهدف</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="مثال: الشباب، المغتربين، عشاق الطرب، ناس الزنق..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !topic}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                <span>جاري تحليل الترند السوداني...</span>
              </>
            ) : (
              <>
                <Icons.Rocket className="w-5 h-5" />
                <span>توليد خطة الأرشفة</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};