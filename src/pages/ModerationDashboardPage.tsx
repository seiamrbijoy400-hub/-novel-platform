import React, { useState } from 'react';
import { INITIAL_MODERATION_QUEUE, INITIAL_MODERATION_REPORTS } from '../services/moderationEngine';
import { Button } from '../components/ui/Button';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Flag, Eye, FileSearch } from 'lucide-react';

export const ModerationDashboardPage: React.FC = () => {
  const [queue, setQueue] = useState(INITIAL_MODERATION_QUEUE);
  const [reports, setReports] = useState(INITIAL_MODERATION_REPORTS);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleApprove = (id: string, title: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    setStatusMessage(`Approved "${title}". Title published to active catalog with General Audience rating.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleReject = (id: string, title: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    setStatusMessage(`Rejected & Quarantined "${title}" due to content policy non-compliance.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleResolveReport = (reportId: string) => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, resolved: true, resolutionNote: 'Reviewed and closed by administrator.' } : r))
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b-2 border-stone-900 dark:border-stone-200 pb-6 pt-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-electric-coral uppercase mb-2">
          <Shield className="w-4 h-4" />
          <span>Strict Content Governance & Policy Desk</span>
        </div>
        <h1 className="font-sans font-extrabold text-3xl text-stone-900 dark:text-stone-100 mb-2">
          5-Tier Content Moderation Desk
        </h1>
        <p className="text-sm text-stone-900/70 dark:text-stone-100/70 max-w-2xl">
          Automated and human inspection preventing pornography, explicit erotica, and sexually graphic novels from entering the library while approving genuine romance and literary fiction.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-lime text-stone-900 border-2 border-stone-900 rounded-xl text-xs font-bold shadow-sm animate-bounce">
          {statusMessage}
        </div>
      )}

      {/* 5-Tier Architecture Infographic */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-mono">
        {[
          { tier: 'Tier 1', name: 'Metadata & BISAC', desc: 'Auto-rejects FIC005000 / ONIX 01 adult flags' },
          { tier: 'Tier 2', name: 'Lexical Scanner', desc: 'Screens titles & sample text against multi-lingual explicit tokens' },
          { tier: 'Tier 3', name: 'AI / NLP Classifier', desc: 'Separates genuine romance from explicit sexual stimulation' },
          { tier: 'Tier 4', name: 'Human Desk Queue', desc: 'Manual review for borderline confidence scores (50–94%)' },
          { tier: 'Tier 5', name: 'Community Reports', desc: '3 user flags auto-quarantines pending staff re-audit' },
        ].map((t, idx) => (
          <div key={idx} className="p-3 rounded-xl border-2 border-stone-900 bg-white dark:bg-stone-800 shadow-sm">
            <span className="font-bold text-violet-700 block mb-0.5">{t.tier}</span>
            <span className="font-bold font-sans text-xs block mb-1">{t.name}</span>
            <span className="text-[10px] opacity-70 block leading-tight">{t.desc}</span>
          </div>
        ))}
      </div>

      {/* Human Review Queue (Tier 4) */}
      <div className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
          <h2 className="font-sans font-bold text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-electric-coral" />
            <span>Pending Moderation Queue ({queue.length})</span>
          </h2>
          <span className="text-xs font-mono font-bold opacity-60">Human Clearance Required</span>
        </div>

        {queue.length > 0 ? (
          <div className="space-y-4">
            {queue.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-xl border-2 border-stone-900 bg-stone-50 dark:bg-stone-950 flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-sans font-bold text-base">{item.title}</span>
                    <span className="text-xs opacity-75">by {item.author}</span>
                    <span className="text-[10px] font-mono font-bold bg-stone-100 dark:bg-stone-100 px-2 py-0.5 rounded uppercase">
                      Lang: {item.language.toUpperCase()} · Provider: {item.provider}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-electric-coral font-bold flex items-center gap-1.5">
                    <Flag className="w-3.5 h-3.5" />
                    <span>Flagged: {item.flaggedReason} (NLP Confidence: {(item.confidenceScore * 100).toFixed(0)}%)</span>
                  </div>

                  <div className="p-3 bg-white dark:bg-stone-800 border rounded-lg text-xs italic font-serif leading-relaxed">
                    "{item.sampleSnippet}"
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleApprove(item.id, item.title)}
                    className="px-4 py-2 bg-lime text-stone-900 border-2 border-stone-900 rounded-xl font-bold text-xs shadow-sm hover:scale-105 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Title</span>
                  </button>
                  <button
                    onClick={() => handleReject(item.id, item.title)}
                    className="px-4 py-2 bg-electric-coral text-white border-2 border-stone-900 rounded-xl font-bold text-xs shadow-sm hover:scale-105 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject / Quarantine</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs font-mono font-bold text-green-600 dark:text-lime">
            ✓ Moderation queue clear. Zero pending uncertain titles.
          </div>
        )}
      </div>

      {/* User Community Reports (Tier 5) */}
      <div className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
          <h2 className="font-sans font-bold text-lg flex items-center gap-2">
            <Flag className="w-5 h-5 text-violet-700" />
            <span>Community Content & Quality Reports</span>
          </h2>
          <span className="text-xs font-mono font-bold opacity-60">{reports.length} Reports</span>
        </div>

        <div className="space-y-3">
          {reports.map(rep => (
            <div
              key={rep.id}
              className="p-4 rounded-xl border border-stone-900/40 bg-stone-50 dark:bg-stone-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-sm block">{rep.bookTitle} ({rep.authorName})</span>
                <span className="font-mono text-electric-coral block mb-1">Reason: {rep.reason.replace('_', ' ').toUpperCase()}</span>
                <p className="opacity-80">"{rep.details}"</p>
                {rep.resolutionNote && (
                  <p className="text-green-600 dark:text-lime text-[11px] font-mono mt-1 font-bold">
                    ✓ Resolution: {rep.resolutionNote}
                  </p>
                )}
              </div>

              {!rep.resolved && (
                <button
                  onClick={() => handleResolveReport(rep.id)}
                  className="px-3 py-1.5 rounded-lg border-2 border-stone-900 bg-lime text-stone-900 font-bold text-xs flex-shrink-0"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
