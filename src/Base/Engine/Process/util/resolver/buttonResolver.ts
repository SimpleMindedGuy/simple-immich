import { type TBaseMapCollection, type TBaseEventHandlerMap, type TBaseButton, BaseButton, type TGenericButtonMap, type IBaseButtonVariantsMap, type TGenericEventHandlerMap, type TEvents } from "src/Base/Abstract/element/trigger/iconButton";
import { ResolveBooleanExpression } from "./booleanResolver";
import { PropertyResolver } from "./propertyResolver";
import type { IBooleanResolverRequest, IResolverRequest, TGnericBooleanMap, TresolverMap } from "src/Base/Abstract/util/resolver/booleanResolver";




export interface IResolveButtonsListRequest {

	Layout: TresolverMap,
	ButtonCollection: TBaseMapCollection,
	CommandsMap: TBaseEventHandlerMap,
	BooleanMap: TGnericBooleanMap,
	formMode: string,
}







export function ResolveButtonsList(request: IResolveButtonsListRequest): Array<TBaseButton> {
	// Pick the template based on UI state
	//

	const { Layout, ButtonCollection, CommandsMap, BooleanMap, formMode } = request;

	const ButtonList: Array<TBaseButton> = [];


	const iconMapReq: IResolverRequest<TresolverMap> = {
		map: Layout,
		str: formMode,
	}

	const ButtonLayout = PropertyResolver<TresolverMap>(iconMapReq) as Array<string>;

	if (!ButtonLayout) {
		return ButtonList
	}

	for (const mapName of ButtonLayout) {



		const ButtonMap = ResolveButtonMap(mapName, ButtonCollection);
		if (!ButtonMap) {
			continue;
		}

		const isIncluded: boolean | undefined = ResolveIsIncluded(ButtonMap.inclusionRule, BooleanMap)

		if (!isIncluded) {
			continue;
		}

		let button: BaseButton = new BaseButton();


		button = MapButtonEvents(button, ButtonMap, CommandsMap)
		button = ResolveVariantProps(button, ButtonMap, BooleanMap)

		ButtonList.push(button);


	}

	return ButtonList;

};





// function ResolveButtonLayout<TLayoutMap extends TLayout>(str: string, LayoutMap: TLayoutMap) {
// 	const iconMapReq: IResolverRequest<TLayoutMap> = {
// 		map: LayoutMap,
// 		str: str,
// 	}
// 	return PropertyResolver<TLayoutMap>(iconMapReq);
// }

function ResolveButtonMap<TCollection extends TBaseMapCollection>(str: string, Collection: TCollection) {
	const ButtonMapReq: IResolverRequest<TCollection> = {
		map: Collection,
		str: str,
	}
	return PropertyResolver(ButtonMapReq);
}


function ResolveIsIncluded(str: string, map: Record<string | number, boolean>) {

	let isIncluded: boolean | undefined = true;

	if (str != null || str != undefined) {
		const request: IBooleanResolverRequest = {
			str: str,
			map: map
		}

		isIncluded = ResolveBooleanExpression(request)

	}

	return isIncluded;

}


function ResolveVariantProps(Button: BaseButton, ButtonMap: TGenericButtonMap, booleanMap: TGnericBooleanMap) {



	const variants: Array<IBaseButtonVariantsMap> = ButtonMap.variants;
	let variant = variants.find((v) => {
		let isValid: undefined | boolean = true;
		if (v.condition != null) {
			const request: IBooleanResolverRequest = {
				str: v.condition!,
				map: booleanMap
			}
			isValid = ResolveBooleanExpression(request);
		}
		if (isValid) return v;
	})

	if (!variant) {

		variant = variants[0]
	}
	Button.icon = variant.icon;
	Button.hint = variant.hint;
	Button.label = variant.label;

	return Button;
}


function MapButtonEvents(Button: BaseButton, ButtonMap: TGenericButtonMap, CommandMap: TGenericEventHandlerMap) {

	for (const [event, comand] of Object.entries(ButtonMap.events)) {
		if (!(event in Button)) {
			console.warn(`invalid event name for button, event name ${event} has been ignored.`);
			continue;
		}
		const eventName = event as TEvents
		Button[eventName] = CommandMap[comand];
	}

	return Button;

}
