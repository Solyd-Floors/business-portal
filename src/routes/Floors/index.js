import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Loading from "../../components/Loading";
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
            <div 
                onClick={() => this.props.history.push(`/floors/${floor.id}`)} 
                className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12"
            >
                <figure className="effect-text-in">
                    <img src={floor.thumbnail_url} alt="image" />
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
            <div>
                <div className="card">
                    <div className="card-body">
                    <div className="card-title mb-1">Floors</div>
                    <div className="row">
                        <div className="col-12">
                        <div className="row portfolio-grid">
                            {
                                floors.length ? this.getFloorsJSX() : (
                                    loading ? <Loading/> : null
                                )
                            }
                        </div>
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