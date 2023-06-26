import { createContext, useContext } from "react";

export const NetworkContext = createContext({});

export const useNetworkContext = () => useContext(NetworkContext);
