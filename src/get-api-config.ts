import { Defaults, ApiConfig } from './api-config';

const ms = require('ms');
const DEFAULT_TIMEOUT = ms('30s');

export function getMs(value: string | undefined): number {
	return value ? ms(value) : NaN;
}

export function getApiConfig(
	envs: Record<string, string | undefined>,
	apiName: string,
	defaults?: Defaults,
): ApiConfig {
	return {
		timeout:
			getMs(envs[`${apiName}_TIMEOUT`]) || defaults?.timeout || DEFAULT_TIMEOUT,
		retries: Number(envs[`${apiName}_RETRIES`]) || defaults?.retries,
		contentType: envs[`${apiName}_CONTENT_TYPE`] || defaults?.contentType,
		url:
			envs[`${apiName}_BASE_URL`] ||
			envs[`${apiName}_BASE_URI`] ||
			envs[`${apiName}_URL`] ||
			envs[`${apiName}_URI`]!,
		logRequests: envs[`${apiName}_LOG_REQUESTS`] === 'true',
	};
}

export function getApiConfigFromMap(
	envs: Map<string, string>,
	apiName: string,
	defaults?: Defaults,
): ApiConfig {
	return {
		timeout:
			getMs(envs.get(`${apiName}_TIMEOUT`)) ||
			defaults?.timeout ||
			DEFAULT_TIMEOUT,
		retries: Number(envs.get(`${apiName}_RETRIES`)) || defaults?.retries,
		contentType: envs.get(`${apiName}_CONTENT_TYPE`) || defaults?.contentType,
		url:
			envs.get(`${apiName}_BASE_URL`) ||
			envs.get(`${apiName}_BASE_URI`) ||
			envs.get(`${apiName}_URL`) ||
			envs.get(`${apiName}_URI`)!,
		logRequests: envs.get(`${apiName}_LOG_REQUESTS`) === 'true',
	};
}
