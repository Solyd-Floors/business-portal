import React from "react";

class MyAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <button style={{
                        float: "right"
                    }} className="btn btn-success">Edit</button>
                    <div className="border-bottom text-center pb-4">
                        <img src="../../../../images/faces/face12.jpg" alt="profile" className="img-lg rounded-circle mb-3" />
                        <p>Bureau Oberhaeuser is a design bureau focused on Information- and Interface Design. </p>
                        <div className="d-flex justify-content-between">
                        {/* <button className="btn btn-success">Follow</button> */}
                        </div>
                    </div>
                </div>
            </div>
    
        )
    }
}

export default MyAccount;