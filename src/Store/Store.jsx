import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import RootReducer from "./Reducers/RootReducer"
import RootSaga from "./Sagas/RootSaga"

const SagaMiddleware = createSagaMiddleware()
const Store = configureStore({
    reducer:RootReducer,
    middleware:()=>[SagaMiddleware]
})
export default Store

SagaMiddleware.run(RootSaga)