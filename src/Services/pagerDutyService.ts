import { API_URL } from "../constants";

export interface Service {
    id: string;
    summary: string;
}

// Api to fetch list of services from pagerduty
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
            throw new Error('Failed to fetch services'); // error in fetching data from server
        }

        const data = await response.json();
        return data.services; 
    } catch (error) {
        console.error('Error fetching services:', error); // display error
        throw error; 
    }
};

// Api to fetch list of incidents from pagerduty
export const fetchIncidents = async (currentStatus : any, currentUrgency : any, currentService : any, currentFromDate : any, currentToDate : any) => {
    const queryParams = new URLSearchParams();

    if (currentStatus) queryParams.append('statuses[]', currentStatus); // staus parameter if we have selected in filter
    if (currentUrgency) queryParams.append('urgencies[]', currentUrgency); // urgency parameter if we have selected in filter
    if (currentService) queryParams.append('service_ids[]', currentService); // service parameter if we have selected in filter
    if (currentFromDate) queryParams.append('since', currentFromDate); // from date parameter if we have selected in filter
    if (currentToDate) queryParams.append('until', currentToDate); // to date parameter if we have selected in filter
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
            throw new Error('Network response was not ok'); // error in fetching data from server
        }
        const result = await response.json();
        return Array.isArray(result.incidents) ? result.incidents : [];
    } catch (error: any) {
        throw new Error(error.message); // display error
    }
};
