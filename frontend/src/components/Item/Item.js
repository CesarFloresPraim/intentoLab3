import React, { useState, useEffect } from 'react';

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {BsCaretDown, BsPlus} from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ApiService from "../../services/ApiService";
import Option from "../Option/Option";

function Item(props) {

    const [options, setOptions] = useState([
        { label: "", id: "" }
    ]);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [totalMonth, setTotalMonth] = useState(0);
    const [totalMonth2, setTotalMonth2] = useState(0);

    const [queryString, setQueryString] = useState("");


    useEffect(() => {
        getOptions(props.parentId);
    }, []);

    async function getOptions(parentId) {
        const response = await ApiService.fetchItemOptions(parentId);
        //console.log(response.data);
        setOptions(response.data.map((option) => ({ label: option['name'], id: parentId + '/' + option['id'] })));
    }

    function handleButton(e) {
        //parseIds
        let [parentId, optionId] = e.target.id.split('/');
        let optionName = e.currentTarget.textContent;
        let newOption = {parentId :parentId, optionId: optionId, optionName:optionName}

        const cloneSelected = [...selectedOptions];
        if(!selectedOptions.some(option => option['optionId'] == optionId )) {
            cloneSelected.push(newOption);
        }
        setSelectedOptions(cloneSelected.map((option) => ({parentId : option['parentId'], optionId: option['optionId'], optionName:option['optionName'], month:0, month2:0})))

    }

    function handleInput(e) {
        let [parentId, optionId, month] = e.target.id.split('/');

        // 1. Make a shallow copy of the items
        let copyOptions = [...selectedOptions];

        // 2. Make a shallow copy of the item you want to mutate
        let foundIndex = selectedOptions.findIndex((element) => element['optionId'] == optionId )
        let option = {...copyOptions[foundIndex]};

        // 3. Replace the property you're intested in
        if (month === 'month') {
            option.month = parseInt(e.target.value);
        } else {
            option.month2 = parseInt(e.target.value);
        }

        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        copyOptions[foundIndex] = option;

        setTotalMonth(sumOfMonths(copyOptions));
        setTotalMonth2(sumOfMonths2(copyOptions));
        // 5. Set the state to our new copy
        setSelectedOptions(copyOptions)

    }

     function sumOfMonths(copyOptions) {
        return copyOptions.reduce((a, b) => (a['month'] || a) + (b['month'] || 0), 0);
     }

    function sumOfMonths2(copyOptions) {
        return copyOptions.reduce((a, b) => (a['month2'] || a) + (b['month2'] || 0), 0);
    }

    function handleQuery(e) {
        setQueryString(e.target.value);
    }
    function searchOptions() {
        if ((typeof options !== 'undefined' && options.length === 0) || queryString === "") {
            getOptions(props.parentId);
        }

        let newOptions = options.filter(a => a['label'].includes(queryString));
        setOptions(newOptions);
    }
    return(
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    {props.parentName} <BsCaretDown />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Container fluid>
                            <Row>
                                <nav className="navbar p-0 pb-2">
                                    <form className="form-inline">
                                        <input onChange={e => handleQuery(e)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                        <button className="btn btn-outline-success" type="button" onClick={searchOptions}>Search</button>
                                    </form>
                                </nav>
                            </Row>
                            <Row  className="mb-3">
                                {options.map(({ label, id }, i) => (
                                    <Button variant="outline-secondary" onClick={e => handleButton(e)} key={i} id={id}>{label}<BsPlus className="text-success"/></Button>
                                    ))}
                            </Row>
                            <Row className="border-bottom pb-2 pt-2 bg-light">
                                <Col xs={4}>Option</Col>
                                <Col xs={4}>Month 1</Col>
                                <Col xs={4}>Month 2</Col>
                            </Row>
                            {selectedOptions.map(({ parentId, optionId, optionName}, i) => (
                                <Option handleInput={handleInput} key={i} parentId={parentId} optionId={optionId} optionName={optionName}></Option>
                            ))}
                            <Row className="border-bottom pb-2 pt-2">
                                <Col xs={4}>Subtotal</Col>
                                <Col xs={4}>                                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled value={totalMonth}/>
                                </InputGroup></Col>
                                <Col xs={4}>                                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled value={totalMonth2}/>
                                </InputGroup></Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Item;