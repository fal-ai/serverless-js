# Fal AI Lambda Proxy

This is a serverless proxy for Fal AI services deployed on AWS Lambda using CDK.

## Prerequisites

- Node.js 20.x or later
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Setup

1. Clone the repository and navigate to the app directory:

   ```bash
   cd apps/demo-lambda-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file based on the example:

   ```bash
   cp .env.example .env.local
   ```

4. Add your Fal AI API key to `.env.local`:
   ```
   FAL_KEY=your-fal-ai-key-here
   ```

## Deployment

1. Bootstrap CDK (if you haven't already):

   ```bash
   cdk bootstrap
   ```

2. Deploy the stack:
   ```bash
   cdk deploy
   ```

After deployment, CDK will output the `FalProxyUrl`. Save this URL - you'll need it to configure your client.

## Stack Components

- **Lambda Function**: Runs on Node.js 20.x with ARM64 architecture
- **API Gateway**: HTTP API with CORS enabled
- **Environment Variables**: Securely stores your FAL_KEY

## Usage with fal-js client

Once you have the proxy URL from the CDK output, you can use it with the fal-js client in your frontend application:

```typescript
import * as fal from '@fal-ai/serverless-client'

// Initialize fal client with your proxy URL
fal.config({
  proxyUrl: 'YOUR_PROXY_URL_FROM_CDK_OUTPUT' // e.g., https://xxxxx.execute-api.region.amazonaws.com
});

## Security Notes

- Ensure your `.env.local` file is not committed to version control
- The API Gateway is configured to accept requests from any origin (`*`)
- Consider restricting CORS settings in production
```
