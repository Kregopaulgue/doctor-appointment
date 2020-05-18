import { ApiModel } from '../ApiModel.js';

export class DoctorsModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.updateDoctorProfile = this.updateDoctorProfile.bind(this);

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = '/doctors';
        if(this.id) {
            resultUrl = `/doctors/${this.id}`;
        }
        return resultUrl;
    }

    async updateDoctorProfile(updateDoctorProfile) {
        await this.put(updateDoctorProfile);
    }
}