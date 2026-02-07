import { requestUrl, type RequestUrlResponse } from "obsidian";
import { hasUncaughtExceptionCaptureCallback } from "process";



export interface apiClientInput {

	url: URL | string,
	headers: Record<string, string> | undefined,
	method: apiMethods,
	body?: string | ArrayBuffer | undefined,
}


export enum apiMethods {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

export const status_Success = [200, 201];


export async function apiClient<T>(

	input: apiClientInput

): Promise<T> {


	const { url, method, body, headers } = input



	const response = await requestUrl({
		url: url.toString(),
		method: method,
		body: body,
		headers: headers,
		throw: false,
	})
		.then(async (response: RequestUrlResponse) => {

			if (!status_Success.includes(response.status)) {

				console.error(`API_client fail : status code ${response.status}`);
				console.error(response)

				throw hasUncaughtExceptionCaptureCallback();
			}

			console.info(`API_client success : status code ${response.status}\nresponse : `, response);
			const json = await response.json as T;

			return json;
		}).catch(err => {

			console.error("API_client fatal Error, unhandeled Exception.")
			console.error(err)
			throw hasUncaughtExceptionCaptureCallback();
		});

	return response;
}



