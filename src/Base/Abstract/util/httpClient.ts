import type { TResult } from "../result";



export interface HttpClientRequest {
	url: URL | string;
	body?: string | ArrayBuffer,
	headers?: Record<string, string>,
	abortSignal?: AbortSignal | null,
}

export type DataMppaer<T> = (rawData: unknown) => T;

export interface IHttpClient {
	GetAsync<T>(request: HttpClientRequest, Mapper: DataMppaer<T>): Promise<TResult<T>>
	PostAsync<T>(request: HttpClientRequest, Mapper: DataMppaer<T>): Promise<TResult<T>>
	PutAsync<T>(request: HttpClientRequest, Mapper: DataMppaer<T>): Promise<TResult<T>>
	PatchAsync<T>(request: HttpClientRequest, Mapper: DataMppaer<T>): Promise<TResult<T>>
	DeleteAsync<T>(request: HttpClientRequest, Mapper: DataMppaer<T>): Promise<TResult<T>>
}

export enum HttpMethod {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

export interface INormalizedHttpRequestOptions {
	url: URL | string;
	method: HttpMethod

	body?: string | ArrayBuffer,
	headers?: Record<string, string>,
	abortSignal?: AbortSignal | null,
}


export interface INormalizedHttpResponse {
	status: number;
	data: unknown;
}


