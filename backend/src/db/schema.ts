import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Tabel metadata minimal untuk memverifikasi koneksi dan migrasi database.
export const applicationMetadata = sqliteTable('application_metadata', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})