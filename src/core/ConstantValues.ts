
export const ApiEndPoints = {
	ping: 'api/server/ping',

} as const;


export type ApiEndPointKey = keyof typeof ApiEndPoints;
export type ApiEndPointValue = typeof ApiEndPoints[ApiEndPointKey];
