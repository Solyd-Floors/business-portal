import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import MainPanel from "../../components/MainPanel";
import { deleteEmployee, getSingleEmployee, updateEmployee } from "../../sagas/components/my-business/my-business-saga";
import E404 from "../E404";
import E505 from "../E505";
import { toast } from 'react-toastify';
import EmployeeForm from "../../components/EmployeeForm";
import Loading from "../../components/Loading";

import * as yup from "yup";

const updateEmployeeSchema = {
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

class SingleEmployee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            disabled: true,
            validationErrors: [],
            data: {

            }
        }
        this.employee_id = this.props.match.params.employee_id;
        this.toastId = React.createRef();
    }
    componentDidMount(){
        this.props.getSingleEmployee(this.employee_id)
    }
    clearState = () => this.setState(prevState => ({ disabled: true, data: {}, validationErrors: [] }))
    getValue = key => this.state.data[key] === undefined ? this.props.employee[key] : this.state.data[key]
    getData = () => ({ ...this.props.employee, ...this.state.data })
    onChange = key => e => {
        let { value } = e.target;
        this.setState(async prevState => {
            prevState.data[key] = value;
            return { ...prevState, data: { ...prevState.data }}
        },async () => {
            try {
                await yup.object().shape(updateEmployeeSchema).validate(this.getData(), { abortEarly: false })                
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

    deleteEmployee = () => {
        this.props.deleteEmployee({
            pk: this.employee_id,
            onStart:() => this.toastId.current = toast("Deleting employee..", { type: toast.TYPE.INFO, autoClose: false }),
            onError: () => toast.update(this.toastId.current, { render: "Failed to delete employee", type: toast.TYPE.ERROR, autoClose: 5000 }),
            onSuccess: () => {
              toast.update(this.toastId.current, { render: "Successfully deleted employee" , type: toast.TYPE.SUCCESS, autoClose: 5000 })
              this.props.history.push("/employees")
            }
        })
    }
    onSubmit = async e => {
        e.preventDefault();
        this.setState({ validationErrors: [] })
        try {
            let { password_confirmation, ...data} = await yup.object().shape(updateEmployeeSchema).validate(this.getData(), { abortEarly: false })
            this.props.updateEmployee({
                pk: this.employee_id,
                ...data,
                onStart:() => this.setState({update_loading: true}),
                onError: () => this.setState({update_loading: false}),
                onSuccess: pk => {
                  toast.update(this.toastId.current, { render: "Successfully updated employee" , type: toast.TYPE.SUCCESS, autoClose: 2500 })
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
        let { loading, error, employee } = this.props;
        if (error) {
            if (error.response.status == 404) return <E404/>
            return <E505/>
        }
        if (loading) return "Loading..."
        return (
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">
                    Employee details  &nbsp;&nbsp;&nbsp;
                    {
                        this.state.disabled &&  
                            <React.Fragment>
                                <button 
                                    onClick={() => {
                                        this.setState({ disabled: false })
                                    }}
                                    type="button" 
                                    className="btn btn-primary mr-2"
                                >Edit</button>
                                <button 
                                    onClick={this.deleteEmployee}
                                    type="button" 
                                    className="btn btn-danger mr-2"
                                >Delete</button>
                            </React.Fragment>

                    }
                </h4>
                <p className="card-description">
                </p>
                {
                    employee &&
                    <EmployeeForm
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
                    !employee && <Loading/>
                }
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state,props) => {
    let { loading, error, data: employee } = state.myBusiness.singleEmployeeRequests[props.match.params.employee_id] || {
      loading: true,
      error: false,
      data: undefined
    }
    return { loading, error, employee, validationErrors: state.validationErrors["createEmployee"] }
}
export default compose(
    withRouter,
    connect(mapStateToProps, { getSingleEmployee, deleteEmployee, updateEmployee })
)(SingleEmployee);