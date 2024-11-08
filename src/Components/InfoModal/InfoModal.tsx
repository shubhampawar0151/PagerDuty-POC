import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import "./InfoModal.css";

interface InfoModalProps {
    show: any,
    handleClose: any,
    title: any,
    currentStatus: any,
    currentPriority: any,
    body: any
}

function InfoModal({ show, handleClose, title, currentStatus, currentPriority, body }: InfoModalProps) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            {/* Header in popup of a card - with close and edit button */}
            <Modal.Header closeButton>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Modal.Title className='title'>{title}</Modal.Title>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Edit : Under Development !!!</Tooltip>}
                    >
                        <span style={{ cursor: 'pointer' }}>
                            <FaEdit />
                        </span>
                    </OverlayTrigger>
                </div>
            </Modal.Header>
            {/* Body in popup of a card - display the fields*/}
            <Modal.Body>
                <p><strong>Status:</strong> {currentStatus}</p>
                <p><strong>Priority:</strong> {currentPriority}</p>
                <p><strong>Title:</strong> {title}</p>
                <p><strong>Description:</strong> {body.description}</p>
                <p><strong>Urgency:</strong> {body.urgency}</p>
                <p><strong>Created At:</strong> {body.created_at}</p>
                <p><strong>Updated At At:</strong> {body.updated_at}</p>
                <p><strong>Last Status Change At:</strong> {body.last_status_change_at}</p>
                {body.resolved_at && <p><strong>Resolved At:</strong> {body.resolved_at}</p>}
            </Modal.Body>
            {/* Footer in popup of a card - close button */}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InfoModal;