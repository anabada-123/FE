import React from 'react';
import styled from 'styled-components';

const MainSt = styled.main`
    width: 100%;
    /* height: 80vh; */
`;

const Main = ({ children }) => {
    return <MainSt>{children}</MainSt>;
};

export default Main;
