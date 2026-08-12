"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Shield, Map as MapIcon, Microscope, Users, Sparkles, Activity, Globe, Database, Sprout, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-slate-950 text-white">
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" opacity-20 />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Next-Gen Botanical Intelligence Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-outfit font-bold tracking-tight mb-8 leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Identify. Verify.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Track. Protect.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Empowering global conservation through AI-driven species verification, real-time GIS tracking, and collaborative intelligence to protect our planet&apos;s most vulnerable flora.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
              <Link href="/observations/new" className="group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 h-14 px-8 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 w-full sm:w-auto overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Launch Console <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </Link>
              <Link href="/map" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium bg-slate-900/50 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 hover:text-white h-14 px-8 transition-all duration-300 backdrop-blur-md w-full sm:w-auto">
                Explore Live Map <MapIcon className="h-5 w-5 opacity-70" />
              </Link>
            </div>
          </div>

          {/* Premium Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mt-24">
            {[
              { label: "Species Monitored", value: "847+", icon: Sprout },
              { label: "Verified Data Points", value: "12.4k", icon: Database },
              { label: "Active Researchers", value: "234", icon: Users },
              { label: "High Priority Zones", value: "156", icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm relative group overflow-hidden transition-all duration-300 hover:bg-slate-800/50 hover:border-emerald-500/30">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className="h-6 w-6 text-emerald-500/70 mb-4 group-hover:text-emerald-400 transition-colors" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-outfit tracking-tight">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-400 font-medium tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10" />
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase mb-3">Intelligence Pipeline</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-outfit text-slate-900 dark:text-white mb-6">From Field to Action</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">A robust, scalable pipeline transforming raw field observations into actionable conservation intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            {/* Desktop Connecting Line */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-emerald-500/10 via-emerald-500/30 to-emerald-500/10 z-0" />
            
            {[
              { icon: Users, title: "1. Data Acquisition", desc: "Citizen scientists and ecologists submit geolocated imagery and morphological data via mobile interfaces." },
              { icon: Microscope, title: "2. AI & Peer Verification", desc: "Computer vision models provide immediate taxonomy probabilities, followed by expert human validation." },
              { icon: Shield, title: "3. Conservation Strategy", desc: "Authorities receive sanitized, high-fidelity data to inform habitat protection and anti-poaching efforts." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group">
                <div className="h-24 w-24 rounded-2xl bg-white dark:bg-slate-900 shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 transform group-hover:-translate-y-2 transition-all duration-300 ring-4 ring-slate-50 dark:ring-slate-950">
                  <step.icon className="h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-center">{step.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-center leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities - Bento Grid */}
      <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase mb-3">Platform Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-outfit text-slate-900 dark:text-white mb-6">Enterprise-Grade Capabilities</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 rounded-3xl bg-slate-50 dark:bg-slate-950 p-8 md:p-10 border border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
              <Activity className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-6" />
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Real-Time GIS Mapping</h4>
              <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                Visualize species distribution, threat heatmaps, and conservation zones with our high-performance interactive mapping engine powered by WebGL.
              </p>
              <div className="absolute bottom-8 right-8 text-emerald-600 dark:text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ChevronRight className="h-6 w-6" />
              </div>
            </div>

            {/* Feature 2 - Small */}
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10 border border-slate-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
              <Microscope className="h-8 w-8 text-emerald-400 mb-6" />
              <h4 className="text-xl font-bold mb-4">AI Vision Models</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                State-of-the-art CNNs trained on millions of botanical specimens for instant preliminary identification.
              </p>
            </div>

            {/* Feature 3 - Small */}
            <div className="rounded-3xl bg-emerald-950 text-white p-8 md:p-10 border border-emerald-900/50 relative overflow-hidden group">
              <Shield className="h-8 w-8 text-emerald-400 mb-6" />
              <h4 className="text-xl font-bold mb-4">Data Obfuscation</h4>
              <p className="text-emerald-200/70 text-sm leading-relaxed">
                Automatic coordinate blurring for endangered species to prevent poaching and unethical wild harvesting.
              </p>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 rounded-3xl bg-slate-50 dark:bg-slate-950 p-8 md:p-10 border border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden group">
              <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-6" />
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Role-Based Workspaces</h4>
              <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                Tailored dashboards for citizen scientists, verified taxonomists, and government authorities, ensuring data integrity and strict access control.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Medicinal Demand & Conservation Impact Section */}
      <section className="py-32 bg-slate-950 text-slate-50 relative overflow-hidden">
        {/* Abstract background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                Critical Mission
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 leading-tight">
                Combating the <br/><span className="text-emerald-400">Over-harvesting</span> Crisis
              </h2>
              
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Many rare plant species face intense pressure from wild-harvesting for commercial and medicinal use. Unsustainable collection is now a primary driver of botanical biodiversity loss globally.
              </p>
              
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                HerbNexus actively identifies high-demand vulnerable species and promotes <strong className="text-slate-200">controlled propagation research</strong> as the primary sustainable alternative to wild collection.
              </p>
              
              <Link href="/conservation/strategies" className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-white h-12 px-6 transition-colors">
                Read our Conservation Manifesto
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent z-10" />
              <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden transform lg:translate-x-12">
                 <div className="absolute -top-12 -right-12 p-4 opacity-5 transform rotate-12">
                   <Leaf className="h-64 w-64 text-white" />
                 </div>
                 
                 <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                       <Shield className="h-5 w-5"/>
                     </div>
                     <h3 className="font-semibold text-xl text-white">Zero Exploitation Policy</h3>
                   </div>
                   
                   <p className="text-slate-400 mb-8 leading-relaxed">
                     To prevent exploitation, exact coordinates of rare and endangered species are automatically blurred by up to 25km radius for public users. Only authorized government authorities can access raw geolocation data.
                   </p>
                   
                   <div className="bg-emerald-950/50 p-5 rounded-xl border border-emerald-900/50 flex gap-4 items-start">
                      <Leaf className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-emerald-300 mb-1">HerbNexus Commitment</h4>
                        <p className="text-sm text-emerald-200/70">We strictly prohibit the use of our platform data to facilitate wild harvesting of sensitive species for any commercial purposes.</p>
                      </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
