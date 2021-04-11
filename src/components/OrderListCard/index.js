import React from "react";
import OrderList from "../OrderList";

export default props => {
    return (
        <div className="card">
            <div className="card-body">
            <div className="d-sm-flex align-items-start justify-content-between mb-4">
                <div>
                <h4 className="card-title mb-1">Orders</h4>
                </div>
            </div>
            <div className="table-responsive">
                <OrderList orders={props.orders}/>
            </div>
            </div>
        </div>
    )
}