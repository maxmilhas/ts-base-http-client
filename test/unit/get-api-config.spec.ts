import { ApiConfig, getApiConfig } from './../../src';
import ms = require('ms');

describe(getApiConfig.name, () => {
	it('should return all the default values for the non informed envs vars', () => {
		const envs: Record<string, string | undefined> = {
			MY_API_URL: 'my url',
		};

		const result = getApiConfig(envs, 'MY_API');

		expect(result).toEqual({
			timeout: ms('30s'),
			url: 'my url',
			retries: undefined,
			contentType: undefined,
			logRequests: false,
		} as ApiConfig);
	});

	it('should return all the informed default values for the non informed envs vars', () => {
		const envs: Record<string, string | undefined> = {
			MY_API_BASE_URI: 'my url',
		};

		const result = getApiConfig(envs, 'MY_API', {
			contentType: 'application/pokemon',
			retries: 10,
			timeout: ms('3s'),
		});

		expect(result).toEqual({
			timeout: ms('3s'),
			url: 'my url',
			retries: 10,
			contentType: 'application/pokemon',
			logRequests: false,
		} as ApiConfig);
	});

	it('should return all the informed values', () => {
		const envs: Record<string, string | undefined> = {
			MY_API_BASE_URL: 'my url',
			MY_API_TIMEOUT: '10s',
			MY_API_RETRIES: '5',
			MY_API_LOG_REQUESTS: 'true',
			MY_API_CONTENT_TYPE: 'application/he-man',
		};

		const result = getApiConfig(envs, 'MY_API', {
			retries: 10,
			timeout: ms('3s'),
		});

		expect(result).toEqual({
			timeout: ms('10s'),
			url: 'my url',
			retries: 5,
			contentType: 'application/he-man',
			logRequests: true,
		} as ApiConfig);
	});
});
