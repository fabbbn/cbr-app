import React from "react";
import GlobalStyles from "./styles/Global";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import { StyledContainer, StyledSection } from "../components/styles/Global.style";
import { StyledTableHead, StyledTableHeadCol } from "../components/styles/Table.Style";


const SectionWeighting = (props) => {
    const Result = props.data;
    const Config = props.config;
    return (
        <>
        <GlobalStyles/>
            <h5>Hasil Pembobotan</h5>
            { (Config.value==='')? <div>Silahkan pilih konfigurasi lalu klik <b>"Proses Dokumen"</b></div> : <></> } 
            { (Result.weightedItems.length===0)? <></> : 
                <ol>
                    { Result.weightedItems.map((part, index) => (
                        <StyledContainer key={index}>
                            <h6><li>{part.chapter}</li></h6>
                            <StyledSection bigger={true}>
                                <Table striped bordered hover size="sm" responsive="md">
                                    <StyledTableHead >
                                        <tr>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Term/Kata</StyledTableHeadCol>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">TF</StyledTableHeadCol>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">IDF</StyledTableHeadCol>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">W = TF x IDF</StyledTableHeadCol>
                                        </tr>
                                    </StyledTableHead>
                                    <tbody>
                                        {part.data.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.token}</td>
                                                <td>{row.frequency}</td>
                                                <td>{row.idf}</td>
                                                <td>{row.weight}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </StyledSection>
                            <p className="mb-2"><i>Total term/kata dalam bagian dokumen: {part.data.length} kata</i></p>
                        </StyledContainer>
                    ))}
                </ol>
            }
        </>
    )
}

export default SectionWeighting;