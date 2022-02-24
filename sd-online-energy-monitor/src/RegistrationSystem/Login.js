import React from 'react';
import "./Login.css";
import HttpRequestController from '../services/HttpRequestController';
import { Icon } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.username,
            password: this.password
        };

        HttpRequestController.loginPost(data).then(res => {
            console.log("Login state user", res.roles);
            localStorage.setItem('user', res);
            localStorage.setItem('username',res.username)
            this.setState({ user: res });
        });

    };

    render() {
        const { user } = this.state;
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Login</h3>
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

                        <button className="btn btn-primary btn-block">Login</button>

                        {user === "bad-credentials" &&
                            <div className="bad-login">
                                <Icon>
                                    <Cancel></Cancel>
                                </Icon>
                                Invalid email or password. Try again.
                            </div>
                        }

                    </form>
                </div>
            </div>

        );
    }

}