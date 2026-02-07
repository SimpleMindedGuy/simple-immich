import { Notice } from "obsidian";
import { apiMethods, apiClient, type apiClientInput } from "src/core/apiClient";
import { ApiEndPoints } from "src/core/ConstantValues";



/**
 * @summary Function will use provided UrL to ping the server
 * @param base_url - Url pointing to the Immich instance (server)
 * @returns {Promise<true|false>}
 *
 * - True : if the server is reachable
 * - False: if the server is not reachable
 */
export async function CheckServerConnection(base_url: string): Promise<boolean> {

	let isSuccess = false;

	const url = new URL(base_url + ApiEndPoints.ping)


	console.log(`url : `, url)
	const headers = {
		'Content-Type': 'application/json',
	}

	const request: apiClientInput = {
		url: url,
		headers: headers,
		method: apiMethods.GET,
	}

	new Notice("Checking server Connection");

	const response = await apiClient(request);

	if (!response) {
		new Notice("Server is unreachable");
		return isSuccess;
	}
	isSuccess = true;

	new Notice("Server is reachable");
	return isSuccess;
}
