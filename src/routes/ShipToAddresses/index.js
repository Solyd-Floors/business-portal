import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getShipToAddresses } from "../../sagas/components/my-business/my-business-saga";

class ShipToAddresses extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getShipToAddresses()
    }
    render(){
        return (
            <div className="card">
            <div className="card-body">
            <div className="d-sm-flex align-items-start justify-content-between mb-4">
                <div>
                <h4 className="card-title mb-1">Ship to addresses</h4>
                </div>
                <Link to="/ship_to_addresses/create">
                    <button
                        className="btn btn-light mt-3 mt-lg-0">
                            Add Ship To Address
                    </button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Address</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.ship_to_addresses.map(ship_to_address => (
                            <tr>
                                <td className="py-1">{ship_to_address.id}</td>
                                <td>{ship_to_address.address}</td>
                                <td>
                                    <Link to={`/ship_to_addresses/${ship_to_address.id}`}>
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
    let ship_to_addresses = state.myBusiness.ship_to_addresses.allIds.map(x => state.myBusiness.ship_to_addresses.byIds[x])
    return { ...state.myBusiness.ship_to_addresses, ship_to_addresses }
}
export default connect(mapStateToProps, { getShipToAddresses })(ShipToAddresses);