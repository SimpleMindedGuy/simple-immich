import type { LoginCredentialDto, LoginResponseDto } from "@immich/sdk";
import { ApiEndPoints } from "../../default/endPoints";
import type { Result } from "src/core/data/base/result";
import { type IApiClientRequest, ApiMethods } from "src/core/data/base/util/apiClient";
import { ApiClient } from "src/core/engine/process/util/apiClient";


export interface LoginRequest {

	baseUrl: string | URL,
	credentials: LoginCredentialDto
}




export async function Login(request: LoginRequest) {

	const { baseUrl, credentials } = request;

	const url = new URL(baseUrl + ApiEndPoints.login);

	const headers = {
		"Content-Type": "application/json",
	};



	const apiClientInput: IApiClientRequest = {
		url: url,
		headers: headers,
		method: ApiMethods.POST,
		body: JSON.stringify(credentials),
	};

	const response: LoginResponseDto = await ApiClient<LoginResponseDto>(apiClientInput);


	if (!response) {
		return this.serverUnreachableResponse;
	}

	console.log(response)



	const result: Result<LoginResponseDto> = {
		IsError: false,
		Message: "Server reachable",
		Data: response,
	}



	return result;
}
