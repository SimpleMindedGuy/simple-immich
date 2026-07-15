export class StringFunctions {
	static isContainSpecialCharaters(str: string): boolean {
		// This regex matches any character that is NOT:
		// 1. A Unicode letter: \p{L}
		// 2. A Unicode number: \p{N} (optional, remove if numbers are forbidden)
		// 3. A hyphen: -
		// 4. An underscore: _
		// 5. A whitespace: \s
		const expression = /[^\p{L}\p{N}\-_\s]/u;
		const matches = str.match(expression);

		if (!matches) {
			return false;
		}
		if (matches.length == 0) {
			return false;
		}
		return true;
	}

	static SpaceReplaceWithDash(str: string): string {
		const expression = new RegExp(/\s+/g);
		const replacedString = str.replace(expression, "-");
		return replacedString;
	}

	static UrlSanitize(str: string): string {
		const urlSanitizeReg = new RegExp(/((?<=https?:\/\/.+)\/\/+)|\/$/g);
		const url = str.replace(urlSanitizeReg, "/");

		return url;
	}

	static UrlValidate(str: string): boolean {
		let isValid = false;

		const urlValidationReg = new RegExp(
			/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/gm,
		);

		const matches = str.match(urlValidationReg);

		if (!matches) {
			return isValid;
		}

		isValid = true;
		return isValid;
	}

	static EmailValidate(str: string): boolean {
		let isValid = false;

		const emailValidateReg = new RegExp(
			// eslint-disable-next-line no-control-regex
			/^(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/gm,
		);

		const matches = str.match(emailValidateReg);

		if (!matches) {
			return isValid;
		}

		isValid = true;

		return isValid;
	}
}
