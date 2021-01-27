import React from "react";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import { getShipToAddresses } from "../sagas/components/my-business/my-business-saga";

class _InsertShipToAddresses extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getShipToAddresses()
    }
    render(){
        let { loading, error } = this.props;
        if (loading) return <Loading/>
        if (error) return error.message;
        let WrappedComponent = this.props.children;
        return <WrappedComponent {...this.props} />
    }
}

const mapStateToProps = state => {
    let ship_to_addresses = state.myBusiness.ship_to_addresses.allIds.map(x => state.myBusiness.ship_to_addresses.byIds[x])
    return {
        ship_to_addresses_info: {
            ...state.myBusiness.ship_to_addresses, ship_to_addresses 
        } 
    }
}

const InsertShipToAddresses = connect(mapStateToProps, { getShipToAddresses })(_InsertShipToAddresses);

export default WrappedComponent => (
    props => <InsertShipToAddresses {...props}>{WrappedComponent}</InsertShipToAddresses>
)