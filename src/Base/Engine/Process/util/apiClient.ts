import { requestUrl, type RequestUrlResponse } from "obsidian";
import { hasUncaughtExceptionCaptureCallback } from "process";
import type { IApiClientRequest } from "src/Base/Abstract/util/apiClient";


export const status_Success = [200, 201];

export async function ApiClient<T>(input: IApiClientRequest): Promise<T> {
	const { url, method, body, headers } = input;

	const response: RequestUrlResponse = await requestUrl({
		url: url.toString(),
		method: method,
		body: body,
		headers: headers,
		throw: false,
	})

	if (!status_Success.includes(response.status)) {
		throw hasUncaughtExceptionCaptureCallback();
	}

	const json: T = await response.json as T;

	return json;

}

