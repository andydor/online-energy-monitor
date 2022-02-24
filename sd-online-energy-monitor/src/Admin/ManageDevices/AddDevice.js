import React from 'react'
import HttpRequestController from '../../services/HttpRequestController';
import "../../RegistrationSystem/Login.css";
import { Helmet } from "react-helmet";

export default class AddDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            location: "",
            maxEnergyConsumption: "",
            avgEnergyConsumption: "",
            okkk: null
        };
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.setAdd(false);
        console.log(this.state);
        HttpRequestController.addDevice({description: this.state.description, location: this.state.location, maxEnergyConsumption: this.state.maxEnergyConsumption, avgEnergyConsumption: this.state.avgEnergyConsumption}).then(res => {
            console.log(res);
            this.setState({ okkk: res });
        });
    };

    render() {
        const okkk = this.state.okkk;
        return (
            <div className="auth-wrapper">
                <Helmet>
                    <title>Add Device</title>
                </Helmet>
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Add Device</h3>

                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" placeholder="Description"
                                onChange={e => this.setState({ description: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input className="form-control" placeholder="Location"
                                onChange={e => this.setState({ location: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Maximum Energy Consumption</label>
                            <input className="form-control" placeholder="Maximum Energy Consumption"
                                onChange={e => this.setState({ maxEnergyConsumption: Number(e.target.value) })} />
                        </div>

                        <div className="form-group">
                            <label>Average Energy Consumption</label>
                            <input className="form-control" placeholder="Average Energy Consumption"
                                onChange={e => this.setState({ avgEnergyConsumption: Number(e.target.value) })} />
                        </div>

                        <button className="btn btn-primary btn-block" >Add</button>
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