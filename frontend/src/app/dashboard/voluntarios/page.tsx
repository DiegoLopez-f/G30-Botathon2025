'use client';

import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';

import FiltersBar from '../../../components/volunteers/FiltersBar';
import VolunteersTable from '../../../components/volunteers/VolunteersTable';
import VoluntarioForm from '../../../components/volunteers/VoluntarioForm';
import VoluntarioStats from '../../../components/volunteers/VoluntarioStats';
// IMPORTAR EL NUEVO MODAL
import VoluntarioHistoryModal from '../../../components/volunteers/VoluntarioHistoryModal';

import { useVoluntarios } from '../../../hook/useVoluntarios';
import { Voluntario, VoluntarioFormData } from '../../../types/voluntario';

export default function VoluntariosPage() {
  const { 
    voluntarios, 
    loading, 
    saving, 
    addVoluntario, 
    updateVoluntario, 
    deleteVoluntario 
  } = useVoluntarios();

  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  
  // Estado para Modal de Creación/Edición
  const [showModal, setShowModal] = useState(false);
  const [editingVoluntario, setEditingVoluntario] = useState<Voluntario | null>(null);

  // --- NUEVO ESTADO PARA HISTORIAL ---
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyVoluntario, setHistoryVoluntario] = useState<Voluntario | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredVoluntarios = useMemo(() => {
    return voluntarios.filter(voluntario => {
      const matchesSearch = 
        voluntario.NombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voluntario.RUT.includes(searchTerm) ||
        voluntario.Email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = !regionFilter || voluntario.Region === regionFilter;
      const matchesEstado = !estadoFilter || voluntario.EstadoVoluntario === estadoFilter;
      
      return matchesSearch && matchesRegion && matchesEstado;
    });
  }, [voluntarios, searchTerm, regionFilter, estadoFilter]);

  const totalPages = Math.ceil(filteredVoluntarios.length / itemsPerPage);
  const paginatedData = filteredVoluntarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = () => {
    setEditingVoluntario(null);
    setShowModal(true);
  };

  const handleEdit = (voluntario: Voluntario) => {
    setEditingVoluntario(voluntario);
    setShowModal(true);
  };

  // --- NUEVO HANDLER PARA HISTORIAL ---
  const handleViewHistory = (voluntario: Voluntario) => {
    setHistoryVoluntario(voluntario);
    setShowHistoryModal(true);
  };

  const handleSave = async (data: VoluntarioFormData) => {
    let success = false;
    if (editingVoluntario) {
      success = await updateVoluntario(editingVoluntario.VoluntarioID, data);
    } else {
      success = await addVoluntario(data);
    }
    
    if (success) {
      setShowModal(false);
      setEditingVoluntario(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teleton-red"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Voluntarios</h1>
          <p className="text-slate-600">Administra la información y asignación de los voluntarios</p>
        </div>
      </div>

      <VoluntarioStats voluntarios={voluntarios} />

      <FiltersBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        regionFilter={regionFilter}
        onRegionChange={setRegionFilter}
        estadoFilter={estadoFilter}
        onEstadoChange={setEstadoFilter}
        onAdd={handleCreate}
        onExport={() => console.log('Lógica de exportar aquí')}
        onImport={() => console.log('Lógica de importar aquí')}
      />

      <div className="space-y-4">
        {/* Pasamos el nuevo handler a la tabla */}
        <VolunteersTable 
          data={paginatedData}
          onEdit={handleEdit}
          onDelete={deleteVoluntario}
          onViewHistory={handleViewHistory} 
        />
        
        {filteredVoluntarios.length > 0 && (
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-sm text-slate-600">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredVoluntarios.length)} de {filteredVoluntarios.length} registros
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                Anterior
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border rounded hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Crear/Editar (Existente) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">
                {editingVoluntario ? 'Editar Voluntario' : 'Nuevo Voluntario'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <VoluntarioForm 
                voluntario={editingVoluntario}
                onSave={handleSave}
                onCancel={() => setShowModal(false)}
                isSaving={saving}
              />
            </div>
          </div>
        </div>
      )}

      {/* --- NUEVO MODAL DE HISTORIAL --- */}
      {showHistoryModal && historyVoluntario && (
        <VoluntarioHistoryModal 
          voluntario={historyVoluntario}
          onClose={() => {
            setShowHistoryModal(false);
            setHistoryVoluntario(null);
          }}
        />
      )}

    </div>
  );
}