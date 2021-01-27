import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ValidationErrors from "../../components/ValidationErrors";
import WithoutPanel from "../../components/WithoutPanel";
import { postAuth } from "../../sagas/components/auth/auth-saga";

class _Login extends React.Component {
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
            <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
              <div className="content-wrapper d-flex align-items-center auth">
                <div className="row w-100">
                  <div className="col-lg-4 mx-auto">
                    <div className="auth-form-light text-left p-5">
                      <center>
                        <div className="">
                          <img src="./logo.svg" alt="logo" />
                        </div>

                      <h4>Hello! let's get started</h4>
                      <h6 className="font-weight-light">Sign in to continue.</h6>
                      <form onSubmit={this.onSubmit} className="pt-3">
                      <ValidationErrors errors={this.props.validationErrors}>
                        <div className="alert alert-danger">
                            Email or password is incorrect. Please try again.
                        </div>
                      </ValidationErrors>

                        <div className="form-group">
                          <input value={this.state.email} onChange={this.onChange("email")} type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="E-mail" />
                        </div>
                        <div className="form-group">
                          <input value={this.state.password} onChange={this.onChange("password")} type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="mt-3">
                          <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                        </div>
                        <div className="my-2 d-flex justify-content-between align-items-center">
                          {/* <div className="form-check">
                            <label className="form-check-label text-muted">
                              <input type="checkbox" className="form-check-input" />
                            </label>
                          </div> */}
                          <a href="#" className="auth-link text-black">Forgot password?</a>
                        </div>
                        {/* <div className="mb-2">
                          <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                            <i className="mdi mdi-facebook mr-2" />Connect using facebook
                          </button>
                        </div> */}
                        <div className="text-center mt-4 font-weight-light">
                          Don't have an account? <Link to="/contact_us" href="register.html" className="text-primary">Contact Us</Link>
                        </div>
                      </form>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
              {/* content-wrapper ends */}
            </div>
            {/* page-body-wrapper ends */}
          </div>
    
        )
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

const Login = connect(state => ({ 
    ...state.auth.postAuth, 
    validationErrors: state.validationErrors["postAuth"]
}), { postAuth })(_Login)

export default props => <WithoutPanel {...props}>{Login}</WithoutPanel>