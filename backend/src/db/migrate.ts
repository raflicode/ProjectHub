import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { db, sqlite } from './client.js'

try {
  migrate(db, { migrationsFolder: 'drizzle' })
  console.log('Database migrations applied successfully.')
} finally {
  sqlite.close()
}