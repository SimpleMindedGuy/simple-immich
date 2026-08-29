import type { TConnection_Form_Button_Map, TConnection_Form_Button_Map_Collection, TConnection_Form_Layout_Collection } from "src/Project/Abstract/SettingsTap/ConneectionProperties/Button"



const Submit_Create_Button_Map: TConnection_Form_Button_Map = {
	variants: [{
		icon: "plus",
		hint: "Add an Connection",
		label: "Add Connection",
		condition: null,
	}],

	inclusionRule: "!Hidden",

	events: {
		onClick: "Create"
	}
}


const Submit_Update_Button_Map: TConnection_Form_Button_Map = {
	variants: [
		{
			icon: "check",
			label: "Edit Connection",
			hint: "Edit Connection",
			condition: null
		}
	],
	inclusionRule: "!Hidden",
	events: {
		onClick: "Update"
	}
}

const Submit_Delete_Button_Map: TConnection_Form_Button_Map = {

	variants: [
		{
			icon: "trash",
			label: "Delete Connection",
			hint: "Delete Connection",
			condition: null
		}
	],
	inclusionRule: "!Hidden && !Edit",
	events: {
		onClick: "Delete"
	}
}

const Toggle_Edit_button_Map: TConnection_Form_Button_Map =
{
	variants: [{
		icon: "pen",
		label: null,
		hint: "hint",
		condition: null
	}],
	inclusionRule: "!Hidden",
	events: {
		onClick: "Toggle_Edit"
	}
}


export const Connection_Form_Layout_Collection: TConnection_Form_Layout_Collection = {
	Read: ["Submit_Delete", "Toggle_Edit"],

	Create: ["Submit_Create"],

	Update: ["Submit_Delete", "Submit_Update", "Toggle_Edit"],
}

export const Connection_Form_Icon_Collection: TConnection_Form_Button_Map_Collection = {
	Submit_Delete: Submit_Delete_Button_Map,
	Submit_Create: Submit_Create_Button_Map,
	Submit_Update: Submit_Update_Button_Map,
	Toggle_Edit: Toggle_Edit_button_Map
}



