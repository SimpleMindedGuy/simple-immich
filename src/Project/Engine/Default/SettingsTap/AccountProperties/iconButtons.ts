import type { TAccount_Form_Button_Map, TAccount_Form_Layout_Collection, TAccount_Form_Button_Map_Collection } from "src/Project/Abstract/SettingsTap/AccountProperties/IconButton"


const Submit_Create_Button_Map: TAccount_Form_Button_Map = {
	variants: [{
		icon: "plus",
		hint: "Add an Account",
		label: "Add Account",
		condition: null,
	}],

	inclusionRule: "!Hidden",

	events: {
		onClick: "Create"
	}
}


const Submit_Update_Button_Map: TAccount_Form_Button_Map = {
	variants: [
		{
			icon: "check",
			label: "Edit Account",
			hint: "Edit Account",
			condition: null
		}
	],
	inclusionRule: "!Hidden",
	events: {
		onClick: "Update"
	}
}

const Submit_Delete_Button_Map: TAccount_Form_Button_Map = {

	variants: [
		{
			icon: "trash",
			label: "Delete Account",
			hint: "Delete Account",
			condition: null
		}
	],
	inclusionRule: "!Hidden && !Edit",
	events: {
		onClick: "Delete"
	}
}

const Account_Type_Button_Map: TAccount_Form_Button_Map =
{
	variants: [
		{
			icon: "key-square",
			label: null,
			hint: "Toggle Account Type",
			condition: "!IsKey"
		},
		{
			icon: "id-card",
			label: null,
			hint: "Toggle Account Type",
			condition: "IsKey"
		}
	],

	inclusionRule: "!Hidden && Edit",
	events: {
		onClick: "Toggle_Type",
	}
}

const Toggle_Edit_button_Map: TAccount_Form_Button_Map =
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

const Toggle_Hidden_Button_Map: TAccount_Form_Button_Map =
{
	variants: [{
		icon: "plus",
		label: null,
		hint: "Toggle Account Type",
		condition: "Hidden"
	},
	{
		icon: "cross",
		label: null,
		hint: "Toggle Account Type",
		condition: "!Hidden"
	}],
	inclusionRule: "External",
	events: {
		onClick: "Toggle_Hidden"
	}
}

export const Account_Form_Layout_Collection: TAccount_Form_Layout_Collection = {
	Read: ["Submit_Delete", "Toggle_Edit", "Toggle_Hidden"],

	Create: ["Submit_Create", "Toggle_Type", "Toggle_Hidden"],

	Update: ["Submit_Delete", "Submit_Update", "Toggle_Type", "Toggle_Edit", "Toggle_Hidden"],
}

export const Account_Form_Icon_Collection: TAccount_Form_Button_Map_Collection = {
	Submit_Delete: Submit_Delete_Button_Map,
	Submit_Create: Submit_Create_Button_Map,
	Submit_Update: Submit_Update_Button_Map,
	Toggle_Type: Account_Type_Button_Map,
	Toggle_Edit: Toggle_Edit_button_Map,
	Toggle_Hidden: Toggle_Hidden_Button_Map
}



