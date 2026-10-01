import { GetRouteHandler } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/fastify/handlers/get-route-handler'
import { singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'

interface HealthResponse {
  ok: true
  service: string
  timestamp: string
}

@singleton()
export class HealthHandler extends GetRouteHandler<void, void, HealthResponse> {
  constructor() {
    super({ url: '/api/health', schema: {} })
  }

  public handler(): HealthResponse {
    return {
      ok: true,
      service: 'sentzunhat-website',
      timestamp: new Date().toISOString(),
    }
  }
}
