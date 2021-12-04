import React from "react";
import{ 
    Head, 
    Footer, 
    FormFormatted 
} from "../components/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Container,
    Image
} from "react-bootstrap";
import GlobalStyles from "../components/styles/Global";
import img from '../assets/img/Documents-bro.svg';

const PageInput = () => {

    return(
        <>
        <GlobalStyles/>
        <div>
            <Head logo={'unsri.png'}/>
            <Container className="row my-5 mx-auto">
                <Container className="col-6 mr-2 border justify-content-center">
                    <FormFormatted/>
                </Container>
                <Container className="col-6 ml-2 my-auto">
                    <Image src={img} className="mx-auto d-block" alt="..."/>
                </Container>
            </Container>
            <Footer/>
        </div>
        </>
    )
}

export default PageInput;
