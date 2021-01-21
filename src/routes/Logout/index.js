import React from "react";
import { connect } from "react-redux";
import { logout, getAuth } from "../../sagas/components/auth/auth-saga"

class Logout extends React.Component {
    componentDidMount(){
        this.props.logout()
        this.props.getAuth()
    }
    render(){
        return "Logging out"
    }
}

export default connect(null, { logout, getAuth })(Logout)