


export type TImmichAccount = (IImmichEmailAccount | IImmichTokenAccount) & {
	Id: number | null;
	ConnectionId: number
};

export interface IImmichTokenAccount {

	IsApi: true;
	ApiKey: string | null;
}

export interface IImmichEmailAccount {
	IsApi: false;
	Email: string | null;
	Password: string | null;
}

export interface IImmichConnection {
	Id: number | null;
	Url: string | null;
}


export interface ISimpleImmichSettings {
	MySetting: string;
	ImageSize: number;
	ActiveAccount: TImmichAccount | number | null,
	Connections: Array<IImmichConnection>
	Accounts: Array<TImmichAccount>
	NextId: number;
}


