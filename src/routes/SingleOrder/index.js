import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import MainPanel from "../../components/MainPanel";
import { getSingleOrder } from "../../sagas/components/me/me-saga";
import E404 from "../E404";
import E505 from "../E505";
import { toast } from 'react-toastify';
import OrderForm from "../../components/OrderForm";
import Loading from "../../components/Loading";
import axios from "../../axios";

class SingleOrder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            disabled: true,
            validationErrors: [],
            data: {

            }
        }
        this.order_id = this.props.match.params.order_id;
        this.toastId = React.createRef();
    }
    componentDidMount(){
        this.props.getSingleOrder(this.order_id)
    }
    clearState = () => this.setState(prevState => ({ disabled: true, data: {}, validationErrors: [] }))
    getValue = key => this.state.data[key] === undefined ? this.props.order[key] : this.state.data[key]
    getData = () => ({ ...this.props.order, ...this.state.data })
    getErrors = () => this.state.validationErrors.length ? this.state.validationErrors : (this.props.validationErrors || [])
    getFeedback = key => {
        if (this.state.disabled) return null;
        let errors = this.getErrors()
        errors = errors.list ? errors.list : errors;
        let value = errors.find(x => x.path == key);
        if (!value){
            return (
                <div style={{display:"block" }} class="valid-feedback">
                    {this.getValue(key) ? "Looks good!" : "Optional"}
                </div>
            )
        }
        return (
            <div style={{display:"block" }} class="invalid-feedback">
                {value.message}
            </div>
        )
    }

    cancelOrder = async () => {
        this.toastId.current = toast("Canceling order..", { type: toast.TYPE.INFO, autoClose: false })
        try {
            let data = await axios.post(`/me/orders/${this.order_id}/cancel`)
            toast.update(this.toastId.current, { render: "Canceled order" , type: toast.TYPE.ERROR, autoClose: 5000 })
            this.props.getSingleOrder(this.order_id)
        } catch(err){
            console.log(err)
            toast.update(this.toastId.current, { render: "Failed to cancel order", type: toast.TYPE.ERROR, autoClose: 5000 })
        }
    }

    render(){
        let { loading, error, order } = this.props;
        console.log(error)
        if (error) {
            if (error.response.status == 404) return <E404/>
            return <E505/>
        }
        if (loading) return "Loading..."
        return (
            <div className="card">
            <div className="card-body">
            <h4 className="card-title">
                Order details  &nbsp;&nbsp;&nbsp;
                {
                    this.state.disabled && this.props.order.status !== "CANCELED" &&
                        <React.Fragment>
                            <button 
                                onClick={this.cancelOrder}
                                type="button" 
                                className="btn btn-danger mr-2"
                            >Cancel</button>
                        </React.Fragment>

                }
            </h4>
            <p className="card-description">
            </p>
            {
                order &&
                <OrderForm
                    onSubmit={this.onSubmit}
                    errors={this.getErrors()}
                    getFeedback={this.getFeedback}
                    getValue={this.getValue}
                    onChange={this.onChange}
                    disabled={this.state.disabled}
                    onCancel={this.clearState}
                    hidePassword={true}
                    showLoading={this.state.update_loading}
                    hideButtons={this.state.update_loading}
                />
            }
            {
                !order && <Loading/>
            }
            </div>
        </div>
)
    }
}

let mapStateToProps = (state,props) => {
    let { loading, error, data: order } = state.me.singleOrderRequests[props.match.params.order_id] || {
      loading: true,
      error: false,
      data: undefined
    }
    return { loading, error, order, validationErrors: state.validationErrors["createOrder"] }
}
export default compose(
    withRouter,
    connect(mapStateToProps, { getSingleOrder })
)(SingleOrder);