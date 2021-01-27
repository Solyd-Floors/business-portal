import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../sagas/components/my-business/my-business-saga";

class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getOrders()
    }
    getBadgeType = order => {
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
    render(){
        return (
            <div className="card">
            <div className="card-body">
            <div className="d-sm-flex align-items-start justify-content-between mb-4">
                <div>
                <h4 className="card-title mb-1">Orders</h4>
                </div>
            </div>
            <div className="table-responsive">
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
                        this.props.orders.map(order => (
                            <tr>
                                <td className="py-1">{order.id}</td>
                                <td>{order.Invoice.last_four_digits}</td>
                                <td>{order.quantity}</td>
                                <td>${order.Invoice.price}</td>
                                <td>
                                    <label style={{marginLeft: 10}} class={`badge badge-${this.getBadgeType(order)}`}>
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
            </div>
            </div>
        </div>

        )
    }
}


const mapStateToProps = state => {
    let orders = state.myBusiness.orders.allIds.map(x => state.myBusiness.orders.byIds[x])
    return { ...state.myBusiness.orders, orders }
}
export default connect(mapStateToProps, { getOrders })(Orders);