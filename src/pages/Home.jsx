import React from 'react';
import MainpageContainer from '../container/MainpageContainer';
import styled from 'styled-components';

const SectionTitle = styled.h2`
    /* width: 600px; */
    padding: 14px 20px 10px;
    margin: 50px 0 10px;
    font-size: 1.8rem;
    font-weight: bold;
    color: hotpink;
    border: 2px solid #333;
    border-radius: 20px;
    box-shadow: 0 3px 0 #333;
`;

const Home = () => {
    return (
        <>
            <h2 className="section-title">새로 나온 아나바다</h2>
            <MainpageContainer />
        </>
    );
};

export default Home;
