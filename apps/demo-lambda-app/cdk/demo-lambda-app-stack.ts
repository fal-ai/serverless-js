import { App, CfnOutput, Duration, Stack, type StackProps } from "aws-cdk-lib";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";
import { configDotenv } from "dotenv";
import { join } from "node:path";

configDotenv({ path: ".env.local" });

export class DemoLambdaAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, "FalProxyHandler", {
      entry: join(__dirname, "../src/index.ts"),
      functionName: "FalProxyHandler",
      runtime: Runtime.NODEJS_20_X,
      architecture: Architecture.ARM_64,
      timeout: Duration.seconds(30),
      environment: {
        FAL_KEY: process.env.FAL_KEY!,
      },
      bundling: {
        sourceMap: true,
      },
    });

    const httpApi = new HttpApi(this, "FalProxyApi", {
      apiName: "Fal Proxy API",
      corsPreflight: {
        allowHeaders: ["*"],
        allowOrigins: ["*"],
        allowMethods: [CorsHttpMethod.ANY],
      },
    });
    httpApi.addRoutes({
      path: "/{proxy+}",
      methods: [HttpMethod.POST, HttpMethod.GET],
      integration: new HttpLambdaIntegration("DefaultIntegration", handler),
    });

    new CfnOutput(this, "FalProxyUrl", {
      value: httpApi.url || "Something went wrong with the deployment",
    });
  }
}

const app = new App();
new DemoLambdaAppStack(app, "DemoLambdaAppStack", {});
