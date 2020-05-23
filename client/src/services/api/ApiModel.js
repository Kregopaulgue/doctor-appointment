/**
 * @class
 */
export class ApiModel {
    static authToken;
    static currentUserId;

    modelBaseUrl;
    modelRequest;

    constructor() {
        this._buildUrl = this._buildUrl.bind(this);
        this._buildUrlWithParams = this._buildUrlWithParams.bind(this);

        if(this.getModelRequest === undefined) {
            throw new TypeError('getModelRequest must be implemented in the derived class');
        } else {
            this.modelRequest = this.getModelRequest();
        }

        this.modelBaseUrl = this._buildUrl();
    }

    _buildUrl() {
        return `/api${this.modelRequest}`;
    }

    _buildUrlWithParams(params, insertSlash) {
        let url = this.modelBaseUrl + (insertSlash ? '/' : '');
        if(params) {
            url += '?';
            Object.keys(params).forEach(key => {
                url += `${key}=${params[key]}&`;
            });
        }
        return url;
    }

    async doRequest(method, body, params) {
        const url = this._buildUrlWithParams(params, method === 'POST');
        const response = await fetch(url, {
            method: method || 'GET',
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ApiModel.authToken ? `Token ${ApiModel.authToken}` : undefined
            }
        });

        if(response.ok) {
            const json = response.status !== 204 ?
                await response.json() : 
                { status: 'deleted' };
            return json;
        } else {
            throw response;
        }
    }

    async get(params) {
        return await this.doRequest('GET', null, params);
    }
    async post(body, params) {
        return await this.doRequest('POST', body, params);
    }
    async put(body, params) {
        return await this.doRequest('PUT', body, params);
    }
    async delete(body, params) {
        return this.doRequest('DELETE', body, params);
    }

    static setAuthToken(response) {
        ApiModel.authToken = response.token;
        ApiModel.currentUserId = response.user._id;
        localStorage.setItem('authToken', ApiModel.authToken);
        localStorage.setItem('currentUserId', ApiModel.currentUserId);
    }
    static clearAuthToken() {
        delete ApiModel.authToken;
        delete ApiModel.currentUserId;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUserId');
    }
    static loadAuthToken() {
        ApiModel.authToken = localStorage.getItem('authToken');
        ApiModel.currentUserId = localStorage.getItem('currentUserId');
    }

    getModelRequest() {
        throw new Error('This method must be implemented!');
    }
}

ApiModel.loadAuthToken();