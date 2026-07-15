
export type TImmichAccount = (ImmichEmailAccount | ImmichTokenAccount) & {
	id: number | null
};

export interface ImmichTokenAccount {

	isApi: true;
	apiKey: string | null;
}

export interface ImmichEmailAccount {
	isApi: false;
	email: string | null;
	password: string | null;
}

export interface ImmichConnection {
	Id?: number;
	url: string | null;
	accounts: Array<TImmichAccount>
}


export interface ISimpleImmichSettings {
	mySetting: string;
	ImageSize: number;
	Connections: Array<ImmichConnection>
	activeAccount: TImmichAccount | number | null,
	nextId: number;
}


export const DEFAULT_SETTINGS: ISimpleImmichSettings = {
	mySetting: 'default',
	ImageSize: 300,
	activeAccount: null,
	Connections: [],
	nextId: 1,
}
