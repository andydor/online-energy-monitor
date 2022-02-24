import React, { useEffect, useState } from 'react'
import "../../Loading/Loading.css";
import ReactLoading from "react-loading";
import "../AdminPage.css"
import HttpRequestController from '../../services/HttpRequestController';
import EditSensor from './EditSensor';
import './ManageSensors.css';
import AddSensor from './AddSensor';

export default function ManageSensors() {
    const [sensors, setSensors] = useState(0);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [sensor, setSensor] = useState(false);

    useEffect(() => {
        HttpRequestController.getAllSensors().then(res => {
            setSensors(res);
            console.log(res);
        });
    }, [sensors]);

    let editt = () => {
        setEdit(true);
    }

    let addd = () => {
        setAdd(true);
    }

    function deletee(sensor) {
        HttpRequestController.deleteSensor(sensor.id);
    }

    function onClickHandler(sensor) {
        setSensor(sensor);
        console.log(sensor);
    }

    if (sensors === 0) {
        return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />);
    }
    else {
        if (edit === true && sensor !== 0 && add === false) {
            return <EditSensor sensor={sensor} setEdit={setEdit}></EditSensor>
        }
        else if(edit === false && sensor !== 0 && add === true) {
            return <AddSensor setAdd={setAdd}></AddSensor>
        }
        else if (edit === false && sensor !== 0 && add === false) {
            return (
                <div>
                    <table className="table table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Maximum Value Read</th>
                                <th>
                                    <button type="button" className="btn btn-primary edit-product" onClick={addd}>
                                        <i className="fa fa-edit"></i>Add
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensors.map((sensor, index) =>
                            (
                                <tr key={index} data-item={sensor} onClick={() => onClickHandler(sensor)}>
                                    <td data-title="ID">{sensor.id}</td>
                                    <td data-title="Description">{sensor.description}</td>
                                    <td data-title="Maximum Value Read">{sensor.maxValue}</td>
                                    {/* <td data-title="Client">{sensor.client.name}</td> */}
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={editt}>
                                            <i className="fa fa-edit"></i>Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={() => deletee(sensor)}>
                                            <i className="fa fa-edit"></i>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        else if (edit === false && sensor === 0 && add === false) {
            return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />);
        }
    }

}