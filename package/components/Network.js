import React, { useDeferredValue, useMemo, useState } from "react";
import { useNetworkContext } from "./context/NetworkContext";
import CarrotIcon from "./CarrotIcon";
import trashIcon from "../../../icons/svg/trash.svg";
import Image from "next/image";
import ObjectViewer from "./ObjectViewer";
export const Network = () => {
  const {
    networkRequests,
    clearNetworkRequests
  } = useNetworkContext();
  const [openSection, setOpenSection] = useState(false);
  const [filter, setFilter] = useState("");
  const deferredFilterValue = useDeferredValue(filter);
  const handleFilterChange = e => {
    e.preventDefault();
    e.stopPropagation();
    setFilter(e.target.value);
  };
  const filteredNetworkRequests = useMemo(() => {
    // console.log("deferredFilterValue", deferredFilterValue);
    // console.log("networkRequests", networkRequests);
    return networkRequests.filter(({
      request
    }) => request.url.includes(deferredFilterValue.toLowerCase()));
  }, [deferredFilterValue, networkRequests]);
  return /*#__PURE__*/React.createElement("details", {
    className: "group",
    open: openSection,
    onToggle: e => {
      setOpenSection(e.target.open);
    }
  }, /*#__PURE__*/React.createElement("summary", {
    className: "flex cursor-pointer list-none items-center justify-between font-medium"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-medium"
  }, "Network"), /*#__PURE__*/React.createElement("div", {
    className: "flex w-full mx-1 sm:mx-3 gap-2 items-center justify-between"
  }, openSection && filteredNetworkRequests.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Filter requests...",
    value: filter,
    onChange: handleFilterChange,
    className: "appearance-none bg-slate-100 border-none text-slate-500 dark:text-slate-400 rounded-md mt-2 py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-1.5 mt-1.5 hover:bg-slate-200 rounded-md",
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      clearNetworkRequests();
      setOpenSection(false);
    }
  }, /*#__PURE__*/React.createElement(Image, {
    src: trashIcon,
    width: 24,
    height: 24,
    alt: "clear console"
  })))), /*#__PURE__*/React.createElement("span", {
    className: "transition group-open:rotate-180"
  }, /*#__PURE__*/React.createElement(CarrotIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "group-open:animate-fadeIn mt-3 text-neutral-600 -mx-4"
  }, filteredNetworkRequests.map((request, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: `px-4 py-2 ${index % 2 === 0 ? "bg-slate-100" : ""}`
  }, /*#__PURE__*/React.createElement(ObjectViewer, {
    data: request
  })))));
};