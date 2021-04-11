import React from "react";
import { connect } from "react-redux";
import E404 from "../E404";
import { getSingleFloor } from "../../sagas/components/floors/floors-saga";
import Loading from "../../components/Loading";
import { baseURL } from "../../configs";
import AddFloorBoxesToCart from "../../components/AddFloorBoxesToCart";
import { toast } from 'react-toastify';

class SingleFloor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: {
                FloorTileSizeId: undefined,
                mil_type: 12,
                square_feet: 20      
            }
        }
        this.floor_id = props.match.params.floor_id
        this.toastId = React.createRef();
    }
    componentDidMount(){
        this.props.getSingleFloor(this.floor_id)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && this.state.selected.FloorTileSizeId === undefined) {
          let { floor } = nextProps;
          if (floor) {
            if (floor.FloorTileSizes) {
              this.onSelectedChange("FloorTileSizeId")(floor.FloorTileSizes[0].id)()
            }
          }
        }
      }
    requestStockInfo = async () => {
        let { id: floor_id } = this.props.floor;
        let { FloorTileSizeId, mil_type } = this.state.selected
        // alert(JSON.stringify({ floor_id, FloorTileSizeId, mil_type}))
        let url = `${baseURL}/floors/${floor_id}?FloorTileSizeId=${FloorTileSizeId}&FloorId=${floor_id}&mil_type=${mil_type}`
        let headers = {}
        let token = global.get_token()
        if (token) headers["Authorization"] = `Bearer ${token}`
        let res = await fetch(url, { headers }) 
        let data = await res.json()
        console.log({data})
        let { stock_info } = data.data.floor;
        this.setState({ stock_info })
        return stock_info
    }
    onSelectedChange = key => val => () => this.setState(prevState => {
      if (key === "square_feet" && Number(val) > 1000000) return prevState;
      prevState.selected[key] = val;
      return { ...prevState, selected: { ...prevState.selected } };
    }, () => this.checkAvailability())

    checkAvailability = async () => {
        this.setState({ available: undefined })
        let { boxes: available_boxes } = await this.requestStockInfo()
        let { square_feet } = this.state.selected;
        let desired_boxes = global.sqft_to_boxes(square_feet).val
        console.log({available_boxes, desired_boxes})
        this.setState({ available: available_boxes >= desired_boxes })
    }  
    getFloorMilTypesOptionsJSX = ({SelectedMilType,mil_types=[12,20]}) => {
        return (
          <div className="browse-inside__info">
            <p style={{ display: "inline"}}  className="bi-equal">Thickness:</p>
            <div style={{ display: "inline", marginLeft: 7}} className="browse-inside__radios">
              {
                mil_types.map(x => (
                    <label>
                        <div onClick={this.onSelectedChange("mil_type")(x)}>
                            <button
                            // style={{ cursor: "pointer" }}
                            className={`btn btn-${SelectedMilType != x ? "secondary" : "primary"}`}
                            style={{marginLeft: 2}}
                            >
                                {`${x}mm`}
                            </button>
                        </div>
                    </label>
                ))
              }
            </div>
          </div>
        )
      }
      getFloorTileSizesOptionsJSX = ({SelectedFloorTileSizeId,FloorTileSizes}) => {
        return (
          <div className="browse-inside__info">
            <p style={{ display: "inline"}} className="bi-equal">Tile Size:</p>
            <div style={{ display: "inline"}} className="browse-inside__radios">
              {
                FloorTileSizes.map(x => (
                    <label>
                        <div onClick={this.onSelectedChange("FloorTileSizeId")(x.id)}>
                            <button
                                // style={{ cursor: "pointer" }}
                                className={`btn btn-${SelectedFloorTileSizeId != x.id ? "secondary" : "primary"}`}
                                style={{marginLeft: 2}}
                            >
                                {`${x.width}x${x.height} cm`}
                            </button>
                        </div>
                    </label>
                ))
              }
            </div>
          </div>
        )
      }
  
    render(){
        let { loading, error, floor } = this.props;
        if (loading) return <Loading/>
        if (error) {
          if (error && error.response && error.response.status === 404){
            return <E404/>
          }
          console.log({error})
          return "ERROR"
        }
        let square_feet_info = global.sqft_to_boxes(this.state.selected.square_feet)
        let price_per_sqft = this.state.stock_info ? this.state.stock_info.price : undefined 
        console.log({square_feet_info,price_per_sqft})
        let price = 
          price_per_sqft === undefined  ? "Calculating..." :
          (global.sqft_to_boxes(this.state.selected.square_feet).val * 23.4) * price_per_sqft

        return (
            <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <div className="media">
                <img className="mr-3 w-25 rounded" src={floor.thumbnail_url} alt="sample image" />
                <div className="media-body">
                  <h5 className="mt-0">{floor.name}</h5>
                  <p>{floor.description}</p>
                  <p>Price: <h6 style={{ display: "inline"}}>${global.prettifyPrice(price)}</h6></p>
                  <p>Type: {floor.FloorType.name}</p>
                    {
                        this.getFloorMilTypesOptionsJSX({
                            SelectedMilType: this.state.selected.mil_type
                        })
                    }
                    {
                    this.getFloorTileSizesOptionsJSX({
                        SelectedFloorTileSizeId: this.state.selected.FloorTileSizeId,
                        FloorTileSizes: floor.FloorTileSizes
                    })
                    }
                      <div className="browse-inside__info ">
                        <p style={{ display: "inline" }} className="bi-equal">Square feet :</p>
                        <div style={{ display: "inline", marginLeft: 5 }} className="browse-inside__radios">
                          <div style={{ display: "inline" }} className="bi-incr">
                            <input 
                              style={{ display: "inline" }}
                              type="number"
                              value={this.state.selected.square_feet}
                              onChange={e => {
                                let { value } = e.target;
                                this.onSelectedChange("square_feet")(Number(value))()
                              }}
                              placeholder={"Square feet"}
                            />
                          </div>
                          {
                            this.state.available !== undefined ? (
                              this.state.available 
                              ? <p style={{color: "green", display: "inline", marginLeft: 5 }}>Available</p>
                              : <p style={{color: "red", display: "inline", marginLeft: 5 }}>Not available</p>
                            ) : <p style={{color: "gray" , display: "inline", marginLeft: 5 }}>Checking...</p>
                          }
                        </div>
                        <br/>
                      </div>
                        {
                          square_feet_info.more 
                          ? `Rounds to ${square_feet_info.val} boxes which is ${(square_feet_info.val * 23.4).toFixed(1)} square feet.`
                          : ""
                        }
                        <div>
                          <AddFloorBoxesToCart
                            FloorId={Number(this.floor_id)}
                            FloorTileSizeId={Number(this.state.selected.FloorTileSizeId)}
                            boxes_amount={Number(square_feet_info.val)}
                            mil_type={Number(this.state.selected.mil_type)}
                            onStart={() => this.toastId.current = toast("Adding to cart", { type: toast.TYPE.INFO, autoClose: false })}
                            onError={() => toast.update(this.toastId.current, { render: "Failed to add to cart", type: toast.TYPE.ERROR, autoClose: 5000 })}
                            onSuccess={() => {
                              toast.update(this.toastId.current, { render: "Successfully added to cart" , type: toast.TYPE.SUCCESS, autoClose: 5000 })
                              this.onSelectedChange("square_feet")(20)()
                            }}
                          >
                            {({ loading, error, addItemToCart, isDisabled }) => {
                              return (
                                <button
                                  onClick={e => {
                                    addItemToCart()
                                    console.log(55)
                                  }}
                                    className={`btn btn-${isDisabled ? "secondary" : "primary"}`}
                                    style={{marginLeft: 2}}
                                >
                                    Add to cart
                                </button>
                              )
                            }}
                          </AddFloorBoxesToCart>
                          <AddFloorBoxesToCart
                            FloorId={Number(this.floor_id)}
                            FloorTileSizeId={Number(this.state.selected.FloorTileSizeId)}
                            boxes_amount={Number(square_feet_info.val)}
                            mil_type={Number(this.state.selected.mil_type)}
                            onStart={() => {}}
                            onError={() => this.toastId.current = toast("Something unexpected happened!", { type: toast.TYPE.ERROR, autoClose: 5000 })}
                            onSuccess={() => {
                              this.props.history.push("/cart")
                            }}
                          >
                            {({ loading, error, addItemToCart, isDisabled }) => {
                              return (
                                <button
                                  onClick={e => {
                                    addItemToCart()
                                  }}
                                    className={`btn btn-${isDisabled ? "secondary" : "primary"}`}
                                    style={{marginLeft: 2}}
                                >
                                    Buy now
                                </button>                        
                              )
                            }}
                          </AddFloorBoxesToCart>
                        </div>

                </div>
              </div>
            </div>

          </div>
    
        )
    }
}

let mapStateToProps = (state,props) => {
    let { loading, error, data: floor } = state.floors.singleFloorRequests[props.match.params.floor_id] || {
      loading: true,
      error: false,
      data: undefined
    }
    return { loading, error, floor }
}
export default connect(mapStateToProps, { getSingleFloor })(SingleFloor);