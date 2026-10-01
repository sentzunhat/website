import { Layers } from '@sentzunhat/zacatl/service'

import { routeHandlers } from '../../main/application/route-handlers/routes'
import { domainProviders } from '../../main/domain/providers/providers'
import { repositories } from '../../main/infrastructure/repositories/repositories'

export const createLayers = (): Layers =>
  new Layers({
    application: { entryPoints: { rest: { hooks: [], routes: routeHandlers } } },
    domain: { providers: domainProviders },
    infrastructure: { repositories },
  })
