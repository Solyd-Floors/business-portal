import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OrderListCard from "../../components/OrderListCard";
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
    render(){
        return <OrderListCard orders={this.props.orders}/>
    }
}


const mapStateToProps = state => {
    let orders = state.myBusiness.orders.allIds.map(x => state.myBusiness.orders.byIds[x])
    return { ...state.myBusiness.orders, orders }
}
export default connect(mapStateToProps, { getOrders })(Orders);