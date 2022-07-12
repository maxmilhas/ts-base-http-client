[![Actions Status](https://github.com/maxmilhas-org/ts-base-http-client/workflows/build/badge.svg)](https://github.com/maxmilhas-org/ts-base-http-client/actions)
[![Actions Status](https://github.com/maxmilhas-org/ts-base-http-client/workflows/test/badge.svg)](https://github.com/maxmilhas-org/ts-base-http-client/actions)
[![Actions Status](https://github.com/maxmilhas-org/ts-base-http-client/workflows/lint/badge.svg)](https://github.com/maxmilhas-org/ts-base-http-client/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/65e41e3018643f28168e/test_coverage)](https://codeclimate.com/github/maxmilhas-org/ts-base-http-client/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/65e41e3018643f28168e/maintainability)](https://codeclimate.com/github/maxmilhas-org/ts-base-http-client/maintainability)
[![Packages](https://david-dm.org/maxmilhas-org/ts-base-http-client.svg)](https://david-dm.org/maxmilhas-org/ts-base-http-client)
[![npm version](https://badge.fury.io/js/%40maxmilhas-org%2Fts-base-http-client.svg)](https://badge.fury.io/js/%40maxmilhas-org%2Fts-base-http-client)

This project offers a base http client with standardized parameters, ready to be extended or injected

## Quick Start

* To get this project running in your machine, first, install all dependencies `npm install`;
* Then, you need to create a *.env* file to set it up. You can use *.env.staging* or *.env.test* as an example;
* Finally, you can run `npm run start:dev` do test it directly running the .ts files;
* If you want to build it, run `npm run build`
* You can also run unit tests with coverage, with `npm run test:coverage`

### Who do I talk to

This project is maintained by the

## Requirements

To guarantee the correct functioning of this package the following dependencies are required:

* Node v10.0 or higher
* TypeScript v3.0 or higher

## How to use

This injecting purposes, BaseHttpClient can be extending and the constructor parameters passed with the corresponding injection tokens for your injection library, example:

``` ts
@Injectable()
export class MyHttpClient extends BaseHttpClient {
	constructor(
		config: MyApiConfig,
		logger: Logger,
	) {
		super(config, logger);
	}
}
```

MyApiConfig must implements [ApiConfig](./src/api-config.ts). The following properties are optional, though:
```ts
retries?: number; // default 1
logRequests?: boolean; // default false
contentType?: string; // default application/json
```

As you see, you also need to provide a Logger compatible with the [Logger interface](./src/Logger.ts).
Is you set logRequests to true, all the requests made by that instance of client will be logged i the curl format, which is very useful for debug purposes (but not quite production fit).


The methods **get**, **post**, **put**, **delete** and **patch** have a closed use and will return directly the body of the request. If you need more advanced use, rely on **req**, a method where you need to specify the verb of your http request as the first parameters, but it returns a known superagent request object with timeout, retry, content-type and, if enabled, the logger, already set,

## References

* [www.maxmilhas.com.br](https://www.maxmilhas.com.br/ "www.maxmilhas.com.br")

## Contributing

Anyone from MaxMilhas can contribute to this project since the changes follows the rules described on [CONTRIBUTING.md](./CONTRIBUTING.md).
