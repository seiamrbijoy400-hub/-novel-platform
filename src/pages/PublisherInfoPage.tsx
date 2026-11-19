import React from 'react';
import { MOCK_PROVIDERS } from '../data/mockProviders';
import { ShieldCheck, Server, Globe2, Key, CheckCircle2, XCircle } from 'lucide-react';

export const PublisherInfoPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b-2 border-stone-900 dark:border-stone-200 pb-6 pt-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-lime text-stone-900 bg-lime px-2 py-0.5 rounded w-max uppercase mb-2">
          <Server className="w-3.5 h-3.5" />
          <span>Distributor Integrations & Sourcing</span>
        </div>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-2">
          Authorized Content Providers
        </h1>
        <p className="text-sm text-stone-900/70 dark:text-stone-100/70 max-w-2xl">
          Novela Global does not scrape websites or assume full-text rights from metadata search results. Every readable novel is ingested through vetted commercial distribution feeds or direct creator contracts.
        </p>
      </div>

      {/* Providers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PROVIDERS.map((prov) => (
          <div
            key={prov.id}
            className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet-700">
                  Code: {prov.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-stone-900 uppercase ${
                  prov.apiHealthStatus === 'healthy' ? 'bg-green-300 text-green-900' : 'bg-yellow-200 text-yellow-900'
                }`}>
                  {prov.apiHealthStatus}
                </span>
              </div>

              <h3 className="font-sans font-bold text-xl text-stone-900 dark:text-stone-100 mb-2">
                {prov.name}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-stone-200 dark:border-stone-700">
                  <span className="opacity-70">Integration Type</span>
                  <span className="font-mono font-bold capitalize">{prov.type.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-200 dark:border-stone-700">
                  <span className="opacity-70">Full-Text In-Browser Reading</span>
                  <span className="flex items-center gap-1 font-bold">
                    {prov.capabilities.providesFullText ? (
                      <span className="text-green-600 dark:text-lime flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Authorized
                      </span>
                    ) : (
                      <span className="text-electric-coral flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Metadata Only
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-200 dark:border-stone-700">
                  <span className="opacity-70">Supported Languages</span>
                  <span className="font-mono font-bold uppercase">
                    {prov.capabilities.supportedLanguages.slice(0, 5).join(', ')}...
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-200 dark:border-stone-700">
                  <span className="opacity-70">DRM Security Standard</span>
                  <span className="font-mono">{prov.capabilities.drmType || 'Direct Streaming Token'}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="opacity-70">Titles Indexed</span>
                  <span className="font-mono font-bold">{prov.totalBooksIndexed.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-700 text-[11px] font-mono text-stone-900/60 dark:text-stone-100/60 flex items-center justify-between">
              <span>Last Synced: {new Date(prov.lastSyncedAt).toLocaleDateString()}</span>
              <span className="text-lime font-bold">Adapter Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
