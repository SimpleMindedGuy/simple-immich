import type { ServerPingResponse, LoginResponseDto, LoginCredentialDto, SearchResponseDto, AlbumResponseDto, BulkIdsDto, BulkIdResponseDto } from "@immich/sdk";
import { Notice, App } from "obsidian";
import { hasUncaughtExceptionCaptureCallback } from "process";
import type { TImmichAccount } from "src/core/data/base/pluginSettings";
import type { Result } from "src/core/data/base/result";
import { type IApiClientRequest, ApiMethods } from "src/core/data/base/util/apiClient";
import { ApiClient } from "src/core/engine/process/util/apiClient";
import { SecretsManager } from "src/core/engine/service/util/secretsManager";
import type { SettingsHandler } from "src/feature/settingsTap/engine/process/settings/SettingsHandler";
import { ApiEndPoints } from "../default/endPoints";
import { type AlbumGetRequest, AlbumGetAll } from "../process/Album/GetAllAlbums";
import { type AssetGetRequest, AssetGetAll } from "../process/Asset/GetAllAssets";
import { type LoginRequest, Login } from "../process/Authentication/Login";
import { IsReachable } from "../process/Server/IsReachable";

export class ImmichConnection {

	private _url: string | URL;
	private _user: TImmichAccount;
	private _Secret: SecretsManager;
	private _Settings: SettingsHandler
	private _SessionToken: string | null = null;

	constructor(url: string | URL, Settings: SettingsHandler, app: App, user?: TImmichAccount) {
		this._url = url ?? null;
		if (user) this._user = user;

		this._Secret = new SecretsManager(app);
		this._Settings = Settings;
	}



	private userNullResponse: Result<null> = {
		IsError: true,
		Message: "user was not provided",
		Error: {
			Code: 400,
			Message: "Invalid Request."
		}
	}

	private passwordNullResponse: Result<null> = {

		IsError: true,
		Message: "Password Is not set",
		Error: {
			Code: 404,
			Message: "Password for user cannot be Null or Undefined"
		},
	}


	private secretNullResponse: Result<null> = {
		IsError: true,
		Message: "Secret was not found",
		Error: {
			Code: 404,
			Message: "Secret dose not exist in the storage",
			Source: "Immich > Login >> Authentication/Login > SecretsManager"
		}
	}


	private emailNullResponse: Result<null> = {
		IsError: true,
		Message: "User Email cannot be null ",
		Error: {
			Message: "Immich Account's Email has a null or undefined value.",
			Code: 404,
			Source: "Immich > Login > _user.user "
		}
	}


	private userIsApiResponse: Result<null> = {
		IsError: true,
		Message: "Cannot Login with Current Account",
		Error: {
			Code: 401,
			Message: "Account is using API key."
		}
	}


	async IsReachable(): Promise<Result<null>> {


		const url = new URL(`${this._url}`);

		const result: Result<ServerPingResponse | null> = await IsReachable(url);

		return result;
	}


	async Login(): Promise<Result<LoginResponseDto | null>> {


		if (!this._user) {
			return this.userNullResponse;
		}

		if (this._user.isApi) {

			return this.userIsApiResponse;
		}

		if (!this._user.email) {

			return this.emailNullResponse;
		}
		if (!this._user.password) {
			return this.passwordNullResponse
		}

		const password = await this._Secret.Get(this._user.password);

		if (!password) {

			return this.secretNullResponse;
		}

		const credentials: LoginCredentialDto = {
			email: this._user.email!,
			password: password,
		};

		const Request: LoginRequest = {
			baseUrl: this._url,
			credentials

		}
		const result: Result<LoginResponseDto> = await Login(Request);

		this._SessionToken = result.Data.accessToken;
		return result;

	}

	async getAssets() {

		const accessToken = await this.getAccessToken();

		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			...accessToken
		};

		const Request: AssetGetRequest = {
			baseUrl: this._url,
			headers,
			body: "",
		}

		const Result: Result<SearchResponseDto> = await AssetGetAll(Request);

		return Result;
	}

	async getAlbums() {


		const accessToken = await this.getAccessToken();
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			...accessToken
		};


		const request: AlbumGetRequest = {
			baseUrl: this._url,
			headers: headers,

		}

		const response: Result<Array<AlbumResponseDto>> = await AlbumGetAll(request);


		if (!response) {
			throw hasUncaughtExceptionCaptureCallback();
		}

		return response;

	}


	async addAssetsToAlbum(
		albumId: string,
		payload: BulkIdsDto,
	) {
		const End_Point = `${ApiEndPoints.album}/${albumId}/assets`;

		const url = new URL(this._url + End_Point);

		new Notice("Adding assets to albums");
		console.log("Adding assets to albums");

		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			// 'x-immich-session-token': SimpleImmich_UserInfo.accessToken.toString(),
		};

		const body = JSON.stringify(payload);
		const apiClientInput: IApiClientRequest = {
			url: url,
			headers: headers,
			method: ApiMethods.PUT,
			body: body,
		};

		const response: Array<BulkIdResponseDto> =
			await ApiClient<Array<BulkIdResponseDto>>(apiClientInput);

		if (!response) {
			new Notice("Failed to add assets to albums");
			//TODO: handle exceoptions
			throw hasUncaughtExceptionCaptureCallback();
		}


		new Notice("Images assets added to albums");
		return response;
	}


	private async getAccessToken(): Promise<Record<string, string>> {


		if (this._user.isApi) {
			const secret: string | null | undefined = await this._Secret.Get(this._user.apiKey ?? "");
			if (!secret) {
				throw hasUncaughtExceptionCaptureCallback();
			}
			return {
				"x-api-key": secret ?? ""
			};
		}
		return {
			"x-immich-session-token": this._SessionToken?.toString() ?? "",
		}


	}


}
