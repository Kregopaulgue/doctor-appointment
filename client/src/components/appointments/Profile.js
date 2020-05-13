import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import { UsersModel } from '../../services/api/models/users.js';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    async componentDidMount() {
        try {
            const userModelInstance = new UsersModel(UsersModel.currentUserId);
            const response = await userModelInstance.getUserById();

            this.setState({ user: response.user });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                {
                    this.state.user &&
                    <ListGroup
                        className="w-25"
                    >
                        <ListGroup.Item>Name: { user.name }</ListGroup.Item>
                        <ListGroup.Item>Username: { user.username }</ListGroup.Item>
                        <ListGroup.Item>E-mail: { user.email }</ListGroup.Item>
                        <ListGroup.Item>Role: { user.role }</ListGroup.Item>
                        <ListGroup.Item>Medical Card Id: {user._id}</ListGroup.Item>
                        <ListGroup.Item>Registration Date: {user.createdAt}</ListGroup.Item>
                    </ListGroup>
                }
            </div>
        )
    }
}

export default Profile;