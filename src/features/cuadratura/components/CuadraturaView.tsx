import React from 'react';
import CuadraturaManager from './CuadraturaManager';

const CuadraturaView: React.FC = () => {
    // We mock the missing parts for this view integration since the store was not defined globally in this context
    const planteles: any[] = [];
    const rac: any[] = [];
    const cuadraturaList: any[] = [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Gestión de Cuadraturas</h1>
                <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Módulo de Sincronización RAC
                </p>
            </div>
            <div className="mt-8">
                <CuadraturaManager
                    planteles={planteles as any}
                    rac={rac as any}
                    cuadraturaList={cuadraturaList}
                    onSaveCuadratura={() => console.log('Saved')}
                />
            </div>
        </div>
    );
};

export default CuadraturaView;