import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, X, Crosshair } from 'lucide-react';

interface MapPickerProps {
  initialLat?: string;
  initialLng?: string;
  onConfirm: (lat: string, lng: string) => void;
  onClose: () => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ initialLat, initialLng, onConfirm, onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerInstance = useRef<L.Marker | null>(null);

  const [mapLayerType, setMapLayerType] = useState<'standard' | 'satellite'>('standard');
  const [tempCoords, setTempCoords] = useState<{lat: string, lng: string} | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const parseCoord = (val: any, def: number) => {
        const n = parseFloat(val);
        return (isNaN(n) || n === 0) ? def : n;
      };

      const lat = parseCoord(initialLat, 9.15);
      const lng = parseCoord(initialLng, -64.3);

      setTempCoords({ lat: lat.toString(), lng: lng.toString() });

      mapInstance.current = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: initialLat && parseFloat(initialLat) !== 0 ? 15 : 9,
        zoomControl: false,
        preferCanvas: true
      });

      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

      if (initialLat && parseFloat(initialLat) !== 0) {
        markerInstance.current = L.marker([lat, lng]).addTo(mapInstance.current);
      }

      mapInstance.current.on('click', (e) => {
        const nLat = e.latlng.lat.toFixed(6);
        const nLng = e.latlng.lng.toFixed(6);
        setTempCoords({ lat: nLat, lng: nLng });

        if (markerInstance.current) {
          markerInstance.current.setLatLng(e.latlng);
        } else {
          markerInstance.current = L.marker(e.latlng).addTo(mapInstance.current!);
        }
      });

      setTimeout(() => {
        if (mapInstance.current) mapInstance.current.invalidateSize();
      }, 500);
    }

    if (mapInstance.current) {
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) mapInstance.current?.removeLayer(layer);
      });

      if (mapLayerType === 'satellite') {
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Esri Satellite',
          maxZoom: 18
        }).addTo(mapInstance.current);
      } else {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19
        }).addTo(mapInstance.current);
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.off();
        mapInstance.current.remove();
        mapInstance.current = null;
        markerInstance.current = null;
      }
    };
  }, [initialLat, initialLng, mapLayerType]);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in border-4 border-white/20">
        <div className="bg-[#003399] p-6 flex justify-between items-center text-white shrink-0 relative">
          <div className="flex items-center gap-4">
            <MapPin size={24} className="text-yellow-400"/>
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter">Geolocalización Satelital</h3>
              <p className="text-[10px] uppercase font-bold text-blue-200 tracking-widest">Haga clic en el mapa para fijar el punto exacto</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMapLayerType('standard')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mapLayerType === 'standard' ? 'bg-white text-[#003399]' : 'bg-white/10 text-white hover:bg-white/20'}`}>Plano</button>
            <button onClick={() => setMapLayerType('satellite')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mapLayerType === 'satellite' ? 'bg-white text-[#003399]' : 'bg-white/10 text-white hover:bg-white/20'}`}>Satélite</button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all ml-4"><X size={24}/></button>
        </div>

        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full z-0"></div>

          {tempCoords && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] animate-in slide-in-from-bottom-10">
              <button
                onClick={() => onConfirm(tempCoords.lat, tempCoords.lng)}
                className="bg-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-700 hover:scale-105 transition-all flex items-center gap-3 border-4 border-white"
              >
                <Crosshair size={20}/> Confirmar Ubicación
              </button>
            </div>
          )}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-xl border border-white z-[1000] text-center">
            <p className="text-[10px] font-black text-[#003399] uppercase tracking-widest">
              {tempCoords ? `${tempCoords.lat}, ${tempCoords.lng}` : 'SELECCIONE UN PUNTO'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPicker;
