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
  
  // --- TUS NUEVOS CAMPOS ---
  Instituto: string;
  Ocupacion: string;
  Capacitacion: string;       // Ej: "Liderazgo"
  CampanaAsignada: string;    // Ej: "Teletón 2025"
  TipoVoluntario: string;     // Ej: "Permanente"
  
  EstadoVoluntario: string;
  Disponibilidad: string;     // Mantenemos string simple para evitar conflictos
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
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
  
  // Campos del formulario
  Instituto: string;
  Ocupacion: string;
  Capacitacion: string;
  CampanaAsignada: string;
  TipoVoluntario: string;
  
  EstadoVoluntario: string;
  Disponibilidad: string;
}