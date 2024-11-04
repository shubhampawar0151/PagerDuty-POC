import { useEffect, useState } from 'react';
import Card from './Card'; // Adjust the import path based on your file structure
import { fetchIncidents } from './../Services/pagerDutyService'; // Adjust the import path

interface DatalayerProps {
    currentStatus: any,
    currentUrgency: any,
    currentService: any,
    currentFromDate: any,
    currentToDate: any
}

function Datalayer({ currentStatus, currentUrgency, currentService, currentFromDate, currentToDate }: DatalayerProps) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        console.log("From : " + currentFromDate + " To : " + currentToDate);

        try {
            const result = await fetchIncidents(currentStatus, currentUrgency, currentService, currentFromDate, currentToDate);
            setData(result);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentStatus, currentUrgency, currentService, currentFromDate, currentToDate]);

    const handleRefresh = () => {
        fetchData();
    };

    if (loading) {
        return (
            <div className="text-center mt-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading data, please wait...</p>
            </div>
        );
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber: any) => setCurrentPage(pageNumber);

    const getPageNumbers = () => {
        const pages = [];
        const startPages = [1, 2, 3];
        const endPages = [totalPages - 2, totalPages - 1, totalPages];
        const middlePages = [
            currentPage - 1,
            currentPage,
            currentPage + 1
        ].filter((page) => page > 1 && page < totalPages);

        const pageSet = new Set([...startPages, ...middlePages, ...endPages]);

        for (let i = 1; i <= totalPages; i++) {
            if (pageSet.has(i)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-secondary" onClick={handleRefresh}>
                            Refresh <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                            </svg>
                        </button>
                    </div>

                    {data.length === 0 ? (
                        <p>No data found!</p>
                    ) : (
                        <div>
                            <div className="row">
                                {currentData.map((item: any, index) => (
                                    <div className="col-md-4 mb-3" key={index}>
                                        <Card
                                            title={item.title}
                                            currentStatus={item.status}
                                            currentPriority={item.priority != null ? item.priority.name : 'N/A'}
                                            currentUrgency={item.urgency}
                                            createdAt={item.created_at}
                                            body={item}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="pagination-container mt-3">
                                <button
                                    className="btn btn-outline-primary me-2"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                {getPageNumbers().map((page, index) =>
                                    page === '...' ? (
                                        <span key={index} className="mx-1">...</span>
                                    ) : (
                                        <button
                                            key={index}
                                            className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    className="btn btn-outline-primary ms-2"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Datalayer;