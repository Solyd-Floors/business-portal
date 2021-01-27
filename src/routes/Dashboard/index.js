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
        <div className="col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title mb-0">Live chart</h4>
                <div>
                  <i className="mdi mdi-video icon-large" />
                  <i className="mdi mdi-phone-in-talk icon-large" />
                </div>
              </div>
              <div className="chat-dashboard-wrap">
                <div className="chat-from mb-4">
                  <img src="../../images/faces/face1.jpg" alt="" />
                  <div>
                    <div className="txt-chat">I would suggest you discuss this further with project team.</div>
                    <p className="text-muted">09:25 am</p>
                  </div>
                </div>
                <div className="chat-to mb-4">
                  <div>
                    <div className="txt-chat">I am very busy at the moment and on top of everything. </div>
                    <p className="text-muted">09:28 am</p>
                  </div>
                  <img src="../../images/faces/face2.jpg" alt="" />
                </div>
              </div>
              <div className="chat-dashboard-wrap">
                <div className="chat-from mb-4">
                  <img src="../../images/faces/face3.jpg" alt="" />
                  <div>
                    <div className="txt-chat">What do you think about our plans for this product launch?</div>
                    <p className="text-muted">09:25 am</p>
                  </div>
                </div>
                <div className="chat-to mb-4">
                  <div>
                    <div className="txt-chat">It looks to me like you have a lot planned before your deadline.</div>
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
        <div className="col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title mb-0">Task List</h4>
                <a href="#" className="btn btn-light">Add new list</a>
              </div>
              <div>
                <div className="alert alert-info" role="alert">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>Client metting with alex johnson</h6>
                      <p>18:00 pm - 09:45 am</p>
                    </div>
                    <div className="image-grouped">
                      <img src="../../images/faces/face1.jpg" alt="" />
                      <img src="../../images/faces/face2.jpg" alt="" />
                      <img src="../../images/faces/face3.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary" role="alert">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>Meet John for Projet Proposal</h6>
                      <p>10:00 am - 11:45 am</p>
                    </div>
                    <div className="image-grouped">
                      <img src="../../images/faces/face4.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="alert alert-danger" role="alert">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>Video conference with team</h6>
                      <p>12:00 pm - 13:15 pm</p>
                    </div>
                    <div className="image-grouped">
                      <img src="../../images/faces/face5.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="alert alert-success" role="alert">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>Workshop with danielle smith</h6>
                      <p>15:00 pm - 14:45 pm</p>
                    </div>
                    <div className="image-grouped">
                      <img src="../../images/faces/face6.jpg" alt="" />
                    </div>
                  </div>
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