import { AppRoutes } from '@test_task/shared/routes'

const { prefix } = AppRoutes.authRoutes()

export const baseAuthUrl = AppRoutes.backendPrefix + prefix
