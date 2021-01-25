import { all } from "redux-saga/effects"
import authSagaWatcher from "./components/auth/auth-saga"
import usersSagaWatcher from "./components/users/users-saga"
import myBusinessSagaWatcher from "./components/my-business/my-business-saga"
import floorsSagaWatcher from "./components/floors/floors-saga"
import uiSagaWatcher from "./components/ui/ui-saga"

export default function* rootSaga() {
    yield all([
        authSagaWatcher(),
        usersSagaWatcher(),
        floorsSagaWatcher(),
        myBusinessSagaWatcher(),
        uiSagaWatcher
    ])
}