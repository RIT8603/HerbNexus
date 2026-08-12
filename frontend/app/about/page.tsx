import { ScientificDisclaimer } from "@/components/ScientificDisclaimer";
import { Leaf, Target, Map as MapIcon, Users, Microscope, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-outfit mb-8 text-center">About HerbNexus</h1>
      
      <section className="mb-12 text-lg text-muted-foreground leading-relaxed">
        <p className="mb-4">
          HerbNexus is a comprehensive, AI-powered botanical intelligence and conservation platform designed to monitor and protect vulnerable plant species globally. By integrating crowd-sourced citizen science with advanced artificial intelligence and rigorous expert verification, we aim to build a robust dataset for conservation action.
        </p>
        <p>
          Our platform addresses the critical intersection of biodiversity loss and high medicinal demand, identifying species that are most at risk of over-harvesting and providing actionable intelligence to researchers and conservation authorities.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Target className="text-emerald-600"/> Our Mission</h2>
        <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900">
          <p className="italic text-emerald-800 dark:text-emerald-300 font-medium text-lg">
            &quot;To safeguard botanical biodiversity by transforming observations into verifiable conservation intelligence, ensuring that vulnerable species are protected from over-harvesting through informed policy and sustainable practices.&quot;
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        <div className="space-y-6">
          {[
             { title: "1. Crowd-Sourced Observation", icon: Users, desc: "Observers submit plant photos and metadata from the field." },
             { title: "2. AI Identification", icon: Microscope, desc: "Our machine learning models provide rapid, preliminary species identification." },
             { title: "3. Expert Verification", icon: Shield, desc: "Qualified botanists review and verify the AI suggestions." },
             { title: "4. GIS Monitoring", icon: MapIcon, desc: "Spatial data is mapped to monitor population distributions and threats." },
             { title: "5. Conservation Action", icon: Leaf, desc: "Authorities use the data to protect habitats and guide cultivation policies." }
          ].map((step, i) => (
             <div key={i} className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
               <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                 <step.icon className="h-6 w-6 text-emerald-600" />
               </div>
               <div>
                 <h3 className="font-semibold text-lg">{step.title}</h3>
                 <p className="text-muted-foreground">{step.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Scientific Integrity & Data Protection</h2>
        <ScientificDisclaimer />
      </section>
    </div>
  );
}
