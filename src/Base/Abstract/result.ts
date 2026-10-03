

export type TResult<T> = TSuccessResult<T> | TErrorResult;

export type TSuccessResult<T> = {

	Success: true,
	Data: T | null,
	Messages: Array<string>,
	Code: number,
}


export type TErrorResult = {
	Success: false,
	Messages: Array<string>,
	Code: number,
	Error?: unknown | null,
}

// export interface Result {
// 	Success: false,
// 	Messages: Array<string>,
// 	Code: number,
// }
