import { readFileSync } from 'fs'
import { join } from 'path'

export function loadSwaggerDocument() {
   const filePath = join(process.cwd(), 'src/swagger.json')

   try {
      const fileContents = readFileSync(filePath, 'utf8')
      return JSON.parse(fileContents) as Record<string, unknown>
   } catch (error) {
      console.error('Failed to load Swagger document:', error)
      throw new Error(`Could not load Swagger JSON file at ${filePath}`)
   }
}
