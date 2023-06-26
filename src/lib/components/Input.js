import React from "react";

const Input = ({ label, type = "text", id, placeholder, name, value, onChange, ...rest }) => {
	if (type === "checkbox") {
		return <input id={id} name={name} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={value} onChange={onChange} />;
	}
	return (
		<div className="relative w-full">
			<input
				className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
				autoComplete="off"
				type={type}
				id={id}
				name={name || label}
				placeholder={placeholder || label}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				{...rest}
			/>
			<label
				htmlFor={id}
				className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
