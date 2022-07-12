export interface AgentConfig {
	keepAlive?: boolean;
	freeSocketTimeout?: number;
	freeSocketKeepAliveTimeout?: number;
	timeout?: number;
	socketActiveTTL?: number;
}

export interface ApiConfig {
	url: string;
	timeout: number;
	retries?: number;
	logRequests?: boolean;
	contentType?: string;
	agent?: AgentConfig;
}

export interface Defaults {
	contentType?: string;
	retries?: number;
	timeout?: number;
}
