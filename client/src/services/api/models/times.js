import { ApiModel } from '../ApiModel.js';

class TimesModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.getllTimes = this.getAllTimes.bind(this);

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = '/times';
        if(this.id) {
            resultUrl = `/times/${this.id}`;
        }
        return resultUrl;
    }

    async getAllTimes() {
        return await this.get();
    }
}