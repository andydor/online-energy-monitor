import React, { useEffect, useState } from 'react'
import "../../Loading/Loading.css";
import "./AdminPage.css";
import './Program.css';
import axios from 'axios';
import { Helmet } from "react-helmet";

export default function Program() {
  const [data, setData] = useState(0);
  const [days, setDays] = useState(0);
  const [data1, setData1] = useState(false);
  var res = "";

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
      //https://online-energy-monitor.herokuapp.com/calculator
      const response = await axios.post('https://online-energy-monitor.herokuapp.com/calculator', {
        jsonrpc: "2.0",
        id: 1,
        method: "optimalProgramme",
        params: {
          "username": localStorage.getItem("username"),
          "interval": days
        },
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      })



      console.log(response.data.result);
      res = response.data.result;
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

  return (
    // <ReactLoading type={"spinningBubbles"} color={"#27296d"} height={175} width={98} className="loading" />
    <div className="auth-wrapper">
      <Helmet>
        <title>Show Optimal Programme Hours</title>
      </Helmet>
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Show Optimal Programme Hours</h3>

          <div className="form-group">
            <label>Enter the number of hours for the programme:</label>
            <input className="form-control" placeholder="Days"
              onChange={e => setDays(Number(e.target.value))} />
          </div>

          <button className="btn btn-primary btn-block" >Add</button>
        </form>
      </div>
      {
        data1 &&
        <div>
          <h2>Interval for optimal programme: {data}</h2>
        </div>
      }
    </div>
  );

}
