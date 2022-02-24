import axios from "axios";
import authHeader from "./auth-header";

class HttpRequestController {

    async registrationPost(newUser) {
        try {
            const response = await axios.post('/auth/signup', newUser);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async loginPost(data) {
        let user = "";
        try {
            const res = await axios.post('/auth/signin', data)
            localStorage.setItem('token', res.data.token);
            user = res.data;
        } catch (error) {
            console.log(error)
            user = "bad-credentials";
        }

        return user;
    }

    logoutPost() {
        axios.get('/auth/signout', { headers: authHeader() }).then(
            res => {
                console.log(res);
            }
        ).catch(err => {
            console.log(err)
        });
        localStorage.setItem('token', null);
    }

    async getUser() {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.get('/users', { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async getUsersInfo() {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.get('/users/getInfo', { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async getDevices(username) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.get('/devices/' + username, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async getAllDevices() {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.get('/devices', { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async getUnassignedDevices() {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.get('/devices/unassigned', { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async getUnassignedSensors() {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.get('/sensors/unassigned', { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async updateDevice(id, device) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/devices/update/' + id, device, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async assignDeviceToClient(username, device) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/devices/assign/' + device.id, { username: username }, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async assignSensorToDevice(id, sensorId) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/sensors/assign/' + id, { sensorId: sensorId }, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async deleteDevice(id) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/devices/delete/' + id, {}, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async addDevice(device) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/devices/add', device, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async addSensor(sensor) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/sensors/add', sensor, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async updateSensor(id, sensor) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/sensors/update/' + id, sensor, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async deleteSensor(id) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/sensors/delete/' + id, {}, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async getAllSensors() {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.get('/sensors/', { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async updateUser(user, username) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/users/update/' + username, user, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async deleteUser(username) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/users/delete/' + username, {}, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }

    async updatePassword(user) {
        if (localStorage.getItem('token') != null) {
            try {
                const response = await axios.post('/users/updatePassword', user, { headers: authHeader() });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return null;
        }
    }
} 

export default new HttpRequestController();