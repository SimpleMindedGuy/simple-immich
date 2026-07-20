import type { SearchResponseDto } from "@immich/sdk";
import { hasUncaughtExceptionCaptureCallback } from "process";
import type { Result } from "src/core/data/base/result";
import { type IApiClientRequest, ApiMethods } from "src/core/data/base/util/apiClient";
import { ApiClient } from "src/core/engine/process/util/apiClient";
import { ApiEndPoints } from "../../../../Engine/Default/Immich/endPoints";


export interface AssetGetRequest {
	baseUrl: string | URL,
	headers: Record<string, string>,
	body: string | ArrayBuffer,

}

export async function AssetGetAll(request: AssetGetRequest) {


	const { baseUrl, headers, body } = request;

	const url = new URL(baseUrl + ApiEndPoints.asset);


	const apiClientInput: IApiClientRequest = {
		url: url,
		headers: headers,
		method: ApiMethods.POST,
		body: body,
	};

	const response: SearchResponseDto =
		await ApiClient<SearchResponseDto>(apiClientInput);

	if (!response) {
		//TODO: handle exceoptions
		throw hasUncaughtExceptionCaptureCallback();
	}

	const Result: Result<SearchResponseDto> = {
		Data: response,
		IsError: false,
		Message: "Assets Retrieved"
	}

	return Result;
}
