import React from 'react';
import { X, Calculator } from 'lucide-react';
import { RecommendationResult } from '../types/travel';

interface VectorMathModalProps {
  result: RecommendationResult | null;
  onClose: () => void;
}

export const VectorMathModal: React.FC<VectorMathModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  const { destination: dest, cosineSimilarity, matchScore, vectorBreakdown } = result;
  const dotProductSum = vectorBreakdown.reduce((sum, item) => sum + item.product, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden p-6 sm:p-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Vector Math Inspector: {dest.name}
              </h3>
              <p className="text-xs text-slate-400">
                Cosine Similarity Vector Breakdown for Academic & Viva Presentation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
          
          {/* Summary Box */}
          <div className="p-4 bg-slate-950 text-white rounded-2xl flex items-center justify-around text-center border border-slate-800">
            <div>
              <span className="text-[11px] text-teal-400 block font-semibold">Match Score</span>
              <span className="text-2xl font-black text-white">{matchScore}%</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[11px] text-teal-400 block font-semibold">Cosine Similarity</span>
              <span className="text-2xl font-mono font-bold text-teal-300">{cosineSimilarity}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[11px] text-teal-400 block font-semibold">Dot Product Sum (u · d)</span>
              <span className="text-2xl font-mono font-bold text-teal-300">{dotProductSum.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-teal-950/40 border border-teal-500/30 rounded-xl text-teal-300">
            <strong>Formula applied:</strong> <code className="font-mono">Cos(θ) = (∑ u_i × d_i) / (||u|| × ||d||)</code>
          </div>

          {/* Breakdown Table */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                  <th className="p-3">Feature Name</th>
                  <th className="p-3 text-center">User (u_i)</th>
                  <th className="p-3 text-center">{dest.name} (d_i)</th>
                  <th className="p-3 text-right">Product (u_i × d_i)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono text-slate-300">
                {vectorBreakdown.map((row, idx) => (
                  <tr key={idx} className={row.product > 0 ? 'bg-teal-950/20' : 'bg-transparent'}>
                    <td className="p-3 font-sans font-medium text-slate-200">{row.feature}</td>
                    <td className="p-3 text-center text-slate-400">{row.userValue}</td>
                    <td className="p-3 text-center text-slate-400">{row.destValue}</td>
                    <td className={`p-3 text-right font-bold ${row.product > 0 ? 'text-teal-400' : 'text-slate-600'}`}>
                      {row.product}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            * Features with non-zero products contribute positively to the alignment angle in Euclidean space.
          </p>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
