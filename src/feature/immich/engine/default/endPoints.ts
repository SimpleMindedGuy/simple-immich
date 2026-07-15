
export const ApiEndPoints = {
	ping: 'api/server/ping',
	login: '/api/auth/login',
	asset: `/api/search/metadata`,
	album: `/api/albums`

} as const;


export type ApiEndPointKey = keyof typeof ApiEndPoints;
export type ApiEndPointValue = typeof ApiEndPoints[ApiEndPointKey];
