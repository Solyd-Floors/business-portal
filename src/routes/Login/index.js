import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ValidationErrors from "../../components/ValidationErrors";
import { postAuth } from "../../sagas/components/auth/auth-saga";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    onChange = key => ({ target }) => this.setState({ [key]: target.value })
    onSubmit = e => {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.postAuth({ email, password });
    }
    handleKeyPress = e => {
        if(e.key === 'Enter'){
          this.onSubmit(e)
        }
      }
    render(){
        return (
            <React.Fragment>
                <ValidationErrors errors={this.props.validationErrors}>
                    { error => <h5>{error}</h5>}
                </ValidationErrors>
                <form onSubmit={this.onSubmit}>
                    Email: <input value={this.state.email} onChange={this.onChange("email")}/><br/>
                    Password: <input value={this.state.password} onChange={this.onChange("password")}/><br/>
                    <button type="submit">{ this.props.loading ? "Loading..." : "Submit" }</button>
                </form>
            </React.Fragment>
        )
    }
}

export default connect(state => ({ 
    ...state.auth.postAuth, 
    validationErrors: state.validationErrors["postAuth"]
}), { postAuth })(Login)