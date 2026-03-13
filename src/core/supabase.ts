import { createClient } from '@supabase/supabase-js';

// Usamos el operador nullish coalescing o proporcionamos strings vacíos por defecto
// para evitar que el compilador TS lance error al instanciar, pero en producción
// DEBEN existir en los archivos .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Faltan las variables de entorno de Supabase. Asegúrate de configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
