import React, { useState } from 'react';
import { MOCK_PROVIDERS } from '../data/mockProviders';
import { MOCK_BOOKS } from '../data/mockBooks';
import { Button } from '../components/ui/Button';
import {
  Server,
  Key,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle2,
  XCircle,
  Database,
  Lock,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'providers' | 'licenses' | 'audit'>('providers');

  const toggleProvider = (id: string) => {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleSyncProvider = (code: string) => {
    setSyncFeedback(`Triggering sync for ${code.toUpperCase()} adapter...`);
    setTimeout(() => {
      setSyncFeedback(`Successfully synchronized 14 new book records from ${code.toUpperCase()}.`);
      setTimeout(() => setSyncFeedback(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b-2 border-stone-900 dark:border-stone-200 pb-6 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-lime text-stone-900 bg-lime px-2 py-0.5 rounded w-max uppercase mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Enterprise Administration</span>
          </div>
          <h1 className="font-sans font-extrabold text-3xl text-stone-900 dark:text-stone-100 mb-1">
            Publishing Rights & Provider Admin Desk
          </h1>
          <p className="text-xs text-stone-900/70 dark:text-stone-100/70">
            Monitor API distributor health, configure token credentials, inspect territorial licenses, and review audit logs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2">
          {(['providers', 'licenses', 'audit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl border-2 text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-lime border-stone-900 text-stone-900 shadow-sm'
                  : 'bg-white dark:bg-stone-800 border-stone-900 dark:border-stone-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {syncFeedback && (
        <div className="p-3 bg-lime text-stone-900 border-2 border-stone-900 rounded-xl text-xs font-bold shadow-sm animate-pulse">
          {syncFeedback}
        </div>
      )}

      {/* TAB 1: PROVIDERS & API CREDENTIALS */}
      {activeTab === 'providers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-sans font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Server className="w-5 h-5 text-violet-700" />
              <span>Configured Content Providers & Adapters</span>
            </h2>
            <Button variant="accent" size="sm">
              <PlusCircle className="w-4 h-4" />
              <span>Add New Provider Adapter</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map(prov => (
              <div
                key={prov.id}
                className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase text-violet-700">
                      {prov.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-stone-900 uppercase ${
                      prov.apiHealthStatus === 'healthy' ? 'bg-green-300 text-green-900' : 'bg-yellow-200 text-yellow-900'
                    }`}>
                      {prov.apiHealthStatus}
                    </span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                    <span>{prov.isActive ? 'Active' : 'Disabled'}</span>
                    <input
                      type="checkbox"
                      checked={prov.isActive}
                      onChange={() => toggleProvider(prov.id)}
                      className="accent-electric-lime"
                    />
                  </label>
                </div>

                <h3 className="font-sans font-bold text-lg">{prov.name}</h3>

                <div className="bg-stone-100 dark:bg-stone-950 p-3 rounded-xl border border-stone-900/30 text-xs font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="opacity-60">Credentials Token:</span>
                    <span>••••••••••••94f2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Full-Text Ingestion:</span>
                    <span className={prov.capabilities.providesFullText ? 'text-green-600 font-bold' : 'text-electric-coral'}>
                      {prov.capabilities.providesFullText ? 'Enabled' : 'Metadata Discovery Only'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Sync Frequency:</span>
                    <span>Every 6 Hours (Auto-Cron)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => handleSyncProvider(prov.code)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-stone-900 bg-stone-50 dark:bg-stone-100 hover:bg-lime hover:text-stone-900 text-xs font-bold transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Ingestion Feed Now</span>
                  </button>

                  <span className="text-[11px] font-mono opacity-60">
                    {prov.totalBooksIndexed} titles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE LICENSES & TERRITORIES */}
      {activeTab === 'licenses' && (
        <div className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
            <h3 className="font-sans font-bold text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-lime" />
              <span>Catalog Rights & Territorial Breakdown</span>
            </h3>
            <span className="text-xs font-mono font-bold opacity-60">{books.length} Active Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b-2 border-stone-900 dark:border-stone-300 font-mono uppercase text-stone-900/60 dark:text-stone-100/60">
                  <th className="py-2">Novel Title</th>
                  <th className="py-2">Source Distributor</th>
                  <th className="py-2">Language</th>
                  <th className="py-2">Access Type</th>
                  <th className="py-2">Allowed Territories</th>
                  <th className="py-2">Content Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vellum-200 dark:divide-vellum-700 font-mono">
                {books.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50 dark:hover:bg-stone-100/50">
                    <td className="py-3 font-sans font-bold">{b.title}</td>
                    <td className="py-3">{b.sourceProviderName}</td>
                    <td className="py-3 uppercase">{b.languageId}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        b.accessType === 'full_book' ? 'bg-lime text-stone-900' : 'bg-electric-coral text-white'
                      }`}>
                        {b.accessType}
                      </span>
                    </td>
                    <td className="py-3">{b.allowedTerritories.join(', ')}</td>
                    <td className="py-3 font-sans">{b.contentRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT TRAIL LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
            <h3 className="font-sans font-bold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-700" />
              <span>Immutable Licensing & Security Audit Log</span>
            </h3>
            <span className="text-xs font-mono font-bold text-lime">All Events Recorded</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { time: '2026-11-19 05:42:10 UTC', action: 'FEED_SYNC_COMPLETED', detail: 'Draft2Digital feed synced 1,420 items. 0 errors detected.' },
              { time: '2026-11-19 04:30:15 UTC', action: 'TERRITORY_RULE_UPDATED', detail: 'MaxMind GeoIP2 database updated to release 2026.11.' },
              { time: '2026-11-19 02:15:00 UTC', action: 'LICENSE_VERIFICATION_CHECK', detail: 'Verified 8/8 active distributor contracts; 0 expired contracts.' },
              { time: '2026-11-18 22:10:44 UTC', action: 'MODERATION_APPROVAL', detail: 'Novel "Echoes of Alexandria" cleared Tier 3 NLP inspection with 99% clean rating.' },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-stone-900/30 bg-stone-50 dark:bg-stone-950 flex flex-col sm:flex-row justify-between gap-1">
                <div>
                  <span className="text-violet-700 font-bold mr-2">[{log.action}]</span>
                  <span className="text-stone-900 dark:text-stone-100">{log.detail}</span>
                </div>
                <span className="opacity-60 text-[10px] whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
