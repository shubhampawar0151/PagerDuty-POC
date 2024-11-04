import { useState } from 'react';
import InfoModal from './InfoModal'; // Import the modal component
import datePipe from './../Pipe/datePipe';
import capitalizeFirstLetter from './../Pipe/capitalizeFirstLetter';
import "./Card.css";
import PropTypes from 'prop-types';


interface CardProps {
    title: any,
    currentStatus: any,
    currentPriority: any,
    currentUrgency: any,
    createdAt: any,
    body: any
}

function Card({ title, currentStatus, currentPriority, currentUrgency, createdAt, body }: CardProps) {
    const [showModal, setShowModal] = useState(false);

    // Function to toggle modal visibility
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const getUrgencyColor = (urgency: any) => {
        switch (urgency) {
            case 'high':
                return 'text-danger';
            case 'low':
                return 'text-warning';
            default:
                return 'text-secondary';
        }
    };

    const getPriorityColor = (priority: any) => {
        switch (priority) {
            case 'P1':
                return { backgroundColor: 'rgb(168, 23, 28)', color: 'white' };
            case 'P2':
                return { backgroundColor: 'rgb(235, 96, 22)', color: 'white' };
            case 'P3':
                return { backgroundColor: 'rgb(249, 180, 6)', color: 'white' };
            case 'P4':
                return { backgroundColor: 'rgb(85, 85, 85)', color: 'white' };
            case 'P5':
                return { backgroundColor: 'rgb(85, 85, 85)', color: 'white' };
            default:
                return { backgroundColor: 'rgb(85, 85, 85)', color: 'white' };
        }
    };

    return (
        <div className="card mb-3 card-body">
            <div className=" d-flex justify-content-between align-items-center">
                <h5 className="card-title">{title}</h5>
                <button className="btn btn-border" onClick={handleShowModal}>
                    Detailed Info <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5" />
                        <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z" />
                    </svg>
                </button>
            </div>
            <div className="card-text">
                <div>
                    Status: {capitalizeFirstLetter(currentStatus)} |
                    Urgency: <span className={getUrgencyColor(currentUrgency)}>{capitalizeFirstLetter(currentUrgency)}</span>
                </div>
                Priority: <span style={getPriorityColor(currentPriority)}>{capitalizeFirstLetter(currentPriority)}</span>
                <div>
                    Created At: {datePipe(createdAt)}
                </div>
            </div>
            {/* Modal component */}
            {showModal && (
                <InfoModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    title={title}
                    currentStatus={currentStatus}
                    currentPriority={currentPriority}
                    body={body}
                />
            )}
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    currentStatus: PropTypes.string.isRequired,
    currentPriority: PropTypes.string.isRequired,
    currentUrgency: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default Card;