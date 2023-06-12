import React from "react";
// import { Button } from "react-bootstrap";

const Welcome = () => (
  <div className="container-fluid bg-light p-5">
    <h1 className="display-4">Images Gallery</h1>
    <p className="lead">
      This is a simple application that retrieves using Unsplash API.
      In order to start enter any search term in input field.
    </p>
    <hr className="my-4"></hr>
    {/* <p> */}
    {/* <Button bsStyle="primary" href="https://unsplash.com" target="_blank">Learn more</Button>  */} {/* target="_blank" specifies that the link will be opened in a new tab */}
    {/* </p> */}
    <a className="btn btn-primary btn-lg" href="https://unsplash.com" role="button" target="_blank" rel="noreferrer">Learn more</a>
  </div>
);

export default Welcome;
