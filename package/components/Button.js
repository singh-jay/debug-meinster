import React from "react";
const Button = ({
  label,
  variant: _variant = "success",
  onClick
}) => {
  return /*#__PURE__*/React.createElement("button", {
    className: `px-4 py-2 font-semibold text-sm text-white rounded-md shadow-sm ${_variant === "success" ? "bg-gray-700" : "bg-red-500"}`,
    onClick: onClick
  }, label);
};
export default Button;