import React from 'react'
import HttpRequestController from '../../services/HttpRequestController';
import "../../RegistrationSystem/Login.css";
import { Helmet } from "react-helmet";

export default class EditDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.device.id,
            description: this.props.device.description,
            location: this.props.device.location,
            maxEnergyConsumption: this.props.device.maxEnergyConsumption,
            avgEnergyConsumption: this.props.device.avgEnergyConsumption,
            okkk: null
        };
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        HttpRequestController.updateDevice(this.state.id, {description: this.state.description, location: this.state.location, maxEnergyConsumption: this.state.maxEnergyConsumption, avgEnergyConsumption: this.state.avgEnergyConsumption}).then(res => {
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
                    <title>Edit Device</title>
                </Helmet>
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Edit Device</h3>

                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" placeholder="Description" defaultValue={this.props.device.description}
                                onChange={e => this.setState({ description: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input className="form-control" placeholder="Location" defaultValue={this.props.device.location}
                                onChange={e => this.setState({ location: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Maximum Energy Consumption</label>
                            <input className="form-control" placeholder="Maximum Energy Consumption" defaultValue={this.props.device.maxEnergyConsumption}
                                onChange={e => this.setState({ maxEnergyConsumption: Number(e.target.value) })} />
                        </div>

                        <div className="form-group">
                            <label>Average Energy Consumption</label>
                            <input className="form-control" placeholder="Average Energy Consumption" defaultValue={this.props.device.avgEnergyConsumption}
                                onChange={e => this.setState({ avgEnergyConsumption: Number(e.target.value) })} />
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