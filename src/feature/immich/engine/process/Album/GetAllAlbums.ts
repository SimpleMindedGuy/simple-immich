import type { AlbumResponseDto } from "@immich/sdk";
import { hasUncaughtExceptionCaptureCallback } from "process";
import type { Result } from "src/core/data/base/result";
import { type IApiClientRequest, ApiMethods } from "src/core/data/base/util/apiClient";
import { ApiClient } from "src/core/engine/process/util/apiClient";
import { ApiEndPoints } from "../../default/endPoints";

export interface AlbumGetRequest {
	baseUrl: string | URL,
	query?: AlbumGetQuery,
	headers: Record<string, string>,
}

export interface AlbumGetQuery {
	assetId: string,
	shared: sharedStatus,
}


export enum sharedStatus {
	all = 0,
	shared = 1,
	private = 2,

}


export async function AlbumGetAll(request: AlbumGetRequest) {

	const { baseUrl, headers, query } = request;


	let params = null


	if (query) {

		switch (query.shared) {

			case sharedStatus.private:
				params = `?shared=true`;
				break;
			case sharedStatus.shared:
				params = `?shared=false`
				break;
			default:
				break;
		}

		if (query.assetId) {

			params = params ? `${params}&assetId=${query.assetId}` : `?assetId=${query.assetId}`
		}

	}

	const url = new URL(baseUrl + ApiEndPoints.asset + `${params}`);

	const apiClientInput: IApiClientRequest = {
		url: url,
		headers: headers,
		method: ApiMethods.GET,
	};
	const response: Array<AlbumResponseDto> =
		await ApiClient<Array<AlbumResponseDto>>(apiClientInput);

	if (!response) {
		throw hasUncaughtExceptionCaptureCallback();
	}

	const Result: Result<Array<AlbumResponseDto>> = {
		Data: response,
		Message: "Albums Retrieved Successfully",
		IsError: false,

	};

	return Result;
}
