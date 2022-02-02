import React from "react";
import GlobalStyles from "./styles/Global";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table } from "react-bootstrap";
import { StyledContainer, StyledSection } from "../components/styles/Global.style";
import { StyledTableHead, StyledTableHeadCol } from "../components/styles/Table.Style";

const SectionHistory = (props) => {
    const History = props.data;
    const Headers = [
        { label: 'Bagian Dokumen Uji', key: 'doc_part_name'},
        { label: 'Judul Dokumen Termirip', key: 'doc_title'},
        { label: 'Bagian Dokumen Termirip', key: 'sim_doc_part_name'},
        { label: 'Jumlah Dokumen Retrieved', key: 'n_of_retrieved'},
        { label: 'Jumlah Dokumen Reused', key: 'n_of_reused'},
        { label: 'Nilai Cosine Similarity', key: 'cos_sim_value'},
        { label: 'Konfigurasi', key: 'config_used'},
        { label: 'Waktu Komputasi (s)', key: 'exc_time'},

    ]
    return(
        <>
        <GlobalStyles/>
        <Container className="row my-3 mx-auto">
            <h3>Hasil Pengujian</h3>
            { (History.length===0)? <div>Belum ada hasil perhitungan kemiripan dokumen</div>:
            <StyledContainer>
                <StyledSection bigger={true}>
                    <Table striped bordered hover size="sm" responsive="md">
                        <StyledTableHead >
                            <tr className="align-top">
                                <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                                <StyledTableHeadCol scope="col" className="thead-sticky">Judul Dokumen Termirip</StyledTableHeadCol>
                                <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Termirip</StyledTableHeadCol>
                                <StyledTableHeadCol scope="col" className="thead-sticky">Jumlah Dokumen <i>Retrieved</i></StyledTableHeadCol>
                                <StyledTableHeadCol scope="col" className="thead-sticky">Jumlah Dokumen <i>Reused</i></StyledTableHeadCol>
                                <StyledTableHeadCol scope="col" className="thead-sticky">Nilai <i>Cosine Similarity</i></StyledTableHeadCol>
                                <StyledTableHeadCol scope="col" className="thead-sticky">Konfigurasi</StyledTableHeadCol>
                                <StyledTableHeadCol scope="col" className="thead-sticky">Waktu Komputasi (s)</StyledTableHeadCol>
                            </tr>
                        </StyledTableHead>
                        { History.map((hist, idx) => (
                        <tbody>
                            { hist.map((row, i) => (
                                <tr key={i}>
                                    <th>{row.doc_part_name}</th>
                                    <td><a href={`http://localhost:8000/download/${row.doc_filename}`}>{row.doc_title}</a></td>
                                    <td>{row.sim_doc_part_name}</td>
                                    <td>{row.n_of_retrieved}</td>
                                    <td>{row.n_of_reused}</td>
                                    <td>{row.cos_sim_value}</td>
                                    <td>{row.config_used}</td>
                                    <td>{row.exc_time}</td>
                                </tr>
                                )
                            )}
                        </tbody>
                        ))}
                    </Table>
                </StyledSection>
            </StyledContainer>
            }
            
        </Container>
        </>
    )
}

export default SectionHistory;