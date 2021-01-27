import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoggedInOnly from "../components/LoggedInOnly";
import NotLoggedInOnly from "../components/NotLoggedInOnly";
import Loading from "../components/Loading";

const E404 = lazy(() => import('./E404'))

let only_logged_in = [
    { path: "/", Component: lazy(() => import('./Dashboard')) },
    { path: "/cart", Component: lazy(() => import('./MyCart')) },
    { path: "/floors", Component: lazy(() => import('./Floors')) },
    { path: "/floors/:floor_id(\\d+)", Component: lazy(() => import('./SingleFloor')) },
    { path: "/ship_to_addresses", Component: lazy(() => import('./ShipToAddresses')) },
    { path: "/ship_to_addresses/create", Component: lazy(() => import('./CreateShipToAddress')) },
    { path: "/ship_to_addresses/:ship_to_address_id(\\d+)", Component: lazy(() => import('./SingleShipToAddress')) },
    { path: "/employees", Component: lazy(() => import('./Employees')) },
    { path: "/orders", Component: lazy(() => import('./Orders')) },
    { path: "/billing", Component: lazy(() => import('./Billing')) },
    { path: "/invoices", Component: lazy(() => import('./Invoices')) },
    { path: "/employees/create", Component: lazy(() => import('./CreateEmployee')) },
    { path: "/employees/:employee_id(\\d+)", Component: lazy(() => import('./SingleEmployee')) },
    { path: "/logout", Component: lazy(() => import('./Logout')) }
]

let only_not_logged_in = [
    { path: "/login", Component: lazy(() => import('./Login')) },
]

export default () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Switch>
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
                                        <NotLoggedInOnly redirect_to="/">
                                            <Component {...props}/>
                                        </NotLoggedInOnly>
                                    )
                                }} />
                        ))
                    }
                <Route path="/" component={E404}/>
            </Switch>
        </Suspense>
    )
}