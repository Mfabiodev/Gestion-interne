import React from 'react';

function Pagination({ meta, onPageChange }) {
    if (!meta || meta.total <= meta.per_page) {
        return null;
    }

    const handlePageChange = (url) => {
        if (url) {
            const pageNumber = new URL(url).searchParams.get('page');
            onPageChange(pageNumber);
        }
    };

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${!meta.prev_page_url ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        href="#" 
                        onClick={() => handlePageChange(meta.prev_page_url)}
                    >
                        Précédent
                    </a>
                </li>
                <li className="page-item disabled">
                    <span className="page-link">Page {meta.current_page} sur {meta.last_page}</span>
                </li>
                <li className={`page-item ${!meta.next_page_url ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        href="#" 
                        onClick={() => handlePageChange(meta.next_page_url)}
                    >
                        Suivant
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
