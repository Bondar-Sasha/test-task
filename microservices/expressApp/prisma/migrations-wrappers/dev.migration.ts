import { execSync } from 'child_process'
import envVars from '../../src/services/env.service.ts'

const migrationName = process.argv[2]

if (!migrationName) {
   throw new Error('Migration name is required')
}

execSync(`npx prisma migrate dev --name ${migrationName}`, {
   stdio: 'inherit',
   env: {
      AUTH_POSTGRES_DB_URL: envVars.AUTH_POSTGRES_DB_URL,
   },
})
