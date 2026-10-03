import { requestUrl, type RequestUrlParam, type RequestUrlResponse } from "obsidian";
import type { TResult } from "src/Base/Abstract/result";



export interface HttpClientRequest {

	url: URL | string;
	body?: string | ArrayBuffer,
	headers?: Record<string, string>,
	abortSignal?: AbortSignal | null,
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



type DataMppaer<T> = (rawData: unknown) => T;


export enum HttpMethod {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}



export class HttpClient {

	async GetAsync<T>(request: HttpClientRequest, Mapper: DataMppaer<T>): Promise<TResult<T>> {

		const { url, body, headers, abortSignal = null } = request;

		const options: INormalizedHttpRequestOptions = {
			url: url,
			headers: headers,
			body: body,
			abortSignal: abortSignal,
			method: HttpMethod.GET,
		}


		return await this._ExecuteAsync<T>(options, Mapper);
	}


	async PostAsync<T>(request: HttpClientRequest, Mapper: DataMppaer<T>): Promise<TResult<T>> {

		const { url, body, headers, abortSignal = null } = request;

		const options: INormalizedHttpRequestOptions = {
			url: url,
			headers: headers,
			body: body,
			abortSignal: abortSignal,
			method: HttpMethod.POST,
		}


		return await this._ExecuteAsync<T>(options, Mapper);
	}




	protected async _ExecuteAsync<T>(options: INormalizedHttpRequestOptions, Mapper: DataMppaer<T>) {




		if (!options.url) {

			return this._ReturnInvalidUrlResponse(options.url);

		}

		if (!options) {

			return this._ReturnInvalidOptionsResponse(options);

		}

		try {


			const RequestOptions: RequestInit = {
				headers: options.headers,
				body: options.body,
				signal: options.abortSignal,
				method: options.method,

			}
			const res = await fetch(options.url, RequestOptions);

			const rawData = await res.json() ?? await res.text();

			const normalizedResponse: INormalizedHttpResponse = {

				data: rawData,
				status: res.status
			}

			return await this._HandleResponse<T>(normalizedResponse, Mapper);
		}
		catch (error) {

			return this._ReturnUnHandledErrorResponse(error as Error);

		}



	}


	protected async _HandleResponse<T>(response: INormalizedHttpResponse, Mapper: DataMppaer<T>): Promise<TResult<T>> {

		let IsSuccess = false;

		if (response.status <= 400 && response.status >= 599) {
			IsSuccess = true;
		}

		const Messages = [];

		Messages.push(HttpClient.GetStatusMessage(response.status));


		if (!IsSuccess) {

			const result: TResult<never> = {
				Success: false,
				Messages,
				Code: response.status,
			}

			return result;
		}


		let MappedData: T | null = null;

		if (response.data) {

			MappedData = Mapper(response.data);
		}



		const result: TResult<T> = {
			Success: true,
			Messages,
			Data: MappedData,
			Code: response.status,
		}


		return result;
	}

	protected static GetStatusMessage(statusCode: number) {

		switch (statusCode) {
			// informational responses
			case 100: return "Continue: The client should continue the request or ignore if already finished.";
			case 101: return "Switching Protocols: The server is changing protocols according to the client's request.";
			case 102: return "Processing: The server has received and is processing the request, but no response is available yet.";
			case 103: return "Early Hints: Used to return some response headers before final HTTP message.";

			// success responses
			case 200: return "OK: The request succeeded.";
			case 201: return "Created: The request succeeded, and a new resource was created.";
			case 202: return "Accepted: The request has been received but not yet acted upon.";
			case 204: return "No Content: The server successfully processed the request, but is not returning any content.";
			case 206: return "Partial Content: The server is delivering only part of the resource.";

			// redirect response
			case 300: return "Multiple Choices: The request has more than one possible response.";
			case 301: return "Moved Permanently: The URL of the requested resource has been changed permanently.";
			case 302: return "Found: The URI of the requested resource has been changed temporarily.";
			case 304: return "Not Modified: The resource has not been modified since the last request.";
			case 307: return "Temporary Redirect: The requested resource resides temporarily under a different URI.";
			case 308: return "Permanent Redirect: The requested resource has been definitively moved to a different URI.";


			//client side error responses
			case 400: return "Bad Request: The server could not understand the request.";
			case 401: return "Unauthorized: Authentication is required and has failed or has not yet been provided.";
			case 403: return "Forbidden: You do not have permissions to access this resource.";
			case 404: return "Not Found: Invalid request path or resource missing.";
			case 408: return "Request Timeout: The server timed out waiting for the request.";
			case 429: return "Too Many Requests: Rate limit exceeded.";


			//server side error responses
			case 500: return "Internal Server Error: The server encountered a situation it doesn't know how to handle.";
			case 501: return "Not Implemented: The request method is not supported by the server and cannot be handled.";
			case 502: return "Bad Gateway: The server got an invalid response while working as a gateway.";
			case 503: return "Service Unavailable: The server is not ready to handle the request (e.g., down for maintenance).";
			case 504: return "Gateway Timeout: The server is acting as a gateway and cannot get a response in time.";

			default: return `Un handled status Message status code ${statusCode}.`;
		}




	}

	protected _ReturnInvalidUrlResponse(url: string): TResult<null> {

		const result: TResult<null> = {
			Success: false,
			Messages: [`Invalid Or Missing  Url : ${url}`],
			Code: 0,

		}

		return result;


	}



	protected _ReturnInvalidOptionsResponse(options: unknown): TResult<null> {

		const result: TResult<null> = {
			Success: false,
			Messages: [`Invalid Or Missing Options, Option Object returned in the Error object in response. `],
			Code: 0,
			Error: options

		}

		return result;


	}

	protected _ReturnUnHandledErrorResponse(error: Error): TResult<null> {

		const result: TResult<null> = {
			Success: false,
			Messages: [`HttpClient Unhandled Error  : ${error?.message}`],
			Code: 0,
			Error: error,


		}

		return result;


	}


}


export class ObsidianHttpClient extends HttpClient {



	override async _ExecuteAsync<T>(options: INormalizedHttpRequestOptions, Mapper: DataMppaer<T>) {


		if (!options) {

			return this._ReturnInvalidOptionsResponse(options);

		}

		if (!options.url) {

			return this._ReturnInvalidUrlResponse(options.url);

		}


		try {

			const request: RequestUrlParam = {
				url: options.url.toString(),
				headers: options.headers,
				body: options.body,
				method: options.method,
				throw: false,
			}

			const response: RequestUrlResponse = await requestUrl(request);

			const rawData = await response.json ?? response.text;

			const normalizedResponse: INormalizedHttpResponse = {

				data: rawData,
				status: response.status
			}


			return await this._HandleResponse<T>(normalizedResponse, Mapper);
		}
		catch (error) {

			return this._ReturnUnHandledErrorResponse(error as Error);

		}

	}



}
