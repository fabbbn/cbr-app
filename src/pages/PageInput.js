import React, { Component } from "react";
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
import { Redirect } from "react-router";

class PageInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            issubmitted:false,
            prop_title: '',
            prop_writer: '',
            prop_year: '',
            prop_type: '',
            prop_email: '',
            prop_sintaid: '',
            prop_doc:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state)
        const submit_url = 'http://localhost:8000/submit-form';
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        formData.append("prop_title", this.state.prop_title);
        formData.append("prop_writer", this.state.prop_writer);
        formData.append("prop_year", this.state.prop_year);
        formData.append("prop_type", this.state.prop_type);
        formData.append("prop_email", this.state.prop_email);
        formData.append("prop_sintaid", this.state.prop_sintaid);
        formData.append("prop_doc", fileField.files[0]);
        
        
        const response = await fetch(
            submit_url, {
                method: 'POST',
                mode: 'cors',
                body: formData
            }
        ).then(res => {
            res.json().then(response => {
                if (response.status === 'ok') {
                    alert("Unggah berkas sukses");
                    console.log(response);
                }
            });
        }).catch(error => {
            alert("Unggah berkas gagal, silahkan periksa kembali formulir masukan anda")
            console.log(error);
        });
    }



    render() {
        const {
            prop_title,
            prop_writer,
            prop_year,
            prop_type,
            prop_email,
            prop_sintaid,
            prop_doc
        } = this.state;
        return(
            <>
            <GlobalStyles/>
            <div>
                <Head logo={'unsri.png'}/>
                <Container className="row my-5 mx-auto">
                    <Container className="col-6 mr-2 border justify-content-center">
                        <StyledForm onSubmit={this.handleSubmit}>
                        <h3>Formulir Dokumen Masukan</h3>
                            <StyledFormGroup>
                                <Form.Label>Judul Proposal</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Masukkan Judul Proposal" 
                                    name="prop_title" 
                                    value={prop_title}
                                    onChange={this.handleChange}
                                />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <Form.Label>Nama Penulis</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Masukkan Nama Penulis (Dipisah dengan koma)" 
                                    name="prop_writer" 
                                    value={prop_writer}
                                    onChange={this.handleChange}
                                />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <Form.Label>Tahun Proposal</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Masukkan Tahun Proposal" 
                                    name="prop_year" 
                                    value={prop_year}
                                    onChange={this.handleChange}
                                />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <Form.Label>Jenis Ajuan</Form.Label>
                                <Form.Select aria-label="Pilih Jenis Ajuan" name="prop_type" value={prop_type} onChange={this.handleChange}>
                                    <option value="">Pilih Jenis Ajuan</option>
                                    <option value="Penelitian">Penelitian</option>
                                    <option value="Pengabdian">Pengabdian</option>
                                </Form.Select>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <Form.Label>Alamat Email Ketua Tim</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Masukkan Alamat Email Ketua Tim" 
                                    name="prop_email" 
                                    value={prop_email}
                                    onChange={this.handleChange}
                                />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <Form.Label>SINTA ID Ketua Tim</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Masukkan SINTA ID Ketua Tim" 
                                    name="prop_sintaid" 
                                    value={prop_sintaid}
                                    onChange={this.handleChange}
                                />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <Form.Label>Unggah Dokumen</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    name="prop_doc" 
                                    accept=".pdf" 
                                    value={prop_doc}
                                    onChange={this.handleChange}
                                />
                            </StyledFormGroup>
                            <Container className="row justify-content-center mt-3">
                                <Button className="col-5" bsPrefix="custom-btn" type="submit">Proses Dokumen</Button>
                                <Button className="col-5" bsPrefix="custom-btn-inv" type="reset">Batal</Button>
                            </Container>
                        </StyledForm>
                    </Container>
                    <Container className="col-6 ml-2 my-auto">
                        <Image src="Documents-bro.svg" class="mx-auto d-block" alt="..."/>
                    </Container>
                </Container>
            </div>
            { (this.state.issubmitted == true) ?
                <Redirect to={
                    {
                        pathname: "/hasil/",
                        state: {}
                    }
                } />
            : <></>}
            </>
        )
    }
}
// const PageInput = () => {
//     return (
//         <>
//         <GlobalStyles/>
//         <div>
//             <Head logo={'unsri.png'}/>
//             <Container className="row my-5 mx-auto">
//                 <Container className="col-6 mr-2 border justify-content-center">
                    
//                     <StyledForm action="">
//                     <h3>Formulir Dokumen Masukan</h3>
//                         <StyledFormGroup>
//                             <Form.Label>Judul Proposal</Form.Label>
//                             <Form.Control type="text" placeholder="Masukkan Judul Proposal" name="prop_title"/>
//                         </StyledFormGroup>
//                         <StyledFormGroup>
//                             <Form.Label>Nama Penulis</Form.Label>
//                             <Form.Control type="text" placeholder="Masukkan Nama Penulis (Dipisah dengan koma)" name="prop_writer"/>
//                         </StyledFormGroup>
//                         <StyledFormGroup>
//                             <Form.Label>Tahun Proposal</Form.Label>
//                             <Form.Control type="text" placeholder="Masukkan Tahun Proposal" name="prop_year"/>
//                         </StyledFormGroup>
//                         <StyledFormGroup>
//                             <Form.Label>Jenis Ajuan</Form.Label>
//                             <Form.Select aria-label="Pilih Jenis Ajuan" name="prop_type">
//                                 <option>Pilih Jenis Ajuan</option>
//                                 <option value="Penelitian">Penelitian</option>
//                                 <option value="Pengabdian">Pengabdian</option>
//                             </Form.Select>
//                         </StyledFormGroup>
//                         <StyledFormGroup>
//                             <Form.Label>Alamat Email Ketua Tim</Form.Label>
//                             <Form.Control type="email" placeholder="Masukkan Alamat Email Ketua Tim" name="prop_email"/>
//                         </StyledFormGroup>
//                         <StyledFormGroup>
//                             <Form.Label>SINTA ID Ketua Tim</Form.Label>
//                             <Form.Control type="text" placeholder="Masukkan SINTA ID Ketua Tim" name="prop_sintaid"/>
//                         </StyledFormGroup>
//                         <StyledFormGroup>
//                             <Form.Label>Unggah Dokumen</Form.Label>
//                             <Form.Control type="file" name="prop_doc" accept=".pdf"/>
//                         </StyledFormGroup>
//                         <Container className="row justify-content-center mt-3">
//                             <Button className="col-5" bsPrefix="custom-btn" type="submit">Proses Dokumen</Button>
//                             <Button className="col-5" bsPrefix="custom-btn-inv" type="reset">Batal</Button>
//                         </Container>
//                     </StyledForm>
//                 </Container>
//                 <Container className="col-6 ml-2 my-auto">
//                     <Image src="Documents-bro.svg" class="mx-auto d-block" alt="..."/>
//                 </Container>
//             </Container>
//         </div>
//         </>
//     )
// }

export default PageInput;
