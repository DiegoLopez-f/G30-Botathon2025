// src/data/comunicaciones.ts
import { Users, Zap, CheckCircle, Award } from 'lucide-react';
import { KpiData, CommsHistoryItem, ChartData } from '../types/comunicaciones';

export const kpiData: KpiData[] = [
  { title: "Total Voluntarios", value: "12,450", change: "+5% vs 2024", icon: Users, color: "red" },
  { title: "Campañas Activas", value: "3", change: "En curso ahora", icon: Zap, color: "blue" },
  { title: "Nuevos Registros", value: "850", change: "+12% esta semana", icon: CheckCircle, color: "purple" },
  { title: "Tasa de Asistencia", value: "92%", change: "Histórico alto", icon: Award, color: "orange" },
];

export const commsHistory: CommsHistoryItem[] = [
  { id: 101, campaign: "Convocatoria Pintatón", segment: "Región Metropolitana", status: "Enviado", sent: 5400, date: "Hace 2 horas" },
  { id: 102, campaign: "Alerta Climática", segment: "Zona Sur", status: "Procesando", sent: 120, date: "En curso" },
  { id: 103, campaign: "Bienvenida Nuevos", segment: "Nuevos Registros", status: "En Cola", sent: 0, date: "Programado" },
];

export const skillsData: ChartData[] = [
  { name: 'Primeros Auxilios', value: 400 },
  { name: 'Logística', value: 300 },
  { name: 'Lengua de Señas', value: 200 },
  { name: 'Animación', value: 278 },
  { name: 'Música/Arte', value: 189 },
];

export const regionData: ChartData[] = [
  { name: 'Metropolitana', value: 6000 },
  { name: 'Valparaíso', value: 3000 },
  { name: 'Biobío', value: 2000 },
  { name: 'Otros', value: 1450 },
];