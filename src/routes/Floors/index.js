import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import MainPanel from "../../components/MainPanel";
import { getFloors } from "../../sagas/components/floors/floors-saga";

class Floors extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getFloors({})
    }
    getFloorsJSX = () => {
        let { floors } = this.props;
        return floors.map(floor => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
            <figure className="effect-text-in">
                <img src={"https://files.secure.website/wscfus/10500198/8748156/20190107-134105-w500-o.jpg"} alt="image" />
                <figcaption>
                <h4>{floor.name}</h4>
                <p>{floor.description}</p>
                </figcaption>
            </figure>
            </div>
        ))
    }
    render(){
        let { floors, loading } = this.props;
        return (
            <div className="card">
            <div className="card-body">
            <div className="row">
                <div className="col-12">
                <div className="row portfolio-grid">
                    {
                        floors.length ? this.getFloorsJSX() : (
                            loading ? (
                                <div className="dot-opacity-loader">
                                    <span />
                                    <span />
                                    <span />
                                  </div>                          
                            ) : null
                        )
                    }
                </div>
                </div>
            </div>
            </div>
        </div>

        )
    }
}

export default compose(withRouter,connect(state => ({ 
    floors: state.floors.lastSuccessGetResult,
    loading: state.floors.loading ? (!Boolean(state.floors.lastSuccessGetResult.length)) : false,
    error: state.floors.error
}), { getFloors }))(Floors)