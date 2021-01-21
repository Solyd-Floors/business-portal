import { all } from "redux-saga/effects"
import authSagaWatcher from "./components/auth/auth-saga"
import usersSagaWatcher from "./components/users/users-saga"

export default function* rootSaga() {
    yield all([
        authSagaWatcher(),
        usersSagaWatcher(),
    ])
}