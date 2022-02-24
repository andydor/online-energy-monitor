import React from 'react'
import HttpRequestController from '../../services/HttpRequestController';
import "../../RegistrationSystem/Login.css";
import { Helmet } from "react-helmet";

export default class AddSensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            maxValue: 0,
            okkk: null
        };
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.setAdd(false);
        console.log(this.state);
        HttpRequestController.addSensor({description: this.state.description, maxValue: this.state.maxValue}).then(res => {
            console.log(res);
            this.setState({ okkk: res });
        });
    };

    render() {
        const okkk = this.state.okkk;
        return (
            <div className="auth-wrapper">
                <Helmet>
                    <title>Add Sensor</title>
                </Helmet>
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Add Sensor</h3>

                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" placeholder="Description"
                                onChange={e => this.setState({ description: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Maximum Value Read</label>
                            <input className="form-control" placeholder="Maximum Value Read"
                                onChange={e => this.setState({ maxValue: Number(e.target.value) })} />
                        </div>

                        <button className="btn btn-primary btn-block" >Update</button>
                        {okkk === "not-ok" &&
                            <div className="bad-login">
                                <i className="fa fa-times-circle"></i>
                                Invalid device. Try again.
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