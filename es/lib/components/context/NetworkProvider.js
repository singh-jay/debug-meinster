import React, { useCallback, useState } from "react";
import { NetworkContext } from "./NetworkContext";
import withNetworkLogger from "../HOC/withNetworkLogger";
import DebugOverlay from "../DebugOverlay";
const Child = ({
  children
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DebugOverlay, null), children);
const WrappedComponent = withNetworkLogger(Child);
export const NetworkProvider = ({
  children
}) => {
  const [networkRequests, setNetworkRequests] = useState([]);
  const addNetworkRequest = useCallback(request => {
    setNetworkRequests(prevNetworkRequests => [...prevNetworkRequests, request]);
  }, []);
  const clearNetworkRequests = useCallback(() => {
    setNetworkRequests([]);
  }, []);
  return /*#__PURE__*/React.createElement(NetworkContext.Provider, {
    value: {
      networkRequests,
      addNetworkRequest,
      clearNetworkRequests
    }
  }, /*#__PURE__*/React.createElement(WrappedComponent, null, children));
};