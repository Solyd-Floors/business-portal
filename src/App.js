import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import Routes from "./routes";
import { getAuth, logout } from "./sagas/components/auth/auth-saga";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  componentDidMount(){
    this.props.getAuth()
  }
  getMenuDivs = (menu) => {
    let items = menu.map(item => (
      <div 
        style={{ marginRight: 15, display: "inline", "cursor": "pointer", color: "blue" }} 
        onClick={item[1]}
      >{item[0]}</div>
    ))
    return items;
  }
  render(){
    return (
      <React.Fragment>
        <ToastContainer/>
        <Routes/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { exampleValue: state.exampleValue }
}

export default compose(
  withRouter,
  connect(mapStateToProps,{ getAuth, logout })
)(App);