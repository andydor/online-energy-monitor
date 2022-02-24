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

export default class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            dateOfBirth: new Date(),
            address: "",
            admin: false,
            okkk: null
        };
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();

        if (localStorage.getItem('token') != null) {
            HttpRequestController.registrationPost({ username: this.state.username, password: "default", name: this.state.name, dateOfBirth: this.state.dateOfBirth, address: this.state.address, admin: this.state.admin }).then(res => {
                console.log(res);
                this.setState({ okkk: res });
            });
            this.props.setAdd(false);
        }
        else {
            this.setState({ okkk: "not-ok" });
        }
    };

    render() {
        const okkk = this.state.okkk;
        return (
            <div className="auth-wrapper">
                <Helmet>
                    <title>Add User</title>
                </Helmet>
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Add User</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input className="form-control" placeholder="Username"
                                onChange={e => this.setState({ username: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" placeholder="Name"
                                onChange={e => this.setState({ name: e.target.value })} />
                        </div>

                        <div>
                            <label htmlFor="cb1">  Is Admin  &nbsp;</label>
                            <input type="checkbox" id="cb1" name="Is Admin" defaultChecked={this.state.admin} onClick={check(this)}
                                onChange={() => {
                                    this.setState({ admin: document.getElementById("cb1").checked });
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
                                onChange={e => this.setState({ address: e.target.value })} />
                        </div>

                        <button className="btn btn-primary btn-block" >Add</button>
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