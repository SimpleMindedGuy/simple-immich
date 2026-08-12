import type { BackgroundClass } from "../../style/background";
import type { TBaseButton } from "../trigger/IButton";

export interface IButtonContainer {
	icons: Array<TBaseButton>;
	bg: BackgroundClass;
}
