import Link from "next/link";
import { Sprout, Mail, Globe, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-12 lg:col-span-5">
            <Link href="/" className="flex items-center space-x-2.5 mb-6 group w-fit">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <Sprout className="h-6 w-6" />
              </div>
              <span className="font-outfit font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                Herb<span className="text-emerald-600 dark:text-emerald-400">Nexus</span>
              </span>
            </Link>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-md leading-relaxed">
              An advanced AI-Powered Botanical Intelligence & Conservation Platform.
              Empowering communities, researchers, and authorities to identify, track, and protect vulnerable biodiversity.
            </p>
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-7">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-5 tracking-wide text-sm uppercase">Platform</h3>
            <ul className="space-y-3.5">
              <li><Link href="/species" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">Species Explorer</Link></li>
              <li><Link href="/map" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">Intelligence Map</Link></li>
              <li><Link href="/observations/new" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">Submit Data</Link></li>
              <li><Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">About Project</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-5 tracking-wide text-sm uppercase">Legal</h3>
            <ul className="space-y-3.5">
              <li><Link href="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">Terms of Service</Link></li>
              <li><Link href="/data-policy" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">Data Use Policy</Link></li>
              <li><Link href="/security" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium">Security</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-5 tracking-wide text-sm uppercase">Notice</h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong className="text-slate-700 dark:text-slate-300 block mb-1">Scientific Disclaimer</strong> 
                Data and AI predictions are preliminary. Observation trends do not represent population estimates. Always consult official assessments.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} HerbNexus. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for conservation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
