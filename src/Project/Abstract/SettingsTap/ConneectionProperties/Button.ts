

// export type TAccount_Form_Modes = "Read" | "Edit" | "Create";

import type { TButtonLayout, TEventHandlerMap, TBaseButtonMapCollection, IBaseButtonMap } from "src/Base/Abstract/element/trigger/IButton";
import type { TBaseBooleanMap } from "src/Base/Abstract/util/resolver/booleanResolver";

// export type TAccount_Form_Controls = "External" | "Default";

// export type TAccount_Form_Visibility = "Visible" | "Hidden";


/// define possible button maps names
export type TConnection_Form_Layout =
	| "Read"
	| "Create"
	| "Update"
	;
export type TConnection_Form_Layout_Collection = TButtonLayout<TConnection_Form_Layout, TConnection_Form_Buttons>;

/// define button names
export type TConnection_Form_Buttons =
	| "Submit_Create"
	| "Submit_Update"
	| "Submit_Delete"
	| "Toggle_Edit"
	;



/// define conditions for boolean map
export type TConnection_Form_Conditions = "Edit";
/// define  boolean map
export type TConnection_Form_BooleanMap = TBaseBooleanMap<TConnection_Form_Conditions>


/// define form commands
export type TConnection_Form_Commands = "Create" | "Update" | "Delete" | "Reset" | "Toggle_Edit";
/// define  event handler map for commands.
export type TConnection_Form_Commands_Map = TEventHandlerMap<TConnection_Form_Commands>


/// define  button name to button_map ... map
export type TConnection_Form_Button_Map_Collection = TBaseButtonMapCollection<TConnection_Form_Buttons, TConnection_Form_Commands>;

/// define  possible commands for button's events.
export type TConnection_Form_Button_Map = IBaseButtonMap<TConnection_Form_Commands>; 
