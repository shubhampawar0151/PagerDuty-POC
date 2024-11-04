import PieChart from '../PieChart/Piechart';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: Array<{ name: string; y: number }>; // Adjust type based on the pie chart data
}

function Modal({ isOpen, onClose, data }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Incident Data</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <PieChart data={data} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;