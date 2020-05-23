import React, { useState, useEffect } from 'react';

import { BsCaretDown } from "react-icons/bs";
import { BsPlus } from 'react-icons/bs';

import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Item from '../Item/Item';

import ApiService from "../../services/ApiService";

function Cashflow() {

    const [loading, setLoading] = React.useState(true);
    const [items, setItems] = React.useState([
        { label: "Loading ...", value: "" }
    ]);
    const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
        async function getItems() {
            const response = await ApiService.fetchItems();
            console.log(response.data);
            setItems(response.data.map((item) => ({ label: item['name'], value: item['id'] })));
            setLoading(false);
        }
        getItems();
    }, []);

    function handleDropdown() {
        let dropdown = document.getElementById("items_dropdown");
        let selectedId = dropdown.options[dropdown.selectedIndex].value;
        let selectedName = dropdown.options[dropdown.selectedIndex].text;
        let newItem = {parentId :selectedId, parentName: selectedName}

        const cloneSelected = [...selectedItems];
        if(!selectedItems.some(item => item['parentId'] == selectedId )) {
            cloneSelected.push(newItem);
        }


        setSelectedItems(cloneSelected.map((item) => ({parentId: item['parentId'], parentName:item['parentName']})))
    }

    return(
        <Container fluid className="full-height">
            <h2>Cashflow Monitoring</h2>
            <Row>
                <Col xs={12}>
                    <h4  className="text-left">Select an item</h4>
                    <Form.Group controlId="items_dropdown" disabled={loading}>
                        <Form.Control as="select" size="lg" custom>
                            {items.map(({ label, value }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </Form.Control>
                        <div className="mt-2 text-right">
                            <Button variant="success" onClick={handleDropdown}>Select item</Button>
                        </div>
                    </Form.Group>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} id='pdfg'>
                    {selectedItems.map(({ parentId, parentName }, i) => (
                        <Item key={i} parentId={parentId} parentName={parentName}></Item>
                    ))}
                        <div className="mt-2 text-right">
                            <Button variant="success">Submit sheet</Button>
                        </div>
                </Col>
            </Row>

        </Container>
    );
}

export default Cashflow;