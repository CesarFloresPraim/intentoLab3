import React, { useState, useEffect } from 'react';
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";

function Option(props) {
    return (
        <Row className="border-bottom pt-2">
            <Col xs={4}>{props.optionName}</Col>
            <Col xs={4}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id={props.parentId + '/' + props.optionId + '/month'} onChange={e => props.handleInput(e)} />
                </InputGroup>
            </Col>
            <Col xs={4}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id={props.parentId + '/' + props.optionId + '/month2'} onChange={e => props.handleInput(e)} />
                </InputGroup>
            </Col>
        </Row>
    )
}

export default Option;