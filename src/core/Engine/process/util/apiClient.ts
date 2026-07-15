import { requestUrl, type RequestUrlResponse } from "obsidian";
import { hasUncaughtExceptionCaptureCallback } from "process";
import type { IApiClientRequest } from "src/core/data/base/util/apiClient";


export const status_Success = [200, 201];

export async function ApiClient<T>(input: IApiClientRequest): Promise<T> {
	const { url, method, body, headers } = input;

	const response = await requestUrl({
		url: url.toString(),
		method: method,
		body: body,
		headers: headers,
		throw: false,
	})
		.then(async (res: RequestUrlResponse) => {
			if (!status_Success.includes(res.status)) {
				throw hasUncaughtExceptionCaptureCallback();
			}

			return (await res.json) as T;
		})
		.catch(() => {
			throw hasUncaughtExceptionCaptureCallback();
		});

	return response;
}


// export class apiClient_Object {
//
// 	async Get(request: apiClientRequest) {
//
// 		const { url, body, headers } = request;
//
//
// 		return await requestUrl({
// 			url: url.toString(),
// 			method: ApiMethods.GET,
// 			body: body,
// 			headers: headers
// 		});
//
// 	};
//
//
//
// }
