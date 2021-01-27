import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        let prvDefault = e => e.preventDefault()
        return (
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
              <div className="text-center navbar-brand-wrapper d-flex align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Link to="/" className="navbar-brand brand-logo"><img src="/logo.svg" alt="logo" /></Link>
                    <Link to="/" className="navbar-brand brand-logo-mini"><img src="/logo.svg" alt="logo" /></Link>
                  </div>
                </div>
              </div>
              <div className="navbar-menu-wrapper">
                <div className="navbar-overlapped d-flex align-items-center justify-content-end justify-content-lg-start">
                  <ul className="navbar-nav navbar-search mr-lg-2">
                    <li className=" d-none d-lg-block">
                      <button onClick={this.props.toggle2} className="navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="icon-menu" />
                      </button>
                    </li>
                    <li className="nav-item nav-search d-none d-lg-block">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="search">
                            <i className="icon-search" />
                          </span>
                        </div>
                        <input type="text" className="form-control" placeholder="Type to search" aria-label="search" aria-describedby="search" />
                      </div>
                    </li>
                  </ul>
                  <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                      {/* <Link to="/cart" className="nav-link count-indicator dropdown-toggle">
                        <div className="boxed-item">
                          Cart
                        </div>
                      </Link> */}
                    </li>
                  </ul>
                  <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                    <Link to="/cart" className="nav-link count-indicator dropdown-toggle">
                        <div className="boxed-item">
                          Go to cart
                        </div>
                      </Link>
                    </li>
                    {/* <li className="nav-item dropdown  d-none d-lg-block">
                      <a className="nav-link language-dropdown" id="languageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                        <div className="boxed-item  dropdown-toggle">
                          <i className="flag-icon flag-icon-ai" title="ai" id="ai" /> <span className="text-dark">English</span>
                        </div>
                      </a>
                      <div className={`dropdown-menu navbar-dropdown`} aria-labelledby="languageDropdown">
                      </div>
                    </li> */}
                    <li className="nav-item dropdown">
                      <a onClick={e => {
                            e.preventDefault()
                            this.setState({ profile_dropdown_opened: !this.state.profile_dropdown_opened })
                      }} className="nav-link language-dropdown" id="userDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                        <img style={{
                          borderRadius: "100%"
                        }} src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png" className="user-icon" />
                      </a>
                      <div className={`dropdown-menu navbar-dropdown ${this.state.profile_dropdown_opened ? "show" :""}`} aria-labelledby="userDropdown">
                        <Link to="/my_account" className="dropdown-item" href="#">  <i className="mdi mdi-account-outline" /> My Account </Link>
                        <Link to="/logout" className="dropdown-item" href="#">  <i className="mdi mdi-logout" /> Logout </Link>
                      </div>
                    </li>
                  </ul>
                  <button 
                    className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" 
                    onClick={this.props.toggle} 
                    type="button" 
                    data-toggle="offcanvas"
                >
                    <span className="icon-menu" />
                  </button>
                </div>
              </div>
            </nav>
        )
        return (
            <nav style={{ padding: "0.1%", minHeight: "100vh" }} className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item  nav-info">Dashboard</li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="icon-layout menu-icon" />
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employees" className="nav-link">
                  <i className="icon-head menu-icon" />
                  <span className="menu-title">Employees</span>
                </Link>
              </li>
            </ul>
          </nav>
    
        )
    }
}

export default Header;