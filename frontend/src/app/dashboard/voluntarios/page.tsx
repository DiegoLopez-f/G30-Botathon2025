'use client';

import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';

// 1. Importamos nuestros "bloques de lego" (Componentes)
import FiltersBar from '../../../components/volunteers/FiltersBar';
import VolunteersTable from '../../../components/volunteers/VolunteersTable';
import VoluntarioForm from '../../../components/volunteers/VoluntarioForm';
import VoluntarioStats from '../../../components/volunteers/VoluntarioStats';

// 2. Importamos la lógica (Hook) y los Tipos
import { useVoluntarios } from '../../../hook/useVoluntarios';
import { Voluntario, VoluntarioFormData } from '../../../types/voluntario'; // Ajusta la ruta si es necesario

export default function VoluntariosPage() {
  // --- A. CONEXIÓN CON LOS DATOS (HOOK) ---
  const { 
    voluntarios, 
    loading, 
    saving, 
    addVoluntario, 
    updateVoluntario, 
    deleteVoluntario 
  } = useVoluntarios();

  // --- B. ESTADO DE LA INTERFAZ (UI) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  
  // Estado para el Modal y Edición
  const [showModal, setShowModal] = useState(false);
  const [editingVoluntario, setEditingVoluntario] = useState<Voluntario | null>(null);
  
  // Estado para Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- C. LÓGICA DE FILTRADO (Optimizada con useMemo) ---
  // Esto solo se recalcula si cambian los datos o los filtros, no en cada render.
  const filteredVoluntarios = useMemo(() => {
    return voluntarios.filter(voluntario => {
      // 1. Filtro de Texto (Nombre, RUT, Email)
      const matchesSearch = 
        voluntario.NombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voluntario.RUT.includes(searchTerm) ||
        voluntario.Email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Filtro de Selects
      const matchesRegion = !regionFilter || voluntario.Region === regionFilter;
      const matchesEstado = !estadoFilter || voluntario.EstadoVoluntario === estadoFilter;
      
      return matchesSearch && matchesRegion && matchesEstado;
    });
  }, [voluntarios, searchTerm, regionFilter, estadoFilter]);

  // --- D. LÓGICA DE PAGINACIÓN ---
  const totalPages = Math.ceil(filteredVoluntarios.length / itemsPerPage);
  const paginatedData = filteredVoluntarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- E. MANEJADORES DE ACCIONES (HANDLERS) ---
  
  // Abrir modal para crear
  const handleCreate = () => {
    setEditingVoluntario(null);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEdit = (voluntario: Voluntario) => {
    setEditingVoluntario(voluntario);
    setShowModal(true);
  };

  // Guardar (crear o editar)
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

  // --- F. RENDERIZADO ---

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teleton-red"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* 1. Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Voluntarios</h1>
          <p className="text-slate-600">Administra la información y asignación de los voluntarios</p>
        </div>
      </div>

      {/* 2. Tarjetas de Estadísticas */}
      <VoluntarioStats voluntarios={voluntarios} />

      {/* 3. Barra de Filtros y Botones */}
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

      {/* 4. Tabla y Paginación */}
      <div className="space-y-4">
        <VolunteersTable 
          data={paginatedData}
          onEdit={handleEdit}
          onDelete={deleteVoluntario}
        />
        
        {/* Paginación UI */}
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

      {/* 5. Modal Flotante */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header del Modal */}
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
            
            {/* Contenido del Modal (Formulario) */}
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
    </div>
  );
}