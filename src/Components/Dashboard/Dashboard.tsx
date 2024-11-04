import { useState } from 'react';
import Filter from "../Filter/Filter";
import Datalayer from "../Datalayer/Datalayer";
import Header from '../Header/Header';
import "./Dashboard.css";

function Dashboard() {

    const [formData, setFormData] = useState({ status: '', urgency: '', service: '', fromDate: '', toDate: '' });

    const handleFormSubmit = (data: any) => {
        setFormData(data);
        // console.log("Form Data : " + data);
    };


    return (
        <div className="row dataLayer">
            <div className="col-md-12 header">
                <Header></Header>
            </div>
            <div className="col-md-3">
                <Filter onSubmit={handleFormSubmit} />
            </div>

            <div className="col-md-9">
                <Datalayer currentStatus={formData.status} currentUrgency={formData.urgency} currentService={formData.service} currentFromDate={formData.fromDate} currentToDate={formData.toDate} />
            </div>
        </div>
    );
}

export default Dashboard;