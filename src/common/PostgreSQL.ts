import { Pool, PoolClient } from 'pg'

export class PostgreSQL {
  private static instance: PostgreSQL
  private readonly pool: Pool

  private constructor() {
    this.pool = new Pool({
      host: '127.0.0.1',
      user: 'postgres',
      database: 'example',
      password: 'postgres',
      port: 5432,
    })
  }

  private static getInstance(): PostgreSQL {
    if (!PostgreSQL.instance) {
      PostgreSQL.instance = new PostgreSQL()
    }
    return PostgreSQL.instance
  }

  public static async connection(): Promise<PoolClient> {
    try {
      return await PostgreSQL.getInstance().pool.connect()
    } catch (err) {
      throw err
    }
  }
}
