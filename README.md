# Project Hub

Fondasi aplikasi manajemen proyek personal lokal untuk Windows. Repository ini sengaja hanya menyediakan kerangka frontend dan backend; belum ada dashboard, wizard proyek, manajemen tugas, atau integrasi filesystem.

## Prasyarat

- Node.js 20 atau lebih baru (dikembangkan dengan Node.js 22)
- npm 10 atau lebih baru

## Instalasi

```bash
npm install
```

## Menjalankan aplikasi

Jalankan frontend (Vite) secara terpisah:

```bash
npm run dev:frontend
```

Frontend tersedia di `http://localhost:5173`.

Jalankan backend (Fastify) secara terpisah:

```bash
npm run dev:backend
```

Backend tersedia di `http://127.0.0.1:3000`. Health check:

```bash
curl http://127.0.0.1:3000/health
```

## Database

SQLite disimpan secara lokal di `backend/data/project-hub.db` secara default. Direktori dan file database dibuat otomatis saat server atau migrasi dijalankan.

Terapkan migrasi:

```bash
npm run db:migrate
```

Untuk mengganti lokasi database, atur `DATABASE_URL` ke path file SQLite.

## Pemeriksaan

```bash
npm run typecheck
npm run build
```

## Struktur

```text
frontend/  React, Vite, TypeScript, Tailwind CSS, shadcn/ui
backend/   Fastify, TypeScript, Zod, SQLite, Drizzle ORM
```