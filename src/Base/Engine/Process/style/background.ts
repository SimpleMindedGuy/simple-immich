import type { BackgroundClass, BackgroundValue } from "src/core/data/base/style/background"


export function GetNextBackgroundClass(bg: BackgroundClass): BackgroundClass {

	switch (bg) {
		case "primary": return "secondary"
		case "secondary": return "secondary-alt"
		case "secondary-alt": return "primary-alt"
		case "primary-alt": return "primary"
	}
}


export function GetBgClassValue(bg: BackgroundClass): BackgroundValue {

	switch (bg) {
		case "primary": return "--background-primary"
		case "secondary": return "--background-secondary"
		case "primary-alt": return "--background-primary-alt"
		case "secondary-alt": return "--background-secondary-alt"
	}
}
