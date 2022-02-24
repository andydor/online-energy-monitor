import React from 'react'
import HttpRequestController from '../../services/HttpRequestController';
import "../../RegistrationSystem/Login.css";
import DateTimePicker from 'react-datetime-picker';
import { Helmet } from "react-helmet";

function check(checkbox) {
    if (checkbox.checked === true) {
        checkbox.checked = false;
    }
    else {
        checkbox.checked = true;
    }
}

export default class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            name: this.props.user.name,
            dateOfBirth: this.props.user.dateOfBirth,
            address: this.props.user.address,
            isAdmin: this.props.user.roles.includes("ROLE_ADMIN") ? true : false,
            roles: this.props.user.roles,
            okkk: null
        };
    }

    componentDidMount() {
        console.log(this.state.dateOfBirth)
    }

    handleSubmit = e => {
        e.preventDefault();

        HttpRequestController.updateUser({ username: this.state.username, name: this.state.name, dateOfBirth: this.state.dateOfBirth, address: this.state.address, admin: this.state.isAdmin }, this.props.user.username).then(res => {
            console.log(res);
            this.setState({ okkk: res });
        });

        this.props.setEdit(false);
    };

    render() {
        const okkk = this.state.okkk;
        return (
            <div className="auth-wrapper">
                <Helmet>
                    <title>Edit User</title>
                </Helmet>
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Edit User</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input className="form-control" placeholder="Username" defaultValue={this.props.user.username}
                                onChange={e => this.setState({ username: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" placeholder="Name" defaultValue={this.props.user.name}
                                onChange={e => this.setState({ name: e.target.value })} />
                        </div>

                        <div>
                            <label htmlFor="cb1">  Is Admin  &nbsp;</label>
                            <input type="checkbox" id="cb1" name="Is Admin" defaultChecked={this.state.isAdmin} onClick={check(this)}
                                onChange={() => {
                                    this.setState({ isAdmin: document.getElementById("cb1").checked });
                                }}>
                            </input>
                        </div>

                        {
                            <div className="date-time-start">
                                <DateTimePicker
                                    showYearDropdown
                                    scrollableYearDropdown
                                    format="y-MM-dd"
                                    onChange={(value) => this.setState({ dateOfBirth: value })}
                                    value={this.state.dateOfBirth}
                                />
                            </div>
                        }

                        <div className="form-group">
                            <label>Address</label>
                            <input className="form-control" placeholder="Address"
                                onChange={e => this.setState({ address: e.target.value })}
                                defaultValue={this.props.user.address} />
                        </div>

                        <button className="btn btn-primary btn-block" >Update</button>
                        {okkk === "not-ok" &&
                            <div className="bad-login">
                                <i className="fa fa-times-circle"></i>
                                Invalid user. Try again.
                            </div>
                        }
                        {okkk === "ok" &&
                            <div className="successful-login">
                                <i className="fa fa-check"></i>
                                Successful update!
                            </div>
                        }
                    </form>
                </div>
                {/* <ImageUpload product={this.state.code} nu={false}></ImageUpload> */}
            </div>
        );
    }
}