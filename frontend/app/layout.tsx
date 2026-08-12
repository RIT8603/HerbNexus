import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'HerbNexus — AI-Powered Botanical Intelligence & Conservation Platform',
  description: 'Identify. Verify. Track. Protect. Comprehensive conservation platform for vulnerable plant species.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-50`}>
        <AuthProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 w-full flex flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
