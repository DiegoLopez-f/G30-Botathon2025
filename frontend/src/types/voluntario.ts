export interface Voluntario {
  VoluntarioID: number;
  IdPersonaLegacy?: number;
  RUT: string;
  NombreCompleto: string;
  Email: string;
  Telefono: string;
  Region: string;
  Comuna: string;
  Genero: string;
  FechaNacimiento: string;
  
  // --- CAMPOS PERFIL ---
  Instituto: string;
  Ocupacion: string;
  TipoVoluntario: string;
  CampanaAsignada: string;
  Capacitacion: string;
  
  // --- ESTADO ---
  EstadoVoluntario: string;
  Disponibilidad: string[]; // Array de strings
  Habilidades: string[];    // Array de strings
  
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
}

export interface Participacion {
  id: number;
  campana: string;
  rol: string;
  fecha: string;
  horas: number;
  estado: 'Asistió' | 'Ausente' | 'Inscrito';
}

export interface VoluntarioFormData {
  RUT: string;
  NombreCompleto: string;
  Email: string;
  Telefono: string;
  Region: string;
  Comuna: string;
  Genero: string;
  FechaNacimiento: string;
  
  Ocupacion: string;
  Instituto: string;
  TipoVoluntario: string;
  CampanaAsignada: string;
  Capacitacion: string;
  
  EstadoVoluntario: string;
  Disponibilidad: string[];
  Habilidades: string[];
}