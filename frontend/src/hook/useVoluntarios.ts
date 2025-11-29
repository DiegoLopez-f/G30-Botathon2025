import { useState, useEffect } from 'react';
// Ajusta esta ruta si guardaste los tipos en otro lugar.
// Si usas alias (@) sería: import { ... } from '@/types/voluntario';
import { Voluntario, VoluntarioFormData } from '../types/voluntario';

// Datos de prueba (Mock Data)
const mockVoluntarios: Voluntario[] = [
  {
    VoluntarioID: 1,
    IdPersonaLegacy: 1001,
    RUT: '12345678-9',
    NombreCompleto: 'María García López',
    Email: 'maria.garcia@email.com',
    Telefono: '+56912345678',
    Region: 'Región Metropolitana',
    Comuna: 'Santiago',
    Genero: 'Femenino',
    FechaNacimiento: '1985-03-15',
    Ocupacion: 'Ingeniera',
    Instituto: 'Teletón Santiago',
    EstadoVoluntario: 'Activo',
    Disponibilidad: 'Fines de semana',
    FechaRegistro: '2023-01-15T10:00:00Z',
    FechaUltimaActualizacion: '2024-11-29T10:00:00Z'
  },
  {
    VoluntarioID: 2,
    IdPersonaLegacy: 1002,
    RUT: '98765432-1',
    NombreCompleto: 'Carlos Rodríguez Pérez',
    Email: 'carlos.rodriguez@email.com',
    Telefono: '+56987654321',
    Region: 'Región de Valparaíso',
    Comuna: 'Viña del Mar',
    Genero: 'Masculino',
    FechaNacimiento: '1990-07-22',
    Ocupacion: 'Profesor',
    Instituto: 'Teletón Valparaíso',
    EstadoVoluntario: 'Activo',
    Disponibilidad: 'Tardes entre semana',
    FechaRegistro: '2023-02-10T14:30:00Z',
    FechaUltimaActualizacion: '2024-11-28T16:45:00Z'
  }
];

export function useVoluntarios() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Simular carga inicial de datos
  useEffect(() => {
    // Aquí iría tu llamada a Supabase:
    // const { data } = await supabase.from('Voluntarios').select('*');
    
    // Simulamos un delay de red
    const timer = setTimeout(() => {
      setVoluntarios(mockVoluntarios);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Crear voluntario
  const addVoluntario = async (data: VoluntarioFormData) => {
    setSaving(true);
    try {
      // Simulación de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newVoluntario: Voluntario = {
        ...data,
        VoluntarioID: Date.now(), // ID temporal
        FechaRegistro: new Date().toISOString(),
        FechaUltimaActualizacion: new Date().toISOString()
      };
      
      setVoluntarios(prev => [newVoluntario, ...prev]);
      return true;
    } catch (error) {
      console.error("Error al crear:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Actualizar voluntario
  const updateVoluntario = async (id: number, data: VoluntarioFormData) => {
    setSaving(true);
    try {
      // Simulación de API
      await new Promise(resolve => setTimeout(resolve, 500));

      setVoluntarios(prev => prev.map(v => 
        v.VoluntarioID === id 
          ? { ...v, ...data, FechaUltimaActualizacion: new Date().toISOString() }
          : v
      ));
      return true;
    } catch (error) {
      console.error("Error al actualizar:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Eliminar voluntario
  const deleteVoluntario = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este voluntario?')) return;
    
    try {
      // Simulación de API
      setVoluntarios(prev => prev.filter(v => v.VoluntarioID !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return {
    voluntarios,
    loading,
    saving,
    addVoluntario,
    updateVoluntario,
    deleteVoluntario
  };
}