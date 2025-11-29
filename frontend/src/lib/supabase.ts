import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// --- DEBUG TEMPORAL ---
// Abre la consola del navegador (F12) y busca este mensaje.
// Si dice "undefined", es que no está leyendo el archivo .env.local
console.log("------------------------------------------------");
console.log("INTENTANDO CONECTAR A SUPABASE:");
console.log("URL:", supabaseUrl);
console.log("KEY (Longitud):", supabaseKey ? supabaseKey.length : "VACÍA");
console.log("------------------------------------------------");
// ----------------------

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Faltan las variables de entorno de Supabase (.env.local)');
}

export const supabase = createClient(supabaseUrl, supabaseKey);