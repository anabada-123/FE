import React from 'react';
import { styled } from 'styled-components';
import { blueColor, BLUE_COLOR, YELLOW_COLOR } from '../../../assets/colors';
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
    height: 40px;
    padding: ${(props) => props.$padding || `0 20px;`};
    margin: 8px;
    background-color: ${(props) => props.$bc || BLUE_COLOR.Lavender};
    border-radius: 15px;
    color: #000;
    border: ${(props) => props.$border || `2px solid #333`};
    display: flex;
    justify-content: ${(props) => props.$center || `space-between`};
    align-items: center;
    white-space: nowrap;
    gap: 20px;
    font-size: ${(props) => props.$font_size || '1.1rem'};
    font-weight: 700;
    box-shadow: 0 5px 0 #333;
    transform: translateY(-5px);
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0px 0 #333;
        transform: translateY(0px);
    }
    &:active {
        background-color: ${(props) => props.$active_color || blueColor[2]};
    }
`;

const PrimaryButton = ({ children, ...restProps }) => {
    return (
        <ButtonStyle
            {...restProps}
            $bc={blueColor[1]}
            $active_color={blueColor[2]}
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
            $bc={YELLOW_COLOR[0]}
            $active_color={YELLOW_COLOR[2]}
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
            $active_color={blueColor[1]}
            $width={'40px'}
            $padding={'none'}
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
