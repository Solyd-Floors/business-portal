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
        return (
            <div>

                <div className="row">
                    <div className="col-xl-3 col-md-6 col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                <div className="icon-wrap bg-primary mb-4">
                                    <i className="mdi mdi-briefcase ml-auto" />
                                </div>
                                <h1 className="text-dark font-weight-bold mb-2">823</h1>
                                <h6 className="text-dark">Number of employees</h6>
                                {/* <p className="text-muted">31.82%<span><i className="mdi mdi-arrow-up text-success ml-1" /></span></p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                <div className="icon-wrap bg-success mb-4">
                                    <i className="mdi mdi-content-paste ml-auto" />
                                </div>
                                <h1 className="text-dark font-weight-bold mb-2">823</h1>
                                <h6 className="text-dark">Number of orders</h6>
                                {/* <p className="text-muted">100%<span><i className="mdi mdi-arrow-up text-success ml-1" /></span></p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                <div className="icon-wrap bg-danger mb-4">
                                    <i className="mdi mdi-star-circle ml-auto" />
                                </div>
                                <h1 className="text-dark font-weight-bold mb-2">823</h1>
                                <h6 className="text-dark">Floor boxes</h6>
                                <h6>purchased</h6>
                                {/* <p className="text-muted">100%<span><i className="mdi mdi-arrow-up text-success ml-1" /></span></p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-lg-6 grid-margin stretch-card">
                        <div className="card">
                        <div className="card-body">
                            <div>
                            <div className="icon-wrap bg-info mb-4">
                                <i className="mdi mdi-ticket-percent ml-auto" />
                            </div>
                            <h1 className="text-dark font-weight-bold mb-2">45%</h1>
                            <h6 className="text-dark">Covension Rate</h6>
                            <p className="text-muted">31.82%<span><i className="mdi mdi-arrow-up text-success ml-1" /></span></p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title mb-0">Company Chat</h4>
                <div>
                  <i className="mdi mdi-video icon-large" />
                  <i className="mdi mdi-phone-in-talk icon-large" />
                </div>
              </div>
              <div className="chat-dashboard-wrap">
                <div className="chat-from mb-4">
                  <img src="../../images/faces/face1.jpg" alt="" />
                  <div style={{ width: "100%"}}>
                    <div className="txt-chat">Lorem ipsum message.</div>
                    <p className="text-muted">09:25 am</p>
                  </div>
                </div>
                <div className="chat-to mb-4">
                  <div style={{ width: "100%"}}>
                    <div className="txt-chat">Lorem ipsum message. </div>
                    <p className="text-muted">09:28 am</p>
                  </div>
                  <img src="../../images/faces/face2.jpg" alt="" />
                </div>
              </div>
              <div className="chat-dashboard-wrap">
                <div className="chat-from mb-4">
                  <img src="../../images/faces/face3.jpg" alt="" />
                  <div style={{ width: "100%"}}>
                    <div className="txt-chat">Lorem ipsum message?</div>
                    <p className="text-muted">09:25 am</p>
                  </div>
                </div>
                <div className="chat-to mb-4">
                  <div style={{ width: "100%"}}>
                    <div className="txt-chat">Lorem ipsum message.</div>
                    <p className="text-muted">09:28 am</p>
                  </div>
                  <img src="../../images/faces/face4.jpg" alt="" />
                </div>
              </div>
              <div className="chat-dashboard-wrap">
                <div className="d-flex">
                  <input type="text" className="form-control" placeholder="Type text here" />
                  <a href="#" className="send-btn"><i className="mdi mdi-send" /> </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

            </div>
        )
    }
}

export default Dashboard;