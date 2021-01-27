import React from "react";
import { Link } from "react-router-dom";
import ValidationErrors from "../ValidationErrors";

export default props => (
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
        Ship to address
        </p>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Address</label>
            <div className="col-sm-9">
                <input
                    onChange={props.onChange("address")}
                    value={props.getValue("address")}
                    type="text" 
                    disabled={props.disabled}
                    className="form-control" 
                />
                {props.getFeedback("address")}
            </div>

            </div>
        </div>
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
                    !props.onCancel ? 
                    <Link to="/ship_to_addresses">
                        <button className="btn btn-light">Cancel</button>
                    </Link> :
                    <button onClick={props.onCancel} className="btn btn-light">Cancel</button>
                }
            </React.Fragment>
        }

    </form>
)