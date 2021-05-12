import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoggedInOnly from "../../components/LoggedInOnly";
import NotLoggedInOnly from "../../components/NotLoggedInOnly";

const E404 = lazy(() => import('../E404'))

let only_logged_in = [
    { path: "/admin/", Component: lazy(() => import('./Dashboard')) },
    { path: "/admin/logout", Component: lazy(() => import('./Logout')) }
]

let only_not_logged_in = [
    { path: "/admin/login", Component: lazy(() => import('./Login')) },
]

export default () => {
    return (
        <React.Fragment>
                    {
                        only_logged_in.map(({path, Component},i) => (
                                <Route key={i} exact path={path} component={props => {
                                    return <Component {...props}/>
                                    return (
                                        <LoggedInOnly redirect_to="/login">
                                        </LoggedInOnly>
                                    )
                                }} />
                        ))
                    }
                    {
                        only_not_logged_in.map(({path, Component},i) => (
                                <Route key={i} exact path={path} component={props => {
                                    return <Component {...props}/>
                                    return (
                                        <NotLoggedInOnly redirect_to="/">
                                        </NotLoggedInOnly>
                                    )
                                }} />
                        ))
                    }
                {/* <Route path="/" component={E404}/> */}
        </React.Fragment>
    )
}