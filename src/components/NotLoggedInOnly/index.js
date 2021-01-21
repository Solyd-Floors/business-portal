import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

function NotLoggedInOnly(props){
    if (props.loading) return null
    if (props.loggedIn) {
        if (props.redirect_to) return <Redirect to={props.redirect_to}/>
    }
    else {
        return props.children
    }
    return null;
}

let mapStateToProps = state => {
    return { 
        loading: state.auth.getAuth && state.auth.getAuth.loading,
        loggedIn: Boolean(state.auth.user) && Boolean(state.auth.user.Business) 
    }
}

export default connect(mapStateToProps)(NotLoggedInOnly)