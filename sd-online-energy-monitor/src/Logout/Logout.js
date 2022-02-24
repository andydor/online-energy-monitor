import React from 'react'
import HttpRequestController from '../services/HttpRequestController'

export default class Logout extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        HttpRequestController.logoutPost();
        localStorage.clear();
        this.props.history.push("/home");
        return (
            <div>
                <h2>Bye bye</h2>
            </div>
        );
    }
}