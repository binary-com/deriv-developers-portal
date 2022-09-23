import { lazy, Suspense } from "react";
import { useSelector } from "@xstate/react";
import { isMobileSelector } from "../../../../state/selectors";
import { stateService } from "../../../../state/stateSignal";
import DelayedFallback from "../../../global/DelayedFallback/DelayedFallback";

const MobilePageSelect = lazy(() => import("./MobilePageSelect"));

export default function MobilePageSelectLazy() {
  const isMobile = useSelector(stateService, isMobileSelector);
  if (!isMobile) {
    return null;
  }
  return (
    <Suspense fallback={<DelayedFallback />}>
      <MobilePageSelect />
    </Suspense>
  );
}
