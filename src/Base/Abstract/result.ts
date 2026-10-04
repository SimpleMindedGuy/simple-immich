

export type TResult<T> = TSuccessResult<T> | TFailResult;

export type TSuccessResult<T> = {

	Success: true,
	Data: T | null,
	Messages: Array<string>,
	Code: number,
}


export type TFailResult = {
	Success: false,
	Messages: Array<string>,
	Code: number,
	Error?: unknown | null,
}



export class Result<T> {


	public readonly Success: boolean;
	public readonly Data: T | null;
	public readonly Messages: Array<string>;
	public readonly Code: number;
	public readonly Error: unknown | null;

	protected constructor(
		Success: boolean,
		Data?: T | null,
		Messages?: Array<string> | null,
		Code?: number | null,
		Error?: unknown | null
	) {
		this.Success = Success;
		this.Data = Data ?? null;
		this.Messages = Messages ?? [];
		this.Code = Code ?? 0;
		this.Error = Error ?? null;
	}

	public static Success<T>(
		data: T,
		messages: Array<string>,
		code: number,
	) {

		const result = new Result<T>(
			true,
			data,
			messages,
			code,
			null
		)


		return result
	}



	public static Failure<T = never>(
		messages: Array<string>,
		code: number,
		error?: unknown | null
	) {

		const result = new Result<T>(
			false,
			null,
			messages,
			code,
			error
		)
		return result
	}

}

