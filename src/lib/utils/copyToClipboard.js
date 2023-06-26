const copyToClipboard = (text) => {
	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log("Text copied to clipboard");
			})
			.catch((error) => {
				console.error("Failed to copy text to clipboard:", error);
			});
	} else {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.setAttribute("readonly", "");
		textarea.style.position = "absolute";
		textarea.style.left = "-9999px";
		document.body.appendChild(textarea);
		textarea.select();
		textarea.setSelectionRange(0, textarea.value.length);

		let success = false;
		try {
			success = document.execCommand("copy");
			console.log("Text copied to clipboard");
		} catch (error) {
			console.error("Failed to copy text to clipboard:", error);
		}

		document.body.removeChild(textarea);

		if (!success) {
			fallbackCopyToClipboard(text);
		}
	}
};

const fallbackCopyToClipboard = (text) => {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.style.position = "fixed";
	document.body.appendChild(textarea);
	textarea.focus();
	textarea.select();

	try {
		const successful = document.execCommand("copy");
		const msg = successful ? "successful" : "unsuccessful";
		console.log("Fallback: Copying text command was " + msg);
	} catch (error) {
		console.error("Fallback: Unable to copy text:", error);
	}

	document.body.removeChild(textarea);
};

export default copyToClipboard;
