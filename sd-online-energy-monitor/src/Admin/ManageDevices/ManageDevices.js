import React, { useEffect, useState } from 'react'
import "../../Loading/Loading.css";
import ReactLoading from "react-loading";
import "../AdminPage.css"
import HttpRequestController from '../../services/HttpRequestController';
import EditDevice from './EditDevice';
import './ManageDevices.css';
import AddDevice from './AddDevice';

export default function ManageDevices() {
    const [devices, setDevices] = useState(0);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [device, setDevice] = useState(false);
    const [visible, setVisible] = useState(false);
    const [assignSensor, setAssignSensor] = useState(false);
    const [viewSensor, setViewSensor] = useState(false);
    const [unassignedSensors, setUnassignedSensors] = useState(0);
    const [id, setId] = useState(0);

    useEffect(() => {
        HttpRequestController.getAllDevices().then(res => {
            setDevices(res);
            console.log(res);
        });
    }, [devices]);

    let editt = () => {
        setEdit(true);
    }

    let addd = () => {
        setAdd(true);
    }

    function deletee(device) {
        HttpRequestController.deleteDevice(device.id);
    }

    function onClickHandler(device) {
        setDevice(device);
        console.log(device);
    }

    const hanldeClick = () => {
        setViewSensor(true);
        setVisible(true);
    };

    const assign = (device) => {
        setVisible(true);
        setAssignSensor(true);
        setId(device.id);
        HttpRequestController.getUnassignedSensors().then(res => {
            setUnassignedSensors(res);
            console.log(res);
        });
    };

    const hideModal = () => {
        setVisible(false);
        setUnassignedSensors(0);
        setAssignSensor(false);
        setId(0);
        setViewSensor(false);
    };

    if (devices === 0) {
        return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />);
    }
    else {
        if (edit === true && device !== 0 && add === false) {
            return <EditDevice device={device} setEdit={setEdit}></EditDevice>
        }
        else if (edit === false && device !== 0 && add === true) {
            return <AddDevice setAdd={setAdd}></AddDevice>
        }
        else if (edit === false && device !== 0 && add === false) {
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
                                <th>
                                    <button type="button" className="btn btn-primary edit-product" onClick={addd}>
                                        <i className="fa fa-edit"></i>Add
                                    </button>
                                </th>
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
                                    {/* <td data-title="Client">{device.client.name}</td> */}
                                    <td>
                                        <a href="#" onClick={() => hanldeClick(device)}>
                                            Sensor
                                        </a>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={editt}>
                                            <i className="fa fa-edit"></i>Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={() => deletee(device)}>
                                            <i className="fa fa-edit"></i>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={() => assign(device)}>
                                            <i className="fa fa-edit"></i>Assign Sensor
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {visible && viewSensor && <Modal details={device.sensor} handleClose={hideModal} />}
                    {visible && unassignedSensors !== 0 && assignSensor && <Modal details={unassignedSensors} handleClose={hideModal} id={id} assignSensor={assignSensor} />}
                </div>
            )
        }
        else if (edit === false && device === 0 && add === false) {
            return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />);
        }
    }
}

function assignSensorToDevice(id, sensorId) {
    HttpRequestController.assignSensorToDevice(id, sensorId).then(res => {
        console.log(res);
    });
}

const Modal = ({ handleClose, details, assignSensor, id }) => {
    if (details === null) {
        details = [];
    }
    if (assignSensor) {
        console.log(details);
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
                                {details.map((sensor, index) =>
                                    <tr key={index}>
                                        <td>{sensor?.id}</td>
                                        <td>{sensor?.description}</td>
                                        <td>{sensor?.maxValue}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { console.log(id); assignSensorToDevice(id, sensor.id) }}>Assign</button>
                                        </td>
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
    else {
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
                    <button onClick={handleClose}>Close</button>
                </section>
            </div>
        );
    }
};