-- À exécuter une seule fois sur la base Postgres (via le "Shell" ou "Connect" de Render,
-- ou avec un client comme TablePlus / DBeaver / psql)

CREATE TABLE IF NOT EXISTS gallery_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    media_url TEXT NOT NULL,
    media_type VARCHAR(10) NOT NULL DEFAULT 'image', -- 'image' ou 'video'
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);