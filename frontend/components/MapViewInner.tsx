"use client";

import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  color?: string;
  popup?: React.ReactNode;
  properties?: Record<string, unknown>;
}

interface MapViewProps {
  center: [number, number];
  zoom: number;
  markers?: MarkerData[];
  className?: string;
  onMarkerClick?: (marker: MarkerData) => void;
}

export function MapView({ center, zoom, markers = [], className = '', onMarkerClick }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: process.env.NEXT_PUBLIC_MAP_STYLE_URL || 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: center,
        zoom: zoom,
      });
      
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    } else {
      map.current.setCenter(center);
      map.current.setZoom(zoom);
    }

    // Cleanup function
    return () => {
      // Don't completely destroy map on every render to avoid flashing,
      // just clean up on unmount.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Handle center/zoom updates
  useEffect(() => {
    if (map.current) {
      map.current.flyTo({ center, zoom });
    }
  }, [center, zoom]);

  // Handle markers updates
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundColor = markerData.color || '#10b981';
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';

      const m = new maplibregl.Marker(el)
        .setLngLat([markerData.lng, markerData.lat])
        .addTo(map.current!);
      
      if (markerData.popup) {
        // Simple text popup if string, otherwise handled by click event
        if (typeof markerData.popup === 'string') {
          const popup = new maplibregl.Popup({ offset: 25 }).setHTML(markerData.popup);
          m.setPopup(popup);
        }
      }
      
      el.addEventListener('click', (e) => {
        if (onMarkerClick) {
           e.stopPropagation(); // Prevent map click
           onMarkerClick(markerData);
        }
      });

      markersRef.current.push(m);
    });

  }, [markers, onMarkerClick]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapContainer} className={`w-full h-full rounded-md ${className}`} />
  );
}
