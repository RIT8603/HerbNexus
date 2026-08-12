"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapView } from "@/components/MapView";
import { Upload, MapPin, CheckCircle, AlertTriangle, ChevronRight, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Alternative = { species: string; confidence: number };
type AiPrediction = { species: string; confidence: number; alternatives: Alternative[] };

export default function NewObservation() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    images: [] as File[],
    lat: 0,
    lng: 0,
    date: new Date().toISOString().split('T')[0],
    habitat: "",
    condition: "",
    count: "",
    height: "",
    flowering: "",
    notes: "",
    aiPrediction: null as AiPrediction | null
  });

  const [isIdentifying, setIsIdentifying] = useState(false);

  const nextStep = () => {
    if (step === 3) runAiIdentification();
    if (step < totalSteps) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const runAiIdentification = () => {
    setIsIdentifying(true);
    // Mock API call
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        aiPrediction: {
          species: "Panax quinquefolius",
          confidence: 82,
          alternatives: [
            { species: "Aralia nudicaulis", confidence: 12 },
            { species: "Panax trifolius", confidence: 6 }
          ]
        }
      }));
      setIsIdentifying(false);
    }, 2000);
  };

  const handleLocationDetect = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({ ...prev, lat: position.coords.latitude, lng: position.coords.longitude }));
      });
    }
  };

  return (
    <ProtectedRoute requiredRole="OBSERVER">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold font-outfit mb-2">Submit Observation</h1>
        <p className="text-muted-foreground mb-6">Contribute to the HerbNexus database. Ensure your photos are clear.</p>
        
        <Progress value={(step / totalSteps) * 100} className="h-2 mb-8" />

        <Card>
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold mb-4">Step 1: Upload Images</h2>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer flex flex-col items-center">
                  <Upload className="h-10 w-10 text-emerald-600 mb-2" />
                  <p className="font-medium">Drag & drop images here</p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse (Max 5 images)</p>
                  <input type="file" className="hidden" multiple accept="image/jpeg,image/png,image/webp" />
                </div>
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-sm">
                  <span>No images uploaded yet.</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Step 2: Location</h2>
                <Button onClick={handleLocationDetect} variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" /> Detect My Location
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Latitude</Label>
                    <Input type="number" value={formData.lat} onChange={e => setFormData(p => ({...p, lat: parseFloat(e.target.value)}))} />
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    <Input type="number" value={formData.lng} onChange={e => setFormData(p => ({...p, lng: parseFloat(e.target.value)}))} />
                  </div>
                </div>

                <div className="h-64 border rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
                  {/* MapView here in real usage, showing placeholder for now */}
                   {formData.lat !== 0 ? (
                      <MapView center={[formData.lng, formData.lat]} zoom={12} markers={[{id:'1', lat: formData.lat, lng: formData.lng}]} />
                   ) : (
                      <span className="text-muted-foreground">Map preview will appear once location is set.</span>
                   )}
                </div>
                <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                  Note: Location accuracy is vital. We will automatically obfuscate exact coordinates of sensitive species.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Step 3: Observation Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Habitat Type</Label>
                    <Select onValueChange={(v: string | null) => setFormData(p => ({...p, habitat: v || ""}))}>
                      <SelectTrigger><SelectValue placeholder="Select Habitat" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Forest">Forest</SelectItem>
                        <SelectItem value="Grassland">Grassland</SelectItem>
                        <SelectItem value="Wetland">Wetland</SelectItem>
                        <SelectItem value="Rocky">Rocky Outcrop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Plant Condition</Label>
                    <Select onValueChange={(v: string | null) => setFormData(p => ({...p, condition: v || ""}))}>
                      <SelectTrigger><SelectValue placeholder="Select Condition" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Healthy">Healthy</SelectItem>
                        <SelectItem value="Stressed">Stressed</SelectItem>
                        <SelectItem value="Damaged">Damaged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Flowering Status</Label>
                    <Select onValueChange={(v: string | null) => setFormData(p => ({...p, flowering: v || ""}))}>
                      <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetative">Vegetative</SelectItem>
                        <SelectItem value="Budding">Budding</SelectItem>
                        <SelectItem value="Flowering">Flowering</SelectItem>
                        <SelectItem value="Fruiting">Fruiting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Approximate Count</Label>
                    <Input type="number" placeholder="e.g. 5" value={formData.count} onChange={e => setFormData(p => ({...p, count: e.target.value}))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Height (cm)</Label>
                    <Input type="number" placeholder="e.g. 45" value={formData.height} onChange={e => setFormData(p => ({...p, height: e.target.value}))} />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label>Field Notes</Label>
                  <Textarea placeholder="Any other observations, surrounding threats, etc." value={formData.notes} onChange={e => setFormData(p => ({...p, notes: e.target.value}))} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Step 4: AI Identification</h2>
                
                {isIdentifying ? (
                  <div className="py-12">
                     <div className="relative mx-auto w-16 h-16 mb-6">
                        <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                     </div>
                    <p className="text-lg font-medium text-emerald-800 dark:text-emerald-400">Analyzing botanical features...</p>
                    <p className="text-sm text-muted-foreground mt-2">Running advanced ML models</p>
                  </div>
                ) : formData.aiPrediction ? (
                  <div className="text-left bg-card p-6 rounded-xl border border-border shadow-sm">
                    
                    <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-400 p-4 rounded-lg text-sm mb-6 flex flex-col gap-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                        <span>IMPORTANT: AI Identification is Preliminary</span>
                      </div>
                      <p className="ml-7 text-orange-700 dark:text-orange-300">This AI suggestion does not replace expert verification. Please ensure accurate field notes and location data. The record will remain marked as PENDING until reviewed by a qualified botanist.</p>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-3xl font-bold italic text-emerald-700 dark:text-emerald-400 font-outfit">{formData.aiPrediction.species}</h3>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mt-1">Primary Suggestion</p>
                      </div>
                      <div className="text-right bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-lg border border-emerald-100 dark:border-emerald-800">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{formData.aiPrediction.confidence}%</div>
                        <p className="text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-500">Confidence</p>
                      </div>
                    </div>
                    
                    <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8 mt-4">
                       <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{width: `${formData.aiPrediction.confidence}%`}}></div>
                    </div>

                    <h4 className="font-semibold text-sm mb-3 uppercase text-muted-foreground tracking-wide">Alternative Matches</h4>
                    <div className="space-y-3">
                      {formData.aiPrediction.alternatives.map((alt: Alternative, i: number) => (
                        <div key={i} className="flex justify-between text-sm items-center p-3 rounded-md bg-slate-50 dark:bg-slate-900 border border-border">
                          <span className="italic font-medium">{alt.species}</span>
                          <span className="text-muted-foreground font-mono">{alt.confidence}% match</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-center mb-6">Review & Submit</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                    <h3 className="font-semibold border-b pb-2 mb-3">Identification</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">AI Suggestion:</span> <span className="italic">{formData.aiPrediction?.species}</span></p>
                      <p><span className="text-muted-foreground">Confidence:</span> {formData.aiPrediction?.confidence}%</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                    <h3 className="font-semibold border-b pb-2 mb-3">Location & Time</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Date:</span> {formData.date}</p>
                      <p><span className="text-muted-foreground">Coordinates:</span> {formData.lat}, {formData.lng}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg">
                  <CheckCircle className="mr-2 h-5 w-5" /> Submit Observation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          {step < totalSteps && (
             <Button onClick={nextStep} className="bg-slate-800 text-white hover:bg-slate-700">
               Next <ChevronRight className="ml-1 h-4 w-4" />
             </Button>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
