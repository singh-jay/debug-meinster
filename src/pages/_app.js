import ErrorBoundary from "@/lib/components/ErrorBoundry";
import { NetworkProvider } from "@/lib/components/context/NetworkProvider";
import "@/styles/globals.css";

function App({ Component, pageProps }) {
	return (
		<ErrorBoundary>
			<NetworkProvider>
				<Component {...pageProps} />
			</NetworkProvider>
		</ErrorBoundary>
	);
}

export default App;
