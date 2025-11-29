'use client';

import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const CHILE_TOPO_JSON = "/chile.json";

const colorScale = scaleLinear<string>()
    .domain([0, 5000])
    .range(["#ffbdc5", "#D6001C"]);

interface ChileMapProps {
    data: Array<{ region: string; value: number }>;
    onRegionSelect: (regionName: string) => void;
    selectedRegion: string | null;
}

const ChileMap = ({ data, onRegionSelect, selectedRegion }: ChileMapProps) => {
    return (
        <div className="h-[600px] w-full bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 650,          // Zoom ajustado
                    center: [-70, -38]   // Centro de Chile
                }}
                className="w-full h-full"
            >
                <ZoomableGroup>
                    <Geographies geography={CHILE_TOPO_JSON}>
                        {({ geographies }) => {
                            if (!geographies || geographies.length === 0) return null;

                            return geographies.map((geo) => {
                                // CORRECCIÓN CLAVE: Este mapa usa la propiedad "Region" o "Region_Nam"
                                const regionName = geo.properties.Region || geo.properties.Region_Nam;

                                // Normalizamos nombres para evitar errores (ej: "Valparaiso" vs "Valparaíso")
                                const cur = data.find((s) =>
                                    s.region.toLowerCase().includes(regionName.toLowerCase()) ||
                                    regionName.toLowerCase().includes(s.region.toLowerCase())
                                );

                                const isSelected = selectedRegion === regionName;

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => {
                                            console.log("Región:", regionName);
                                            onRegionSelect(regionName);
                                        }}
                                        style={{
                                            default: {
                                                fill: isSelected ? "#334155" : (cur ? colorScale(cur.value) : "#CBD5E1"),
                                                outline: "none",
                                                stroke: "#FFF",
                                                strokeWidth: 0.5,
                                            },
                                            hover: {
                                                fill: "#D6001C",
                                                outline: "none",
                                                cursor: "pointer"
                                            },
                                            pressed: {
                                                fill: "#000",
                                                outline: "none",
                                            },
                                        }}
                                    />
                                );
                            });
                        }}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {/* Leyenda */}
            <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg text-xs shadow-sm border border-slate-100">
                <p className="font-bold mb-1 text-slate-700">Intensidad</p>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#CBD5E1]"></div> <span>Sin Datos</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 bg-[#D6001C]"></div> <span>Alta Participación</span>
                </div>
            </div>
        </div>
    );
};

export default memo(ChileMap);