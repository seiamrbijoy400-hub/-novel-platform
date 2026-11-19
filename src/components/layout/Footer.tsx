import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-lime text-stone-950 font-bold flex items-center justify-center text-sm font-mono">
                N
              </div>
              <span className="font-serif font-bold text-lg text-white tracking-tight">NOVELA GLOBAL</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              A principled digital library dedicated to 100% complete, legally authorized novels in all world languages. No piracy. No truncated previews sold as full books.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-lime">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Source Rights Verified</span>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-3">
              Multilingual Discovery
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><Link to="/languages?lang=bn" className="hover:text-white transition-colors">বাংলা (Bengali)</Link></li>
              <li><Link to="/languages?lang=ar" className="hover:text-white transition-colors">العربية (Arabic — RTL)</Link></li>
              <li><Link to="/languages?lang=hi" className="hover:text-white transition-colors">हिन्दी (Hindi)</Link></li>
              <li><Link to="/languages?lang=ur" className="hover:text-white transition-colors">اردو (Urdu — RTL)</Link></li>
              <li><Link to="/languages?lang=es" className="hover:text-white transition-colors">Español (Spanish)</Link></li>
              <li><Link to="/languages?lang=zh" className="hover:text-white transition-colors">中文 (Chinese)</Link></li>
            </ul>
          </div>

          {/* Catalog & Governance */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-3">
              Platform & Governance
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><Link to="/explore" className="hover:text-white transition-colors">Complete Catalog (2000 – Present)</Link></li>
              <li><Link to="/moderation" className="hover:text-white transition-colors">5-Tier Content Moderation</Link></li>
              <li><Link to="/publishers" className="hover:text-white transition-colors">Provider Integrations</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Rights & License Desk</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-3">
              Legal & Compliance
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">DMCA & Rights Holder Portal</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Adult Content Exclusion Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-mono">
          <p>© 2026 Novela Global. All rights reserved. Powered by authenticated distributor feeds & authorized author agreements.</p>
          <div className="flex items-center gap-1.5 text-lime">
            <Scale className="w-3.5 h-3.5" />
            <span>Berne Convention Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
