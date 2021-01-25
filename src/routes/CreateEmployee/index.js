import React from "react";
import MainPanel from "../../components/MainPanel";

import * as yup from "yup";
import ValidationErrors from "../../components/ValidationErrors";
import { connect } from "react-redux";
import { createEmployee } from "../../sagas/components/my-business/my-business-saga";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import EmployeeForm from "../../components/EmployeeForm";

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
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Add employee</h4>
                    <EmployeeForm
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
    validationErrors: state.validationErrors["createEmployee"]
}),{ createEmployee })(CreateEmployee);