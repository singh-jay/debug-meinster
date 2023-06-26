import React, { useCallback, useState } from "react";
import { NetworkContext } from "./NetworkContext";
import withNetworkLogger from "../HOC/withNetworkLogger";
import DebugOverlay from "../DebugOverlay";

const Child = ({ children }) => (
	<>
		<DebugOverlay />
		{children}
	</>
);

const WrappedComponent = withNetworkLogger(Child);

export const NetworkProvider = ({ children }) => {
	const [networkRequests, setNetworkRequests] = useState([]);

	const addNetworkRequest = useCallback((request) => {
		setNetworkRequests((prevNetworkRequests) => [...prevNetworkRequests, request]);
	}, []);

	const clearNetworkRequests = useCallback(() => {
		setNetworkRequests([]);
	}, []);

	return (
		<NetworkContext.Provider value={{ networkRequests, addNetworkRequest, clearNetworkRequests }}>
			<WrappedComponent>{children}</WrappedComponent>
		</NetworkContext.Provider>
	);
};
