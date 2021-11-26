import React from "react"
import Head from "../components/Head";
// import { StyledButton } from "../components/styles/Global.style";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Button,
    Container,
    Form,
    Image
} from "react-bootstrap";
import { StyledForm, StyledFormGroup } from "../components/styles/Form.style";
import GlobalStyles from "../components/styles/Global";

const PageInput = () => {
    return (
        <>
        <GlobalStyles/>
        <div>
            <Head logo={'unsri.png'}/>
            <Container className="row my-5 mx-auto">
                <Container className="col-6 mr-2 border justify-content-center">
                    
                    <StyledForm action="">
                    <h3>Formulir Dokumen Masukan</h3>
                        <StyledFormGroup>
                            <Form.Label>Judul Proposal</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Judul Proposal" name="prop_title"/>
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <Form.Label>Nama Penulis</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Nama Penulis (Dipisah dengan koma)" name="prop_writer"/>
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <Form.Label>Tahun Proposal</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Tahun Proposal" name="prop_year"/>
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <Form.Label>Jenis Ajuan</Form.Label>
                            <Form.Select aria-label="Pilih Jenis Ajuan" name="prop_type">
                                <option>Pilih Jenis Ajuan</option>
                                <option value="Penelitian">Penelitian</option>
                                <option value="Pengabdian">Pengabdian</option>
                            </Form.Select>
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <Form.Label>Alamat Email Ketua Tim</Form.Label>
                            <Form.Control type="email" placeholder="Masukkan Alamat Email Ketua Tim" name="prop_email"/>
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <Form.Label>SINTA ID Ketua Tim</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan SINTA ID Ketua Tim" name="prop_sintaid"/>
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <Form.Label>Unggah Dokumen</Form.Label>
                            <Form.Control type="file" name="prop_doc" accept=".pdf"/>
                        </StyledFormGroup>
                        <Container className="row justify-content-center mt-3">
                            <Button className="col-5" bsPrefix="custom-btn" type="submit">Proses Dokumen</Button>
                            <Button className="col-5" bsPrefix="custom-btn-inv" type="reset">Batal</Button>
                        </Container>
                    </StyledForm>
                </Container>
                <Container className="col-6 ml-2">
                    <Image src="Documents-bro.svg" class="mx-auto d-block" alt="..."/>
                </Container>
            </Container>
        </div>
        </>
    )
}

export default PageInput;
