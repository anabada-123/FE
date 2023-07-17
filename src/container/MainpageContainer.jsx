import React, { useEffect, useState } from 'react';
import { ProductList } from '../components/ProductList';
import { useQuery, useQueryClient } from 'react-query';
import { getTradingItems } from '../api/tradingItems';
import PaginationButton from '../components/common/Button/PaginationButton';

//[ ]메인 페이지 기능하고 스타일 분리
//[ ]파람스 요청 확인
const MainpageContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [responseData, setResponseData] = useState([]);
    const [responsePage, setResponsePage] = useState([]);
    const { data, refetch } = useQuery('items', () => getTradingItems(currentPage));

    useEffect(() => {
        if (data) {
            setResponseData(data.items);
            setResponsePage(data.pageSize);
        }
    }, [data, currentPage]);

    const totalPages = responsePage;
    const maxButtons = 5; // 표시할 버튼의 최대 개수

    const handleClick = async (page) => {
        await setCurrentPage(page);
        refetch();
    };

    return (
        <>
            {data ? <ProductList data={responseData} /> : null}
            <PaginationButton
                currentPage={currentPage}
                totalPages={totalPages}
                handleClick={handleClick}
                maxButtons={maxButtons}
            />
        </>
    );
};

export default MainpageContainer;
