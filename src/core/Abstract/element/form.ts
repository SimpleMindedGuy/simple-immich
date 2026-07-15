import type { TCommandHandler } from "../util/command";

export enum EFormFunction {
	create,
	update,
	delete,
	read,

}



export type TFromMode = "READ" | "UPDATE" | "CREATE" | "DELETE";

export type TFormFunctionHandler = (...args: unknown[]) => unknown;
export type TFormFunctionMap = Map<EFormFunction, TFormFunctionHandler>;



export type TCommandKey = string;
export type TFormCommand = Record<TCommandKey, TCommandKey>;
export type TFormCommandMap = Record<TCommandKey, TCommandHandler>;
