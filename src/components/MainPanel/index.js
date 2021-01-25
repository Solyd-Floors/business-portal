import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

class MainPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          sidebar2_closed: false
        }
    }
    render(){
        return (
            <div className={`container-scroller ${this.state.sidebar2_closed ? "sidebar-icon-only" :""}`}>
                <Header 
                  toggle={() => {
                    console.log(555);
                    this.setState({sidebar_opened: !this.state.sidebar_opened})
                  }}
                  toggle2={() => {
                    this.setState({sidebar2_closed: !this.state.sidebar2_closed})
                  }}
                />
                <div className="container-fluid page-body-wrapper">
                  <div className="theme-setting-wrapper">
                    <div id="settings-trigger"><i className="mdi mdi-settings" /></div>
                  </div>
                  <div id="right-sidebar" className="settings-panel">
                    <i className="settings-close mdi mdi-close" />
                    <ul className="nav nav-tabs" id="setting-panel" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
                      </li>
                    </ul>
                  </div>
                  <nav 
                    onPointerOver={() => {
                      this.setState({ sidebar2_closed: false })
                    }} 
                  className={`sidebar sidebar-offcanvas ${this.state.sidebar_opened ? "active" : ""}`} id="sidebar">
                    <ul className="nav">
                      <li className="nav-item  nav-info">Dashboard</li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link" >
                          <i className="icon-layout menu-icon" />
                          <span className="menu-title">Dashboard</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/floors" className="nav-link" >
                          <i className="icon-layout menu-icon" />
                          <span className="menu-title">Floors</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ship_to_addresses" className="nav-link" >
                          <i className="icon-layout menu-icon" />
                          <span className="menu-title">Ship to addresses</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/employees" className="nav-link" >
                          <i className="icon-layout menu-icon" />
                          <span className="menu-title">Employees</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/orders" className="nav-link" >
                          <i className="icon-layout menu-icon" />
                          <span className="menu-title">Orders</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/billing" className="nav-link" >
                          <i className="icon-layout menu-icon" />
                          <span className="menu-title">Billing</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/invoices" className="nav-link" >
                          <i className="icon-layout menu-icon" />
                          <span className="menu-title">Invoices</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="main-panel">
                    <div className="content-wrapper">
                      {this.props.children}    
                      <Footer/>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default MainPanel;