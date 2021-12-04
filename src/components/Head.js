import React from "react";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { StyledLink, StyledImage } from './styles/Global.style'
import { StyledHead } from './styles/Head.style';
import logo from '../assets/img/unsri.png';


const Head = () => {
    return(
        <StyledHead>
            <Navbar className="row" variant="dark" fixed>
                <NavbarBrand className="col-4">
                    <StyledImage src={logo}/>
                    <StyledImage src={logo}/>
                    <StyledImage src={logo}/>
                </NavbarBrand>
                <Nav className="col-8 justify-content-end" activeKey='/'>
                    <Nav.Item>
                        <Nav.Link as={StyledLink} to="/" >Masukkan Data</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </StyledHead>
    )
}

export default Head;