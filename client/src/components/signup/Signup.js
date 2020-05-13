import React, { Component } from 'react';
import { Form, Modal, InputGroup, Button } from 'react-bootstrap';

import { UsersModel } from '../../services/api/models/users.js';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            name: '',
            password: ''
        };
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.hideSignUpModal}
            >
                <Modal.Header
                    closeButton
                >
                    <Modal.Title>
                        Sign Up
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group
                            controlId="signupModalUsername"
                        >
                            <Form.Label>
                                Username:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                onChange={this.handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId='signupModalEmail'
                        >
                            <Form.Label>
                                E-mail:
                            </Form.Label>
                            <InputGroup 
                                className="mb-3"
                            >
                                <InputGroup.Prepend>
                                    <InputGroup.Text
                                        id="modal-email-addon"
                                    >
                                        @
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    aria-label="E-mail"
                                    aria-describedby="email-addon"
                                    onChange={this.handleFormChange}
                                />
                            </InputGroup>    
                        </Form.Group>

                        <Form.Group
                            controlId="signupModalName"
                        >
                            <Form.Label>
                                Name:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your real name"
                                onChange={this.handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="signupModalPassword"
                        >
                            <Form.Label>
                                Password:
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={this.handleFormChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                    >
                        Close
                    </Button>

                    <Button
                        variant="primary"
                    >
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Signup;