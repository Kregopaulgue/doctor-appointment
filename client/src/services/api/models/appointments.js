import { ApiModel } from '../ApiModel.js';

class AppointmentsModel extends ApiModel {
    constructor(id) {
        super();

        this.id = id;

        this.getAllAppointments = this.getAllAppointments.bind(this);
        this.getAppointmentById = this.getAppointmentById.bind(this);
        this.createAppointment = this.createAppointment.bind(this);
        this.updateAppointment = this.updateAppointment.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.searchAppointments = this.searchAppointments.bind(this);

        this.modelRequest = this.getModelRequest();
        this.modelBaseUrl = this._buildUrl();
    }

    getModelRequest() {
        let resultUrl = '/appointments';
        if(this.id) {
            resultUrl = `/appointments/${this.id}`;
        }
        return resultUrl;
    }

    async getAllAppointments() {
        return await this.get();
    }
    async getAppointmentById() {
        return await this.get();
    }
    /**
     * 
     * @param {object} params
     * @param {date} params.fromDate
     * @param {date} params.toDate
     * @param {string} params.client
     * @param {string} params.doctor
     * @param {string} params.time
     */
    async searchAppointments(params) {
        const initialModelBaseUrl = this.modelBaseUrl;
        this.modelBaseUrl += '/search';

        const response = await this.get(params);

        this.modelBaseUrl = initialModelBaseUrl;
        return response;
    }

    async createAppointment(client, doctor, time, date) {
        return await this.post({
            client,
            doctor,
            time,
            date
        });
    }
    async updateAppointment(client, doctor, time, date) {
        if(!this.id) {
            throw new Error('No id for appointment specified');
        }
        return await this.post({
            client,
            doctor,
            time,
            date
        });
    }

    async deleteAppointment() {
        if(!this.id) {
            throw new Error('No id for appointment specified');
        }
        return await this.delete();
    }
}