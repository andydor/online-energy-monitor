import React from 'react';

export default function Home(props) {

    if (props.user) {
        console.log(props.user);
        return (
            <h2> Hello {props.user.username} </h2>
        )
    }
    else {
        console.log("Logged out");
        return (
            <h2>You are not logged in</h2>
        )
    }
}