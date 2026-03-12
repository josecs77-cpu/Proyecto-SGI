import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './shared/layouts/MainLayout.js';
import SchoolsView from './features/schools/SchoolsView.js';
import StaffView from './features/staff/StaffView.js';
import PersonalView from './features/staff/components/PersonalView.js';
import { DashboardView } from './features/dashboard/DashboardView.js';
import { GeoMapView } from './features/geo-map/GeoMapView.js';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <MainLayout>
      <div className="h-full p-4 md:p-8 overflow-hidden">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/schools" element={<SchoolsView />} />
          <Route path="/staff" element={<StaffView />} />
          <Route path="/personal" element={<PersonalView />} />
          <Route path="/map" element={<GeoMapView />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default App;
