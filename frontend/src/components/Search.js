import React from "react";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Form } from "react-bootstrap";  // these all together works the same (ofc without newly added imports, but the concept itself is important here)
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const styleForm = {
    // display: "flex",
    // justifyContent: "center",
}
const see = {
    margin: "0 10px"
}

const Search = ({ word, setWord, handleSubmit }) => { // you could also replace xs and md with CSS 'variables' if you wanted to (and I will probably be doing so in the future)
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Form style={{ ...styleForm, ...see }} onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={9}>
                                <Form.Control
                                    type="text"
                                    value={word}
                                    onChange={(e) => setWord(e.target.value)}
                                    placeholder="Search for new image..."
                                />
                            </Col>
                            <Col>
                                <Button style={see} variant="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    ); // max xs, md and lg is 12
};

export default Search;