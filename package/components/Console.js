import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useState, useEffect, useMemo, useDeferredValue } from "react";
import CarrotIcon from "./CarrotIcon";
import trashIcon from "../../../icons/svg/trash.svg";
import Image from "next/image";
import Prism from "prismjs";
const getErrorColorClass = error => {
  switch (error.type) {
    case "error":
      return "text-red-500 dark:text-red-400";
    case "warn":
      return "text-amber-500 dark:text-amber-400";
    default:
      return "text-slate-500 dark:text-slate-400";
  }
};
function renderMarkdownToHTML(data) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  // const renderedHTML = md.render(markdown);
  return {
    __html: renderedHTML
  };
}
const Console = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("");
  const deferredFilterValue = useDeferredValue(filter);
  const [openSection, setOpenSection] = useState(false);
  useEffect(() => {
    const originalConsole = window.console;
    window.console = _extends({}, originalConsole, {
      log: (...args) => {
        originalConsole.log(...args);
        setLogs(logs => [...logs, {
          type: "log",
          message: args
        }]);
      },
      warn: (...args) => {
        originalConsole.warn(...args);
        setLogs(logs => [...logs, {
          type: "warn",
          message: args
        }]);
      },
      error: (...args) => {
        originalConsole.error(...args);
        setLogs(logs => [...logs, {
          type: "error",
          message: args
        }]);
      }
    });
    return () => {
      window.console = originalConsole;
    };
  }, []);
  const handleFilterChange = e => {
    e.preventDefault();
    e.stopPropagation();
    setFilter(e.target.value);
  };
  const filteredLogs = useMemo(() => logs.filter(log => {
    const message = log.message.join(" ");
    return message.toLowerCase().includes(deferredFilterValue.toLowerCase());
  }), [deferredFilterValue, logs]);
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
  }, "Console"), /*#__PURE__*/React.createElement("div", {
    className: "flex w-full mx-1 sm:mx-3 gap-2 items-center justify-between"
  }, openSection && filteredLogs.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Filter logs...",
    value: filter,
    onChange: handleFilterChange,
    className: "appearance-none bg-slate-100 border-none text-slate-500 dark:text-slate-400 rounded-md mt-2 py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-1.5 mt-1.5 hover:bg-slate-200 rounded-md",
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      console.clear();
      setLogs([]);
    }
  }, /*#__PURE__*/React.createElement(Image, {
    src: trashIcon,
    width: 24,
    height: 24,
    alt: "clear console"
  })))), /*#__PURE__*/React.createElement("span", {
    className: "transition group-open:rotate-180"
  }, /*#__PURE__*/React.createElement(CarrotIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "group-open:animate-fadeIn mt-3 text-neutral-600"
  }, /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-gray-700"
  }, filteredLogs.map((log, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: `py-2 ${getErrorColorClass(log)}`
  }, log.message.map((part, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    className: "break-words"
    // dangerouslySetInnerHTML={{ __html: Prism.highlight(part.toString(), Prism.languages.javascript, "javascript") }}
  }, part.toString())))))));
};
export default Console;