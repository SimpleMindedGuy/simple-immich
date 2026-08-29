

// export type TAccount_Form_Modes = "Read" | "Edit" | "Create";

import type { TButtonLayout, TEventHandlerMap, TBaseButtonMapCollection, IBaseButtonMap } from "src/Base/Abstract/element/trigger/IButton";
import type { TBaseBooleanMap } from "src/Base/Abstract/util/resolver/booleanResolver";

/// define possible button maps names
export type TSettingsPage_Form_Layout = never;
export type TSettingsPage_Form_Layout_Collection = TButtonLayout<TSettingsPage_Form_Layout, TSettingsPage_Form_Buttons>;

/// define button names
export type TSettingsPage_Form_Buttons = never;

/// define conditions for boolean map
export type TSettingsPage_Form_Conditions = never;
/// define  boolean map
export type TSettingsPage_Form_BooleanMap = TBaseBooleanMap<TSettingsPage_Form_Conditions>


/// define form commands
export type TSettingsPage_Form_Commands = never;
/// define  event handler map for commands.
export type TSettingsPage_Form_Commands_Map = TEventHandlerMap<TSettingsPage_Form_Commands>


/// define  button name to button_map ... map
export type TSettingsPage_Form_Button_Map_Collection = TBaseButtonMapCollection<TSettingsPage_Form_Buttons, TSettingsPage_Form_Commands>;

/// define  possible commands for button's events.
export type TSettingsPage_Form_Button_Map = IBaseButtonMap<TSettingsPage_Form_Commands>; 
