import React from "react";
import { Spinner as Loader } from "react-bootstrap";

const spinnerStyle = {
    position: "absolute",
    top: "calc(50% - 1rem)",
    left: "calc(50% - 1rem)", // dimensions of the spinner: 2rem x 2rem
}

const Spinner = () => ( // if there is no curly braces, arrow function will return all the statement automatically
    <Loader style={spinnerStyle} animation="border" variant="primary"></Loader>
);

export default Spinner;