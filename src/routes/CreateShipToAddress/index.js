import React from "react";
import MainPanel from "../../components/MainPanel";

import * as yup from "yup";
import ValidationErrors from "../../components/ValidationErrors";
import { connect } from "react-redux";
import { createShipToAddress } from "../../sagas/components/my-business/my-business-saga";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import ShipToAddressForm from "../../components/ShipToAddressForm";

const createShipToAddressSchema = {
    address: yup.string().required()
}

class CreateShipToAddress extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validationErrors: [],
            data: {
                address: ""
            }
        }
        this.toastId = React.createRef();
    }
    onChange = key => e => {
        let { value } = e.target;
        this.setState(async prevState => {
            prevState.data[key] = value;
            return { ...prevState, data: { ...prevState.data }}
        },async () => {
            try {
                await yup.object().shape(createShipToAddressSchema).validate(this.state.data, { abortEarly: false })                
                this.setState({ validationErrors: [ ]})
            } catch(err){
                console.log(err.inner)
                this.setState({ validationErrors: err.inner })
            }
        })
    }
    getValue = key => this.state.data[key]
    componentDidMount(){
        let args = { ...this.state.data }
        yup.object().shape(createShipToAddressSchema).validate(args, { abortEarly: false })
            .catch(err => {
                this.setState({ validationErrors: err.inner })
            })
    }
    onSubmit = async e => {
        e.preventDefault();
        this.setState({ validationErrors: [] })
        try {
            let args = { ...this.state.data }
            console.log({args})
            let { password_confirmation, ...data} = await yup.object().shape(createShipToAddressSchema).validate(args, { abortEarly: false })
            this.props.createShipToAddress({
                ...data,
                onStart:() => this.toastId.current = toast("Creating ship to address..", { type: toast.TYPE.INFO, autoClose: false }),
                onError: () => toast.update(this.toastId.current, { render: "Failed to create ship to address", type: toast.TYPE.ERROR, autoClose: 1000 }),
                onSuccess: pk => {
                  toast.update(this.toastId.current, { render: "Successfully created ship to address" , type: toast.TYPE.SUCCESS, autoClose: 2500 })
                  this.props.history.push("/ship_to_addresses/" + pk)
                }
            })
            this.setState({ validationErrors: [] })
        } catch (err) {
            console.log(err.inner,err.list,err)
            this.setState({ validationErrors: err.inner })
        }
    }
    getErrors = () => {
        console.log(this.state.validationErrors,"this.state.validationErrors")
        return this.state.validationErrors.length ? this.state.validationErrors : (this.props.validationErrors || [])
    }
    getFeedback = key => {
        let errors = this.getErrors()
        errors = errors.list ? errors.list : errors;
        let value = errors.find(x => x.path == key);
        if (!value){
            return (
                <div style={{display:"block" }} class="valid-feedback">
                    {this.state.data[key] ? "Looks good!" : "Optional"}
                </div>
            )
        }
        return (
            <div style={{display:"block" }} class="invalid-feedback">
                {value.message}
            </div>
        )
    }
    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Add Ship To Address</h4>
                    <ShipToAddressForm
                        onSubmit={this.onSubmit}
                        errors={this.getErrors()}
                        getFeedback={this.getFeedback}
                        getValue={this.getValue}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    validationErrors: state.validationErrors["createShipToAddress"]
}),{ createShipToAddress })(CreateShipToAddress);