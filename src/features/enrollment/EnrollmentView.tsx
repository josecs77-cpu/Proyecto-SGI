import React from 'react';
import { MatriculaRegistro } from './types';
import MatriculaManager from './components/MatriculaManager';

export const EnrollmentView: React.FC = () => {
    const planteles: any[] = [];
    const matriculaList: MatriculaRegistro[] = []; // In a real app, this would be fetched from the store

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Gestión de Matrícula</h1>
                <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Módulo de carga y consolidación de estudiantes
                </p>
            </div>

            <div className="mt-8">
                <MatriculaManager
                    planteles={planteles as any}
                    matriculaList={matriculaList}
                    onSaveMatricula={(m) => console.log('Saved', m)}
                    onDeleteMatricula={(id) => console.log('Deleted', id)}
                />
            </div>
        </div>
    );
};

export default EnrollmentView;