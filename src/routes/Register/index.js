import React from "react"
import { connect } from "react-redux";
import ValidationErrors from "../../components/ValidationErrors";
import { postUsers } from "../../sagas/components/users/users-saga";
import * as yup from 'yup';
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    full_name: yup.string().required().min(5),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().equalTo(yup.ref('password'))
})

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            full_name: "",
            email: "",
            password: "",
            confirm_password: "",
            clientValidationErrors: []
        }
    }
    onChange = key => ({ target }) => this.setState({ [key]: target.value })
    onSubmit = async e => {
        e.preventDefault();
        if (this.props.loading) return;
        try {
            await formSchema.validate(this.state, { abortEarly: false })
        } catch(err) { 
            this.setState({ clientValidationErrors: err.errors })
            return;
        }
        let { full_name, email, password } = this.state;
        console.log(this.state)
        this.props.postUsers({ full_name, email, password });
    }
    getErrors = () => {
        if (this.state.clientValidationErrors.length) return this.state.clientValidationErrors;
        return this.props.validationErrors
    }
    handleKeyPress = e => {
        if(e.key === 'Enter'){
          this.onSubmit(e)
        }
      }
    render(){
        return (
            <div className="full-page login">
            <div className="full-page__left">
              <h1>You’re just a few clicks away from logging in to your account</h1>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero</p>
            </div>
            <div className="full-page__right">
              <h1>Register</h1>
              <ValidationErrors errors={this.getErrors()}>
                    { error => <React.Fragment>{error}<br/></React.Fragment>}
              </ValidationErrors>

              <div className="full-page__label">
                <input onKeyPress={this.handleKeyPress} value={this.state.full_name} onChange={this.onChange("full_name")} type="text" placeholder="Full Name" />
                <input onKeyPress={this.handleKeyPress} value={this.state.email} onChange={this.onChange("email")} type="email" placeholder="Email" />
                <input onKeyPress={this.handleKeyPress} value={this.state.password} onChange={this.onChange("password")} type="password" placeholder="Password" />
                <input onKeyPress={this.handleKeyPress} value={this.state.confirm_password} onChange={this.onChange("confirm_password")} type="password" placeholder="Confirm Password" />
                <a href="#">Forgot your password?</a>
              </div>
              <div>
                <button onClick={this.onSubmit} className="secondary-button">Sign Up</button>
                <p>Already have an account?<Link to="/login">Sign In</Link></p>
              </div>
            </div>
          </div>
    
        )
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <ValidationErrors errors={this.getErrors()}>
                        { error => <h5>{error}</h5>}
                    </ValidationErrors>
                    full_name: <input value={this.state.full_name} onChange={this.onChange("full_name")}/><br/>
                    email: <input value={this.state.email} onChange={this.onChange("email")}/><br/>
                    password: <input value={this.state.password} onChange={this.onChange("password")}/><br/>
                    confirm_password: <input value={this.state.confirm_password} onChange={this.onChange("confirm_password")}/><br/>
                    <button type="submit">{ this.props.loading ? "Loading..." : "Submit" }</button>
                </form>
            </React.Fragment>
        )
    }
}

export default connect(state => ({
    loading: state.users.postUsers.loading,
    validationErrors: state.validationErrors["postUsers"]
}), { postUsers })(Register)