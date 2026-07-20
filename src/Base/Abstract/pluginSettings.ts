
export type TImmichAccount = (ImmichEmailAccount | ImmichTokenAccount) & {
	Id: number | null
};

export interface ImmichTokenAccount {

	IsApi: true;
	ApiKey: string | null;
}

export interface ImmichEmailAccount {
	IsApi: false;
	Email: string | null;
	Password: string | null;
}

export interface ImmichConnection {
	Id: number;
	Url: string | null;
	Accounts: Array<TImmichAccount>
}


export interface ISimpleImmichSettings {
	MySetting: string;
	ImageSize: number;
	Connections: Array<ImmichConnection>
	ActiveAccount: TImmichAccount | number | null,
	NextId: number;
}


export const DEFAULT_SETTINGS: ISimpleImmichSettings = {
	MySetting: 'default',
	ImageSize: 300,
	ActiveAccount: null,
	Connections: [],
	NextId: 1,
}
