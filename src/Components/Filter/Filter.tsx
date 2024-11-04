import React, { useState, useEffect } from 'react';
import capitalizeFirstLetter from './../Pipe/capitalizeFirstLetter';
import { fetchServices, Service } from './../Services/pagerDutyService'; // Import the service function and interface
import "./Filter.css";

interface FilterProps {
    onSubmit: (data: {
        status: string;
        urgency: string;
        service: string;
        fromDate: string;
        toDate: string;
    }) => void;
}

function Filter({ onSubmit }: FilterProps) {
    const statusList = ["triggered", "acknowledged", "resolved"];
    const urgencyList = ["low", "high"];

    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedUrgency, setSelectedUrgency] = useState<string>('');
    const [selectedService, setSelectedService] = useState<string>('');
    const [services, setServices] = useState<Service[]>([]);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Fetch services data on component mount
    useEffect(() => {
        const loadServices = async () => {
            try {
                const servicesData = await fetchServices(); // Call the service function
                setServices(servicesData);
            } catch (error) {
                setErrorMessage('Failed to load services. Please try again later.');
            }
        };

        loadServices();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');

        const formattedFromDate = fromDate ? new Date(fromDate).toISOString() : '';
        const formattedToDate = toDate ? new Date(toDate).toISOString() : '';

        // Validate date range
        if (new Date(formattedToDate) <= new Date(formattedFromDate)) {
            setErrorMessage('To Date must be after From Date.');
            return;
        }

        onSubmit({
            status: selectedStatus,
            urgency: selectedUrgency,
            service: selectedService,
            fromDate: formattedFromDate,
            toDate: formattedToDate
        });
    };

    const handleReset = () => {
        setSelectedStatus('');
        setSelectedUrgency('');
        setSelectedService('');
        setFromDate('');
        setToDate('');
    };

    return (
        <div className='form-div'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="statusSelect" className="form-label">Select Status</label>
                    <select
                        id="statusSelect"
                        className="form-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="" disabled>Select a status</option>
                        {statusList.map((status, index) => (
                            <option key={index} value={status}>{capitalizeFirstLetter(status)}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="urgencySelect" className="form-label">Select Urgency</label>
                    <select
                        id="urgencySelect"
                        className="form-select"
                        value={selectedUrgency}
                        onChange={(e) => setSelectedUrgency(e.target.value)}
                    >
                        <option value="" disabled>Select an urgency</option>
                        {urgencyList.map((urgency, index) => (
                            <option key={index} value={urgency}>{capitalizeFirstLetter(urgency)}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="serviceSelect" className="form-label">Select Service</label>
                    <select
                        id="serviceSelect"
                        className="form-select"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                    >
                        <option value="" disabled>Select a service</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>{service.summary}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="fromDate" className="form-label">From Date</label>
                    <input
                        type="datetime-local"
                        id="fromDate"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="toDate" className="form-label">To Date</label>
                    <input
                        type="datetime-local"
                        id="toDate"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                {errorMessage && <div className="text-danger">{errorMessage}</div>}

                <button type="button" className="btn btn-secondary mt-2 me-2" onClick={handleReset}>Reset</button>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
}

export default Filter;