import React from "react";
import { Link } from "react-router-dom";

const getBadgeType = order => {
    let badge_type;
    if (order.status === "WAITING_CONFIRMATION"){
        badge_type = "info"
    } else if (order.status === "CANCELED"){
        badge_type = "danger"
    } else if (order.status === "DELIVERED"){
        badge_type = "success"
    } else if (order.status === "SHIPPING"){
        badge_type = "warning"
    }
    return badge_type;
}

export default props => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                <th>#</th>
                <th>Card last digits</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.orders.map(order => (
                        <tr>
                            <td className="py-1">{order.id}</td>
                            <td>{order.Invoice.last_four_digits}</td>
                            <td>{order.quantity}</td>
                            <td>${order.Invoice.price}</td>
                            <td>
                                <label style={{marginLeft: 10}} class={`badge badge-${getBadgeType(order)}`}>
                                    {order.status}
                                </label>
                            </td>
                            <td>
                                <Link to={`/orders/${order.id}`}>
                                    <button type="button" class="btn btn-primary">More</button>
                                </Link>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}