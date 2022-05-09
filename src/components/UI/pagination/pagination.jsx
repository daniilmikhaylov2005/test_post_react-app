import React from 'react';
import MyButton from "../button/MyButton";
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, changePage, page}) => {
    let pagesArray = getPagesArray(totalPages)

    return (
        <div className='pages_container'>
            {pagesArray.map(p =>
                <MyButton
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'pages_container__page_current' : 'pages_container__page'}
                >
                    {p}
                </MyButton>
            )}
        </div>
    );
};

export default Pagination;