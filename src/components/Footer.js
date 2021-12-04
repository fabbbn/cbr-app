import { StyledFooter } from "./styles/Footer.style";

import { Container, Image } from "react-bootstrap";

import img from '../assets/img/Devices-bro.svg';

const Footer = () => {
    return (
        <div>
            <StyledFooter>
                <Container className="p-3 my-auto">
                    <p>&copy; Copyright Nabila Febriyanti 2021</p>
                    <p>Deteksi Kemiripan Antar Dokumen dengan Metode <i>Case Based Reasoning</i></p>
                    <p>(Studi Kasus SIMNG LPPM Universitas Sriwijaya)</p>
                </Container>
                {/* <Image src={require("../assets/img/Devices-bro.svg")}/> */}
                <Image src={img}/>
            </StyledFooter>
        </div>
    )
}

export default Footer