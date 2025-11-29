// src/types/comunicaciones.ts
import { LucideIcon } from 'lucide-react';

export interface KpiData {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: "red" | "blue" | "purple" | "orange" | "green" | "slate";
}

export interface CommsHistoryItem {
  id: number;
  campaign: string;
  segment: string;
  status: 'Enviado' | 'Procesando' | 'En Cola' | string;
  sent: number;
  date: string;
}

export interface ChartData {
  name: string;
  value: number;
}