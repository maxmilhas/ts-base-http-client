import request = require('superagent');
import { ApiConfig } from './api-config';
import { Logger } from './logger';
import Agent = require('agentkeepalive');

export enum Methods {
	DELETE = 'delete',
	GET = 'get',
	PATCH = 'patch',
	POST = 'post',
	PUT = 'put',
}

/**
 * A base http client with request logging capabilities and standardized entry config
 */
export class BaseHttpClient {
	private readonly defaultContentType: string;
	private readonly agent: Agent;
	/**
	 * Create a new instance of BaseHttpClient
	 * @param config the client configuration
	 * @param logger the logger to use in case of request logging being enabled
	 */
	constructor(private config: ApiConfig, private logger: Logger) {
		this.defaultContentType = this.config.contentType || 'application/json';
		this.agent = new (
			this.config.url.toLowerCase().startsWith('https:')
				? Agent.HttpsAgent
				: Agent
		)(
			config.agent || {
				maxFreeSockets: 50,
				timeout: 60000,
				freeSocketTimeout: 30000,
			},
		);
	}

	/**
	 * Mounts a request with the specified method
	 * @param method The method to use
	 * @param resource the resource to be accessed (the base url is used from the config)
	 * @param contentType the contentType to use (default is get from config or, if not informed, application/json)
	 * @returns an superagent request object with timeout, retry and content-type set
	 */
	req(
		method: Methods,
		resource: string,
		contentType = this.defaultContentType,
	) {
		const result = request[method](`${this.config.url}/${resource}`)
			.agent(this.agent)
			.timeout(this.config.timeout)
			.retry(this.config.retries ?? 0)
			.set('content-type', contentType);

		return this.config.logRequests
			? result.use(require('superdebug')(this.logger.info.bind(this.logger)))
			: result;
	}

	/**
	 * Mounts a post request
	 * @param resource the resource to be accessed (the base url is used from the config)
	 * @parm payload The payload to be sent
	 * @param contentType the contentType to use (default is get from config or, if not informed, application/json)
	 * @returns an superagent request object with timeout, retry and content-type and body set
	 */
	async post(resource: string, payload: object, contentType?: string) {
		return (await this.req(Methods.POST, resource, contentType).send(payload))
			.body;
	}

	/**
	 * Mounts a get request
	 * @param resource the resource to be accessed (the base url is used from the config)
	 * @param contentType the contentType to use (default is get from config or, if not informed, application/json)
	 * @returns an superagent request object with timeout, retry and content-type and body set
	 */
	async get(resource: string, queryParams?: object) {
		const req = this.req(Methods.GET, resource);
		return (await (queryParams ? req.query(queryParams) : req)).body;
	}

	/**
	 * Mounts a put request
	 * @param resource the resource to be accessed (the base url is used from the config)
	 * @payload The payload to be sent
	 * @param contentType the contentType to use (default is get from config or, if not informed, application/json)
	 * @returns an superagent request object with timeout, retry and content-type and body set
	 */
	async put(resource: string, payload: object, contentType?: string) {
		return (await this.req(Methods.PUT, resource, contentType).send(payload))
			.body;
	}

	/**
	 * Mounts a patch request
	 * @param resource the resource to be accessed (the base url is used from the config)
	 * @payload The payload to be sent
	 * @param contentType the contentType to use (default is get from config or, if not informed, application/json)
	 * @returns an superagent request object with timeout, retry and content-type and body set
	 */
	async patch(resource: string, payload: object, contentType?: string) {
		return (await this.req(Methods.PATCH, resource, contentType).send(payload))
			.body;
	}

	/**
	 * Mounts a delete request
	 * @param resource the resource to be accessed (the base url is used from the config)
	 * @payload The payload to be sent
	 * @param contentType the contentType to use (default is get from config or, if not informed, application/json)
	 * @returns an superagent request object with timeout, retry and content-type and body set
	 */
	async delete(resource: string, contentType?: string) {
		return (await this.req(Methods.DELETE, resource, contentType)).body;
	}
}
