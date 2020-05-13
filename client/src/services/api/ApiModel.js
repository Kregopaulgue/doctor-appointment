/**
 * @class
 */
export class ApiModel {
    static host = process.env.APP_HOST || 'localhost';
    static port = process.env.APP_PORT || '5000';
    static protocol = process.env.APP_PROTOCOL || 'http://';
    static basePrefix = process.env.APP_BASE_PREFIX || '/api';

    static authToken;

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
        return `${ApiModel.protocol}${ApiModel.host}${ApiModel.port ? ':' + ApiModel.port : ''}${ApiModel.basePrefix}${this.modelRequest}`;
    }

    _buildUrlWithParams(params, insertSlash) {
        const url = new URL(this.modelBaseUrl + (insertSlash ? '/' : ''));
        if(params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
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
        localStorage.setItem('authToken', ApiModel.authToken);
    }
    static clearAuthToken() {
        delete ApiModel.authToken;
        localStorage.removeItem('authToken');
    }
    static loadAuthToken() {
        ApiModel.authToken = localStorage.getItem('authToken');
    }

    getModelRequest() {
        throw new Error('This method must be implemented!');
    }
}

ApiModel.loadAuthToken();