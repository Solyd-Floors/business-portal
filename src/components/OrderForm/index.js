import React from "react";
import { Link } from "react-router-dom";
import ValidationErrors from "../ValidationErrors";

export default props => {
    let cart = props.getValue("Cart");
    return (
        (
            <form onSubmit={props.onSubmit} className="form-sample">
            <ValidationErrors errors={props.errors}>
                    { error => {
                        if (typeof(error) == "object") return null;
                        return (
                            <div class="alert alert-danger" role="alert">
                                {error.message || error}
                            </div>
                        )
                    }}
                </ValidationErrors>
        
            <p className="card-description">
                Order#{props.getValue("id")}
                <label style={{marginLeft: 10}} class="badge badge-info">{props.getValue("status")}</label>
                </p>
                <div className="row d-flex justify-content-center">
                        <div className="col-5">
                            <h4 className="heading">Cart #{cart.id}</h4>
                        </div>
                        <div className="col-7">
                            <div className="row text-right">
                            <div className="col-2">
                                <h6 className="mt-2">Tile Size</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="mt-2">Mil</h6>
                            </div>
        
                            <div className="col-2">
                                <h6 className="mt-2">Quantity</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="mt-2">Ship to </h6>
                            </div>
                            <div className="col-2">
                                <h6 className="mt-2">Price</h6>
                            </div>
                            </div>
                        </div>
                    </div>
                        <div className="row d-flex justify-content-center border-top">
                            {cart && cart.CartFloorItems && cart.CartFloorItems.map(cart_floor_item => (
                                <React.Fragment>
                                    <div style={{ color: cart_floor_item.not_available ? "red": "none"}} className="col-5">
                                        <div className="row d-flex">
                                        <div style={{ margin: "20px 15px 5px 15px"}}> 
                                        <img style={{
                                            width: "auto"
                                        }} 
                                            src={cart_floor_item.Floor.thumbnail_url}
                                            className="book-img" 
                                        /> </div>
                                        <div className="my-auto flex-column d-flex pad-left">
                                            <h6 className="mob-text">{cart_floor_item.Floor.name}</h6>
                                            <p className="mob-text">{cart_floor_item.Floor.description}</p>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="my-auto col-7">
                                        <div className="row text-right">
                                        <div className="col-2">
                                            <p className="mob-text">
                                                {cart_floor_item.FloorTileSize.width}x{cart_floor_item.FloorTileSize.height}
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <p className="mob-text">{cart_floor_item.mil_type}</p>
                                        </div>
                                        <div className="col-2">
                                            <div className="row d-flex justify-content-end px-3">
                                            <p className="mb-0" id="cnt1">{cart_floor_item.boxes_amount} boxes</p>
                                            <p className="mb-0" id="cnt1">({global.prettifyPrice(cart_floor_item.boxes_amount * 23.4)} sqft)</p>
                                            <div className="d-flex flex-column plus-minus"> 
                                                {/* <span className="vsm-text plus">+</span> 
                                                <span className="vsm-text minus">-</span>  */}
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            Address
                                            {/* {this.getShipToAddressInput(cart_floor_item)}
                                            {this.getFeedback(cart_floor_item.id)} */}
                                        </div>
        
                                        <div className="col-2">
                                            <h6 className="mob-text">${global.prettifyPrice(cart_floor_item.total_price)}</h6>
                                        </div>
                                        {/* <div style={{ cursor: "pointer"}} onClick={() => {
                                            this.removeFromCart(cart_floor_item)
                                        }} className="col-2">
                                            <img width={30} height={30} src="https://image.flaticon.com/icons/png/128/1828/1828665.png"/>
                                        </div> */}
                                        </div>
                                    </div>
                                    {/* <li style={{ color: cart_floor_item.not_available ? "red": "none"}}>
                                        Item#{cart_floor_item.id} <img src={cart_floor_item.Floor.thumbnail_url} width={10} height={10}/> - 
                                        {cart_floor_item.boxes_amount} boxes - 
                                        {cart_floor_item.mil_type} mm - 
                                        {this.getDimensions(cart_floor_item.FloorTileSize)} cm -
                                        Price: ${this.getItemPrice(cart_floor_item)} - 
                                        <a onClick={e => {
                                            e.preventDefault();
                                            this.removeFromCart(cart_floor_item)
                                        }}>Remove From Cart</a>
                                    </li> */}
                                </React.Fragment>
                                ))}
                        </div>
                {
                    props.showLoading && 
                    <div className="dot-opacity-loader">
                        <span />
                        <span />
                        <span />
                    </div>
                }
                {
                    (!props.disabled && !props.hideButtons) &&
                    <React.Fragment>
                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        {
                            !props.onCancel ? null :
                            <button onClick={props.onCancel} className="btn btn-light">Cancel</button>
                        }
                    </React.Fragment>
                }
        
            </form>
        )
    )
}