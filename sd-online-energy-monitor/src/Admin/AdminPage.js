import React from 'react'
import "../Loading/Loading.css";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import "./AdminPage.css"

export default function AdminPage(props) {
    if (!props.user) {
        return (<ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />)
    }
    else {
        return (
            <div>
                {
                    props.user.roles.map((role) => {
                        return (<h2 key={role}>{role}</h2>)
                    })
                }
                <div className="admin-home-buttons">
                    <Link to="/home" className="btn btn-primary btn-block">Home</Link>
                    <Link to="/manageUsers" className="btn btn-primary btn-block">Manage Users</Link>
                    <Link to="/manageDevices" className="btn btn-primary btn-block">Manage Devices</Link>
                    <Link to="/manageSensors" className="btn btn-primary btn-block">Manage Sensors</Link>
                </div>

            </div>
        )
    }

}