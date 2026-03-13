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

          <Route path="/bienes" element={<BienesManager planteles={[]} bienesList={[]} onSaveBienes={async () => {} as any} onDeleteBienes={() => {}} />} />
          <Route path="/cnae" element={<CnaeManager planteles={[]} cnaeList={[]} onSaveCnae={async () => {} as any} onDeleteCnae={() => {}} />} />
          <Route path="/fede" element={<FedeManager planteles={[]} fedeList={[]} onSaveFede={async () => {} as any} onDeleteFede={() => {}} />} />
          <Route path="/fundabit" element={<FundabitManager planteles={[]} fundabitList={[]} onSaveFundabit={async () => {} as any} onDeleteFundabit={() => {}} />} />
          <Route path="/mantenimiento" element={<MantenimientoManager onRefreshData={async () => {} as any} serverUrl={''} isOnline={true} allData={{}} onLogoChange={async () => {} as any} onBannerChange={async () => {} as any} onCriteriaChange={async () => {} as any} onAiEnabledChange={async () => {} as any} onChatbotChange={async () => {} as any} onSelfRegisterChange={async () => {} as any} onStateNameChange={async () => {} as any} onBulkImport={async () => {} as any} onPurgeAsistencia={async () => {} as any} onHardReset={async () => {} as any} />} />
          <Route path="/usuarios" element={<UsuariosManager currentUser={{id: 1, role: 'ADMIN'} as any} users={[]} planteles={[]} onSaveUser={async () => {} as any} onDeleteUser={() => {}} />} />
</Routes>
      </div>
    </MainLayout>
  );
};

export default App;