import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import { env } from '../config.js'
import * as schema from './schema.js'

function prepareDatabasePath(databaseUrl: string) {
  if (databaseUrl === ':memory:') return databaseUrl

  const databasePath = resolve(databaseUrl)
  mkdirSync(dirname(databasePath), { recursive: true })
  return databasePath
}

const sqlite = new Database(prepareDatabasePath(env.DATABASE_URL))
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, { schema })
export { sqlite }