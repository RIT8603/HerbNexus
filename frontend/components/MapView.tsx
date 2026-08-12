import dynamic from 'next/dynamic';

export const MapView = dynamic(
  () => import('./MapViewInner').then((mod) => mod.MapView),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md" /> }
);
