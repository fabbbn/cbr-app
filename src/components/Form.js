import React, { useState } from "react";
import { StyledForm, StyledFormGroup } from "./styles/Form.style";
import { 
    Button,
    Container,
    Form
} from "react-bootstrap";
import { Redirect } from "react-router";

const FormFormatted = () => {
    const [Data, setData] = useState({
        isSubmitted:false,
        prop_title: '',
        prop_writers: '',
        prop_year: '',
        prop_type: '',
        prop_email: '',
        prop_sintaid: '',
        prop_doc:'',
        data_input: null
    })

    const handleChange = (e) => {
        setData(
            {...Data, [e.target.name] : [e.target.value]}
        )
    }

    const handleReset = (e) => {
        setData({
            issubmitted:false,
            prop_title: '',
            prop_writers: '',
            prop_year: '',
            prop_type: '',
            prop_email: '',
            prop_sintaid: '',
            prop_doc:''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submit_url = 'http://localhost:8000/submit-form';
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        formData.append("prop_title", Data.prop_title);
        formData.append("prop_writers", Data.prop_writers);
        formData.append("prop_year", Data.prop_year);
        formData.append("prop_type", Data.prop_type);
        formData.append("prop_email", Data.prop_email);
        formData.append("prop_sintaid", Data.prop_sintaid);
        formData.append("prop_doc", fileField.files[0]);
        const res = await fetch(
            submit_url, {
                method: 'POST',
                body: formData
            }
        ).then(
            response => response.json()
        ).then(res => {
            alert("Unggah berkas berhasil, akan mengarahkan anda ke halaman hasil...");
            console.log(res);
            setData({
                isSubmitted:true,
                data_input:res
            });            
        }).catch(error => {
            alert("Unggah berkas gagal, silahkan periksa kembali formulir masukan anda");
            console.log(error);
        });
    }
    return(
        <>
        <StyledForm onSubmit={handleSubmit} >
        <h3>Formulir Dokumen Masukan</h3>
            <StyledFormGroup>
                <Form.Label>Judul Proposal</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Masukkan Judul Proposal" 
                    name="prop_title" 
                    value={Data.prop_title}
                    onChange={handleChange}
                />
            </StyledFormGroup>
            <StyledFormGroup>
                <Form.Label>Nama Penulis</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Masukkan Nama Penulis (Dipisah dengan koma)" 
                    name="prop_writers" 
                    value={Data.prop_writers}
                    onChange={handleChange}
                />
            </StyledFormGroup>
            <StyledFormGroup>
                <Form.Label>Tahun Proposal</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Masukkan Tahun Proposal" 
                    name="prop_year" 
                    value={Data.prop_year}
                    onChange={handleChange}
                />
            </StyledFormGroup>
            <StyledFormGroup>
                <Form.Label>Jenis Ajuan</Form.Label>
                <Form.Select aria-label="Pilih Jenis Ajuan" name="prop_type" value={Data.prop_type} onChange={handleChange}>
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
                    value={Data.prop_email}
                    onChange={handleChange}
                />
            </StyledFormGroup>
            <StyledFormGroup>
                <Form.Label>SINTA ID Ketua Tim</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Masukkan SINTA ID Ketua Tim" 
                    name="prop_sintaid" 
                    value={Data.prop_sintaid}
                    onChange={handleChange}
                />
            </StyledFormGroup>
            <StyledFormGroup>
                <Form.Label>Unggah Dokumen</Form.Label>
                <Form.Control 
                    type="file" 
                    name="prop_doc" 
                    accept=".pdf" 
                    value={Data.prop_doc}
                    onChange={handleChange}
                />
            </StyledFormGroup>
            <Container className="row justify-content-center mt-3">
                <Button className="col-5" bsPrefix="custom-btn" type="submit">Proses Dokumen</Button>
                <Button className="col-5" bsPrefix="custom-btn-inv" type="reset" onClick={handleReset}>Batal</Button>
            </Container>
        </StyledForm>
        {(Data.isSubmitted)? <Redirect to={{ pathname: "/hasil/", state: Data.data_input}}/>: ""}
        </>
        
    )
}

export default FormFormatted;