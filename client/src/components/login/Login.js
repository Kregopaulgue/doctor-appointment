import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import { UsersModel } from '../../services/api/models/users.js';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleFormChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    login = async (event) => {
        event.preventDefault();

        const usersModelInstance = new UsersModel();
        try {
            const response = await usersModelInstance.loginUser(this.state.email, this.state.password);
            console.log(response);
            UsersModel.setAuthToken(response.token);
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div
                className="w-25"
            >
                <InputGroup 
                    className="mb-3"
                >
                    <InputGroup.Prepend>
                        <InputGroup.Text
                            id="email-addon"
                        >
                            @
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        aria-label="E-mail"
                        aria-describedby="email-addon"
                        onChange={this.handleFormChange}
                    />
                </InputGroup>

                <InputGroup
                    className="mb-3"
                >
                    <FormControl
                        name="password"
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        onChange={this.handleFormChange}
                    />
                </InputGroup>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={this.login}
                >
                    Log In
                </Button>
            </div>
        );
    }
}

export default Login;