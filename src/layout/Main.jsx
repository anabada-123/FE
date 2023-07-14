import React from 'react';
import styled from 'styled-components';

const MainSt = styled.main`
    width: 100%;
    /* height: 80vh; */
`;

const Main = ({ children }) => {
    return (
        <MainSt>
            <div className="center">{children}</div>
        </MainSt>
    );
};

export default Main;
