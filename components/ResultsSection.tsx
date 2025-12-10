import React from 'react';
import { SeoResult } from '../types';
import { ResultCard } from './ResultCard';
import { Icons } from './Icons';

interface ResultsSectionProps {
  result: SeoResult;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Viral Titles */}
        <ResultCard
          title="عناوين فيروسية (High CTR)"
          icon={<Icons.Youtube className="w-6 h-6" />}
          content={result.titles}
          type="list"
          className="lg:col-span-2 border-indigo-500/20"
        />

        {/* SEO Strategy */}
        <ResultCard
          title="استراتيجية الخوارزمية"
          icon={<Icons.BrainCircuit className="w-6 h-6" />}
          content={result.strategy}
          type="text"
          className="bg-gradient-to-br from-slate-900 to-indigo-950/20"
        />

        {/* Thumbnail Ideas */}
        <ResultCard
          title="أفكار الصور المصغرة"
          icon={<Icons.Image className="w-6 h-6" />}
          content={result.thumbnailIdeas}
          type="list"
        />

        {/* Description */}
        <ResultCard
          title="الوصف المحسن (SEO Description)"
          icon={<Icons.Code className="w-6 h-6" />}
          content={result.description}
          type="text"
          className="lg:col-span-2"
        />

        {/* Tags */}
        <ResultCard
          title="الكلمات المفتاحية (Tags)"
          icon={<Icons.Tag className="w-6 h-6" />}
          content={result.tags}
          type="tags"
        />

        {/* Hashtags */}
        <ResultCard
          title="الهاشتاجات"
          icon={<Icons.Hash className="w-6 h-6" />}
          content={result.hashtags}
          type="tags"
        />

        {/* Schema Markup */}
        <ResultCard
          title="كود الأرشفة (Schema Markup)"
          icon={<Icons.Code className="w-6 h-6" />}
          content={result.schemaMarkup}
          type="code"
          className="lg:col-span-2"
        />
      </div>
      
      <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4 text-center">
        <p className="text-indigo-300 text-sm">
          💡 نصيحة: استخدم العناوين والأوصاف كما هي أو عدلها قليلاً لتناسب أسلوبك. نسخ الكود الأخير (Schema) يساعد جوجل في فهم محتوى الفيديو بسرعة.
        </p>
      </div>
    </div>
  );
};