import React from 'react';
import Link from 'next/link';
import { Heart, Bot, Database, Zap, ArrowRight, Lock } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* NAVBAR */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-teleton-red p-1.5 rounded-full text-white animate-heartbeat">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-800">
                Vocatio<span className="text-teleton-red"></span>
              </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition">
                                    <Lock size={16} />
                                    Acceso Admin
                                </button>
                            </Link>

                            <a
                                href="https://evento.teleton.cl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition flex items-center justify-center"
                            >
                                Botathon 2025
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teleton-light text-teleton-red text-xs font-bold uppercase tracking-wide mb-6">
                        <span className="w-2 h-2 rounded-full bg-teleton-red animate-pulse"></span>
                        Proyecto MVP en Desarrollo
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
                        El corazón de Chile,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teleton-red to-teleton-dark">
              impulsado por Inteligencia.
            </span>
                    </h1>

                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
                        Transformando la gestión de voluntarios con automatización robótica (RPA)
                        y análisis de datos avanzado.
                    </p>

                    <div className="flex justify-center gap-4">
                        <a href="/dashboard" className="group bg-teleton-red text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-teleton-dark transition-all flex items-center gap-2 transform hover:-translate-y-1">
                            Ver Dashboard
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* CARACTERÍSTICAS */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <Bot size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Blue Prism RPA</h3>
                            <p className="text-slate-600">Automatización inteligente para unificar bases de datos históricas.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                <Database size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">SQL Centralizado</h3>
                            <p className="text-slate-600">Una fuente única de verdad para gestionar miles de perfiles.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">IA & Perfilamiento</h3>
                            <p className="text-slate-600">Clasificación semántica de habilidades mediante Inteligencia Artificial.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}