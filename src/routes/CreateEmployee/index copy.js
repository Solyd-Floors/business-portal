import React from "react";
import MainPanel from "../../components/MainPanel";

import * as yup from "yup";
import ValidationErrors from "../../components/ValidationErrors";
import { connect } from "react-redux";
import { createEmployee } from "../../sagas/components/my-business/my-business-saga";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const createEmployeeSchema = {
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup.string()
       .oneOf([yup.ref('password'), null], 'Passwords must match'),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    address: yup.string(),
    address2: yup.string(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
    postcode: yup.string(),
    phone_number: yup.string()
}

class CreateEmployee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validationErrors: [],
            data: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                phone_number: "",
                address: "",
                address2: "",
                city: "",
                state: "",
                country: "",
                postcode: "",
                phone_number: ""
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
                await yup.object().shape(createEmployeeSchema).validate(this.state.data, { abortEarly: false })                
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
        yup.object().shape(createEmployeeSchema).validate(args, { abortEarly: false })
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
            let { password_confirmation, ...data} = await yup.object().shape(createEmployeeSchema).validate(args, { abortEarly: false })
            this.props.createEmployee({
                ...data,
                onStart:() => this.toastId.current = toast("Creating employee..", { type: toast.TYPE.INFO, autoClose: false }),
                onError: () => toast.update(this.toastId.current, { render: "Failed to create employee", type: toast.TYPE.ERROR, autoClose: 1000 }),
                onSuccess: pk => {
                  toast.update(this.toastId.current, { render: "Successfully created employee" , type: toast.TYPE.SUCCESS, autoClose: 2500 })
                  this.props.history.push("/employees/" + pk)
                }
            })
            this.setState({ validationErrors: [] })
        } catch (err) {
            console.log(err.inner)
            this.setState({ validationErrors: err.inner })
        }
    }
    getErrors = () => this.state.validationErrors.length ? this.state.validationErrors : (this.props.validationErrors || [])
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
            <MainPanel>
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Add employee</h4>
                    <form onSubmit={this.onSubmit} className="form-sample">
                    <ValidationErrors errors={this.getErrors()}>
                            { error => {
                                if (typeof(error) == "object") return null;
                                return (
                                    <div class="alert alert-danger" role="alert">
                                        {error.message || error}
                                    </div>
                                )
                            }}
                        </ValidationErrors>

                    <p className="card-description">
                        Account credentials
                        </p>
                        <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">E-mail</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("email")}
                                    value={this.getValue("email")}
                                    type="text" 
                                    className="form-control" 
                                />
                                {this.getFeedback("email")}
                            </div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("password")}
                                    value={this.getValue("password")}
                                    type="password"
                                    className="form-control"
                                />
                                {this.getFeedback("password")}
                            </div>
                            </div>
                        </div>
                        </div>
                        <p className="card-description">
                        Personal info
                        </p>
                        <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">First Name</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("first_name")}
                                    value={this.getValue("first_name")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("first_name")}
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Last Name</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("last_name")}
                                    value={this.getValue("last_name")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("last_name")}
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Phone</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("phone_number")}
                                    value={this.getValue("phone_number")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("phone_number")}
                            </div>
                            </div>
                        </div>
                        </div>
                        <p className="card-description">
                        Address
                        </p>
                        <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Address 1</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("address")}
                                    value={this.getValue("address")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("address")}
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">State</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("state")}
                                    value={this.getValue("state")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("state")}
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Address 2</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("address2")}
                                    value={this.getValue("address2")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("address2")}
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Postcode</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("postcode")}
                                    value={this.getValue("postcode")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("postcode")}
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">City</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("city")}
                                    value={this.getValue("city")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("city")}
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Country</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.onChange("country")}
                                    value={this.getValue("country")}
                                    type="text"
                                    className="form-control"
                                />
                                {this.getFeedback("country")}
                            </div>
                            </div>
                        </div>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        <Link to="/employees">
                            <button className="btn btn-light">Cancel</button>
                        </Link>

                    </form>
                    </div>
                </div>

                {/* <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Add Employee</h4>
                    <p className="card-description">
                        
                    </p>
                    <form onSubmit={this.onSubmit} className="forms-sample"> 
                        <ValidationErrors errors={this.getErrors()}>
                            { error => (
                                <div class="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                        </ValidationErrors>
                        <div className="form-group">
                        <label htmlFor="exampleInputFullName1">Full Name</label>
                        <input
                            onChange={this.onChange("full_name")}
                            value={this.getValue("full_name")}
                            className="form-control"
                            id="exampleInputFullName1"
                            placeholder="Full Name" 
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            onChange={this.onChange("email")}
                            value={this.getValue("email")}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email" 
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            onChange={this.onChange("password")}
                            value={this.getValue("password")}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                        <input
                            onChange={this.onChange("password_confirmation")}
                            value={this.getValue("password_confirmation")}
                            type="password"
                            className="form-control"
                            id="exampleInputConfirmPassword1"
                            placeholder="Password"
                        />
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        <Link to="/employees">
                            <button className="btn btn-light">Cancel</button>
                        </Link>
                    </form>
                    </div>
                </div> */}
            </MainPanel>
        )
    }
}

export default connect(state => ({
    validationErrors: state.validationErrors["createEmployee"]
}),{ createEmployee })(CreateEmployee);