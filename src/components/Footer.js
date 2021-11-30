import { StyledFooter } from "./styles/Footer.style";

import { Container, Image } from "react-bootstrap";

const Footer = () => {
    return (
        <div>
            <StyledFooter>
                <Container className="p-3 my-auto">
                    <p>&copy; Copyright Nabila Febriyanti 2021</p>
                    <p>Deteksi Kemiripan Antar Dokumen dengan Metode <i>Case Based Reasoning</i></p>
                    <p>(Studi Kasus SIMNG LPPM Universitas Sriwijaya)</p>
                </Container>
                <Image src={"Devices-bro.svg"}/>
            </StyledFooter>
        </div>
    )
}

export default Footer