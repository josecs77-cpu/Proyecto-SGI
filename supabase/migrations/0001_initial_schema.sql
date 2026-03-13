-- Extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Planteles
CREATE TABLE IF NOT EXISTS planteles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    codigo_dea TEXT UNIQUE NOT NULL,
    codigo_estadistico TEXT,
    codigo_dependencia TEXT,
    numero_ner TEXT,

    dependencia TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'ANZOATEGUI',
    municipio TEXT NOT NULL,
    parroquia TEXT NOT NULL,
    direccion TEXT,

    director TEXT,
    ci_director TEXT,
    telefono TEXT,
    email_director TEXT,

    niveles TEXT[] DEFAULT '{}',
    modalidades TEXT[] DEFAULT '{}',
    turnos TEXT[] DEFAULT '{}',

    latitud TEXT,
    longitud TEXT,

    espacios_fisicos JSONB DEFAULT '{}'::jsonb,
    conectividad JSONB DEFAULT '{}'::jsonb,

    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Políticas de Seguridad RLS
ALTER TABLE planteles ENABLE ROW LEVEL SECURITY;

-- Por defecto permitimos lectura a todos (o solo autenticados)
CREATE POLICY "Planteles son visibles para usuarios autenticados"
    ON planteles FOR SELECT
    USING (auth.role() = 'authenticated');

-- Inserción, actualización y borrado solo para administradores
-- (Asumiendo que controlamos los roles en los metadatos del usuario de Supabase)
CREATE POLICY "Planteles pueden ser modificados por admins"
    ON planteles FOR ALL
    USING (auth.jwt() -> 'user_metadata' ->> 'role' = 'ADMIN');

-- Función para auto actualizar el updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_planteles_updated_at
    BEFORE UPDATE ON planteles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
