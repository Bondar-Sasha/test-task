import { spawnSync } from 'child_process'
import envVars from '../../src/services/env.service.ts'

spawnSync(`npx prisma migrate deploy`, {
   stdio: 'inherit',
   shell: true,
   env: {
      AUTH_POSTGRES_DB_URL: envVars.AUTH_POSTGRES_DB_URL,
   },
})
