import React from 'react';
import "./style.css";

export default function Connect(props) {

    return(
        <>
        <button className="button-for-connect" onClick={props.handleConnect}>{props.message}</button>
        </>
    )
}