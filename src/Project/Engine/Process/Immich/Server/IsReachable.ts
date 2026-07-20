import { Notice } from "obsidian";
import type { ServerPingResponse } from "@immich/sdk";
import { ApiEndPoints } from "../../../../Engine/Default/Immich/endPoints";
import type { Result } from "src/Base/Abstract/result";
import { type IApiClientRequest, ApiMethods } from "src/Base/Abstract/util/apiClient";
import { ApiClient } from "src/Base/Engine/Process/util/apiClient";



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
