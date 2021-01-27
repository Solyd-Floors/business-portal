import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import MainPanel from "../../components/MainPanel";
import { deleteShipToAddress, getSingleShipToAddress } from "../../sagas/components/my-business/my-business-saga";
import E404 from "../E404";
import E505 from "../E505";
import { toast } from 'react-toastify';
import ShipToAddressForm from "../../components/ShipToAddressForm";
import Loading from "../../components/Loading";

import * as yup from "yup";

const updateShipToAddressSchema = {
    address: yup.string().required()
}

class SingleShipToAddress extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            disabled: true,
            validationErrors: [],
            data: {

            }
        }
        this.ship_to_address_id = this.props.match.params.ship_to_address_id;
        this.toastId = React.createRef();
    }
    componentDidMount(){
        this.props.getSingleShipToAddress(this.ship_to_address_id)
    }
    clearState = () => this.setState(prevState => ({ disabled: true, data: {}, validationErrors: [] }))
    getValue = key => this.state.data[key] === undefined ? this.props.ship_to_address[key] : this.state.data[key]
    getData = () => ({ ...this.props.ship_to_address, ...this.state.data })
    onChange = key => e => {
        let { value } = e.target;
        this.setState(async prevState => {
            prevState.data[key] = value;
            return { ...prevState, data: { ...prevState.data }}
        },async () => {
            try {
                await yup.object().shape(updateShipToAddressSchema).validate(this.getData(), { abortEarly: false })                
                this.setState({ validationErrors: [ ]})
            } catch(err){
                console.log(err.inner)
                this.setState({ validationErrors: err.inner })
            }
        })
    }
    getErrors = () => this.state.validationErrors.length ? this.state.validationErrors : (this.props.validationErrors || [])
    getFeedback = key => {
        if (this.state.disabled) return null;
        let errors = this.getErrors()
        errors = errors.list ? errors.list : errors;
        let value = errors.find(x => x.path == key);
        if (!value){
            return (
                <div style={{display:"block" }} class="valid-feedback">
                    {this.getValue(key) ? "Looks good!" : "Optional"}
                </div>
            )
        }
        return (
            <div style={{display:"block" }} class="invalid-feedback">
                {value.message}
            </div>
        )
    }

    deleteShipToAddress = () => {
        this.props.deleteShipToAddress({
            pk: this.ship_to_address_id,
            onStart:() => this.toastId.current = toast("Deleting ship to address..", { type: toast.TYPE.INFO, autoClose: false }),
            onError: () => toast.update(this.toastId.current, { render: "Failed to delete ship to address", type: toast.TYPE.ERROR, autoClose: 5000 }),
            onSuccess: () => {
              toast.update(this.toastId.current, { render: "Successfully deleted ship to address" , type: toast.TYPE.SUCCESS, autoClose: 5000 })
              this.props.history.push("/ship_to_addresses")
            }
        })
    }
    onSubmit = async e => {
        e.preventDefault();
        this.setState({ validationErrors: [] })
        try {
            let { password_confirmation, ...data} = await yup.object().shape(updateShipToAddressSchema).validate(this.getData(), { abortEarly: false })
            this.props.updateShipToAddress({
                pk: this.ship_to_address_id,
                ...data,
                onStart:() => this.setState({update_loading: true}),
                onError: () => this.setState({update_loading: false}),
                onSuccess: pk => {
                  toast.update(this.toastId.current, { render: "Successfully updated ship to address" , type: toast.TYPE.SUCCESS, autoClose: 2500 })
                  this.setState({ disabled: true, update_loading: false })
                }
            })
            this.setState({ validationErrors: [] })
        } catch (err) {
            console.log(err.inner)
            this.setState({ validationErrors: err.inner })
        }
    }

    render(){
        let { loading, error, ship_to_address } = this.props;
        console.log(error)
        if (error) {
            if (error.response.status == 404) return <E404/>
            return <E505/>
        }
        if (loading) return "Loading..."
        return (
            <div className="card">
            <div className="card-body">
            <h4 className="card-title">
                Ship to address details  &nbsp;&nbsp;&nbsp;
                {
                    this.state.disabled &&  
                        <React.Fragment>
                            <button 
                                onClick={this.deleteShipToAddress}
                                type="button" 
                                className="btn btn-danger mr-2"
                            >Delete</button>
                        </React.Fragment>

                }
            </h4>
            <p className="card-description">
            </p>
            {
                ship_to_address &&
                <ShipToAddressForm
                    onSubmit={this.onSubmit}
                    errors={this.getErrors()}
                    getFeedback={this.getFeedback}
                    getValue={this.getValue}
                    onChange={this.onChange}
                    disabled={this.state.disabled}
                    onCancel={this.clearState}
                    hidePassword={true}
                    showLoading={this.state.update_loading}
                    hideButtons={this.state.update_loading}
                />
            }
            {
                !ship_to_address && <Loading/>
            }
            </div>
        </div>
)
    }
}

let mapStateToProps = (state,props) => {
    let { loading, error, data: ship_to_address } = state.myBusiness.singleShipToAddressRequests[props.match.params.ship_to_address_id] || {
      loading: true,
      error: false,
      data: undefined
    }
    return { loading, error, ship_to_address, validationErrors: state.validationErrors["createShipToAddress"] }
}
export default compose(
    withRouter,
    connect(mapStateToProps, { getSingleShipToAddress, deleteShipToAddress })
)(SingleShipToAddress);