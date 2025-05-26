import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

function Pagination({ pages, page, keyword = '', baseUrl = '' }) {
    return (
        pages > 1 && (
            <nav className="pagination-nav">
                <ul className="pagination-list">
                    {[...Array(pages).keys()].map((x) => (
                        <li key={x + 1} className={x + 1 === page ? 'active' : ''}>
                            <Link to={keyword ? `${baseUrl}/?keyword=${keyword}&pageNumber=${x + 1}` : `${baseUrl}/?pageNumber=${x + 1}`}>
                                {x + 1}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    );
}

export default Pagination;