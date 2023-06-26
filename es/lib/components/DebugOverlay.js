import dynamic from "next/dynamic";
import Image from "next/image";
import crossIcon from "../../../icons/svg/cross.svg";
import settingsIcon from "../../../icons/svg/settings.svg";
import { Suspense, useEffect, useState } from "react";
const Storage = dynamic(() => import("./Storage"), {
  loading: () => /*#__PURE__*/React.createElement("p", null, "Loading...")
});
function DebugOverlay() {
  const [mounted, setMounted] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return /*#__PURE__*/React.createElement(React.Fragment, null);
  return openPopup ? /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement(React.Fragment, null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 max-h-full sm:max-h-[calc(100vh-theme(space.8))] overflow-auto no-scrollbar right-0 w-full sm:w-1/2 sm:m-4 bg-white shadow-xl rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sticky top-0 z-10 text-center bg-white/50 backdrop-blur py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-medium"
  }, "App Settings"), /*#__PURE__*/React.createElement(Image, {
    className: "absolute top-0.5 right-4",
    src: crossIcon,
    width: 24,
    height: 24,
    alt: "Open popup icon",
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      setOpenPopup(false);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 pb-4"
  }, /*#__PURE__*/React.createElement(Storage, null)))) : /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 right-0 m-5"
  }, /*#__PURE__*/React.createElement(Image, {
    src: settingsIcon,
    width: 24,
    height: 24,
    alt: "Open popup icon",
    onClick: () => setOpenPopup(true)
  }));
}
export default DebugOverlay;