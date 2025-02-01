import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'

import sellerReturnRequest from '../../../links/seller-return-request'

/**
 * @oas [get] /admin/return-request
 * operationId: "AdminListOrderReturnRequests"
 * summary: "List return requests"
 * description: "Retrieves requests list"
 * x-authenticated: true
 * parameters:
 *   - in: query
 *     name: limit
 *     schema:
 *       type: number
 *     description: The number of items to return. Default 50.
 *   - in: query
 *     name: offset
 *     schema:
 *       type: number
 *     description: The number of items to skip before starting the response. Default 0.
 *   - name: fields
 *     in: query
 *     schema:
 *       type: string
 *     required: false
 *     description: Comma-separated fields to include in the response.
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             order_return_request:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/OrderReturnRequest"
 *             count:
 *               type: integer
 *               description: The total number of requests
 *             offset:
 *               type: integer
 *               description: The number of requests skipped
 *             limit:
 *               type: integer
 *               description: The number of requests per page
 * tags:
 *   - OrderReturnRequest
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 */
export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: orderReturnRequests, metadata } = await query.graph({
    entity: sellerReturnRequest.entryPoint,
    fields: req.remoteQueryConfig.fields.map(
      (field) => `order_return_request.${field}`
    ),
    filters: req.filterableFields,
    pagination: req.remoteQueryConfig.pagination
  })

  res.json({
    order_return_request: orderReturnRequests.map(
      (rel) => rel.order_return_request
    ),
    count: metadata!.count,
    offset: metadata!.skip,
    limit: metadata!.take
  })
}
