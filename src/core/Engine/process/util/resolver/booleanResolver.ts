import type { IBooleanResolverRequest } from "src/core/data/base/util/resolver/booleanResolver";
import { innerMostBooleanRegExp, wordRegExp, notRegExp, andRegExp, orRegExp, innerParenthesisRegExp as innerParenthesisBooleanRegExp, bool as boolMap } from "../../../default/util/booleanResolver";
import { BooleanPropertyResolver } from "./propertyResolver";

export function ResolveBooleanExpression(req: IBooleanResolverRequest): boolean | undefined {

	const { map, str } = req;

	console.log("str ", str)
	const innerMostParenthesisMatches = str.match(innerParenthesisBooleanRegExp);
	if (!innerMostParenthesisMatches) {


		const resolvedBoolean = MatchBooleanProperties(req) ?? "undefined";

		return boolMap[resolvedBoolean];
	}

	let resolvedString = str;


	const parenthesisExpression = innerMostParenthesisMatches[0];

	const PropArg = {
		str: parenthesisExpression,
		map: map
	}
	const property = ResolveBooleanProperties(PropArg);


	if (property) {
		resolvedString = resolvedString.replace(parenthesisExpression, property.toString());
	}

	const arg: IBooleanResolverRequest = {
		str: resolvedString,
		map: map
	}


	return boolMap[ResolveBooleanExpression(arg)?.toString() ?? "undefined"];

}


function ResolveBooleanProperties(req: IBooleanResolverRequest) {

	const { str, map } = req;
	const innerMostBooleanMatches = str.match(innerMostBooleanRegExp);


	if (!innerMostBooleanMatches) {
		return;
	}

	const booleanExpression = innerMostBooleanMatches[0];
	const arg: IBooleanResolverRequest = {
		str: booleanExpression,
		map: map,
	}
	const property = MatchBooleanProperties(arg);


	return property;
}



function MatchBooleanProperties(req: IBooleanResolverRequest): string | undefined {

	const { str, map } = req;
	const properties = str.match(wordRegExp);

	let replacedProperties = str;

	if (!properties) {
		// console.log("there are no properties. ");
		return undefined;
	}

	// console.warn("properties : ", properties)
	// console.table(properties);

	for (const property of properties) {
		const arg: IBooleanResolverRequest = {
			map,
			str: property,
		}
		const bool = BooleanPropertyResolver(arg);

		if (bool == null || bool == undefined) {
			continue;
		}
		console.log(property, bool)
		replacedProperties = replacedProperties.replace(property, bool.toString());
	}


	return ProcessBooleanExpression(replacedProperties);

}




function ProcessBooleanExpression(base: string) {

	let finalExpression = base;


	const notExpression = finalExpression.match(notRegExp);
	if (notExpression) {
		const wordMatches = notExpression[0].match(wordRegExp);
		if (wordMatches) {

			const word = wordMatches[0];
			const resolvedBoolean = !boolMap[word];

			// console.log(`word : ${word},`, boolMap[word])
			finalExpression = finalExpression.replace(notExpression[0], resolvedBoolean.toString());
			return ProcessBooleanExpression(finalExpression);
		}
	}

	const andExpression = finalExpression.match(andRegExp);
	if (andExpression) {
		const wordMatches = andExpression[0].match(wordRegExp);
		if (wordMatches) {
			const LBoolean = boolMap[wordMatches[0]];
			const RBoolean = boolMap[wordMatches[1]];
			const resolvedBoolean = LBoolean && RBoolean;
			finalExpression = finalExpression.replace(andExpression[0], resolvedBoolean.toString());
			return ProcessBooleanExpression(finalExpression);
		}
	}


	const orExpression = finalExpression.match(orRegExp);
	if (orExpression) {
		const wordMatches = orExpression[0].match(wordRegExp);
		if (wordMatches) {
			const LBoolean = boolMap[wordMatches[0]];
			const RBoolean = boolMap[wordMatches[1]];
			const resolvedBoolean = LBoolean || RBoolean;
			finalExpression = finalExpression.replace(orExpression[0], resolvedBoolean.toString());
			return ProcessBooleanExpression(finalExpression);
		}
	}



	return finalExpression.trim();

}
