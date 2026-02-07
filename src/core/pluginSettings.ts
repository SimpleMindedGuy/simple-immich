
export interface ImmichAccount {
	id: number;
	password: string;
	user: string;
	apiKey: string;
}

export interface ImmichConnection {
	id: number;
	url: string;
	accounts: Array<ImmichAccount>
}


export interface SimpleImmichSettings {
	mySetting: string;
	ImageSize: number;
	Connections: Array<ImmichConnection>
}


export const DEFAULT_SETTINGS: SimpleImmichSettings = {
	mySetting: 'default',
	ImageSize: 300,
	Connections: [],
}
