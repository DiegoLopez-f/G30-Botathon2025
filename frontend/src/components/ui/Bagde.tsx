import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'neutral';
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
    const styles = {
        success: "bg-green-100 text-green-700 border-green-200", // Activo
        warning: "bg-yellow-100 text-yellow-700 border-yellow-200", // Pendiente
        error: "bg-red-100 text-red-700 border-red-200",     // Inactivo/Baja
        neutral: "bg-slate-100 text-slate-700 border-slate-200"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
    );
}