import { useEffect, useRef } from 'react';
import { COLORS, UBICACION_FULL_ADVANCE } from '../constants';

const { latitude, longitude } = UBICACION_FULL_ADVANCE;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

export default function UbicacionMapa() {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      if (!document.querySelector('link[href*="leaflet@1.9"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      if (!(window as any).L) {
        await new Promise<void>((resolve, reject) => {
          if (document.querySelector('script[src*="leaflet@1.9"]')) { resolve(); return; }
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      if (cancelled || !divRef.current) return;
      const L = (window as any).L;
      const map = L.map(divRef.current, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
        keyboard: false,
      }).setView([latitude, longitude], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:${COLORS.primary};transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 22],
      });
      L.marker([latitude, longitude], { icon }).addTo(map);
      mapRef.current = map;
    }
    init().catch(() => {});
    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 220 }}>
      <div ref={divRef} style={{ width: '100%', height: '100%' }} />
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute', left: 12, bottom: 12, zIndex: 1000,
          background: '#fff', color: COLORS.primary, fontWeight: 800, fontSize: 12,
          padding: '8px 14px', borderRadius: 999, textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(0,0,0,.18)', display: 'inline-flex', alignItems: 'center', gap: 6,
        }}
      >
        Cómo llegar ↗
      </a>
    </div>
  );
}
