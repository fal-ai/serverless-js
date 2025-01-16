import { DEFAULT_PROXY_ROUTE, handleRequest } from "@fal-ai/server-proxy";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

/**
 * The default API Gateway route for the fal.ai client proxy.
 */
export const PROXY_ROUTE = DEFAULT_PROXY_ROUTE;

/**
 * The API Gateway route handler for the fal.ai client proxy.
 * Use it as a handler for AWS Lambda
 *
 * Note: This proxy doesn't support streaming responses.
 *
 * @param request the API Gateway request object.
 * @returns a promise that resolves when the request is handled.
 */

export async function handler(
  request: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  const response: APIGatewayProxyResultV2 = { headers: {} };

  return handleRequest({
    id: "lambda-fal-proxy",
    method: request.requestContext.http.method,
    getRequestBody: async () => request.body,
    getHeaders: () => request.headers,
    getHeader: (name: string) => request.headers[name],
    sendHeader: (name: string, value: string) => {
      response.headers![name] = value;
    },
    respondWith: (status: number, data: string) => {
      response.statusCode = status;
      response.body = data;
      return response;
    },
    sendResponse: async (res: Response) => {
      response.statusCode = res.status;
      response.body = await res.text();
      return response;
    },
  });
}
