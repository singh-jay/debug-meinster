import { createContext, useContext } from "react";
export const NetworkContext = /*#__PURE__*/createContext({});
export const useNetworkContext = () => useContext(NetworkContext);