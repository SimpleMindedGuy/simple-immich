import type { LucideIconName } from "../icon";


// list of all event handlers used for buttons in this project.
export type TEvents = "onClick" | "onHover" | "onChange";


//base definition of an event handler.
export type TBaseEventHandler = (
	event?: MouseEvent | PointerEvent,
) => unknown;

// 
export interface IBaseEvent<T> {
	onClick?: T
}


export type TbaseEvent =
	{
		[eventName in TEvents]?: TBaseEventHandler
	}


export type TBaseEventMap<Commands extends string> = {
	[eventName in TEvents]?: Commands
}

export interface IBaseButtonVariantsMap {
	icon: LucideIconName | null,
	label: string | null,
	hint: string | null,
	condition: string | null,

}


export interface IBaseButtonProps {
	icon: LucideIconName | null
	label: string | null,
	hint: string | null,
}


// Mapping Structure of the Icons button object, used to map the "Commands" to event handlers of an Icon.
// This will later be mapped to IBaseIconButton, to be used to generate an Icon later on.
export interface IBaseButtonMap<Command extends string> {
	variants: Array<IBaseButtonVariantsMap>,
	inclusionRule: string,
	events: TBaseEventMap<Command>
}
export type TGenericButtonMap = IBaseButtonMap<string>;


export type TBaseMapCollection = Record<string, IBaseButtonMap<string>>
// A collection that contains Names that correspond to IBaseIconButtonMap
export type TBaseButtonMapCollection<ButtonName extends string, Commands extends string> = Record<ButtonName, IBaseButtonMap<Commands>>;


// General structure of The final Icon Button object
// this object is used to generate the Icon Button.
export interface IBaseButton extends IBaseEvent<TBaseEventHandler> {
	icon: LucideIconName,
}



//TODO: replace IBaseButton with TBaseButton, for final button object type. 
export type TBaseButton = TbaseEvent & IBaseButtonProps

export class BaseButton implements TBaseButton {
	onClick?: TBaseEventHandler | undefined = undefined;
	onHover?: TBaseEventHandler | undefined = undefined;
	onChange?: TBaseEventHandler | undefined = undefined;
	label: string | null = null;
	hint: string | null = null;
	icon: LucideIconName | null = null;
}


// Mapping structure of all possible layouts of Icons.
// they are mapped to strings which are going to be the names of icons in a record that holds the name of an icon with its corresponding icon.
export type TLayout = Record<string, Array<string>>
export type TButtonLayout<State extends string, ButtonName> = Record<State, Array<ButtonName>>


export type TBaseEventHandlerMap = Record<string, TBaseEventHandler>;


export type TEventHandlerMap<Commands extends string | number> = Record<Commands, TBaseEventHandler>;
export type TGenericEventHandlerMap = Record<string | number, TBaseEventHandler>; 
