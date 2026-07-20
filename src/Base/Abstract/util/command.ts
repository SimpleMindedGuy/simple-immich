import type { TiconButtonOnClick } from "../element/trigger/iconButton";

export type TCommandHandler = (...args: unknown[]) => unknown;
export type TCommandKeyMap<TCommands extends string> = Record<TCommands, TCommandHandler | TiconButtonOnClick>


