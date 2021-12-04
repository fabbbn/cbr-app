import React from "react";
import GlobalStyles from "./styles/Global";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from "react-bootstrap";

const SectionAboutDocument = (props) => {
    const MetaData = props.data;
    return (
        <>
        <GlobalStyles/>
            <Table className="table-borderless">
                <tbody>
                    <tr className="align-top">
                        <th>Judul Proposal</th>
                        <td>{MetaData.proposal_title}</td>
                    </tr>
                    <tr className="align-top">
                        <th>Nama Penulis</th>
                        <td>{MetaData.proposal_writer}</td>
                    </tr>
                    <tr className="align-top">
                        <th>Tahun Proposal</th>
                        <td>{MetaData.proposal_year}</td>
                    </tr>
                    <tr className="align-top">
                        <th>Alamat Email Ketua Tim</th>
                        <td><a className="m-0 p-0" href={"mailto:"+MetaData.proposal_email}>{MetaData.proposal_email}</a></td>
                    </tr>
                    <tr className="align-top">
                        <th>SINTA ID Ketua Tim</th>
                        <td>{MetaData.proposal_sintaid}</td>
                    </tr>
                    <tr className="align-top">
                        <th>Jenis Ajuan</th>
                        <td>{MetaData.proposal_type}</td>
                    </tr>
                    <tr className="align-top">
                        <th >Dokumen Terunggah</th>
                        <td className="p-2 row justify-content-left">
                            <a className="m-0 col-6" as={Button} variant="link" href={`http://localhost:8000/download/${MetaData.proposal_doc_link}`} download>Unduh Dokumen</a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default SectionAboutDocument;