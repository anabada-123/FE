import React from 'react';
import styled from 'styled-components';

const FooterSt = styled.footer`
    width: 100%;
    height: 100px;
    background-color: #efefef;
    .center {
        width: 100%;
    }
`;

const Footer = () => {
    return (
        <FooterSt>
            <div className="center">footer</div>
        </FooterSt>
    );
};

export default Footer;
