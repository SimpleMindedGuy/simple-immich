import { cubicIn, cubicOut } from "svelte/easing";

export const slideOutParams = {
	delay: 0,
	duration: 300,
	easing: cubicOut,
};

export const slideInParams = {

	delay: 0,
	duration: 300,
	easing: cubicIn,
};
