import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useState } from "react";
function ObjectViewer({
  data
}) {
  const [isOpen, setIsOpen] = useState({});
  const toggleOpen = key => {
    setIsOpen(prevState => _extends({}, prevState, {
      [key]: !prevState[key]
    }));
  };
  const renderData = data => {
    if (typeof data !== "object" || data === null) {
      return data;
    }
    if (Array.isArray(data)) {
      return data.map((item, index) => /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "ml-4"
      }, renderData(item)));
    }
    return Object.entries(data).map(([key, value]) => /*#__PURE__*/React.createElement("div", {
      key: key
    }, typeof value === "object" ? /*#__PURE__*/React.createElement("div", {
      onClick: () => toggleOpen(key),
      className: "cursor-pointer"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mr-1"
    }, isOpen[key] ? "\u25B8" : "\u25BE"), key) : /*#__PURE__*/React.createElement("div", null, key, ":", "  ", value), isOpen[key] && /*#__PURE__*/React.createElement("div", {
      className: "ml-4"
    }, renderData(value))));
  };
  return /*#__PURE__*/React.createElement("div", null, renderData(data));
}
export default ObjectViewer;