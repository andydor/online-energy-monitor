import React, { useEffect, useState } from 'react'
import "../../Loading/Loading.css";
import ReactLoading from "react-loading";
import "./AdminPage.css"
import HttpRequestController from '../../services/HttpRequestController';
import './ManageDevices.css';
import SockJsClient from 'react-stomp';

export default function MyDevices() {
    const [devices, setDevices] = useState(0);
    const [device, setDevice] = useState(false);
    const [visible, setVisible] = useState(false);
    const [seeMeasurements, setSeeMeasurements] = useState(false);
    const [seeSensor, setSeeSensor] = useState(false);
    const SOCKET_URL = 'https://online-energy-monitor.herokuapp.com/ws-message';

    useEffect(() => {
        HttpRequestController.getDevices(localStorage.getItem("username")).then(res => {
            setDevices(res);
            console.log(res);
        });
    }, []);

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        alert(msg);
    }

    function onClickHandler(device) {
        setDevice(device);
        console.log(device);
    }

    const hanldeClick = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
        setSeeMeasurements(false);
        setSeeSensor(false);
    };

    if (devices === 0) {
        return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />);
    }
    else {
        return (
            <div>
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Maximum Energy Consumption</th>
                            <th>Average Energy Consumption</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device, index) =>
                        (
                            <tr key={index} data-item={device} onClick={() => onClickHandler(device)}>
                                <td data-title="ID">{device.id}</td>
                                <td data-title="Description">{device.description}</td>
                                <td data-title="Location">{device.location}</td>
                                <td data-title="Maximum Energy Consumption">{device.maxEnergyConsumption}</td>
                                <td data-title="Average Energy Consumption">{device.avgEnergyConsumption}</td>
                                <td>
                                    <a href="#" onClick={() => { setSeeSensor(true); hanldeClick(device) }}>
                                        Sensor
                                    </a>
                                </td>
                                <td>
                                    <button className="btn btn-info"
                                        onClick={() => { setSeeMeasurements(true); hanldeClick(device.sensor) }}>
                                        See Measurements
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    visible &&
                    seeSensor &&
                    <Modal details={device.sensor} handleClose={hideModal} seeMeasurements={seeMeasurements} />
                }
                {
                    visible &&
                    seeMeasurements &&
                    <Modal details={device.sensor.measurements} handleClose={hideModal} seeMeasurements={seeMeasurements} />

                }
                <div>
                    <SockJsClient
                        url={SOCKET_URL}
                        topics={['/topic/message']}
                        onConnect={onConnected}
                        onDisconnect={console.log("Disconnected!")}
                        onMessage={msg => onMessageReceived(msg)}
                        debug={false}
                    />
                </div>

            </div>
        )
    }
}

const Modal = ({ handleClose, details, seeMeasurements }) => {
    if (details === null) {
        details = [];
    }
    else if (seeMeasurements === false) {
        return (
            <div className="modal display-block">
                <section className="modal-main">
                    <div className="App">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Maximum Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{details?.id}</td>
                                    <td>{details?.description}</td>
                                    <td>{details?.maxValue}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-danger" onClick={handleClose}>Close</button>
                </section>
            </div>
        );
    }
    else {
        return (
            <div className="modal display-block">
                <section className="modal-main">
                    <div className="App">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Timestamp</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details?.map((measurement, index) =>
                                    <tr key={index}>
                                        <td>{measurement?.id}</td>
                                        <td>{measurement?.timestamp}</td>
                                        <td>{measurement?.value}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-danger" onClick={handleClose}>Close</button>
                </section>
            </div>
        );
    }
};

