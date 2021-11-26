import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledImage = styled.img`
    height: ${({size})=> size || '40px'};
    width: ${({size})=> size || '40px'};
    padding: 10px;
    object-fit: contain;
    .center{
        margin: 0 auto;
    }
`

export const StyledLink = styled(Link)`
    display: inline-block;
    width: 150px;
    height: 40px;
    text-align: center;
    line-height: 20px;
    margin: 10px 40px;
    cursor: pointer;
    transition: 0.15s;
    color: white;
    background-color: #50453D;
    &:hover {
        opacity:0.9;
        transform: scale(0.98);
    }
`

export const StyledContainer = styled.div`
    margin: 0px;
    padding: 20px opx;
`

export const StyledSection = styled.div`
    margin: 10px 0;
    padding-left: 10px;
    width: 100%;
    max-height: ${({bigger}) => (bigger)? "20rem":"8rem" || "8rem"};
    overflow-y: auto;
    border: 0.5px solid lightgrey;
`

