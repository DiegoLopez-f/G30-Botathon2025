import { useState, useEffect } from 'react';
import { Voluntario, VoluntarioFormData } from '../types/voluntario';

const mockVoluntarios: Voluntario[] = [
  {
    VoluntarioID: 1,
    IdPersonaLegacy: 1001,
    RUT: '12.345.678-9',
    NombreCompleto: 'María García López',
    Email: 'maria.garcia@email.com',
    Telefono: '+56912345678',
    Region: 'Región Metropolitana',
    Comuna: 'Santiago',
    Genero: 'Femenino',
    FechaNacimiento: '1985-03-15',
    Ocupacion: 'Ingeniera Civil',
    Instituto: 'Teletón Santiago',
    TipoVoluntario: 'Permanente',
    CampanaAsignada: 'Teletón 2025',
    Capacitacion: 'Liderazgo de Equipos',
    EstadoVoluntario: 'Activo',
    Disponibilidad: ['Fines de Semana', 'Tarde (Lun-Vie)'],
    Habilidades: ['Liderazgo', 'Primeros Auxilios'],
    FechaRegistro: '2023-01-15T10:00:00Z',
    FechaUltimaActualizacion: '2024-11-29T10:00:00Z'
  },
  {
    VoluntarioID: 2,
    IdPersonaLegacy: 1002,
    RUT: '9.876.543-K',
    NombreCompleto: 'Carlos Rodríguez Pérez',
    Email: 'carlos.rodriguez@email.com',
    Telefono: '+56987654321',
    Region: 'Región de Valparaíso',
    Comuna: 'Viña del Mar',
    Genero: 'Masculino',
    FechaNacimiento: '1990-07-22',
    Ocupacion: 'Profesor de Educación Física',
    Instituto: 'Teletón Valparaíso',
    TipoVoluntario: 'Eventual',
    CampanaAsignada: 'Verano Inclusivo',
    Capacitacion: 'Inducción General',
    EstadoVoluntario: 'Activo',
    Disponibilidad: ['Mañana (Lun-Vie)'],
    Habilidades: ['Logística', 'Computación'],
    FechaRegistro: '2023-02-10T14:30:00Z',
    FechaUltimaActualizacion: '2024-11-28T16:45:00Z'
  }
];

export function useVoluntarios() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVoluntarios(mockVoluntarios);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addVoluntario = async (data: VoluntarioFormData) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newVoluntario: Voluntario = {
        ...data,
        VoluntarioID: Date.now(),
        FechaRegistro: new Date().toISOString(),
        FechaUltimaActualizacion: new Date().toISOString()
      };
      setVoluntarios(prev => [newVoluntario, ...prev]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateVoluntario = async (id: number, data: VoluntarioFormData) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setVoluntarios(prev => prev.map(v => 
        v.VoluntarioID === id 
          ? { ...v, ...data, FechaUltimaActualizacion: new Date().toISOString() }
          : v
      ));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteVoluntario = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este voluntario?')) return;
    setVoluntarios(prev => prev.filter(v => v.VoluntarioID !== id));
  };

  return { voluntarios, loading, saving, addVoluntario, updateVoluntario, deleteVoluntario };
}