import React, { useEffect, useRef, useState } from "react";

import trashIcon from "@/icons/svg/trash.svg";
import copyIcon from "@/icons/svg/copy.svg";
import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import JsonView from "react18-json-view";
import TableRow from "./TableRow";

const EditableInput = ({ value, onChange, onBlur }) => (
	<input
		type="text"
		value={value}
		onChange={onChange}
		onBlur={onBlur}
		className="appearance-none bg-transparent border-none rounded w-full py-1 px-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
	/>
);

const Table = ({ data, storageType, handleAddItem, handleDeleteItem, copyContent }) => {
	const [editedIndex, setEditedIndex] = useState("");
	const [editedValue, setEditedValue] = useState("");
	const [showActionButtons, setShowActionButtons] = useState("");
	const [_isMobile, setIsMobile] = useState(true);
	const isMobile = useIsMobile();
	// console.log("window", window);

	// useEffect(() => {
	// 	let vh = window.innerWidth;
	// 	if (vh >= 640) {
	// 		setIsMobile(false);
	// 	} else {
	// 		setIsMobile(true);
	// 	}
	// 	const resizeHandler = () => {
	// 		let vh = window.innerWidth;
	// 		// console.log("vh", vh);
	// 		if (vh >= 640) {
	// 			setIsMobile(false);
	// 		} else {
	// 			setIsMobile(true);
	// 		}
	// 	};
	// 	window.addEventListener("resize", resizeHandler);

	// 	return () => {
	// 		window.removeEventListener("resize", resizeHandler);
	// 	};
	// }, []);

	useEffect(() => {
		const scrollHandler = () => {
			if (showActionButtons !== "") {
				setShowActionButtons("");
			}
		};

		window.addEventListener("scroll", scrollHandler);

		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [showActionButtons]);

	const handleDoubleClick = (index, value) => {
		setEditedIndex(index);
		setEditedValue(value);
	};

	const handleInputBlur = (type, _key) => {
		if (type === "VALUE") {
			const oldDataIndex = data.findIndex(([key]) => key === _key);
			console.log(storageType, _key, editedValue, oldDataIndex);
			handleAddItem(storageType, _key, editedValue, { isUpdateFlow: true, updateIndex: oldDataIndex, checkDuplicateKey: false });
		} else {
			const newKey = editedValue;
			const oldDataIndex = data.findIndex(([key]) => key === _key);
			const newKeyValue = data[oldDataIndex][1];
			handleAddItem(storageType, newKey, newKeyValue, { isUpdateFlow: true, updateIndex: oldDataIndex, deleteKey: _key });
		}
		setEditedIndex("");
		setEditedValue("");
	};

	const handleInputChange = (event) => {
		setEditedValue(event.target.value);
	};

	const onRowClickHandler = (val) => {
		if (isMobile) {
			setShowActionButtons(val);
		}
	};

	const onPointerHandler = (val) => {
		if (!isMobile) {
			setShowActionButtons(val);
		}
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-auto gap-x-3 sm:gap-x-0 overflow-hidden">
			{/* <div className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Key</div>
			<div className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Value</div> */}
			{data.map(([key, value]) => {
				// const formatter = new JSONFormatter(value);
				return (
					<React.Fragment key={`${storageType}_${key}`}>
						<div
							className="border-b border-transparent sm:border-slate-200 dark:border-slate-700 p-1 sm:p-4 text-slate-500 dark:text-slate-400"
							onDoubleClick={() => handleDoubleClick(`key_${key}`, key)}
							onPointerEnter={() => onPointerHandler(`${key}`)}
							onPointerLeave={() => onPointerHandler("")}
							onClick={() => onRowClickHandler(`${key}`)}
						>
							{editedIndex === `key_${key}` ? <EditableInput autofocus value={editedValue} onChange={handleInputChange} onBlur={() => handleInputBlur("KEY", key)} /> : key}
						</div>
						<div
							className="relative border-b border-slate-200 dark:border-slate-700 mb-2 sm:mb-0 p-1 sm:p-4 text-slate-500 dark:text-slate-400 overflow-hidden"
							onDoubleClick={() => handleDoubleClick(`value_${key}`, value)}
							onPointerEnter={() => onPointerHandler(`${key}`)}
							onPointerLeave={() => onPointerHandler("")}
							onClick={() => onRowClickHandler(`${key}`)}
						>
							{editedIndex === `value_${key}` ? (
								<EditableInput autofocus value={editedValue} onChange={handleInputChange} onBlur={() => handleInputBlur("VALUE", key)} />
							) : (
								<TableRow value={value} />
							)}
							{showActionButtons === `${key}` && editedIndex === "" && (
								<div className="absolute bottom-1 sm:bottom-3 right-0 flex gap-1">
									<div className="p-1.5 bg-slate-200 rounded-md" onClick={() => handleDeleteItem(storageType, key)}>
										<Image src={trashIcon} width={18} height={18} alt="delete row" />
									</div>
									<div className="p-1.5 bg-slate-200 rounded-md" onClick={() => copyContent([[key, value]])}>
										<Image src={copyIcon} width={17} height={17} alt="copy row" />
									</div>
								</div>
							)}
						</div>
					</React.Fragment>
				);
			})}
			{data.length === 0 && (
				<div className="">
					<div className="text-slate-500 dark:text-slate-400 text-center">No Data</div>
				</div>
			)}
		</div>
	);
};

export default Table;
