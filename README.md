# The fal-serverless JS Client

![@fal-ai/serverless-client npm package](https://img.shields.io/npm/v/@fal-ai/serverless-client?color=%237527D7&label=client&style=flat-square)
![@fal-ai/serverless-nextjs npm package](https://img.shields.io/npm/v/@fal-ai/serverless-nextjs?color=%237527D7&label=nextjs-proxy&style=flat-square)
![Build](https://img.shields.io/github/actions/workflow/status/fal-ai/serverless-js/build.yml?style=flat-square)
![License](https://img.shields.io/github/license/fal-ai/serverless-js?style=flat-square)

## About the project

The fal-serverless JS/TS Client is a powerful and easy-to-use JavaScript and TypeScript library that allows you to effortlessly integrate and run your fal serverless functions in your Web, Node.js and React Native applications.

The project is written in TypeScript, so developers get type-safety out-of-the-box.

## Getting Started

The serverless-js library is a client for the fal serverless Python functions. Check the [quickstart guide](https://fal.ai/docs) in order to create your functions.

### Library

The client library is designed as a lightweight layer on top of the platform standards, such as `fetch` and `WebSocket`, ensuring smooth integration with your existing codebase.

It also handle platform differences, so it work seamlessly across different JS runtimes.

> **Note**
>
> Make sure you followed the [fal-serverless getting started](https://fal.ai/docs) so you get your credentials and register your functions.

1. First you need to configure your credentials:

```ts
import * as fal from '@fal-ai/serverless-js';

fal.config({
  // can also be auto-configured using environment variables
  credentials: "FAL_KEY_ID:FAL_KEY_SECRET",
});
```

2. Get your function id and run it:

```ts
const result = await fal.run('my-function-id');
```

The result type depends on the result of your Python function, types are mapped to their equivalent types in JS.

### The example Next.js app

You can find a minimal Next.js + fal application examples in [apps/demo-app/](https://github.com/fal-ai/serverless-js/tree/main/apps/demo-app).

1. Run `npm install` on the repository root.
2. Run `npx nx serve demo-app` to start the Next.js app.

#### The Next.js fal proxy

The Next.js + fal integration provides you with a proxy that allows you to run your functions directly from the browser without exposing your fal credentials.

1. Instal it with `npm install --save @fal-ai/serverless-nextjs`
2. Add the proxy as an API endpoint of your app, see an example here in [apps/demo-app/pages/api/_fal/proxy.ts](https://github.com/fal-ai/serverless-js/blob/main/apps/demo-app/pages/api/_fal/proxy.ts)

## Roadmap

See the [open feature requests](https://github.com/fal-ai/serverless-js/labels/enhancement) for a list of proposed features and join the discussion.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Make sure you read our [Code of Conduct](https://github.com/fal-ai/serverless-js/blob/main/CODE_OF_CONDUCT.md)
2. Fork the project and clone your fork
3. Setup the local environment with `npm install`
4. Create a feature branch (`git checkout -b feature/add-cool-thing`) or a bugfix branch (`git checkout -b fix/smash-that-bug`)
5. Commit the changes (`git commit -m 'feat(client): added a cool thing'`) - use [conventional commits](https://conventionalcommits.org)
6. Push to the branch (`git push --set-upstream origin feature/add-cool-thing`)
7. Open a Pull Request

Check the [good first issue queue](https://github.com/fal-ai/serverless-js/labels/good+first+issue), your contribution will be welcome!

## License

Distributed under the MIT License. See [LICENSE](https://github.com/fal-ai/serverless-js/blob/main/LICENSE) for more information.
