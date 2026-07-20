
/// this is not used in the Immich project 

export type SuccessResult<T> = T extends null | undefined ? SuccessEmptyResult : SuccessDataResult<T>

export interface SuccessEmptyResult {
	IsError: false,
	Message?: string,

}

export interface SuccessDataResult<T> {
	IsError: false,
	Data: T,
	Message?: string,
}


export type FailureResult<T> = T extends null | undefined ? FailureEmptyResult : FailureDataResult<T>

export interface FailureEmptyResult {
	IsError: true,
	Error: ResultError,
	Message: string,
}


export interface FailureDataResult<T> {
	IsError: true,
	Error: ResultError,
	Message: string,
	Data: T,
}


export interface ResultError {
	Message: string | null,
	Code?: string | number,
	Source?: string,
}



export type Result<T> = SuccessResult<T> | FailureResult<T>; 
