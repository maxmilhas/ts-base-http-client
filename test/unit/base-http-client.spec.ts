let superdebug: jest.SpyInstance;
let agentKeepAlive: jest.SpyInstance;
jest.mock(
	'superdebug',
	() => (superdebug = jest.fn().mockReturnValue('superdebug engaged')),
);
jest.mock(
	'agentkeepalive',
	() => (agentKeepAlive = jest.fn().mockImplementation((x) => x)),
);
import AgentKeepAlive = require('agentkeepalive');
import superagent = require('superagent');
import { ApiConfig, BaseHttpClient, Methods, Logger } from '../../src';
import { expectCallsLike, getNames } from '../jest-setup';

const methods = getNames(BaseHttpClient);

describe(BaseHttpClient.name, () => {
	let target: BaseHttpClient;
	let config: ApiConfig;
	let logger: Logger;

	beforeEach(() => {
		config = { url: '' } as any;
		logger = {} as any;

		target = new BaseHttpClient(config, logger);
	});

	it('should start correctly with https', () => {
		const stub = ((agentKeepAlive as any).HttpsAgent = jest
			.fn()
			.mockImplementation((x) => x));

		const result = new BaseHttpClient({ url: 'hTtpS://aaa' } as any, logger);

		expect(stub).toHaveBeenCalled();
		expect(result).toBeInstanceOf(BaseHttpClient);
	});

	it('should assume application/json as default contentType when it is not informed', () => {
		expect(target['defaultContentType']).toBe('application/json');
	});

	it('should assume default Agent parameters when no agent config is informed', () => {
		expectCallsLike(agentKeepAlive, [
			{
				maxFreeSockets: 50,
				timeout: 60000,
				freeSocketTimeout: 30000,
			},
		]);
	});

	it('should use informed contentType', () => {
		config.contentType = 'new content type';
		const newTarget = new BaseHttpClient(config, logger);

		expect(newTarget['defaultContentType']).toBe('new content type');
	});

	it('should use informed agent config', () => {
		config.agent = { info: 'new content type' } as any;
		new BaseHttpClient(config, logger);

		expect(agentKeepAlive).toHaveBeenCalledWith({
			info: 'new content type',
		});
	});

	describe(methods.req, () => {
		let request: superagent.SuperAgentRequest;
		let mockedHttpMethod: jest.SpyInstance;

		beforeEach(() => {
			config.retries = 'retries value' as any;
			config.timeout = 'timeout value' as any;
			config.url = 'url value' as any;
			request = Promise.resolve('expected result') as any;
			request.retry = jest.fn().mockReturnValue(request);
			request.timeout = jest.fn().mockReturnValue(request);
			request.set = jest.fn().mockReturnValue(request);
			request.use = jest.fn().mockReturnValue(request);
			request.agent = jest.fn().mockReturnValue(request);
			mockedHttpMethod = (superagent as any).someHttpMethod = jest
				.fn()
				.mockReturnValue(request);
			logger.info = { bind: jest.fn().mockReturnValue('bound info') } as any;
		});

		it('should call the resource with the given method and the configured timeout and number of retries', async () => {
			const result = await target.req(
				'someHttpMethod' as any,
				'the resource that I want',
				'my content type',
			);

			expectCallsLike(mockedHttpMethod, ['url value/the resource that I want']);
			expectCallsLike(request.retry, ['retries value']);
			expectCallsLike(request.timeout, ['timeout value']);
			expectCallsLike(request.set, ['content-type', 'my content type']);
			expectCallsLike(request.agent, [
				new AgentKeepAlive({
					maxFreeSockets: 50,
					timeout: 60000,
					freeSocketTimeout: 30000,
				}),
			]);
			expect(superdebug).toBeUndefined();
			expectCallsLike(request.use);
			expectCallsLike(logger.info.bind);
			expect(result).toEqual('expected result');
		});

		it('should call the resource with the given method and the configured timeout and no retries and default content type, when they are not informed', async () => {
			(target as any).defaultContentType = 'default content type';
			config.retries = undefined;

			const result = await target.req(
				'someHttpMethod' as any,
				'the resource that I want',
			);

			expectCallsLike(mockedHttpMethod, ['url value/the resource that I want']);
			expectCallsLike(request.retry, [1]);
			expectCallsLike(request.timeout, ['timeout value']);
			expectCallsLike(request.set, ['content-type', 'default content type']);
			expect(superdebug).toBeUndefined();
			expectCallsLike(request.use);
			expectCallsLike(request.agent, [
				new AgentKeepAlive({
					maxFreeSockets: 50,
					timeout: 60000,
					freeSocketTimeout: 30000,
				}),
			]);
			expectCallsLike(logger.info.bind);
			expect(result).toEqual('expected result');
		});

		it('should call the resource and log the call when logRequests is true', async () => {
			config.logRequests = true;

			const result = await target.req(
				'someHttpMethod' as any,
				'the resource that I want',
				'my content type',
			);

			expectCallsLike(mockedHttpMethod, ['url value/the resource that I want']);
			expectCallsLike(request.retry, ['retries value']);
			expectCallsLike(request.timeout, ['timeout value']);
			expectCallsLike(request.set, ['content-type', 'my content type']);
			expectCallsLike(logger.info.bind, [logger]);
			expectCallsLike(superdebug, ['bound info']);
			expectCallsLike(request.use, ['superdebug engaged']);
			expectCallsLike(request.agent, [
				new AgentKeepAlive({
					maxFreeSockets: 50,
					timeout: 60000,
					freeSocketTimeout: 30000,
				}),
			]);
			expect(result).toEqual('expected result');
		});
	});

	describe(methods.post, () => {
		let request: superagent.SuperAgentRequest;

		beforeEach(() => {
			request = Promise.resolve({ body: 'expected result' }) as any;
			request.send = jest.fn().mockReturnValue(request);
			jest.spyOn(target, 'req').mockReturnValue(request);
		});

		it('should call the resource with the given method and the configured timeout and number of retries', async () => {
			const result = await target.post(
				'the resource that I want',
				{
					payload: 'value',
				},
				'my content type',
			);

			expectCallsLike(target.req, [
				Methods.POST,
				'the resource that I want',
				'my content type',
			]);
			expectCallsLike(request.send, [
				{
					payload: 'value',
				},
			]);
			expect(result).toEqual('expected result');
		});
	});

	describe(methods.delete, () => {
		let request: superagent.SuperAgentRequest;

		beforeEach(() => {
			request = Promise.resolve({ body: 'expected result' }) as any;
			jest.spyOn(target, 'req').mockReturnValue(request);
		});

		it('should call the resource with the given method and the configured timeout and number of retries', async () => {
			const result = await target.delete(
				'the resource that I want',
				'my content type',
			);

			expectCallsLike(target.req, [
				Methods.DELETE,
				'the resource that I want',
				'my content type',
			]);
			expect(result).toEqual('expected result');
		});
	});

	describe(methods.patch, () => {
		let request: superagent.SuperAgentRequest;

		beforeEach(() => {
			request = Promise.resolve({ body: 'expected result' }) as any;
			request.send = jest.fn().mockReturnValue(request);
			jest.spyOn(target, 'req').mockReturnValue(request);
		});

		it('should call the resource with the given method and the configured timeout and number of retries', async () => {
			const result = await target.patch(
				'the resource that I want',
				{
					payload: 'value',
				},
				'my content type',
			);

			expectCallsLike(target.req, [
				Methods.PATCH,
				'the resource that I want',
				'my content type',
			]);
			expectCallsLike(request.send, [
				{
					payload: 'value',
				},
			]);
			expect(result).toEqual('expected result');
		});
	});

	describe(methods.put, () => {
		let request: superagent.SuperAgentRequest;

		beforeEach(() => {
			request = Promise.resolve({ body: 'expected result' }) as any;
			request.send = jest.fn().mockReturnValue(request);
			jest.spyOn(target, 'req').mockReturnValue(request);
		});

		it('should call the resource with the given method and the configured timeout and number of retries', async () => {
			const result = await target.put(
				'the resource that I want',
				{
					payload: 'value',
				},
				'my content type',
			);

			expectCallsLike(target.req, [
				Methods.PUT,
				'the resource that I want',
				'my content type',
			]);
			expectCallsLike(request.send, [
				{
					payload: 'value',
				},
			]);
			expect(result).toEqual('expected result');
		});
	});

	describe(methods.get, () => {
		let request: superagent.SuperAgentRequest;

		beforeEach(() => {
			request = Promise.resolve({ body: 'expected result' }) as any;
			request.query = jest.fn().mockReturnValue(request);
			jest.spyOn(target, 'req').mockReturnValue(request);
		});

		it('should call the resource with the given querystring the configured timeout and number of retries', async () => {
			const result = await target.get('the resource that I want', {
				payload: 'value',
			});

			expectCallsLike(target.req, [Methods.GET, 'the resource that I want']);
			expectCallsLike(request.query, [
				{
					payload: 'value',
				},
			]);
			expect(result).toEqual('expected result');
		});

		it('should call the resource with no querystring when it is not informed', async () => {
			const result = await target.get('the resource that I want');

			expectCallsLike(target.req, [Methods.GET, 'the resource that I want']);
			expectCallsLike(request.query);
			expect(result).toEqual('expected result');
		});
	});
});
