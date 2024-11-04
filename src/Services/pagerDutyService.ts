import { API_URL } from "../constants";

export interface Service {
    id: string;
    summary: string;
}

export const fetchServices = async (): Promise<Service[]> => {
    try {
        const response = await fetch(`${API_URL}/services`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token token=${import.meta.env.VITE_API_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }

        const data = await response.json();
        return data.services; 
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error; 
    }
};


export const fetchIncidents = async (currentStatus : any, currentUrgency : any, currentService : any, currentFromDate : any, currentToDate : any) => {
    const queryParams = new URLSearchParams();

    if (currentStatus) queryParams.append('statuses[]', currentStatus);
    if (currentUrgency) queryParams.append('urgencies[]', currentUrgency);
    if (currentService) queryParams.append('service_ids[]', currentService);
    if (currentFromDate) queryParams.append('since', currentFromDate);
    if (currentToDate) queryParams.append('until', currentToDate);
    queryParams.append('limit', "100");
    queryParams.append('total', "True");


    const url = `${`${API_URL}/incidents`}?${queryParams.toString()}`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token token=${import.meta.env.VITE_API_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return Array.isArray(result.incidents) ? result.incidents : [];
    } catch (error: any) {
        throw new Error(error.message);
    }
};
