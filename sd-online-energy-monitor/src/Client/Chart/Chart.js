import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import "../../Loading/Loading.css";
import "./AdminPage.css";
import './Chart.css';
import axios from 'axios';
import { Helmet } from "react-helmet";

export default function Chart() {
  const [data, setData] = useState(0);
  const [days, setDays] = useState(0);
  const [data1, setData1] = useState(false);
  var res = [];

  useEffect(() => {
    // let isMounted = true;
    // get().then(() => {
    //   if (isMounted) 
    //     setData(res, setData1(true));   // add conditional check
    // })
    // return () => { isMounted = false };
  }, []);

  async function get() {
    try {
      const response = await axios.post('https://online-energy-monitor.herokuapp.com/calculator', {
        jsonrpc: "2.0",
        id: 1,
        method: "getMeasurements",
        params: {
          "username": localStorage.getItem("username"),
          "days": days
        },
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      })

      for (var i = 0; i < response.data.result.length; i++) {
        res.push(JSON.parse(response.data.result[i]));
      }

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    get().then(() => {
      setData(res, setData1(true));
    });
  }

  if (data1 === true) {
    return (
      <div>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
  else {
    return (
      // <ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />
      <div className="auth-wrapper">
        <Helmet>
          <title>Show Consumption for the last input days</title>
        </Helmet>
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Show Consumption for the last input days</h3>

            <div className="form-group">
              <label>Enter the number of days:</label>
              <input className="form-control" placeholder="Days"
                onChange={e => setDays(Number(e.target.value))} />
            </div>

            <button className="btn btn-primary btn-block" >Add</button>
          </form>
        </div>
        {/* <ImageUpload product={this.state.code} nu={false}></ImageUpload> */}
      </div>
    );
  }
}
