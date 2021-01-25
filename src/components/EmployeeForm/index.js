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
        Account credentials
        </p>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">E-mail</label>
            <div className="col-sm-9">
                <input
                    onChange={props.onChange("email")}
                    value={props.getValue("email")}
                    type="text" 
                    disabled={props.disabled}
                    className="form-control" 
                />
                {props.getFeedback("email")}
            </div>

            </div>
        </div>
        <div className="col-md-6">
            {
                !props.hidePassword &&
                <div className="form-group row">
                <label className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-9">
                    <input
                        disabled={props.disabled}
                        onChange={props.onChange("password")}
                        value={props.getValue("password")}
                        type="password"
                        className="form-control"
                    />
                    {props.getFeedback("password")}
                </div>
                </div>

            }
        </div>
        </div>
        <p className="card-description">
        Personal info
        </p>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">First Name</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("first_name")}
                    value={props.getValue("first_name")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("first_name")}
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Last Name</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("last_name")}
                    value={props.getValue("last_name")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("last_name")}
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Phone</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("phone_number")}
                    value={props.getValue("phone_number")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("phone_number")}
            </div>
            </div>
        </div>
        </div>
        <p className="card-description">
        Address
        </p>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Address 1</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("address")}
                    value={props.getValue("address")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("address")}
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">State</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("state")}
                    value={props.getValue("state")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("state")}
            </div>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Address 2</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("address2")}
                    value={props.getValue("address2")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("address2")}
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Postcode</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("postcode")}
                    value={props.getValue("postcode")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("postcode")}
            </div>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">City</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("city")}
                    value={props.getValue("city")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("city")}
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Country</label>
            <div className="col-sm-9">
                <input
                    disabled={props.disabled}
                    onChange={props.onChange("country")}
                    value={props.getValue("country")}
                    type="text"
                    className="form-control"
                />
                {props.getFeedback("country")}
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
                    <Link to="/employees">
                        <button className="btn btn-light">Cancel</button>
                    </Link> :
                    <button onClick={props.onCancel} className="btn btn-light">Cancel</button>
                }
            </React.Fragment>
        }

    </form>
)