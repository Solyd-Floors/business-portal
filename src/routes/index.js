import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoggedInOnly from "../components/LoggedInOnly";
import NotLoggedInOnly from "../components/NotLoggedInOnly";

let only_logged_in = [
    { path: "/logout", Component: lazy(() => import('./Logout')) }
]

let only_not_logged_in = [
    { path: "/login", Component: lazy(() => import('./Login')) },
]

export default () => {
    return (
        <Suspense fallback={""}>
            {
                only_logged_in.map(({path, Component},i) => (
                        <Route key={i} exact path={path} component={props => {
                            return (
                                <LoggedInOnly redirect_to="/login">
                                    <Component {...props}/>
                                </LoggedInOnly>
                            )
                        }} />
                ))
            }
            {
                only_not_logged_in.map(({path, Component},i) => (
                        <Route key={i} exact path={path} component={props => {
                            return (
                                <NotLoggedInOnly redirect_to="/home-learn">
                                    <Component {...props}/>
                                </NotLoggedInOnly>
                            )
                        }} />
                ))
            }
        </Suspense>
    )
}