

// export type TAccount_Form_Modes = "Read" | "Edit" | "Create";

import type { TButtonLayout, TEventHandlerMap, TBaseButtonMapCollection, IBaseButtonMap } from "src/Base/Abstract/element/trigger/iconButton";
import type { TBaseBooleanMap } from "src/Base/Abstract/util/resolver/booleanResolver";

// export type TAccount_Form_Controls = "External" | "Default";

// export type TAccount_Form_Visibility = "Visible" | "Hidden";


/// define possible button maps names
export type TAccount_Form_Layout =
	| "Read"
	// | "Read_External"
	// | "Read_External_Hidden"

	| "Create"
	// | "Create_External"
	// | "Create_External_Hidden"

	| "Update"
// | "Update_External"
// | "Update_External_Hidden";
// define  layout name to button layout  map
export type TAccount_Form_Layout_Collection = TButtonLayout<TAccount_Form_Layout, TAccount_Form_Buttons>;

/// define button names
export type TAccount_Form_Buttons =
	| "Submit_Create"
	| "Submit_Update"
	| "Submit_Delete"
	| "Toggle_Type"
	| "Toggle_Edit"
	| "Toggle_Hidden";



/// define conditions for boolean map
export type TAccount_Form_Conditions = "Hidden" | "External" | "Edit" | "IsKey";
/// define  boolean map
export type TAccount_Form_BooleanMap = TBaseBooleanMap<TAccount_Form_Conditions>


/// define form commands
export type TAccount_Form_Commands = "Create" | "Update" | "Delete" | "Reset" | "Toggle_Hidden" | "Toggle_Edit" | "Toggle_Type"
/// define  event handler map for commands.
export type TAction_Form_Commands_Map = TEventHandlerMap<TAccount_Form_Commands>


/// define  button name to button_map ... map
export type TAccount_Form_Button_Map_Collection = TBaseButtonMapCollection<TAccount_Form_Buttons, TAccount_Form_Commands>;

/// define  possible commands for button's events.
export type TAccount_Form_Button_Map = IBaseButtonMap<TAccount_Form_Commands>; 
