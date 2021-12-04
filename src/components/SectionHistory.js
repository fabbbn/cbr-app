import React from "react";
import GlobalStyles from "./styles/Global";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Table } from "react-bootstrap";
import { StyledSection } from "../components/styles/Global.style";
import { StyledTableHead, StyledTableHeadCol } from "../components/styles/Table.Style";

const SectionHistory = (props) => {
    const History = props.data;
    return(
        <>
        <GlobalStyles/>
        <Container className="row my-3 mx-auto">
            <h3>Hasil Pengujian</h3>
            { (History.length===0)? <div>Belum ada hasil perhitungan kemiripan dokumen</div>:
            <StyledSection bigger={true}>
                <Table striped bordered hover size="sm" responsive="md">
                    <StyledTableHead >
                        <tr className="align-top">
                            <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                            <StyledTableHeadCol scope="col" className="thead-sticky">Judul Dokumen Termirip</StyledTableHeadCol>
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
            }
        </Container>
        </>
    )
}

export default SectionHistory;