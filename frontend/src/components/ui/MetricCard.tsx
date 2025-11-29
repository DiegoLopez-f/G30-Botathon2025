import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean; // true = verde, false = rojo
    color?: "red" | "blue" | "purple" | "orange" ;
}

export function MetricCard({
                               title,
                               value,
                               icon: Icon,
                               trend,
                               trendUp = true,
                               color = "red"
                           }: MetricCardProps) {

    const colors = {
        red: "bg-red-50 text-teleton-red",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                    {trend && (
                        <div className={`flex items-center mt-2 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                            <span>{trendUp ? '↑' : '↓'} {trend}</span>
                            <span className="text-slate-400 ml-1">vs mes anterior</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
}