import ErrorBoundary from "../../lib/components/ErrorBoundry";
import { NetworkProvider } from "../../lib/components/context/NetworkProvider";
import "@/styles/globals.css";
function App({
  Component,
  pageProps
}) {
  return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(NetworkProvider, null, /*#__PURE__*/React.createElement(Component, pageProps)));
}
export default App;