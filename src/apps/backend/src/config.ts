const readPositiveInteger = (name: string, fallback: number): number => {
  const value = Number(process.env[name] ?? fallback)
  if (!Number.isInteger(value) || value <= 0) throw new Error(`${name} must be a positive integer`)
  return value
}

export const config = {
  serviceName: 'sentzunhat-website',
  host: process.env.HOST ?? '127.0.0.1',
  port: readPositiveInteger('PORT', 3001),
  databasePath: process.env.DATABASE_PATH ?? '../../data/website.sqlite',
  logLevel: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'warn'),
} as const
