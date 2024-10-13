import sql from './db.ts'

export async function getPositions() {
  const pos = await sql`SELECT * FROM positions LIMIT 30;`;
  return pos
}