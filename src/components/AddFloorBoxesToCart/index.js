import React from "react";
import { connect } from "react-redux";
import { addFloorBoxesToCart } from "../../sagas/components/me/me-saga"

class AddFloorBoxesToCart extends React.Component {
    addItemToCart = () => {
        if (this.getIsDisabled()) return;
        let { FloorId, FloorTileSizeId, boxes_amount, mil_type } = this.props;
        this.props.addFloorBoxesToCart({
            FloorId, FloorTileSizeId, boxes_amount, mil_type,
            onSuccess: () => this.props.onSuccess(this.props.cart),
            onStart: () => this.props.onStart(this.props.error),
            onError: () => this.props.onError(),
        })
    }
    getIsDisabled = () => {
        let { FloorId, FloorTileSizeId, boxes_amount, mil_type } = this.props;
        let vals = [ FloorId, FloorTileSizeId, boxes_amount, mil_type ]
        for (let val of vals) {
            if (val === undefined || isNaN(val) || val == 0) return true;
        }
        return false;
    }
    render(){
        console.log({AAAA:this.props})
        let { loading, error, cart, addItemToCart } = this.props;
        return this.props.children({
            addItemToCart: () => this.addItemToCart(), 
            isDisabled: this.getIsDisabled() || loading,
            loading, 
            error, 
        })
    }
}

export default connect(state => {
    let { loading, error, cart } = state.me.addFloorBoxesToCart;
    return { loading, error, cart }
}, { addFloorBoxesToCart })(AddFloorBoxesToCart);