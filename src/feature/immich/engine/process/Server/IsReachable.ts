import { Notice } from "obsidian";
import type { ServerPingResponse } from "@immich/sdk";
import { ApiEndPoints } from "../../default/endPoints";
import type { Result } from "src/core/Abstract/result";
import { type IApiClientRequest, ApiMethods } from "src/core/Abstract/util/apiClient";
import { ApiClient } from "src/core/Engine/process/util/apiClient";



const serverUnreachableResponse: Result<null> = {
	IsError: true,
	Message: "Server Unreachable",
	Error: {
		Code: 400,
		Message: "Invalid Request."
	}
}

export async function IsReachable(baseUrl: string | URL) {

	const url = new URL(`${baseUrl}/${ApiEndPoints.ping}`);

	const headers = {
		"Content-Type": "application/json",
	};

	const request: IApiClientRequest = {
		url: url,
		headers,
		method: ApiMethods.GET,
	};



	const response: ServerPingResponse = await ApiClient(request);

	if (!response) {
		new Notice("Server is unreachable");


		const result: Result<null> = serverUnreachableResponse;
		return result;
	}

	const result: Result<ServerPingResponse> = {
		IsError: false,
		Message: "Server reachable",
		Data: response
	}

	return result;
}
