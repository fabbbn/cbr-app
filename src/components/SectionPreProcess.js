import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Table } from "react-bootstrap";
import GlobalStyles from "../components/styles/Global";
import { StyledContainer, StyledSection } from "../components/styles/Global.style";
import { StyledTableHead, StyledTableHeadCol } from "../components/styles/Table.Style"

const SectionPreProcess = (props) => {
    return(
        <>
        <GlobalStyles/>
        <Container className="col-6 mr-3">
            <StyledContainer>
                <h4>Bagian Dokumen</h4>
                {(props.data.doc_parted.length===0)? <div>Sedang dimuat...</div>: 
                    <ol>
                        {props.data.doc_parted.map((part, i) => (
                            <StyledContainer key={i}>
                                <h5><li >{part.chapter}</li></h5>
                                <StyledSection>
                                    <p>{part.text}</p>
                                </StyledSection>
                            </StyledContainer>
                        ))}
                    </ol>
                }
            </StyledContainer>
            <StyledContainer>
            <h4>Pra Pengolahan Dokumen</h4>
            {(props.data.doc_pre_processed.length===0)? <div>Sedang dimuat...</div> : 
                <ol>
                    {props.data.doc_pre_processed.map((step, i) => (
                        <StyledContainer key={i}>
                            <h5><li>{String(step.title)}</li></h5>
                            <StyledSection bigger={true}>
                                {/* <p>{"... "+(step.result[2].content)+" ..."}</p> */}
                                <Table striped bordered hover size="sm" responsive="md">
                                    <StyledTableHead >
                                        <tr>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Hasil Pemrosesan</StyledTableHeadCol>
                                        </tr>
                                    </StyledTableHead>
                                    <tbody>
                                        {step.result.map((row, i) => (
                                            <tr key={i}>
                                                <th>{row.title}</th>
                                                <td>{row.content}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </StyledSection>
                        </StyledContainer>
                    ))}
                </ol>
            }
            </StyledContainer>
        </Container>
        </>
    )
}

export default SectionPreProcess;