-- SQL Schema for Carrillo Gamboa & Asociados

-- 1. Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  status TEXT DEFAULT 'Activo',
  last_service TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Bookings Table (Citas)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  priority TEXT,
  suggested_specialist TEXT,
  estimated_duration TEXT,
  preliminary_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Messages Table (Contacto)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Transactions Table (Ingresos)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  date DATE NOT NULL,
  concept TEXT,
  status TEXT DEFAULT 'Pagado',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Agenda Events Table
CREATE TABLE IF NOT EXISTS agenda_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sender TEXT NOT NULL, -- 'user' or 'bot'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies (For demo purposes, allowing all access. In production, restrict these!)
CREATE POLICY "Allow all access to clients" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to messages" ON messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to transactions" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to agenda_events" ON agenda_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to chat_sessions" ON chat_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);

-- Insert some initial data for the demo
INSERT INTO clients (name, email, company, status, last_service) VALUES
('Juan Pérez', 'juan.perez@email.com', 'Independiente', 'Activo', 'Asesoría Fiscal'),
('Empresa ABC', 'contacto@abc.com', 'ABC Corp', 'Activo', 'Auditoría'),
('María García', 'm.garcia@email.com', 'García & Co', 'Inactivo', 'Defensa Legal');

INSERT INTO agenda_events (time, title, type, location) VALUES
('09:00 AM', 'Reunión Fiscal - Juan P.', 'Presencial', 'Oficina Central'),
('11:30 AM', 'Auditoría Empresa ABC', 'Virtual', 'Zoom');

INSERT INTO transactions (client_name, amount, date, concept, status) VALUES
('Empresa ABC', 45000, '2026-03-21', 'Auditoría Anual', 'Pagado'),
('Juan Pérez', 8500, '2026-03-20', 'Asesoría Fiscal Mensual', 'Pagado');
