import swaggerUi from 'swagger-ui-express'
import { readFileSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

const swaggerDocument = yaml.load(readFileSync(join(process.cwd(), '.', 'swagger.yaml'), 'utf8')) as Record<
   string,
   unknown
>

export { swaggerUi, swaggerDocument }
