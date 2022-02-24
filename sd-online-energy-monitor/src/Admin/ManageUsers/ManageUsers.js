import React, { useEffect, useState } from 'react'
import "../../Loading/Loading.css";
import ReactLoading from "react-loading";
import "../AdminPage.css"
import HttpRequestController from '../../services/HttpRequestController';
import EditUser from './EditUser';
import AddUser from './AddUser';
import './ManageUsers.css';

export default function ManageUsers() {
    const [users, setUsers] = useState(0);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [user, setUser] = useState(false);
    const [devices, setDevices] = useState(0);
    const [visible, setVisible] = useState(false);
    const [assignDevice, setAssignDevice] = useState(false);
    const [unassignedDevices, setUnassignedDevices] = useState(0);
    const [username, setUsername] = useState("");
    const [editPassword, setEditPassword] = useState(false);

    useEffect(() => {
        // console.log(localStorage.getItem('user').roles)
        // if (!localStorage.getItem('user').roles) {
        //     return <Redirect to="/home"></Redirect>
        // }
        HttpRequestController.getUsersInfo().then(res => {
            setUsers(res);
            console.log(res);
        });
    }, [users]);

    let editt = () => {
        setEdit(true);
    }

    let addd = () => {
        setAdd(true);
    }

    function deletee(user) {
        HttpRequestController.deleteUser(user.username);
    }

    const psw = () => {
        setUnassignedDevices(0);
        setUsername("");
        setEditPassword(true);
    };

    const assign = (user) => {
        setAssignDevice(true);
        setUsername(user.username);
        HttpRequestController.getUnassignedDevices().then(res => {
            setUnassignedDevices(res);
            console.log(res);
        });
    };

    function onClickHandler(user) {
        setUser(user);
        console.log(user);
    }

    const hanldeClick = (username) => {
        HttpRequestController.getDevices(username).then(res => {
            setDevices(res);
            console.log(res);
        });
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
        setUnassignedDevices(0);
        setAssignDevice(false);
        setUsername("");
        setEditPassword(false);
        setAdd(false);
        setEdit(false);
    };

    if (users === 0) {
        return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />);
    }
    else {
        if (edit === true && user !== 0 && add === false) {
            return <EditUser user={user} setEdit={setEdit}></EditUser>
        }
        else if (edit === false && user !== 0 && add === true) {
            return <AddUser setAdd={setAdd}></AddUser>
        }
        else if (edit === false && user !== 0 && add === false) {
            return (
                <div>
                    <table className="table table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Date of birth</th>
                                <th>Address</th>
                                <th>Roles</th>
                                <th>
                                    <button type="button" className="btn btn-primary edit-product" onClick={addd}>
                                        <i className="fa fa-edit"></i>Add
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) =>
                            (
                                <tr key={index} data-item={user} onClick={() => onClickHandler(user)}>
                                    <td data-title="Username">{user.username}</td>
                                    <td data-title="Name">{user.name}</td>
                                    <td data-title="Date of birth">{user.dateOfBirth}</td>
                                    <td data-title="Address">{user.address}</td>
                                    <td data-title="Roles">{user.roles}</td>
                                    <td>
                                        <a href="#" onClick={() => hanldeClick(user.username)}>
                                            Devices
                                        </a>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={editt}>
                                            <i className="fa fa-edit"></i>Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={() => deletee(user)}>
                                            <i className="fa fa-edit"></i>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={() => psw(user)}>
                                            <i className="fa fa-edit"></i>Change Password
                                        </button>
                                    </td>

                                    <td>
                                        <button type="button" className="btn btn-primary edit-product" onClick={() => assign(user)}>
                                            <i className="fa fa-edit"></i>Assign Device
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {visible && devices !== 0 && <Modal details={devices} handleClose={hideModal} editPassword={editPassword} />}
                    {editPassword === true && <Modal details={{ username: user.username, password: "" }} handleClose={hideModal} editPassword={editPassword} />}
                    {unassignedDevices !== 0 && assignDevice && <Modal details={unassignedDevices} handleClose={hideModal} editPassword={editPassword} user={username} assignDevice={assignDevice} />}
                </div>
            )
        }
        else if (edit === false && user === 0 && add === false) {
            return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />);
        }
    }

}

function updatePassword(user) {
    HttpRequestController.updatePassword(user).then(res => {
        console.log(res);
    });
}

function assignDeviceToClient(username, device) {
    HttpRequestController.assignDeviceToClient(username, device).then(res => {
        console.log(res);
    });
}

const Modal = ({ handleClose, details, editPassword, assignDevice, user }) => {
    if (editPassword === true) {
        return (
            <div className="modal display-block">
                <section className="modal-main">
                    <div className="App">
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control" placeholder="New Password"
                                onChange={e => details.password = e.target.value} />
                        </div>
                    </div>
                    <button className="btn btn-danger" onClick={() => { console.log(details); updatePassword(details) }}>Update</button>
                </section>
            </div>
        );
    }
    else if (assignDevice && editPassword === false) {
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
                                    <th scope="col">Location</th>
                                    <th scope="col">Maximum Energy Consumption</th>
                                    <th scope="col">Average Energy Consumption</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((device, index) =>
                                    <tr key={index}>
                                        <td>{device?.id}</td>
                                        <td>{device?.description}</td>
                                        <td>{device?.location}</td>
                                        <td>{device?.maxEnergyConsumption}</td>
                                        <td>{device?.avgEnergyConsumption}</td>
                                        <td>
                                            <button onClick={() => { console.log(details); assignDeviceToClient(user, device) }}>Assign</button>
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
                                    <th scope="col">Location</th>
                                    <th scope="col">Maximum Energy Consumption</th>
                                    <th scope="col">Average Energy Consumption</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((device, index) =>
                                    <tr key={index}>
                                        <td>{device?.id}</td>
                                        <td>{device?.description}</td>
                                        <td>{device?.location}</td>
                                        <td>{device?.maxEnergyConsumption}</td>
                                        <td>{device?.avgEnergyConsumption}</td>
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