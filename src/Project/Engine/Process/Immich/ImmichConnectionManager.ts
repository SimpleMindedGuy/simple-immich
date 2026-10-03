import type { AlbumResponseDto, LoginCredentialDto, LoginResponseDto, SearchResponseDto, ServerPingResponse } from "@immich/sdk";
import { Notice } from "obsidian";
import type { TResult } from "src/Base/Abstract/result";
import { type IApiClientRequest, ApiMethods } from "src/Base/Abstract/util/apiClient";
import { ApiClient } from "src/Base/Engine/Process/util/apiClient";
import { ApiEndPoints } from "../../Default/Immich/endPoints";
import type { IImmichConnection, TImmichAccount } from "src/Project/Abstract/Settings/pluginSettings";
import { hasUncaughtExceptionCaptureCallback } from "process";


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


export interface AssetGetRequest {
	baseUrl: string | URL,
	headers: Record<string, string>,
	body: string | ArrayBuffer,

}

export interface LoginRequest {

	baseUrl: string | URL,
	credentials: LoginCredentialDto
}

const serverUnreachableResponse: TResult<null> = {
	Success: false,
	Messages: ["Server Unreachable", "Invalid Request."],
	Code: 400,
}

export interface IImmichConnectionManagerProps {
	Connection: IImmichConnection,
	Account?: TImmichAccount,
}

export interface SetConnectionRequest {
	Connection: IImmichConnection
}

export interface SetAccountRequest {
	Account: TImmichAccount,
}


export class ImmichConnectionManager {


	private _Account: TImmichAccount | null = null
	private _Connection: IImmichConnection | null = null;
	private _isAuthenticated: boolean = false;
	private _Token: string | null = null;


	constructor() {

	}



	public async IsReachable(request: SetConnectionRequest) {


		const { Connection } = request;


		const HttpsUrl = new URL(`https://${Connection}/${ApiEndPoints.ping}`);



		const headers = {
			"Content-Type": "application/json",
		};

		const httpsRequest: IApiClientRequest = {
			url: HttpsUrl,
			headers,
			method: ApiMethods.GET,
		};



		const httpsResponse: ServerPingResponse = await ApiClient(httpsRequest);
		const Messages: Array<string> = []
		let msg;


		if (httpsResponse) {

			msg = "Server is reachable over secure connection (https)";

			new Notice(msg);


			const result: TResult<ServerPingResponse> = {
				Success: true,
				Data: httpsResponse,
				Messages,
				Code: 200,
			}


			return result;
		}


		msg = "Server is unreachable over secure connection (https)";
		Messages.push(msg);



		const httpUrl = new URL(`http://${Connection}/${ApiEndPoints.ping}`);


		const httpRequest: IApiClientRequest = {
			url: httpUrl,
			headers,
			method: ApiMethods.GET,
		};

		const httpResponse: ServerPingResponse = await ApiClient(httpRequest);


		if (httpResponse) {

			msg = "Server is reachable over none secure connection (http)";

			const result: TResult<ServerPingResponse> = {
				Success: true,
				Data: httpsResponse,
				Messages,
				Code: 0
			}

			return result;
		}


		const result: TResult<null> = serverUnreachableResponse;
		return result;

	}


	public async SetConnection(request: SetConnectionRequest) {


		const { Connection } = request;

		if (!Connection) {

			return;
		}

		this._Connection = Connection;
		this._Account = null
		this._Token = null;
		this._isAuthenticated = false;


	}



	async SetAccount(request: SetAccountRequest) {

		const { Account } = request;

		if (!Account) {

			return;
		}

		this._Account = Account;
		this._Token = null;
		this._isAuthenticated = false;

		return;
	}


	async Login(request: LoginRequest) {

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
			return serverUnreachableResponse;
		}

		console.log(response)



		const result: TResult<LoginResponseDto> = {
			Success: true,
			Messages: ["Server reachable"],
			Data: response,
			Code: 0,
		}



		return result;
	}


	async AlbumGetAll(request: AlbumGetRequest) {

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

		const Result: TResult<Array<AlbumResponseDto>> = {
			Data: response,
			Messages: ["Albums Retrieved Successfully"],
			Success: true,
			Code: 0,

		};

		return Result;
	}



	async AssetGetAll(request: AssetGetRequest) {


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

		const Result: TResult<SearchResponseDto> = {
			Data: response,
			Success: true,
			Messages: ["Assets Retrieved"],
			Code: 0,

		}

		return Result;
	}


}
