import handleCatchPromise from "./catch-promise.middleware";
import { errorGeneric } from "./error.middleware";
import routeNoFound from "./not-found.middleware";
import authMidlleware from "./auth.middleware";
import roleMiddleware from "./role.middleware";

export {
  handleCatchPromise,
  errorGeneric,
  routeNoFound,
  authMidlleware,
  roleMiddleware,
};
