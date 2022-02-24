import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import HttpRequestController from '../services/HttpRequestController'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.name,
            dateOfBirth: new Date(),
            address: this.address,
            username: this.username,
            password: this.password,
            admin: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.name,
            dateOfBirth: moment(this.state.dateOfBirth).format("yyyy-MM-DD").toString(),
            address: this.address,
            username: this.username,
            password: this.password,
            admin: false
        };

        HttpRequestController.registrationPost(data);
    };

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name"
                                onChange={e => this.name = e.target.value} />
                        </div>

                        <div className="form-group"><label>Date of Birth</label></div>

                        {
                            <div className="date-time-start">
                                <DateTimePicker
                                    showYearDropdown
                                    scrollableYearDropdown
                                    format="MM-dd-y"
                                    onChange={(value) => this.setState({ dateOfBirth: value })}
                                    value={this.state.dateOfBirth}
                                />
                            </div>
                        }

                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="Address"
                                onChange={e => this.address = e.target.value} />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username"
                                onChange={e => this.username = e.target.value} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                onChange={e => this.password = e.target.value} />
                        </div>

                        <button className="btn btn-primary btn-block">Sign Up</button>

                    </form>
                </div>
            </div>

        );
    }
}

export default Signup;