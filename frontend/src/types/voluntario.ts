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
  Ocupacion: string;
  Instituto: string;
  EstadoVoluntario: string;
  Disponibilidad: string;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
}

// Opcional: Tipo para el formulario (sin ID ni fechas automáticas)
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
  EstadoVoluntario: string;
  Disponibilidad: string;
}