import React from 'react'
import HttpRequestController from '../../services/HttpRequestController';
import "../../RegistrationSystem/Login.css";
import { Helmet } from "react-helmet";

export default class EditSensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.sensor.id,
            description: this.props.sensor.description,
            maxValue: this.props.sensor.maxValue,
            okkk: null
        };
    }

    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        HttpRequestController.updateSensor(this.state.id, {description: this.state.description, maxValue: this.state.maxValue}).then(res => {
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
                    <title>Edit Sensor</title>
                </Helmet>
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Edit Sensor</h3>

                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" placeholder="Description" defaultValue={this.props.sensor.description}
                                onChange={e => this.setState({ description: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Maximum Value Read</label>
                            <input className="form-control" placeholder="Maximum Value Read" defaultValue={this.props.sensor.maxValue}
                                onChange={e => this.setState({ maxValue: Number(e.target.value) })} />
                        </div>

                        <button className="btn btn-primary btn-block" >Update</button>
                        {okkk === "not-ok" &&
                            <div className="bad-login">
                                <i className="fa fa-times-circle"></i>
                                Invalid sensor. Try again.
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