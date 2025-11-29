import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Voluntario, VoluntarioFormData } from '../../types/voluntario';

interface VoluntarioFormProps {
  voluntario: Voluntario | null;
  onSave: (data: VoluntarioFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

// Valores iniciales limpios
const initialFormState: VoluntarioFormData = {
  RUT: '',
  NombreCompleto: '',
  Email: '',
  Telefono: '',
  Region: '',
  Comuna: '',
  Genero: '',
  FechaNacimiento: '',
  Ocupacion: '',
  Instituto: '',
  EstadoVoluntario: 'Activo',
  Disponibilidad: ''
};

// Listas estáticas (podrían venir de una API o contexto en el futuro)
const regiones = [
  'Región de Arica y Parinacota', 'Región de Tarapacá', 'Región de Antofagasta', 
  'Región de Atacama', 'Región de Coquimbo', 'Región de Valparaíso', 
  'Región Metropolitana', 'Región de O\'Higgins', 'Región del Maule', 
  'Región de Ñuble', 'Región del Biobío', 'Región de La Araucanía', 
  'Región de Los Ríos', 'Región de Los Lagos', 'Región de Aysén', 
  'Región de Magallanes'
];

const institutos = [
  'Teletón Santiago', 'Teletón Valparaíso', 'Teletón Puerto Montt', 
  'Teletón Concepción', 'Teletón Antofagasta', 'Teletón Iquique', 
  'Teletón Coquimbo', 'Teletón Talca', 'Teletón Temuco', 
  'Teletón Calama', 'Teletón Arica'
];

export default function VoluntarioForm({ voluntario, onSave, onCancel, isSaving = false }: VoluntarioFormProps) {
  const [formData, setFormData] = useState<VoluntarioFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<VoluntarioFormData>>({});

  // Efecto para rellenar el formulario si estamos editando
  useEffect(() => {
    if (voluntario) {
      // Desestructuramos para quitar los campos que no son del formulario (IDs, fechas auto)
      const { VoluntarioID, FechaRegistro, FechaUltimaActualizacion, IdPersonaLegacy, ...rest } = voluntario;
      setFormData(rest);
    } else {
      setFormData(initialFormState);
    }
  }, [voluntario]);

  const validateForm = (): boolean => {
    const newErrors: Partial<VoluntarioFormData> = {};
    if (!formData.RUT.trim()) newErrors.RUT = 'RUT es requerido';
    if (!formData.NombreCompleto.trim()) newErrors.NombreCompleto = 'Nombre requerido';
    if (!formData.Email.trim()) newErrors.Email = 'Email requerido';
    if (formData.Email && !/\S+@\S+\.\S+/.test(formData.Email)) newErrors.Email = 'Email inválido';
    if (!formData.Region) newErrors.Region = 'Seleccione una región';
    if (!formData.Instituto) newErrors.Instituto = 'Seleccione un instituto';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field: keyof VoluntarioFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error al escribir
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Helper para clases de inputs
  const inputClass = (hasError: boolean) => `
    w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 
    ${hasError 
      ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
      : 'border-slate-300 focus:ring-red-100 focus:border-teleton-red'
    }
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RUT */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">RUT *</label>
          <input
            type="text"
            value={formData.RUT}
            onChange={(e) => handleChange('RUT', e.target.value)}
            className={inputClass(!!errors.RUT)}
            placeholder="12.345.678-9"
          />
          {errors.RUT && <p className="text-red-500 text-xs mt-1">{errors.RUT}</p>}
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo *</label>
          <input
            type="text"
            value={formData.NombreCompleto}
            onChange={(e) => handleChange('NombreCompleto', e.target.value)}
            className={inputClass(!!errors.NombreCompleto)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
          <input
            type="email"
            value={formData.Email}
            onChange={(e) => handleChange('Email', e.target.value)}
            className={inputClass(!!errors.Email)}
          />
          {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
          <input
            type="tel"
            value={formData.Telefono}
            onChange={(e) => handleChange('Telefono', e.target.value)}
            className={inputClass(false)}
            placeholder="+56 9..."
          />
        </div>

        {/* Región */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Región *</label>
          <select
            value={formData.Region}
            onChange={(e) => handleChange('Region', e.target.value)}
            className={inputClass(!!errors.Region)}
          >
            <option value="">Seleccionar...</option>
            {regiones.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Comuna */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Comuna</label>
          <input
            type="text"
            value={formData.Comuna}
            onChange={(e) => handleChange('Comuna', e.target.value)}
            className={inputClass(false)}
          />
        </div>

        {/* Instituto */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Instituto Teletón *</label>
          <select
            value={formData.Instituto}
            onChange={(e) => handleChange('Instituto', e.target.value)}
            className={inputClass(!!errors.Instituto)}
          >
            <option value="">Seleccionar...</option>
            {institutos.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
          <select
            value={formData.EstadoVoluntario}
            onChange={(e) => handleChange('EstadoVoluntario', e.target.value)}
            className={inputClass(false)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
      </div>

      {/* Disponibilidad (Full Width) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Disponibilidad / Notas</label>
        <textarea
          rows={3}
          value={formData.Disponibilidad}
          onChange={(e) => handleChange('Disponibilidad', e.target.value)}
          className={inputClass(false)}
          placeholder="Ej: Solo fines de semana, tiene auto..."
        />
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <X size={18} />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-teleton-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {voluntario ? 'Actualizar Datos' : 'Registrar Voluntario'}
        </button>
      </div>
    </form>
  );
}