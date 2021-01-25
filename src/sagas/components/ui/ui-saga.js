import { takeEvery } from "redux-saga/effects";

export const setWithPanel = value => ({ type: "SET_WITH_PANEL", value })

export default function* uiSagaWatcher() {
    yield takeEvery("SET_WITH_PANEL", setWithPanel)
}