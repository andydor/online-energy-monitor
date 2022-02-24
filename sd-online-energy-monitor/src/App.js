import React from 'react';
import Navbar from "./Navbar/Navbar";
import './App.css';
import Login from './RegistrationSystem/Login';
import Signup from './RegistrationSystem/Signup';
import Home from './Home';
import Logout from './Logout/Logout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HttpRequestController from './services/HttpRequestController';
import AdminPage from './Admin/AdminPage';
import ManageUsers from './Admin/ManageUsers/ManageUsers';
import ManageDevices from './Admin/ManageDevices/ManageDevices';
import MyDevices from './Client/ManageDevices/ManageDevices';
import ManageSensors from './Admin/ManageSensors/ManageSensors';
import Chart from './Client/Chart/Chart';
import Baseline from './Client/Baseline/Baseline';
import Program from './Client/Program/Program';

export default class App extends React.Component {

  state = {
  };

  async setUser() {
    if(localStorage.getItem('token')) {
      this.setState({
        user: await HttpRequestController.getUser()
      });
    }
  }

  componentDidMount = () => {
    this.setUser();
  };

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <Router>
          <Navbar user={user} />
          <Switch>
            <Route exact path="/home" component={() => <Home user={user} />} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/admin" component={() => <AdminPage user={user} />} />
            <Route exact path="/manageUsers" component={() => <ManageUsers user={user} />} />
            <Route exact path="/manageDevices" component={() => <ManageDevices user={user} />} />
            <Route exact path="/manageSensors" component={() => <ManageSensors user={user} />} />
            <Route exact path="/mydevices" component={() => <MyDevices user={user}/>} />
            <Route exact path="/chart" component={() => <Chart user={user}/>} />
            <Route exact path="/baseline" component={() => <Baseline user={user}/>} />
            <Route exact path="/programme" component={() => <Program user={user}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}
