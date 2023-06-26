import { useSyncExternalStore } from "react";

// A memoized constant fn prevents unsubscribe/resubscribe
// In practice it is not a big deal
function subscribe(onStoreChange) {
  var _global$window;
  (_global$window = global.window) == null ? void 0 : _global$window.addEventListener("resize", onStoreChange);
  return () => {
    var _global$window2;
    return (_global$window2 = global.window) == null ? void 0 : _global$window2.removeEventListener("resize", onStoreChange);
  };
}
function getSnapshot() {
  var _global$window3;
  return ((_global$window3 = global.window) == null ? void 0 : _global$window3.innerWidth) < 640 ? true : false;
}
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot);
}