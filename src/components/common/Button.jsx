import React from 'react';
import { styled } from 'styled-components';
import { blueColor } from '../../assets/colors';
// ----- Button styled-conponent props guide-----
// $width : 버튼의 가로 사이즈
// $center : justify-content 속성 값

// $bc : background color
// $border : border를 넣습니다.

// $font_color : font color
// $font_size : font size

// $hover_color : hover 이벤트시 background color
// $hover_font_color : hover 이벤트시 font color

const ButtonStyle = styled.button`
    width: ${(props) => props.$width || ''};
    /* height: 40px; */
    padding: ${(props) => props.$padding || `14px 20px;`};
    margin: 8px;
    background-color: ${(props) => props.$bc || blueColor[1]};
    border-radius: 25px;
    color: ${(props) => props.$font_color || `#fff`};
    border: ${(props) => props.$border || `2px solid #333`};
    display: flex;
    justify-content: ${(props) => props.$center || `space-between`};
    align-items: center;
    white-space: nowrap;
    gap: 20px;
    font-size: ${(props) => props.$font_size || '14px'};
    font-weight: 700;
    box-shadow: 0 5px 0 #333;
    transform: translateY(-5px);
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
        /* background-color: ${(props) => props.$hover_color || blueColor[2]}; */
        box-shadow: 0 0px 0 #333;
        transform: translateY(0px);
        /* color: ${(props) => props.$hover_font_color || blueColor[0]}; */
    }
    &:active {
        background-color: ${(props) => props.$hover_color || blueColor[2]};
        color: ${(props) => props.$hover_font_color || blueColor[0]};
    }
`;

const PrimaryButton = ({ children, ...restProps }) => {
    return (
        <ButtonStyle
            {...restProps}
            $bc={blueColor[1]}
            $hover_color={blueColor[2]}
            $font_color={blueColor[4]}
            $hover_font_color={blueColor[0]}
        >
            {children}
        </ButtonStyle>
    );
};

const SecondaryButton = ({ children, ...restProps }) => {
    return (
        <ButtonStyle
            {...restProps}
            $bc={blueColor[3]}
            $hover_color={blueColor[2]}
            $font_color={blueColor[1]}
            $border={`2px solid #333`}
        >
            {children}
        </ButtonStyle>
    );
};

const IconButton = ({ children, ...restProps }) => {
    return (
        <ButtonStyle
            {...restProps}
            $bc={blueColor[0]}
            $font_color={blueColor[4]}
            $font_size={'20px'}
            $center={'center'}
            $hover_color={blueColor[1]}
            $hover_font_color={blueColor[3]}
            // $width={'40px'}
        >
            {children}
        </ButtonStyle>
    );
};

const Primary = PrimaryButton;
const Secondary = SecondaryButton;
const Icon = IconButton;

const Button = { Primary, Secondary, Icon };
export default Button;
