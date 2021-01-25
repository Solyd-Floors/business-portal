import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MainPanel from "../../components/MainPanel";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sidebar_opened: false
        }
    }
    render(){
        return <h1>Dashboard</h1>
    }
}

export default Dashboard;