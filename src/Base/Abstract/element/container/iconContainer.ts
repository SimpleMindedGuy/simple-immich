import type { BackgroundClass } from "../../style/background";
import type { TBaseButton } from "../trigger/iconButton";

export interface I_IconsContainer {
	icons: Array<TBaseButton>;
	bg: BackgroundClass;
}
