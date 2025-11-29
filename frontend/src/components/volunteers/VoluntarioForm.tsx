import React, { useState, useEffect, useRef } from 'react';
import { Save, X, ChevronDown, Check } from 'lucide-react';
import { Voluntario, VoluntarioFormData } from '../../types/voluntario';

interface VoluntarioFormProps {
  voluntario: Voluntario | null;
  onSave: (data: VoluntarioFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const initialFormState: VoluntarioFormData = {
  RUT: '', NombreCompleto: '', Email: '', Telefono: '', Region: '', Comuna: '', Genero: '', FechaNacimiento: '',
  Ocupacion: '', Instituto: '', TipoVoluntario: 'Eventual', CampanaAsignada: '', Capacitacion: '',
  EstadoVoluntario: 'Activo', Disponibilidad: [], Habilidades: []
};

const regiones = ['Región de Valparaíso', 'Región Metropolitana', 'Región del Biobío'];
const institutos = ['Teletón Santiago', 'Teletón Valparaíso', 'Teletón Concepción'];
const SKILLS = ['Liderazgo', 'Primeros Auxilios', 'Logística', 'Computación', 'Lengua de Señas'];
const AVAILABILITY = ['Mañana (Lun-Vie)', 'Tarde (Lun-Vie)', 'Fines de Semana', 'Full Time'];

export default function VoluntarioForm({ voluntario, onSave, onCancel, isSaving = false }: VoluntarioFormProps) {
  const [formData, setFormData] = useState<VoluntarioFormData>(initialFormState);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  
  const skillRef = useRef<HTMLDivElement>(null);
  const availRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (voluntario) {
      const { VoluntarioID, FechaRegistro, FechaUltimaActualizacion, IdPersonaLegacy, ...rest } = voluntario;
      setFormData({ 
        ...rest,
        Habilidades: Array.isArray(rest.Habilidades) ? rest.Habilidades : [],
        Disponibilidad: Array.isArray(rest.Disponibilidad) ? rest.Disponibilidad : []
      });
    } else {
      setFormData(initialFormState);
    }
  }, [voluntario]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (skillRef.current && !skillRef.current.contains(e.target as Node)) setIsSkillsOpen(false);
      if (availRef.current && !availRef.current.contains(e.target as Node)) setIsAvailOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (field: keyof VoluntarioFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'Habilidades' | 'Disponibilidad', item: string) => {
    setFormData(prev => {
      const list = prev[field] || [];
      return list.includes(item) ? { ...prev, [field]: list.filter(i => i !== item) } : { ...prev, [field]: [...list, item] };
    });
  };

  const inputClass = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red";

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">RUT</label><input type="text" value={formData.RUT} onChange={e => handleChange('RUT', e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium">Nombre</label><input type="text" value={formData.NombreCompleto} onChange={e => handleChange('NombreCompleto', e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium">Email</label><input type="email" value={formData.Email} onChange={e => handleChange('Email', e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium">Teléfono</label><input type="text" value={formData.Telefono} onChange={e => handleChange('Telefono', e.target.value)} className={inputClass} /></div>
        
        <div><label className="text-sm font-medium">Región</label><select value={formData.Region} onChange={e => handleChange('Region', e.target.value)} className={inputClass}><option value="">Seleccionar...</option>{regiones.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
        <div><label className="text-sm font-medium">Comuna</label><input type="text" value={formData.Comuna} onChange={e => handleChange('Comuna', e.target.value)} className={inputClass} /></div>

        <div><label className="text-sm font-medium">Ocupación</label><input type="text" value={formData.Ocupacion} onChange={e => handleChange('Ocupacion', e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium">Instituto</label><select value={formData.Instituto} onChange={e => handleChange('Instituto', e.target.value)} className={inputClass}><option value="">Seleccionar...</option>{institutos.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
        <div><label className="text-sm font-medium">Tipo Voluntario</label><select value={formData.TipoVoluntario} onChange={e => handleChange('TipoVoluntario', e.target.value)} className={inputClass}><option value="Eventual">Eventual</option><option value="Permanente">Permanente</option></select></div>
        <div><label className="text-sm font-medium">Campaña Asignada</label><input type="text" value={formData.CampanaAsignada} onChange={e => handleChange('CampanaAsignada', e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium">Capacitación</label><input type="text" value={formData.Capacitacion} onChange={e => handleChange('Capacitacion', e.target.value)} className={inputClass} /></div>
        
        <div><label className="text-sm font-medium">Estado</label><select value={formData.EstadoVoluntario} onChange={e => handleChange('EstadoVoluntario', e.target.value)} className={inputClass}><option value="Activo">Activo</option><option value="Inactivo">Inactivo</option></select></div>

        <div className="md:col-span-2 relative" ref={skillRef}>
          <label className="text-sm font-medium">Habilidades</label>
          <div onClick={() => setIsSkillsOpen(!isSkillsOpen)} className={`${inputClass} cursor-pointer flex justify-between items-center`}>
            <div className="flex flex-wrap gap-1">{formData.Habilidades.length > 0 ? formData.Habilidades.map(s => <span key={s} className="bg-slate-100 text-xs px-2 rounded">{s}</span>) : <span className="text-slate-400">Seleccionar...</span>}</div>
            <ChevronDown size={16}/>
          </div>
          {isSkillsOpen && <div className="absolute z-10 w-full bg-white border shadow-lg rounded-lg max-h-40 overflow-auto p-1">{SKILLS.map(s => <div key={s} onClick={() => toggleArrayItem('Habilidades', s)} className={`p-2 cursor-pointer hover:bg-slate-50 flex justify-between ${formData.Habilidades.includes(s) ? 'text-red-600 bg-red-50' : ''}`}><span>{s}</span>{formData.Habilidades.includes(s) && <Check size={14}/>}</div>)}</div>}
        </div>

        <div className="md:col-span-2 relative" ref={availRef}>
          <label className="text-sm font-medium">Disponibilidad</label>
          <div onClick={() => setIsAvailOpen(!isAvailOpen)} className={`${inputClass} cursor-pointer flex justify-between items-center`}>
            <div className="flex flex-wrap gap-1">{formData.Disponibilidad.length > 0 ? formData.Disponibilidad.map(s => <span key={s} className="bg-blue-50 text-blue-600 text-xs px-2 rounded">{s}</span>) : <span className="text-slate-400">Seleccionar...</span>}</div>
            <ChevronDown size={16}/>
          </div>
          {isAvailOpen && <div className="absolute z-10 w-full bg-white border shadow-lg rounded-lg max-h-40 overflow-auto p-1">{AVAILABILITY.map(s => <div key={s} onClick={() => toggleArrayItem('Disponibilidad', s)} className={`p-2 cursor-pointer hover:bg-slate-50 flex justify-between ${formData.Disponibilidad.includes(s) ? 'text-blue-600 bg-blue-50' : ''}`}><span>{s}</span>{formData.Disponibilidad.includes(s) && <Check size={14}/>}</div>)}</div>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg hover:bg-slate-50">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-teleton-red text-white rounded-lg hover:bg-red-700">{isSaving ? '...' : 'Guardar'}</button>
      </div>
    </form>
  );
}