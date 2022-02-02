import React, { useState, useEffect } from "react";
import GlobalStyles from "../components/styles/Global";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from "react-bootstrap";
import { StyledContainer, StyledImage } from "../components/styles/Global.style";
import { StyledForm, StyledFormGroup } from "../components/styles/Form.style";
import { 
    Head, 
    Footer,
    SectionAboutDocument,
    SectionHistory,
    SectionPreProcess,
    SectionResult,
    SectionWeighting
} from "../components/index";

const PageResult = (props) => {
    const isObjectEmpty = (obj) => {
        for ( var i in obj ) return false;
        return true;
    }
    const [MetaData, setMetaData] = useState(
        (props.location.state===undefined)? {} : 
        {
            proposal_id: props.location.state.proposal_id,
            proposal_title: props.location.state.proposal_title,
            proposal_writer: props.location.state.proposal_writer,
            proposal_year: props.location.state.proposal_year,
            proposal_email: props.location.state.proposal_email,
            proposal_type: props.location.state.proposal_type,
            proposal_sintaid: props.location.state.proposal_sintaid,
            proposal_doc_id: props.location.state.proposal_doc_id,
            proposal_doc_link: props.location.state.proposal_doc_link
        }
    );
    const [PreProcessed, setPreProcessed] = useState({
        doc_parted: [],
        doc_pre_processed: []
    });
    const [Config, setConfig] = useState({
        value:'',
        isSubmitted:false
    });
    const [isLoading, setisLoading] = useState(false);
    const [Result, setResult] = useState({
        weightedItems:[],
        retrievedItems:[],
        reusedItems:[]
    });
    const [History, setHistory] = useState([]);

    useEffect(() => {
        async function fetchPreprocess() {
            await fetch(`http://localhost:8000/generate-data/document/${MetaData.proposal_doc_id}`).then(
                response => response.json()
            ).then( 
                ({detail, result:{doc_parts, doc_pre_process}}) => {
                    setPreProcessed(
                        {...PreProcessed, doc_parted:doc_parts, doc_pre_processed:doc_pre_process}
                    );
                    return detail;
                }
            ).then( 
                detail => alert(detail)
            ).catch(
                error => console.log(error)
            )
        }
        fetchPreprocess();
        
        return () => {
            console.log("reset all the data...");
            setConfig({
                value:'',
                isSubmitted:false
            });
            setPreProcessed({
                doc_parted: [],
                doc_pre_processed: []
            });
            setResult({
                weightedItems:[],
                retrievedItems:[],
                reusedItems:[]
            });
            setisLoading(false);
        }
        
    }, []);

    useEffect(() => {
        if(Config.isSubmitted) {
            console.log("reloading the right pane...");
            console.log(Config);
            setisLoading(true);
            async function fetchResult() {
                var formData = new FormData();
                formData.append("config", Config.value);

                await fetch(
                    `http://localhost:8000/similarity-cbr/document/${MetaData.proposal_doc_id}`, {
                        method: 'POST',
                        body: formData
                    }
                ).then(
                    async (response) => await response.json()
                ).then( 
                    ({detail, result:{weights, retrieved, reused, overall }}) => {
                        setResult(
                            { ...Result, weightedItems: weights, retrievedItems: retrieved, reusedItems: reused }
                        )
                        return { detail, history: overall };
                }).then( ({detail, history}) => {
                    setHistory( oldHistory => [...oldHistory, history] );
                    return detail;
                }).then(
                    detail => alert(detail)
                ).catch(
                    error => {console.log(error)}
                )
            }
            fetchResult();
        }
        return () => {
            setConfig(
                {...Config.value, isSubmitted:false}
            )
        }
    }, [Config.isSubmitted]);

    const handleChange = (e) => {
        setConfig({
            value:e.target.value,
            isSubmitted:false
        });
        console.log(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( Config.value === '' ) {
            alert("Proses gagal, silahkan pilih konfigurasi terlebih dahulu");
        } else {
            setConfig({
                value:Config.value,
                isSubmitted:true
            });
        }
    }

    return (
        <>
        <GlobalStyles/>
        <div>
            <Head/>
            <Container className="my-3 px-0 mx-auto">
                <Container className="row my-3 mx-auto">
                    <h2 className="mt-2">Hasil Deteksi Kemiripan Dokumen</h2>
                    <SectionPreProcess data={PreProcessed}/>
                    <Container className="col-6 ml-3">
                        <StyledContainer>
                            <h4>Tentang Dokumen</h4>
                            { isObjectEmpty(MetaData)? 
                                <div>Tidak ada dokumen yang dimuat, silahkan masukkan dokumen terlebih dahulu</div> : 
                                <SectionAboutDocument data={MetaData}/>
                            }
                        </StyledContainer>
                        <StyledContainer>
                            <h4>Hasil Pembobotan Bagian Dokumen</h4>
                            <StyledForm bsPrefix="one-line" className="row justify-content-between" onSubmit={handleSubmit}>
                            <h5>Konfigurasi</h5>
                                <StyledFormGroup className="col-7">
                                    <Form.Select aria-label="-- Pilih Konfigurasi --" name="prop_type" onChange={handleChange}>
                                        <option value="">-- Pilih Konfigurasi --</option>
                                        <option value="manning">(1) Pembobotan dalam Manning et al., 2008</option>
                                        <option value="jiffriya">(2) Pembobotan dalam Jiffriya et al., 2014</option>
                                        <option value="xu">(3) Pembobotan dalam Xu et al., 2016</option>
                                        <option value="saptono">(4) Pembobotan dalam Saptono et al., 2018</option>
                                    </Form.Select>
                                </StyledFormGroup>
                                <Button className="col-4" bsPrefix="custom-btn" type="submit">Lihat Hasil</Button>
                            </StyledForm>
                            <SectionWeighting data={Result} config={Config} isLoading={isLoading}/>
                            { (isLoading && Result.weightedItems.length===0)? <div><b><i>Sedang melakukan perhitungan...</i></b></div> : <></> }
                            { (Config.value==='')? <></>:
                                <StyledContainer>
                                    <p>Formula TF-IDF yang digunakan (berdasarkan konfigurasi)</p>
                                    <StyledImage className="center" src={Config.value} alt={"Formula TF-IDF"}></StyledImage>
                                </StyledContainer>
                            }
                        </StyledContainer>
                    </Container>
                </Container>
                <hr></hr>
                <SectionResult config={Config} data={Result} />
                <SectionHistory data={History} />
            </Container>
            <Footer/>
        </div>
        </>
    )
}

export default PageResult;