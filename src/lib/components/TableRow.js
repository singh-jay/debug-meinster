import React, { useEffect, useRef } from "react";

import JSONFormatter from "json-formatter-js";

const parseJSONValue = (value, parseJSON = true) => {
	if (!parseJSON) return value;
	try {
		const parsedJSON = JSON.parse(value);
		return parsedJSON;
	} catch (e) {
		return value;
	}
};
const TableRow = ({ value, overflowAllowed = true, parseJSON = true, open = 0 }) => {
	const renderRef = useRef(null);

	useEffect(() => {
		if (renderRef.current) {
			const formatter = new JSONFormatter(parseJSONValue(value, parseJSON), open);
			const formattedElem = formatter.render();
			renderRef.current.innerHTML = "";
			renderRef.current.appendChild(formattedElem);
		}
	}, [value, parseJSON, open]);
	return <div ref={renderRef} className={overflowAllowed ? "overflow-x-auto no-scrollbar whitespace-nowrap" : ""} />;
};

export default React.memo(TableRow);
