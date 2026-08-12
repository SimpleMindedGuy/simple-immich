

export type SuccessResult<T> = T extends null | undefined ? SuccessEmptyResult : SuccessDataResult<T>

export interface SuccessEmptyResult {
	IsError: false,
	Messages: Array<string>,

}

export interface SuccessDataResult<T> {
	IsError: false,
	Data: T,
	Messages: Array<string>,
}


export type FailureResult<T> = T extends null | undefined ? FailureEmptyResult : FailureDataResult<T>

export interface FailureEmptyResult {
	IsError: true,
	Error: ResultError,
	Messages: Array<string>,
}


export interface FailureDataResult<T> {
	IsError: true,
	Error: ResultError,
	Messages: Array<string>,
	Data: T,
}


export interface ResultError {
	Messages: Array<string>,
	Code?: string | number,
	Source?: string,
}



export type Result<T> = SuccessResult<T> | FailureResult<T>; 
