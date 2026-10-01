import type { RouteHandler } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/fastify/handlers/route-handler'
import type { Constructor } from '@sentzunhat/zacatl/service/layers/types'

import { healthRouteHandlers } from '../../../areas/health/application/route-handlers/routes'
import { pageRouteHandlers } from '../../../areas/pages/application/route-handlers/routes'
import { projectRouteHandlers } from '../../../areas/projects/application/route-handlers/routes'

export const routeHandlers: Constructor<RouteHandler<unknown, unknown, unknown, unknown, unknown>>[] = [
  ...healthRouteHandlers,
  ...pageRouteHandlers,
  ...projectRouteHandlers,
] as Constructor<RouteHandler<unknown, unknown, unknown, unknown, unknown>>[]
