'use client';

import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';

import FiltersBar from '../../../components/volunteers/FiltersBar';
import VolunteersTable from '../../../components/volunteers/VolunteersTable';
import VoluntarioForm from '../../../components/volunteers/VoluntarioForm';
import VoluntarioStats from '../../../components/volunteers/VoluntarioStats';
import VoluntarioDetailModal from '../../../components/volunteers/VoluntarioDetailModal';
import VoluntarioHistoryModal from '../../../components/volunteers/VoluntarioHistoryModal';

import { useVoluntarios } from '../../../hook/useVoluntarios';
import { Voluntario, VoluntarioFormData } from '../../../types/voluntario';

export default function VoluntariosPage() {
  const { voluntarios, loading, saving, addVoluntario, updateVoluntario, deleteVoluntario } = useVoluntarios();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedVoluntario, setSelectedVoluntario] = useState<Voluntario | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredVoluntarios = useMemo(() => {
    return voluntarios.filter(v => {
      const matchText = v.NombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || v.RUT.includes(searchTerm);
      const matchRegion = !regionFilter || v.Region === regionFilter;
      const matchEstado = !estadoFilter || v.EstadoVoluntario === estadoFilter;
      return matchText && matchRegion && matchEstado;
    });
  }, [voluntarios, searchTerm, regionFilter, estadoFilter]);

  const paginatedData = filteredVoluntarios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCreate = () => { setSelectedVoluntario(null); setShowFormModal(true); };
  const handleEdit = (v: Voluntario) => { setSelectedVoluntario(v); setShowFormModal(true); };
  const handleViewHistory = (v: Voluntario) => { setSelectedVoluntario(v); setShowHistoryModal(true); };
  const handleViewDetails = (v: Voluntario) => { setSelectedVoluntario(v); setShowDetailModal(true); };

  const handleSave = async (data: VoluntarioFormData) => {
    let success = false;
    if (selectedVoluntario) {
      success = await updateVoluntario(selectedVoluntario.VoluntarioID, data);
    } else {
      success = await addVoluntario(data);
    }
    if (success) { setShowFormModal(false); setSelectedVoluntario(null); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-bold text-slate-900">Gestión de Voluntarios</h1>
      <VoluntarioStats voluntarios={voluntarios} />
      
      <FiltersBar 
        searchTerm={searchTerm} onSearchChange={setSearchTerm}
        regionFilter={regionFilter} onRegionChange={setRegionFilter}
        estadoFilter={estadoFilter} onEstadoChange={setEstadoFilter}
        onAdd={handleCreate} onExport={() => {}} 
      />

      <VolunteersTable 
        data={paginatedData}
        onEdit={handleEdit}
        onDelete={deleteVoluntario}
        onViewDetails={handleViewDetails}
        onViewHistory={handleViewHistory}
      />

      {showFormModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">{selectedVoluntario ? 'Editar' : 'Nuevo'}</h2>
              <button onClick={() => setShowFormModal(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <VoluntarioForm voluntario={selectedVoluntario} onSave={handleSave} onCancel={() => setShowFormModal(false)} isSaving={saving} />
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedVoluntario && (
        <VoluntarioDetailModal 
          voluntario={selectedVoluntario} 
          onClose={() => setShowDetailModal(false)} 
          onEdit={() => { setShowDetailModal(false); setShowFormModal(true); }}
        />
      )}

      {showHistoryModal && selectedVoluntario && (
        <VoluntarioHistoryModal voluntario={selectedVoluntario} onClose={() => setShowHistoryModal(false)} />
      )}
    </div>
  );
}