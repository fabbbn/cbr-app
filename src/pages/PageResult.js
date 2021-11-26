import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Form, Table } from "react-bootstrap";
import Head from "../components/Head";
import GlobalStyles from "../components/styles/Global";
import { StyledContainer, StyledImage, StyledSection } from "../components/styles/Global.style";
import { StyledTableHead, StyledTableHeadCol } from "../components/styles/Table.Style"
import { StyledForm, StyledFormGroup } from "../components/styles/Form.style";

const PageResult = (props) => {
    const data = {
        doc_data: [
            {col:"Judul Proposal", data:"Nulla exercitation est elit irure dolore officia ullamco ipsum irure nulla proident anim."},
            {col:"Nama Penulis", data:"Nulla exercitation est elit irure dolore officia ullamco ipsum irure nulla proident anim."},
            {col:"Tahun Proposal", data:"2020"},
            {col:"Alamat Email Ketua Tim", data:"null@null.com"},
            {col:"SINTA ID Ketua Tim", data:"Nulla exercitation est elit irure dolore officia ullamco ipsum irure nulla proident anim."},
            {col:"Jenis Ajuan", data:"Nulla exercitation est elit irure dolore officia ullamco ipsum irure nulla proident anim."},
            
            // "proposal_title": ,
            // "proposal_writer": "Nulla exercitation est elit irure dolore officia ullamco ipsum irure nulla proident anim.",
            // "proposal_year": 2020,
            // "proposal_email": "mail@null.com",
            // "proposal_type": "Penelitian",
            // "proposal_url": 'localhost:8000/download/file.pdf'
        ],
        doc_url:"localhost:8000/download/dummy.pdf",
        doc_parts: [
            {
                chapter: "JUDUL",
                text: "Ipsum minim pariatur nostrud est cillum laboris quis."
            },
            {
                chapter: "RANGKUMAN",
                text: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
            },
            {
                chapter: "LATAR BELAKANG",
                text: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
            },
            {
                chapter: "KAJIAN TEORI",
                text: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
            },
            {
                chapter: "METODE PENELITIAN",
                text: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
            }
        ],
        doc_pre_process: [
            {
                name:"Text Cleaning",
                result: "Mollit esse adipisicing non fugiat et eu Lorem irure in non nulla. Ut dolor consectetur dolore cillum quis excepteur Lorem sint aliquip incididunt consequat aliquip. Enim dolor ea tempor dolor id culpa dolor cillum reprehenderit adipisicing id ipsum. Magna deserunt aute id commodo dolore."
            },{
                name:"Text Case Folding",
                result: "Mollit esse adipisicing non fugiat et eu Lorem irure in non nulla. Ut dolor consectetur dolore cillum quis excepteur Lorem sint aliquip incididunt consequat aliquip. Enim dolor ea tempor dolor id culpa dolor cillum reprehenderit adipisicing id ipsum. Magna deserunt aute id commodo dolore."
            },{
                name:"Tokenisasi",
                result: "Mollit esse adipisicing non fugiat et eu Lorem irure in non nulla. Ut dolor consectetur dolore cillum quis excepteur Lorem sint aliquip incididunt consequat aliquip. Enim dolor ea tempor dolor id culpa dolor cillum reprehenderit adipisicing id ipsum. Magna deserunt aute id commodo dolore."
            },{
                name:"Stopword Removal",
                result: "Mollit esse adipisicing non fugiat et eu Lorem irure in non nulla. Ut dolor consectetur dolore cillum quis excepteur Lorem sint aliquip incididunt consequat aliquip. Enim dolor ea tempor dolor id culpa dolor cillum reprehenderit adipisicing id ipsum. Magna deserunt aute id commodo dolore.",
                note:"Stopwords Bahasa Indonesia yang digunakan adalah hasil penelitian oleh Tala (2003) dengan jumlah 758 stopwords."
            },{
                name:"Stemming",
                result: "Mollit esse adipisicing non fugiat et eu Lorem irure in non nulla. Ut dolor consectetur dolore cillum quis excepteur Lorem sint aliquip incididunt consequat aliquip. Enim dolor ea tempor dolor id culpa dolor cillum reprehenderit adipisicing id ipsum. Magna deserunt aute id commodo dolore.",
                note: "Stemming menggunakan Pustaka Sastrawi yang merupakan aplikasi dari penelitian stemming Bahasa Indonesia oleh Adriani et al. (2007)"
            },
        ],
        doc_weights: [
            { term: "first_row", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
            { term: "dummy", freq:32, idf: 0.8999, weight:28371},
        ],
        doc_cbr: [
            {
                step: "Retrieval",
                note: "Consequat nisi culpa commodo ex qui Lorem laboris deserunt irure eu minim. Pariatur elit sit eiusmod laborum laborum est eu aliquip velit adipisicing labore ad duis.",
                result: [
                    {
                        doc_title: "First row.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },{
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },
                ]
            },
            {
                step: "Reuse",
                note: "Reuse nisi culpa commodo ex qui Lorem laboris deserunt irure eu minim. Pariatur elit sit eiusmod laborum laborum est eu aliquip velit adipisicing labore ad duis.",
                result: [
                    {
                        doc_part_name: "Judul",
                        num_reused: 9
                    },
                    {
                        doc_part_name: "Rangkuman",
                        num_reused: 32
                    },
                    {
                        doc_part_name: "Latar Belakang",
                        num_reused: 22
                    },
                    {
                        doc_part_name: "Kajian Teori",
                        num_reused: 32
                    },
                    {
                        doc_part_name: "Metode Penelitian",
                        num_reused: 32
                    },
                ]
            },
            {
                step: "Revise",
                note: "Revise nisi culpa commodo ex qui Lorem laboris deserunt irure eu minim. Pariatur elit sit eiusmod laborum laborum est eu aliquip velit adipisicing labore ad duis.",
                result: [
                    {
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Judul",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },
                    {
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Rangkuman",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },
                    {
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Latar Belakang",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },
                    {
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Kajian Teori",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },
                    {
                        doc_title: "Eu excepteur consequat eu labore sint ullamco magna cillum.",
                        doc_part_name: "Metode Penelitian",
                        sim_doc_title: "Cillum irure officia veniam elit dolor.",
                        sim_doc_part_name: "Rangkuman",
                        cos_sim_value: 0.78
                    },
                ]
            },
            {
                step: "Retain",
                note: "Commodo aute aute culpa culpa adipisicing. Consectetur fugiat laborum est qui culpa id tempor dolor sit voluptate velit cupidatat."
            }
        ]
    }
    
    const history = [
        {
            doc_part_name: "Commodo irure nisi nostrud aute fugiat ex nulla do occaecat cupidatat exercitation dolore.",
            config: "Manning et al., 2008",
            num_retrieved: 231,
            num_reused: 42,
            cos_sim_value: 0.12,
            runtime: 39.88
        },
        {
            doc_part_name: "Commodo irure nisi nostrud aute fugiat ex nulla do occaecat cupidatat exercitation dolore.",
            config: "Manning et al., 2008",
            num_retrieved: 231,
            num_reused: 42,
            cos_sim_value: 0.12,
            runtime: 39.88
        }
    ]
    // handling props
    return (
        <>
        <GlobalStyles/>
        <div>
            <Head/>
            <Container className="row my-3 py-3 px-0 mx-auto">
                <h2>Hasil Deteksi Kemiripan Dokumen</h2>
                <Container className="col-6 mr-3">
                    {/* section detail dokumen */}
                    <StyledContainer>
                        <h4>Tentang Dokumen</h4>
                        <Table className="table-borderless">
                            {data.doc_data.map((row) => (
                                <tr className="align-top">
                                    <th>{row.col}</th>
                                    <td>{row.data}</td>
                                </tr>
                            ))}
                            <tr className="align-top">
                                <th >Dokumen Terunggah</th>
                                <td class="p-2row justify-content-left">
                                    <Button className="col-6" variant="link" href={data.doc_url}>Unduh Dokumen</Button>
                                </td>
                            </tr>
                        </Table>
                    </StyledContainer>
                    <StyledContainer>
                        <h4>Bagian Dokumen</h4>
                        <ol>
                            {data.doc_parts.map((part) => (
                                <StyledContainer>
                                    <h5><li>{part.chapter}</li></h5>
                                    <StyledSection>
                                        <p>{part.text}</p>
                                    </StyledSection>
                                </StyledContainer>
                            ))}
                        </ol>
                    </StyledContainer>
                    <StyledContainer>
                    <h4>Pra Pengolahan Dokumen</h4>
                        <ol>
                            {data.doc_pre_process.map((step) => (
                                <StyledContainer>
                                    <h5><li>{String(step.name)}</li></h5>
                                    <StyledSection>
                                        <p>{step.result}</p>
                                    </StyledSection>
                                </StyledContainer>
                            ))}
                        </ol>
                    </StyledContainer>
                </Container>
                <Container className="col-6 ml-3">
                    <StyledContainer>
                        <h4>Hasil Vektorisasi dan Deteksi Kemiripan dengan CBR</h4>
                        <StyledForm bsPrefix="one-line" className="row justify-content-between">
                        <h6>Konfigurasi</h6>
                            <StyledFormGroup className="col-7">
                                <Form.Select aria-label="-- Pilih Konfigurasi --" name="prop_type">
                                    <option>-- Pilih Konfigurasi --</option>
                                    <option value="manning">(1) Pembobotan dalam Manning et al., 2008</option>
                                    <option value="jiffriya">(2) Pembobotan dalam Jiffriya et al., 2014</option>
                                    <option value="xu">(3) Pembobotan dalam Xu et al., 2016</option>
                                    <option value="saptono">(4) Pembobotan dalam Saptono et al., 2018</option>
                                </Form.Select>
                            </StyledFormGroup>
                            <Button className="col-4" bsPrefix="custom-btn" type="submit">Proses Dokumen</Button>
                        </StyledForm>
                        <h5>Hasil Pembobotan</h5>
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
                                    {data.doc_weights.map((row) => (
                                        <tr>
                                            <td>{row.term}</td>
                                            <td>{row.freq}</td>
                                            <td>{row.idf}</td>
                                            <td>{row.weight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </StyledSection>
                        <p>Formula TF-IDF yang digunakan (berdasarkan konfigurasi)</p>
                        <StyledImage className="center" src={"manning.svg"} alt={"Formula TF-IDF"}></StyledImage>
                    </StyledContainer>
                    <StyledContainer>
                        <h4>Hasil Metode CBR</h4>
                        <ol>
                            <StyledContainer>
                                <h5><li>{data.doc_cbr[0].step}</li></h5>
                                <p>{data.doc_cbr[0].note}</p>
                                <StyledSection bigger={true}>
                                    <Table striped bordered hover size="sm" responsive="md">
                                        <StyledTableHead >
                                            <tr>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Judul Dokumen Mirip</StyledTableHeadCol>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Mirip</StyledTableHeadCol>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Nilai Cosine Similarity</StyledTableHeadCol>
                                            </tr>
                                        </StyledTableHead>
                                        <tbody>
                                            {data.doc_cbr[0].result.map((row) => (
                                                <tr>
                                                    <td>{row.doc_part_name}</td>
                                                    <td>{row.sim_doc_title}</td>
                                                    <td>{row.sim_doc_part_name}</td>
                                                    <td>{row.cos_sim_value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </StyledSection>
                            </StyledContainer>
                            <StyledContainer>
                                <h5><li>{data.doc_cbr[1].step}</li></h5>
                                <p>{data.doc_cbr[1].note}</p>
                                <StyledSection bigger={true}>
                                    <Table striped bordered hover size="sm" responsive="md">
                                        <StyledTableHead >
                                            <tr>
                                            <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Jumlah Bagian Dokumen di atas Threshold</StyledTableHeadCol>
                                            </tr>
                                                
                                        </StyledTableHead>
                                        <tbody>
                                            {data.doc_cbr[1].result.map((row) => (
                                                <tr>
                                                    <td>{row.doc_part_name}</td>
                                                    <td className="text-senter">{row.num_reused}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </StyledSection>
                            </StyledContainer>
                            <StyledContainer>
                                <h5><li>{data.doc_cbr[2].step}</li></h5>
                                <p>{data.doc_cbr[2].note}</p>
                                <StyledSection bigger={true}>
                                    <Table striped bordered hover size="sm" responsive="md">
                                        <StyledTableHead >
                                            <tr>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Judul Dokumen Mirip</StyledTableHeadCol>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Mirip</StyledTableHeadCol>
                                                <StyledTableHeadCol scope="col" className="thead-sticky">Nilai Cosine Similarity</StyledTableHeadCol>
                                            </tr>
                                        </StyledTableHead>
                                        <tbody>
                                            {data.doc_cbr[2].result.map((row) => (
                                                <tr>
                                                    <td>{row.doc_part_name}</td>
                                                    <td>{row.sim_doc_title}</td>
                                                    <td>{row.sim_doc_part_name}</td>
                                                    <td>{row.cos_sim_value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </StyledSection>
                            </StyledContainer>
                            <StyledContainer>
                                <h5><li>{data.doc_cbr[3].step}</li></h5>
                                <p>{data.doc_cbr[3].note}</p>
                            </StyledContainer>
                        </ol>
                    </StyledContainer>
                    <StyledContainer>
                        <h4>Hasil Pengujian</h4>
                        <StyledSection bigger={true}>
                        <Table striped bordered hover size="sm" responsive="md">
                                <StyledTableHead >
                                    <tr className="align-top">
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Bagian Dokumen Uji</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Konfigurasi</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Jumlah Dokumen Retrieved</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Jumlah Dokumen Reused</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Nilai Cosine Similarity</StyledTableHeadCol>
                                        <StyledTableHeadCol scope="col" className="thead-sticky">Waktu Komputasi (s)</StyledTableHeadCol>
                                    </tr>
                                </StyledTableHead>
                                <tbody>
                                    {history.map((row) => (
                                        <tr>
                                            <td>{row.doc_part_name}</td>
                                            <td>{row.config}</td>
                                            <td>{row.num_retrieved}</td>
                                            <td>{row.num_reused}</td>
                                            <td>{row.cos_sim_value}</td>
                                            <td>{row.runtime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </StyledSection>
                    </StyledContainer>
                </Container>
            </Container>
        </div>
        </>
    )
}

export default PageResult;