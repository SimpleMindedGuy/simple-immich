
export interface apiClientInput {
	url: URL | string;
	headers: TApiClientHeaders | undefined;
	method: ApiMethods;
	body?: string | ArrayBuffer | undefined;
}

export type TApiClientHeaders = Record<string, string>;

export type IApiClientRequest = bodyOptionalRequest | bodyRequiredRequest;



export interface bodyOptionalRequest {
	url: URL | string;
	headers?: Record<string, string>,
	method: BodyOptionalMethods;
	body?: string | ArrayBuffer,

}


export interface bodyRequiredRequest {
	url: URL | string;
	headers?: Record<string, string>,
	method: BodyReqiuredMethod;
	body: string | ArrayBuffer,
}


export type BodyReqiuredMethod = ApiMethods.PATCH | ApiMethods.PUT | ApiMethods.POST;
export type BodyOptionalMethods = ApiMethods.GET | ApiMethods.DELETE;

export enum ApiMethods {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}
