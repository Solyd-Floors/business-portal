import React from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { getMyCart, discardCart, removeFromCart } from "../../sagas/components/me/me-saga";
import NullWhileFalsyCurrentUser from "../../components/NullWhileFalsyCurrentUser";
import Loading from "../../components/Loading";
import { compose } from "recompose";
import insertShipToAddresses from "../../HoC/insertShipToAddresses";
import { Link } from "react-router-dom";
import axios from "../../axios";

class MyCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ship_to_address: {

            }
        }
    }
    componentDidMount(){
        this.props.getMyCart();
    }
    getDimensions = ({ width, height }) => `${width}x${height}`
    getItemPrice = item => global.prettifyPrice(item.total_price)
    getTotalPrice = () => {
        let total = 0;
        if (this.props.cart.CartFloorItems) this.props.cart.CartFloorItems.map(x => total += Number(this.getItemPrice(x)))
        return global.prettifyPrice(total)
    }
    removeFromCart = cart_floor_item => {
        this.props.removeFromCart({
            CartFloorItemId: cart_floor_item.id
        })
    }
    discard = e => {
        e.preventDefault()
        this.props.discardCart();
    }
    getFeedback = key => {
        let value = this.state.ship_to_address[key]
        if (value) return null;
        return (
            <div style={{display:"block" }} class="invalid-feedback">
                Required
            </div>
        )
    }
    getShipToAddressInput = cart_floor_item => {
        let value = this.state.ship_to_address[cart_floor_item.id]
        return (
            <select onChange={e => {
                let { value } = e.target;
                value = Number(value);
                if (isNaN(value)) value = 0;
                this.setState(prevState => {
                    prevState.ship_to_address[cart_floor_item.id] = value;;
                    return {
                        ...prevState, ship_to_address: { ...prevState.ship_to_address }
                    }
                })
            }} value={value} style={{ marginLeft: "30%" }} className="form-control">
                <option value={false}>Select address</option>
                {
                    this.props.ship_to_addresses_info.ship_to_addresses.map(ship_to_address => (
                        <option value={ship_to_address.id}>{ship_to_address.address}</option>
                    ))
                }
            </select>
        )
    }
    checkout = async () => {
        let data = await axios.post("/me/cart/checkout");
        console.log({data})
        
    }
    render(){
        let { loading, error, cart } = this.props;
        let { ship_to_addresses } = this.props.ship_to_addresses_info;
        if (!cart) return <Loading/>
        if (error) return error.message;
        console.log(this.state)
        return (
            <div className="">
                {
                    !ship_to_addresses.length && 
                    <alert className="row alert alert-warning">
                        Please <Link to="/ship_to_addresses">&ensp;create&ensp;</Link> at least one shipping address to procceed
                    </alert>
                }
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
                    <div className="col-2">
                        <h6 className="mt-2">Actions</h6>
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
                                    {this.getShipToAddressInput(cart_floor_item)}
                                    {this.getFeedback(cart_floor_item.id)}
                                </div>

                                <div className="col-2">
                                    <h6 className="mob-text">${this.getItemPrice(cart_floor_item)}</h6>
                                </div>
                                <div style={{ cursor: "pointer"}} onClick={() => {
                                    this.removeFromCart(cart_floor_item)
                                }} className="col-2">
                                    <img width={30} height={30} src="https://image.flaticon.com/icons/png/128/1828/1828665.png"/>
                                </div>
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
                    cart && cart.CartFloorItems && cart && cart.CartFloorItems.length &&
                        <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="card2">
                            <div className="row">
                                {/* <div className="col-lg-3 radio-group"> */}
        {/*                         
                                <div className="row d-flex px-3 radio"> <img className="pay" 
                                        src="data:image/jpeg;base64,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"
                                    />
                                </div> 
                                */}

                                {/* <div className="row d-flex px-3 radio"> 
                                    <img style={{ width: "100%", marginTop: 50}} className="pay" 
                                        src="https://images.squarespace-cdn.com/content/v1/58f507ae893fc07c27b4fd55/1512576869371-MOGNH304WPOO61E6OM2I/ke17ZwdGBToddI8pDm48kMXisHV8fSwJyyst7b6FqPxZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxkPT0qnF1u1t9dwEdhnrLkIPnRG79pNqNPVkyH87oi_pveREtPyp0SezUXBMEHWoU/logo-stripe.png"
                                    />
                                </div> */}
                                
                                {/* <div className="row d-flex px-3 radio gray"> <img className="pay" src="https://i.imgur.com/OdxcctP.jpg" />
                                    <p className="my-auto">Debit Card</p>
                                </div>
                                <div className="row d-flex px-3 radio gray mb-3"> <img className="pay" src="https://i.imgur.com/cMk1MtK.jpg" />
                                    <p className="my-auto">PayPal</p>
                                </div> */}
                                {/* </div> */}
                                <div className="col-lg-12">
                                <div className="row px-2">
                                    <div className="form-group col-md-6"> <label className="form-control-label">Name on Card</label> <input className="cart_input" type="text" id="cname" name="cname" placeholder="John Doe" /> </div>
                                    <div className="form-group col-md-6"> <label className="form-control-label">Card Number</label> <input className="cart_input" type="text" id="cnum" name="cnum" placeholder="1111 2222 3333 4444" /> </div>
                                </div>
                                <div className="row px-2">
                                    <div className="form-group col-md-6"> <label className="form-control-label">Expiration Date</label> <input className="cart_input" type="text" id="exp" name="exp" placeholder="MM/YYYY" /> </div>
                                    <div className="form-group col-md-6"> <label className="form-control-label">CVV</label> <input className="cart_input" type="text" id="cvv" name="cvv" placeholder="***" /> </div>
                                </div>
                                </div>
                                <div className="col-lg-12 mt-2">
                                <div className="row d-flex justify-content-between px-4">
                                    <p className="mb-1 text-left">Subtotal</p>
                                    <h6 className="mb-1 text-right">${this.getTotalPrice()}</h6>
                                </div>
                                <div className="row d-flex justify-content-between px-4">
                                    <p className="mb-1 text-left">Shipping</p>
                                    <h6 className="mb-1 text-right">$0</h6>
                                </div>
                                <div className="row d-flex justify-content-between px-4" id="tax">
                                    <p className="mb-1 text-left">Total (tax included)</p>
                                    <h6 className="mb-1 text-right">${this.getTotalPrice()}</h6>
                                </div> 
                                <button onClick={this.checkout} className="btn-block btn-blue"> 
                                <span> 
                                    <span id="checkout">
                                        Checkout
                                    </span> 
                                <span id="check-amt">${this.getTotalPrice()}</span> </span> </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div> || (
                            <center>
                            <div className="alert alert-warning">
                                You don't have any items on your cart, visit <Link to="/floors">floors</Link>.
                            </div>
                            </center>
                        )
                }
          </div>
    
        )
        return (
            <React.Fragment>
                <Header/>
                <div>
                    Cart - #{cart.id}<br/>
                    <ul>
                        {cart && cart.CartFloorItems && cart.CartFloorItems.map(cart_floor_item => (
                            <li style={{ color: cart_floor_item.not_available ? "red": "none"}}>
                                Item#{cart_floor_item.id} <img src={cart_floor_item.Floor.thumbnail_url} width={10} height={10}/> - 
                                {cart_floor_item.boxes_amount} boxes - 
                                {cart_floor_item.mil_type} mm - 
                                {this.getDimensions(cart_floor_item.FloorTileSize)} cm -
                                Price: ${this.getItemPrice(cart_floor_item)} - 
                                <a onClick={e => {
                                    e.preventDefault();
                                    this.removeFromCart(cart_floor_item)
                                }}>Remove From Cart</a>
                            </li>
                        ))}
                        <a onClick={this.discard}>Discard</a>
                        <li>Total price: ${this.getTotalPrice()}</li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

let Comp = compose(
    insertShipToAddresses,
    connect(state => {
        let { loading, error, cachedCart: cart, cart: current_cart } = state.me.myCart;
        return { loading, error, cart: current_cart || cart }
    }, { getMyCart, removeFromCart, discardCart })
)(MyCart)

export default props => <NullWhileFalsyCurrentUser><Comp {...props}/></NullWhileFalsyCurrentUser>