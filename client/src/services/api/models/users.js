import { ApiModel } from '../ApiModel';

class UsersModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.signupUser = this.signupUser.bind(this);
        this.loginUser = this.loginUser.bind(this);

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = '/users';
        if(this.id) {
            resultUrl = `/users/${this.id}`;
        }
        return resultUrl;
    }

    async getAllUsers() {
        return await this.get();
    }
    async getUserById() {
        return await this.get();
    }

    async signupUser(username, email, name, password) {
        const initialModelBaseUrl = this.modelBaseUrl;
        this.modelBaseUrl += '/signup';
        const response = await this.post({
            username,
            email,
            name,
            password
        });
        this.modelBaseUrl = initialModelBaseUrl;
        return response;
    }
    async loginUser(email, password) {
        const initialModelBaseUrl = this.modelBaseUrl;
        this.modelBaseUrl += '/login';
        const response = await this.post({
            email,
            password
        });
        this.modelBaseUrl = initialModelBaseUrl;
        return response;
    }
} 