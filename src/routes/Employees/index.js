import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MainPanel from "../../components/MainPanel";
import { getEmployees } from "../../sagas/components/my-business/my-business-saga";

class Employees extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getEmployees()
    }
    render(){
        return (
            <div className="card">
            <div className="card-body">
            <div className="d-sm-flex align-items-start justify-content-between mb-4">
                <div>
                <h4 className="card-title mb-1">Employees</h4>
                </div>
                <Link to="/employees/create">
                    <button
                        className="btn btn-light mt-3 mt-lg-0">
                            Add Employee
                    </button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.employees.map(employee => (
                            <tr>
                                <td className="py-1">{employee.id}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>*********</td>
                                <td>
                                    <Link to={`/employees/${employee.id}`}>
                                        <button type="button" class="btn btn-primary">More</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
                </table>
            </div>
            </div>
        </div>

        )
    }
}

const mapStateToProps = state => {
    let employees = state.myBusiness.employees.allIds.map(x => state.myBusiness.employees.byIds[x])
    return { ...state.myBusiness.employees, employees }
}
export default connect(mapStateToProps, { getEmployees })(Employees);