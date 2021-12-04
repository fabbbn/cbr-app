import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, ButtonGroup, Container, Table } from "react-bootstrap";
import GlobalStyles from "../components/styles/Global";
import { StyledContainer, StyledSection } from "../components/styles/Global.style";
import { StyledTableHead, StyledTableHeadCol } from "../components/styles/Table.Style";

const SectionResult = (props) => {
    const link = "https://www.researchgate.net/publication/326305612_Combination_of_Cosine_Similarity_Method_and_Conditional_Probability_for_Plagiarism_Detection_in_the_Thesis_Documents_Vector_Space_Model";
    const isObjectEmpty = (obj) => {
        for ( var i in obj ) return false;
        return true;
    }
    const Config = props.config;
    const Result = props.data;
    const [PartView, setPartView] = useState(0); //using index
    const [PartViewItems, setPartViewItems] = useState(props.data.reusedItems[PartView]);
    useEffect(() => {
        console.log(PartView)
        setPartViewItems(
            props.data.reusedItems[PartView]
        )
    }, [PartView]);

    return(
        <>
        <GlobalStyles/>
        <Container className="row my-3 mx-auto">
            <h3>Hasil Deteksi Kemiripan Dokumen dengan CBR</h3>
            { (Config.value==='')? <div>Silahkan pilih konfigurasi lalu klik <b>"Proses Dokumen"</b></div> : <></> }
            
            <ol>
                <Container>
                    <h4><li>Retrieval</li></h4>
                    <p>Pada tahap ini dihimpun semua nilai kemiripan dokumen masukan dengan semua basis kasus.</p>
                    { (Result.retrievedItems.length===0)? <></> :
                        <ol type="a">
                            { Result.retrievedItems.map((part, index) => (
                                <StyledContainer key={index}>
                                    <h5><li>{part.chapter}</li></h5>
                                    <StyledSection bigger={true}>
                                        <Table striped bordered hover size="sm" responsive="md">
                                            <StyledTableHead>
                                                <tr>
                                                    <StyledTableHeadCol scope="col" className="thead-sticky">Judul Dokumen Mirip</StyledTableHeadCol>
                                                    <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Mirip</StyledTableHeadCol>
                                                    <StyledTableHeadCol scope="col" className="thead-sticky">Nilai <i>Cosine Similarity</i></StyledTableHeadCol>
                                                    <StyledTableHeadCol scope="col" className="thead-sticky">Aksi</StyledTableHeadCol>
                                                </tr>
                                            </StyledTableHead>
                                            <tbody>
                                                {part.data.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.doc_title}</td>
                                                        <td>{row.sim_doc_part_name}</td>
                                                        <td>{row.cos_sim_value}</td>
                                                        <td><a href={`http://localhost:8000/download/${row.doc_filename}`}>Unduh</a></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </StyledSection>
                                    <p><i>Total bagian dokumen yang diambil kembali (retrieved): {part.data.length} bagian dokumen</i></p>
                                </StyledContainer>
                            ))}
                        </ol>
                    }
                </Container>
                <Container>
                    <h4><li>Reused</li></h4>
                    <p>Pada tahap ini diambil hanya kandidat bagian dokumen termirip dengan nilai <i>cosine similrity</i> diatas <i>Threshold</i></p>
                    <p>
                        <i>
                            Threshold = 0.2 <a href={link} target="_blank" rel="noopener noreferrer">(Saptono et. al., 2018)</a>
                        </i>
                    </p>
                    { (Result.reusedItems.length===0)? <div>Sedang melakukan perhitungan...</div> :
                    <div className="justify-content-center">
                        <Container className="col-6 py-2">
                            <Table striped bordered hover size="sm" responsive="md">
                                <StyledTableHead>
                                    <tr>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Jumlah Bagian Dokumen Mirip diatas Nilai <i>Threshold</i></StyledTableHeadCol>
                                    </tr>
                                </StyledTableHead>
                                <tbody>
                                    {Result.reusedItems.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.chapter}</td>
                                            <td>{row.data.length}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                        <Container className="col-8 my-3">
                            <ButtonGroup className="d-flex">
                                { Result.reusedItems.map((part, index) => (
                                    <Button key={index} variant="secondary" onClick={()=> setPartView(index)}>{part.chapter}</Button>
                                ))}
                            </ButtonGroup>
                        </Container> 
                        { isObjectEmpty(PartViewItems) ? <></> : 
                        <Container className="col-10">
                            <h5 className="text-center">{PartViewItems.chapter}</h5>
                            <StyledSection>
                                <Table striped bordered hover size="sm" responsive="md">
                                    <StyledTableHead>
                                        <tr>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Judul Dokumen Mirip</StyledTableHeadCol>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Mirip</StyledTableHeadCol>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Nilai <i>Cosine Similarity</i></StyledTableHeadCol>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Aksi</StyledTableHeadCol>
                                        </tr>
                                    </StyledTableHead>
                                    <tbody>
                                        {PartViewItems.data.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.doc_title}</td>
                                                <td>{row.sim_doc_part_name}</td>
                                                <td>{row.cos_sim_value}</td>
                                                <td><a href={`http://localhost:8000/download/${row.doc_filename}`}>Unduh</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </StyledSection>
                            <p><i>Total bagian dokumen yang tersaring (reused): {PartViewItems.data.length} bagian dokumen</i></p>
                        </Container>
                        }
                    </div>
                    }
                </Container>
                <Container>
                    <h4><li>Revise</li></h4>
                    <p>Pada tahap ini dirangkum hasil pencarian dokumen termirip dengan menampilkan bagian dokumen dengan pasangan dokumen termirip yang ditemukan di dalam repositori</p>
                    { (Result.reusedItems.length===0) ? <div>Sedang melakukan perhitungan...</div> : 
                    <StyledContainer>
                        <center><h6>Rangkuman Hasil Deteksi</h6></center>
                        <StyledSection bigger={true}>
                            <Table striped bordered hover size="sm" responsive="md">
                                <StyledTableHead>
                                    <tr>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Judul Dokumen Mirip</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Mirip</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Nilai <i>Cosine Similarity</i></StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Aksi</StyledTableHeadCol>
                                    </tr>
                                </StyledTableHead>
                                <tbody>
                                    { Result.reusedItems.map((part, index) => (
                                    <tr>
                                        <td key={index}> {part.data[0].doc_title} </td>
                                        <td> { part.data[0].sim_doc_part_name} </td>
                                        <td> { part.data[0].cos_sim_value} </td>
                                        <td><a href={`http://localhost:8000/download/${part.data[0].doc_filename}`}>Unduh</a></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </StyledSection>
                    </StyledContainer>
                    }
                </Container>
                <Container>
                    <h4><li>Retain</li></h4>
                    <p>Data akhir yang diperoleh dari tahap revise dimasukkan ke dalam basis data sebagai basis kasus selanjutnya.</p>
                </Container>
            </ol>
        </Container>
        </>
    )
}

export default SectionResult;