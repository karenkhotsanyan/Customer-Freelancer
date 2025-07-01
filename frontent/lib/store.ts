// import type { Action, ThunkAction } from "@reduxjs/toolkit";
// import { combineSlices, configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "./features/counter/counterSlice";
// import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
// import { rtkAuth } from "./features/authRTK/rtkQuery";

// // `combineSlices` automatically combines the reducers using
// // their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// const rootReducer = combineSlices(counterSlice, quotesApiSlice,rtkAuth);
// // Infer the `RootState` type from the root reducer
// export type RootState = ReturnType<typeof rootReducer>;

// // `makeStore` encapsulates the store configuration to allow
// // creating unique store instances, which is particularly important for
// // server-side rendering (SSR) scenarios. In SSR, separate store instances
// // are needed for each request to prevent cross-request state pollution.
// export const makeStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//     // Adding the api middleware enables caching, invalidation, polling,
//     // and other useful features of `rtk-query`.
//     middleware: (getDefaultMiddleware) => {
//       return getDefaultMiddleware().concat(quotesApiSlice.middleware);
//     },
//   });
// };

// // Infer the return type of `makeStore`
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore["dispatch"];
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action
// >;
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
import { rtkAuth } from "./features/authRTK/rtkQuery";
import { rtkCustomer } from "./features/customerRTK/trkQuery";
import { rtkFreelancer } from "./features/freelancerRTK/rtkQuery";
import { rtkJob } from "./features/jobRTK/rtkQuery";
import { rtkSkills } from "./features/skillsRTK/rtkQuery";
import { rtkUser } from "./features/userRTK/rtkQuery";
// import { rtkAuth } from "./path/to/rtkAuth"; // import your auth slice

// Add your rtkAuth slice here along with others
const rootReducer = combineSlices(
  rtkAuth,
  rtkCustomer,
  rtkFreelancer,
  rtkJob,
  rtkSkills,
  rtkUser
);

export type RootState = ReturnType<typeof rootReducer>;
const apiMiddlewares = [
  rtkAuth.middleware,
  rtkCustomer.middleware,
  rtkFreelancer.middleware,
  rtkJob.middleware,
  rtkSkills.middleware,
  rtkUser.middleware,
];
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        // .concat(quotesApiSlice.middleware)
        .concat(...apiMiddlewares),
    // devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
