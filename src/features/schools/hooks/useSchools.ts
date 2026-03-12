import { useState, useMemo } from 'react';
import { Plantel } from '../types';

export function useSchools(initialSchools: Plantel[] = []) {
  const [schools, setSchools] = useState<Plantel[]>(initialSchools);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMun, setFilterMun] = useState('');
  const [filterPar, setFilterPar] = useState('');
  const [filterDep, setFilterDep] = useState('');
  const [filterNivel, setFilterNivel] = useState('');
  const [filterMod, setFilterMod] = useState('');

  const filteredSchools = useMemo(() => {
    return schools.filter(p => {
      const name = (p.nombre || '').toLowerCase();
      const dea = (p.codigoDea || '').toLowerCase();
      const mun = (p.municipio || '').toUpperCase();
      const par = (p.parroquia || '').toUpperCase();
      const ner = (p.numeroNer || '').toLowerCase();

      const search = searchTerm.toLowerCase();
      const matchesSearch = name.includes(search) || dea.includes(search) || ner.includes(search);

      const matchesMun = !filterMun || mun === filterMun.toUpperCase();
      const matchesPar = !filterPar || par === filterPar.toUpperCase();
      const matchesDep = !filterDep || p.dependencia === filterDep;
      const matchesNivel = !filterNivel || (p.niveles || []).includes(filterNivel as any);
      const matchesMod = !filterMod || (p.modalidades || []).includes(filterMod as any);

      return matchesSearch && matchesMun && matchesPar && matchesDep && matchesNivel && matchesMod;
    }).sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
  }, [schools, searchTerm, filterMun, filterPar, filterDep, filterNivel, filterMod]);

  const saveSchool = (school: Plantel) => {
    setSchools(prev => {
      const exists = prev.find(p => p.id === school.id);
      if (exists) {
        return prev.map(p => p.id === school.id ? school : p);
      }
      return [...prev, school];
    });
  };

  const deleteSchool = (id: string) => {
    setSchools(prev => prev.filter(p => p.id !== id));
  };

  const getContextLabel = () => {
    if (filterPar) return "EN PARROQUIA";
    if (filterMun) return "EN MUNICIPIO";
    if (filterDep) return `PLANTELES ${filterDep.toUpperCase()}`;
    if (filterNivel) return `NIVEL ${filterNivel.toUpperCase()}`;
    if (searchTerm) return "RESULTADOS";
    return "TOTAL REGISTRADO";
  };

  return {
    schools: filteredSchools,
    totalSchools: schools.length,
    searchTerm, setSearchTerm,
    filterMun, setFilterMun,
    filterPar, setFilterPar,
    filterDep, setFilterDep,
    filterNivel, setFilterNivel,
    filterMod, setFilterMod,
    saveSchool,
    deleteSchool,
    contextLabel: getContextLabel()
  };
}
