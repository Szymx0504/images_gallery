import React from "react";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Button, Card } from "react-bootstrap";

const ImageCard = ({ image, deleteImage }) => {
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image.urls.small} />
          <Card.Body>
            <Card.Title>{image.title ? image.title.toUpperCase() : ""}</Card.Title> {/* image.title?.toUpperCase() is a shortcut (optional chaining) */}
            <Card.Text>{image.description ? image.description : image.alt_description}</Card.Text>
            <Button variant="primary" onClick={() => deleteImage(image.id)}>Delete</Button>
          </Card.Body>
        </Card>
      );
};

export default ImageCard;