import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import "../../Loading/Loading.css";
import "./AdminPage.css";
import './Baseline.css';
import axios from 'axios';
import ReactLoading from'react-loading';

export default function Baseline() {
  const [data, setData] = useState(0);
  const [data1, setData1] = useState(false);
  var res = [];

  useEffect(() => {
    let isMounted = true;
    get().then(() => {
      if (isMounted)
        get();   // add conditional check
        setData(res, setData1(true));
    })
    return () => { isMounted = false };
  }, []);

  async function get() {
    try {
      const response = await axios.post('https://online-energy-monitor.herokuapp.com/calculator', {
        jsonrpc: "2.0",
        id: 1,
        method: "getBaseline",
        params: {
          "username": localStorage.getItem("username")
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
      <ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />
    );
  }
}
