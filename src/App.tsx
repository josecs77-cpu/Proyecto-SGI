import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './shared/layouts/MainLayout.js';
import SchoolsView from './features/schools/SchoolsView.js';
import StaffView from './features/staff/StaffView.js';
import PersonalView from './features/staff/components/PersonalView.js';
import { DashboardView } from './features/dashboard/DashboardView.js';
import { GeoMapView } from './features/geo-map/GeoMapView.js';
import DashboardAIInsights from './features/ai-insights/components/DashboardAIInsights.js';
import CuadraturaView from './features/cuadratura/components/CuadraturaView.js';
import EnrollmentView from './features/enrollment/EnrollmentView.js';
import 'leaflet/dist/leaflet.css';
import BienesManager from './features/infrastructure/components/BienesManager.js';
import CnaeManager from './features/infrastructure/components/CnaeManager.js';
import FedeManager from './features/infrastructure/components/FedeManager.js';
import FundabitManager from './features/infrastructure/components/FundabitManager.js';
import MantenimientoManager from './features/system/components/MantenimientoManager.js';
import UsuariosManager from './features/system/components/UsuariosManager.js';

const App: React.FC = () => {
  return (
    <MainLayout>
      <div className="h-full w-full">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/schools" element={<SchoolsView />} />
          <Route path="/staff" element={<StaffView />} />
          <Route path="/personal" element={<PersonalView />} />
          <Route path="/map" element={<GeoMapView />} />
          <Route path="/ai-insights" element={<DashboardAIInsights systemContext="Sistema global" />} />
          <Route path="/cuadratura" element={<CuadraturaView />} />
          <Route path="/matricula" element={<EnrollmentView />} />

          <Route path="/bienes" element={<BienesManager planteles={[]} bienesList={[]} onSaveBienes={() => {}} onDeleteBienes={() => {}} />} />
          <Route path="/cnae" element={<CnaeManager planteles={[]} cnaeList={[]} onSaveCnae={() => {}} onDeleteCnae={() => {}} />} />
          <Route path="/fede" element={<FedeManager planteles={[]} fedeList={[]} onSaveFede={() => {}} onDeleteFede={() => {}} />} />
          <Route path="/fundabit" element={<FundabitManager planteles={[]} fundabitList={[]} onSaveFundabit={() => {}} onDeleteFundabit={() => {}} />} />
          <Route path="/mantenimiento" element={<MantenimientoManager onRefreshData={async () => {}} serverUrl={''} isOnline={true} allData={{}} onLogoChange={() => {}} onBannerChange={() => {}} onCriteriaChange={() => {}} onAiEnabledChange={() => {}} onChatbotChange={() => {}} onSelfRegisterChange={() => {}} onStateNameChange={() => {}} onBulkImport={async () => {}} onPurgeAsistencia={async () => {}} onHardReset={async () => {}} />} />
          <Route path="/usuarios" element={<UsuariosManager currentUser={{id: 1, role: 'ADMIN'} as any} users={[]} planteles={[]} onSaveUser={() => {}} onDeleteUser={() => {}} />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default App;
