import PieChart from '../PieChart/Piechart';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}

function Modal({ isOpen, onClose, data }: ModalProps) {
    if (!isOpen) return null;
    {/* Display Pie Chart - via PieChart Componenet in the popup */ }
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Header of popup with close button */}
                    <div className="modal-header">
                        <h5 className="modal-title">Incident Data</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    {/* Body of popup - with piechart in it */}
                    <div className="modal-body">
                        <PieChart data={data} />
                    </div>
                    {/* Footer of popup - with close button */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;