import { type AlbumResponseDto, type BulkIdResponseDto, type BulkIdsDto, type LoginCredentialDto, type LoginResponseDto, type SearchResponseDto } from "@immich/sdk";
import { Notice } from "obsidian";
import { hasUncaughtExceptionCaptureCallback } from "process";
import { type apiClientInput, apiClient, apiMethods } from "src/core/apiClient";
import type { ImmichAccount } from "src/core/pluginSettings";


//FIX: modify functions to use provided tokens to get infromation from and to the server
//
//TODO: create interface to pass either accessToken or API key.
//
//TODO: find a way to "cache" image Ids and use those ids to load iamges into a grid.
//
//TODO: Store user credentials securely 
//
//TODO: Use Constant values for api endpoints/ find a better way ot keep track of all API end poitns.
export async function login(baseUrl: string, credentials: LoginCredentialDto) {
	const End_Point = "/api/auth/login";

	const url = new URL(baseUrl + End_Point);

	const headers = {
		'Content-Type': 'application/json',
	}

	const apiClientInput: apiClientInput = {

		url: url,
		headers: headers,
		method: apiMethods.POST,
		body: JSON.stringify(credentials),
	}

	const response: LoginResponseDto
		= await apiClient<LoginResponseDto>(apiClientInput);



	if (!response) {
		new Notice("Failed to login");
		console.log("Failed to login");
		//TODO: handle exceoptions
		throw hasUncaughtExceptionCaptureCallback()
	}

	console.log(response);

	new Notice("Successful login");
	console.log("Successful login");

}

export async function getAlbums(baseUrl: string, authInfo: ImmichAccount) {
	const End_Point = "/api/albums";

	const url = new URL(baseUrl + End_Point);


	new Notice("Loading albums");
	console.log("Loading albums");


	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		// 'x-immich-session-token': SimpleImmich_UserInfo.accessToken.toString(),
	}



	const apiClientInput: apiClientInput = {

		url: url,
		headers: headers,
		method: apiMethods.GET,
		body: undefined
	}

	const response: Array<AlbumResponseDto>
		= await apiClient<Array<AlbumResponseDto>>(apiClientInput);

	if (!response) {
		new Notice("Failed to load Albums");
		console.log("Failed to load Albums");
		//TODO: handle exceoptions
		throw hasUncaughtExceptionCaptureCallback()
	}

	console.log(response);

	new Notice("Albums Loaded");
	console.log("Albums Loaded");
}

export async function getAllImages(baseUrl: string, authInfo: ImmichAccount) {

	const End_Point = "/api/search/metadata";

	const url = new URL(baseUrl + End_Point);


	new Notice("loading assets");
	console.log("loading assets");

	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		// 'x-immich-session-token': SimpleImmich_UserInfo.accessToken.toString(),
	};
	const apiClientInput: apiClientInput = {
		url: url,
		headers: headers,
		method: apiMethods.POST,
		body: undefined
	};


	const response: SearchResponseDto
		= await apiClient<SearchResponseDto>(apiClientInput);

	if (!response) {
		new Notice("Failed to load Assets");
		console.warn("Failed to load Assets");
		//TODO: handle exceoptions
		throw hasUncaughtExceptionCaptureCallback()
	}

	new Notice("images Loaded");
	console.log("images Loaded");
}

export async function addAssetsToAlumb(baseUrl: string, authInfo: ImmichAccount, albumId: string, payload: BulkIdsDto) {


	const End_Point = `/api/albums/${albumId}/assets`;

	const url = new URL(baseUrl + End_Point);

	new Notice("Adding assets to albums");
	console.log("Adding assets to albums");

	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		// 'x-immich-session-token': SimpleImmich_UserInfo.accessToken.toString(),
	}

	const body = JSON.stringify(payload);
	const apiClientInput: apiClientInput = {

		url: url,
		headers: headers,
		method: apiMethods.PUT,
		body: body
	}

	const response: Array<BulkIdResponseDto>
		= await apiClient<Array<BulkIdResponseDto>>(apiClientInput);

	if (!response) {
		new Notice("Failed to add assets to albums");
		console.warn("Failed to add assets to albums");
		//TODO: handle exceoptions
		throw hasUncaughtExceptionCaptureCallback();
	}


	//TODO: decide how to report on errors

	// const notFound: Array<BulkIdResponseDto> = response.filter(asset => asset.error == Error.NotFound);
	// const noPermission: Array<BulkIdResponseDto> = response.filter(asset => asset.error == Error.NoPermission);
	// const duplicate: Array<BulkIdResponseDto> = response.filter(asset => asset.error == Error.Duplicate);
	//
	// console.warn("notFound :")
	// console.table(notFound);
	// console.warn("duplicate");
	// console.table(duplicate);
	// console.warn("noPermission");
	// console.table(noPermission)

	new Notice("Images assets added to albums");


}

export async function getAlbum(baseUrl: string, authInfo: ImmichAccount, albumId: string) {

	const End_Point = `/api/albums/${albumId}`;

	const url = new URL(baseUrl + End_Point);

	new Notice("Getting Album information");
	console.log("Getting Album information");

	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		// 'x-immich-session-token': SimpleImmich_UserInfo.accessToken.toString(),
	}

	const apiClientInput: apiClientInput = {

		url: url,
		headers: headers,
		method: apiMethods.GET,
		body: undefined
	}

	const response: AlbumResponseDto
		= await apiClient<AlbumResponseDto>(apiClientInput);

	if (!response) {
		new Notice("Failed to get Album information");
		console.warn("Failed to get Album information");
		//TODO: handle exceoptions
		throw hasUncaughtExceptionCaptureCallback();
	}
	console.log(response);
}
