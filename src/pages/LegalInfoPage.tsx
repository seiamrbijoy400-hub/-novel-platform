import React, { useState } from 'react';
import { ShieldCheck, Scale, Mail, Info, FileText } from 'lucide-react';

export const LegalInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'privacy' | 'terms'>('about');

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-stone-900 dark:border-stone-200 pb-6 pt-4">
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-4">
          Governance, Terms & Legal Compliance
        </h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'about', label: 'About Novela Global', icon: Info },
            { id: 'contact', label: 'Contact & Publisher Partnerships', icon: Mail },
            { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
            { id: 'terms', label: 'Terms & Copyright DMCA', icon: Scale },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl border-2 text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-lime border-stone-900 text-stone-900 shadow-sm'
                    : 'bg-white dark:bg-stone-800 border-stone-900 dark:border-stone-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-sm leading-relaxed">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <h2 className="font-sans font-bold text-2xl text-stone-900 dark:text-stone-100">
              The Ethical Multilingual Digital Reading Platform
            </h2>
            <p>
              Novela Global was founded to solve the core fragmentation of digital literature. While millions of readers around the world seek novels in their native tongues—from Bengali and Arabic to Hindi, Spanish, Urdu, and Japanese—existing platforms frequently offer either paywalled micro-chapters, incomplete samples disguised as full books, or unlicensed copies.
            </p>
            <p>
              Our platform adheres to three uncompromising pillars:
            </p>
            <ol className="list-decimal pl-5 space-y-2 font-medium">
              <li><strong>100% Complete & Authorized</strong>: We never misrepresent a preview excerpt as a full book. When a title is marked as readable, readers enjoy the complete journey from page 1 to the end.</li>
              <li><strong>Zero Pornography & Explicit Erotica</strong>: We enforce a 5-tier defense-in-depth moderation pipeline protecting our readers from graphic sexual publications while celebrating emotional romance, drama, and speculative fiction.</li>
              <li><strong>Native Bidirectional Typography</strong>: Literature deserves authentic presentation. Our custom reader natively supports Right-to-Left (RTL) text flow for Arabic and Urdu, alongside complex conjunct ligature rendering for Indic scripts.</li>
            </ol>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h2 className="font-sans font-bold text-2xl text-stone-900 dark:text-stone-100">
              Publisher Partnerships & Author Ingestion
            </h2>
            <p>
              Are you an independent author, digital distributor, or traditional publisher with completed fiction novels published from 2000 to the present? We invite you to join our authorized distributor network.
            </p>
            <div className="p-4 rounded-xl border-2 border-stone-900 bg-stone-50 dark:bg-stone-950 text-xs font-mono space-y-2">
              <div><strong>Publisher Relations:</strong> publishers@novela.global</div>
              <div><strong>Rights & Licensing Verification:</strong> rights@novela.global</div>
              <div><strong>API Integration Support:</strong> dev@novela.global</div>
              <div><strong>Global Headquarters:</strong> Novela Global Inc., 100 Montgomery St, San Francisco, CA</div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-sans font-bold text-2xl text-stone-900 dark:text-stone-100">
              Privacy Transparency & Reader Confidentiality
            </h2>
            <p>
              Novela Global does not sell reader data to data brokers or third-party ad networks. We collect only the minimum telemetry necessary to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Synchronize your reading progress and bookmarks across devices.</li>
              <li>Verify territorial copyright entitlements using privacy-preserving IP geo-lookup.</li>
              <li>Aggregate anonymous readership metrics for author royalty reporting.</li>
            </ul>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-sans font-bold text-2xl text-stone-900 dark:text-stone-100">
              Terms of Service & Copyright Integrity (DMCA)
            </h2>
            <p>
              All literature displayed on Novela Global is protected under international copyright conventions (Berne Convention, WIPO Copyright Treaty). Reproduction, commercial re-distribution, or programmatic scraping of encrypted text streams is strictly prohibited.
            </p>
            <h3 className="font-bold text-base mt-4">Designated DMCA Agent</h3>
            <p className="text-xs">
              If you believe a book in our catalog infringes your copyright or lacks appropriate distributor authorization, please contact our Designated Copyright Agent at <code>dmca@novela.global</code> with proof of ownership and the book ID. Takedown notices are audited within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
