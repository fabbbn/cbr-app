import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Form, Table } from "react-bootstrap";
import Head from "../components/Head";
import GlobalStyles from "../components/styles/Global";
import { StyledContainer, StyledImage, StyledSection } from "../components/styles/Global.style";
import { StyledTableHead, StyledTableHeadCol } from "../components/styles/Table.Style"
import { StyledForm, StyledFormGroup } from "../components/styles/Form.style";

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
    // const [MetaData, setMetaData] = useState({
    //     proposal_id: 24,
    //     proposal_title: "PENAPISAN FITOKIMIA MELALUI METODE EKSTRAKSI BERBEDA PADA TANAMAN AIR SEBAGAI POTENSI OBAT PENYAKIT IKAN",
    //     proposal_writer: "MADYASTA ANGGANA RARASSARI, SEFTI HEZA DWINANTI, DANANG YONARTA",
    //     proposal_year: 2020,
    //     proposal_email: "madyastaangganararassari@unsri.ac.id",
    //     proposal_type: "Penelitian",
    //     proposal_sintaid: 6072006,
    //     proposal_doc_id: 24,
    //     proposal_doc_link: "9b24bd8c27414f5faffce8b9e3151ac8.pdf"
    // });
    const [PreProcessed, setPreProcessed] = useState({
        doc_parted: [],
        doc_pre_processed: []
    });
    const [Config, setConfig] = useState({
        value:'',
        isSubmitted:false
    });
    const [isLoading, setisLoading] = useState(false);
    const [isLoaded, setisLoaded] = useState(false);
    const [Result, setResult] = useState({
        weightedItems:[],
        retrievedItems:[],
        reusedItems:[]
    });
    const [History, setHistory] = useState([]);
    const [Data, setData] = useState({
        doc_parts: null,
        doc_preprocessed: null,
        doc_retrieved: null,
        doc_reused: null,
        doc_overall: null,
        doc_id: 24,
        isPreprocessLoaded: false,
        isResultLoaded: false,
        toLoad:'generate-data/document/'
    });

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
        console.log(PreProcessed)
        
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
            
            console.log(History);
            console.log(Result);
        }
        return () => {
            setConfig(
                {...Config.value, isSubmitted:false}
            )
        }
    }, [Config.isSubmitted]);

    // setisLoaded(true);

    const handleChange = (e) => {
        setConfig({
            value:e.target.value,
            isSubmitted:false
        });
        console.log(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setConfig({
            value:Config.value,
            isSubmitted:true
        });
    }
    const res_submit = {
        "proposal_id": 6,
        "proposal_title": "KAJIAN EFEK SINERGIS DARI BAWANG PUTIH DAN BELIMBING WULUH SEBAGAI KANDIDAT OBAT UNTUK PENYAKIT IKAN",
        "proposal_writer": "SEFTI HEZA DWINANTI, MADYASTA ANGGANA RARASSARI, TANBIYASKUR",
        "proposal_year": 2020,
        "proposal_email": "sefti.heza@unsri.ac.id",
        "proposal_type": "Penelitian",
        "proposal_sintaid": 5988267,
        "proposal_doc_link": "e3f885975c5e4ae78599eadb55db6bb7.pdf"
    }
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
                title: "JUDUL",
                content: "Ipsum minim pariatur nostrud est cillum laboris quis."
            },
            {
                title: "RANGKUMAN",
                content: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
            },
            {
                title: "LATAR BELAKANG",
                content: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
            },
            {
                title: "KAJIAN TEORI",
                content: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
            },
            {
                title: "METODE PENELITIAN",
                content: "Do est laborum dolor laborum occaecat nisi eiusmod reprehenderit esse est. Pariatur duis ex incididunt commodo in in. Aliquip voluptate eu velit veniam duis non ullamco reprehenderit eiusmod ex ea nulla ad. Est ad pariatur sit aute aliquip elit tempor et. Tempor consectetur sit eu commodo cupidatat minim sint amet magna et. Quis mollit in Lorem aute aute irure est in mollit ipsum dolor qui."
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

    const res_data = {
        "detail": "Pemrosesan Dokumen menjadi data siap olah berhasil",
        "result": {
            "doc_parts": [
                {
                    "chapter": "JUDUL",
                    "text": "KAJIAN EFEK SINERGIS DARI BAWANG PUTIH DAN BELIMBING WULUH SEBAGAI KANDIDAT OBAT UNTUK PENYAKIT IKAN"
                },
                {
                    "chapter": "RANGKUMAN",
                    "text": "\n \n  \nPeningkatan keamanan pangan terhadap konsumsi ikan menjadi perhatian khusus \nuntuk  keberlangsungan  budidaya  ikan.  Oleh  karena  itu,  penggunaan  obat-obatan  dan \nbahan kimia yang berpotensi mengganggu kesehatan manusia telah dilarang \npenggunaanya dalam kegiatan akuakultur.  \n \nSalah  satu  kendala  yang  dihadapi  dalam  kegiatan  budidaya  adalah  kejadian \npenyakit  yang secara langsung dapat menyebabkan kerugian secara  materil akibat dari \ngagal panen atau turunnya nilai jual ikan dikarenakan kondisi ikan yang cacat. Kejadian \npenyakit  merupakan  interaksi  dari  tiga  faktor  dalam  sistem  budidaya  yaitu  kondisi \nimunitas ikan, keberadaan patogen dan kondisi lingkungan pemeliharaan ikan. \nPengendalian  penyakit  ikan  dapat  dilakukan  dengan  mengontrol  salah  satu  dari  faktor \ntersebut.  \n \nBawang putih dan belimbing wuluh merupakan salah satu tanaman obat-obatan \nyang  telah  umum  dimanfaatkan  dan  ditemukan  di  Indonesia.  Tanaman  ini  berpotensi \nsebagai bahan obat karena memiliki senyawa yang bersifat antibakterial, antiviral, anti \ninflamasi dan juga anti fungal. Pemanfaatan bawang putih dan belimbing wuluh untuk \npengobatan ikan secara tunggal memiliki therpais yang baik. Sebagaimana yang \ndiketahui, kombinasi obat-obatan, termasuk herbal, mempunyai peluang positif \n(komplementasi) yang dapat meningkatkan efektifitas pengobatan atau memiliki peluang \nnegatif (antagonistik) berupa turunnya kinerja bahan aktif atau bahkan dapat \nmenimbulkan kematian. \n \nPenelitian ini merupakan penelitian eksperimental lanjutan yang bertujuan untuk  \nmengkaji pemanfaatan bawang putih dan belimbing wuluh sebagai kandidat obat untuk \nmengatasi penyakit bakterial pada ikan. Kegunaan dari penelitian ini antara lain \nmemberikan informasi dan acuan penggunaan belimbing wuluh dan bawang putih bagi \npetani untuk mengobati infeksi penyakit bakterial selama masa budidaya. Hipotesis yang \ndigunakan adalah kombinasi belimbing wuluh dan bawang putih memiliki efek sinergis \nyang mampu meningkatkan efektifitas pengobatan pada ikan yang terserang penyakit \n \nLuaran penelitian akan dipresentasikan pada seminar internasional yang \nmenerbitkan proceeding terindeks Scopus, produk tepat guna yang dapat dimanfaatkan \noleh  masyarakat  pembudidaya  dan  menjadi  bahan  ajar  pada  mata  kuliah  Manajemen \nKesehatan Ikan sub tema Fitofarmaka dalam Akuakultur. TKT penelitian adalah tingkat \n3 dimana dilakukan pembuktian konsep terhadap efektifitas pengobatan dengan \nmemanfaatkan belimbing wuluh dan bawang putih pada ikan yang terinfeksi penyakit. \n  \n \nKata Kunci : Bawang putih, Belimbing wuluh, Ethnomedicine, penyakit ikan \n\n \n \n \n \n \n"
                },
                {
                    "chapter": "LATAR BELAKANG",
                    "text": " \nPeningkatan keamanan pangan terhadap konsumsi ikan menjadi perhatian khusus \nuntuk  keberlangsungan  budidaya  ikan.  Oleh  karena  itu,  penggunaan  obat-obatan  dan \nbahan kimia yang berpotensi mengganggu kesehatan manusia telah dilarang \npenggunaanya dalam kegiatan akuakultur.  \nPenyakit pada ikan merupakan salah satu masalah serius yang dihadapi oleh para \npembudidaya ikan karena berpotensi menimbulkan kerugian yang sangat besar. Kerugian \nyang  terjadi  dapat  berupa  peningkatan  kematian  ikan  dan  juga  dapat  menyebabkan \npenurunan kualitas ikan, sehingga secara ekonomis berakibat pada penurunan harga jual \nikan.  Umumnya  pengobatan  penyakit  ini  menggunakan  bahan  kimia/obat  yang  tidak \nramah lingkungan seperti penggunaan antibiotik. Akan tetapi, penggunaan bahan kimia \nsecara  terus  menerus  pada  kegiatan  budidaya  mempunyai  dampak  negatif  terhadap \nlingkungan, ikan dan manusia. Beberapa bakteri yang sudah resisten terhadap antibiotik \nantara lain Aeromonas sp dan Pseudomonas sp [1]. Untuk menghindari dampak negatif \npenggunaan antibiotik tersebut, diperlukan berbagai metode salah satunya adalah \npemanfaatan tanaman obat untuk menanggulangi penyakit selama budidaya ikan dengan \nmemanfaatkan bahan alami [2]. \n\nBeberapa  bahan  alami  yang  telah  dimanfaatkan  untuk  meningkatkan  kekebalan \ntubuh telah diujikan pada beberapa jenis ikan dan memberikan efek positif terhadap nilai \nproteksi ikan [3]. Hal ini dikarenakan beberapa bahan herbal memiliki efek menstimulus \nsistem imun dan juga anti bakterial [4]. Salah satu tanaman obat yang mudah ditemukan \ndi  Indonesia  adalah  belimbing  wuluh  dan  bawang  putih.  Sari  buah  belimbing  wuluh \n(Averrhoa bilimbi) memiliki kandungan senyawa kimia diantaranya adalah flavonoid dan \nfenol [5]. Selain itu, vitamin C yang terkandung dalam belimbing wuluh berperan sebagai \nzat  antioksidan  [6].  Sedangkan  bawang  putih  mengandung  zat  aktif  allicin,  allin,  dan \norganik sulfida yang dapat bersifat sebagai antibakterial dan antiviral [7]. Pemanfaatan \nkedua tanaman herbal tersebut telah banyak dimanfaatkan secara tunggal dan \nmemberikan  dampak  positif  terhadap  pengobatan  akibat  infeksi  patogen  pada  ikan \nataupun udang yang dibudidayakan [8,9,10,11]. \nSecara  umum,  sinergis  dalam  ilmu  pengobatan  didefinisikan  sebagai  interaksi \nantara dua atau lebih agent obat yang diproduksi untuk meningkatkan efek pengobatan \ndari bahan aktif yang terkandung dalam obat dibandingkan jika obat tersebut diberikan \nsecara tunggal [12]. Pemanfaatan bawang putih dan belimbing wuluh diharapkan mampu \nmemberikan  nilai  pengobatan yang lebih  tinggi  dibandingkan  dengan  pemanfaatan \ntunggalnya  sehingga  menghasilkan  durasi  pengobatan  yang  lebih  singkat  dan  mampu \nmenekan angka kematian akibat infeksi menjadi lebih kecil. \n \n "
                },
                {
                    "chapter": "KAJIAN TEORI",
                    "text": "\nState of the art  \nPenyakit  merupakan  masalah  yang  serius  dalam  budidaya  ikan  karena  dapat \nmenimbulkan kegagalan panen dan kerugian ekonomi  yang  besar. Pemanfaatan  bahan \nobat/kimia  untuk  menanggulangi  penyakit  memilik  efek  negatif  terhadap  lingkungan, \nikan  dan  manusia.  Oleh  karena  itu,  perlu  dikaji  alternatif  pengendalian  penyakit  yang \nlebih aman sehingga mendukung untuk perikanan berkelanjutan. Kejadian penyakit pada \nikan dipicu oleh tiga faktor antara kondisi imunitas ikan, keberadaan patogen dan juga \nkeseimbangan lingkungan perairan. Untuk mengatasi permasalahan tersebut perlu \npengkajian tanaman obat yang dapat diaplikasikan pada sistem budidaya. Syarat utama \ntanaman obat adalah mudah ditemukan, memiliki efek antibakterial dan immunostimulan \nserta aman jika diaplikasikan untuk keberlanjutan produksi.  \n\nTanaman  obat  dapat  menjadi  alternatif  dikarenakan  harganya  yang  murah  dan \nlebih  cocok  dijadikan  alternatif  untuk  kemoterapi  pada  kegiatan  akuakultur.  Hal  ini \ndikarenakan  komponen  bioaktif  yang  terkandung  memiliki  sifat  sebagai  anti  stress, \nimunostimulan dan efek anti  bakterial,  fungi,  virus dan parasit [13]. Belimbing wuluh \nmemiliki kandungan zat antibakterial maupun zat antioksidan yang mampu meningkatkan \nimunitas  ikan.  Zat-zat  aktif  yang  terkandung  dalam  buah  belimbing  wuluh  antara  lain \nflavonoid,  alkaloid,  tanin,  saponin  dan  vitamin  C.  Sari  buah  belimbing  wuluh  mampu \nmencegah  infeksi  bakteri  Aeromonas  salmonicida  pada  konsentrasi  0,125  g/mL  [14]. \nSedangkan bawang putih mengandung zat antibakterial dan juga bersifat sebagai \nimunostimulant  karena  mengandung  antioksidan  seperti  organosulfur  termasuk  allicin \nataupun allin dan golongan folifenol [8, 15]. \nEfek  sinergis  dari  tanaman  obat  dapat  dikelompokkan  menjadi  dua  golongan. \nPertama,  apabila  terdapat  dua  atau  lebih  bahan  aktif  obat  yang  bekerja  pada  resptor \nbiologi yang sama atau target yang sama sehingga dapat meningkatkan daya pengobatan \nberdasarkan interaksi positf. Kedua, sinergitas dapat terjadi selama proses farmakinetic \n(absorbsi,  distribusi,  metabolisme  dan  eliminasi)  yang  mengarah  ke  perubahan  secara \nkuantitatif bahan aktif obat di dalam tubuh dan oleh karena itu kombinasi tersebut dapat \nmempengaruhi efek pengobatan [16]. Berdasarkan komponen yang dimiliki oleh bawang \nputih  dan  belimbing  wuluh,  efek  sinergis  sangat  mungkin  terjadi  dikarenakan  kedua \ntanaman obat tersebut dapat dikatogorikan pada golongan pertama. \n \nRoad map \n \nGambar 1. Peta Jalan Penelitian \n\n \n"
                },
                {
                    "chapter": "METODE PENELITIAN",
                    "text": "\n \n \nPenelitian  ini  merupakan  penelitian  eksperimental  dengan  beberapa  perlakuan \nyang  akan  mengkaji  efek  sinergis  antara  bawang  putih  dan  belimbing  wuluh  terhadap \npengobatan penyakit pada ikan. Tahapan penelitian  ini terdiri dari preparasi bahan uji, \nanalisa  fitokimia  terhadap  kombnasi  belimbing  wuluh  dan  bawang  putih,  kultivasi \nbakteri, uji in vitro yang disajikan pada diagram alir berikut. \n \nGambar 2. Diagram alir penelitian \n \nBahan dan Alat \n \nPenelitian ini akan menggunakan bahan utama seperti belimbing wuluh matang, \nbawang putih, benih ikan lele, pakan ikan lele dan bakteri Aeromonas hydrophila. Alat \nyang digunakan adalah peralatan mikrobiologi standar.  \n \nMetode Penelitian \nPenelitian  ini  akan  mengkaji  pencampuran  dua  ekstrak  tanaman  yaitu  bawang \nputih  (BP)  dan  belimbing  wuluh  (BW)  terhadap  efek  pengobatan yang  dihasilkan \nterhadap  penyakit  MAS.  Rancangan  percobaan  yang  digunakan  dalam  penelitian  ini \nadalah  RAL  (Rancangan  Acak  Lengkap),  yang  terdiri  5  perlakuan  dan  3  ulangan \n(konsentrasi) perlakuan yang digunakan antara lain: \nTahap I\n• Preparasi Sari Belimbing Wuluh dan ekstraksi bawang puth\nTahap II\n• Analisa Fitokimia\n• Kandungan Vitamin C\n• Flavonoid, Phenol, Saponin, Tanin, Alkaloid\n• Analisa In vitro\n• EC 50\n• Uji MIC dan Uji MBC (Antbakterial)\n• Uji Sinergitas\n\nP1 \n: Ekstrak bawang putih   \nP2 \n: Ekstrak belimbing wuluh  \nP3 \n: Pencampuran Ekstrak bawang putih dan belimbing wuluh (25: 75) \nP4 \n: Pencampuran Ekstrak bawang putih dan belimbing wuluh (50: 50) \nP5 \n: Pencampuran Ekstrak bawang putih dan belimbing wuluh (75:25) \n \nCara Kerja \na. Preparasi Sari Belimbing Wuluh dan ekstrak bawang putih \nBelimbing wuluh yang digunakan adalah belimbing wuluh dewasa dengan \ntingkat kematangan dengan ciri kulit daging buah lembut. Belimbing wuluh dan \nbawang  putih  uji  dicuci  bersih  dan  dikering  udara.  Setelah  kering,  belimbing \nwuluh dan bawang putih diblender tanpa menambahkan air dengan perbandingan \nsesuai perlakuan. Pemisahan antara serat dan sari dilakukan dengan melakukan \npenyaringan dan sentrifugasi pada kecepatan 10.000 g selama 5 menit pada suhu \n40C untuk mengendapkan partikel yang terlewat dari saringan.  \n \nb. Analisa Fitokimia \n1. Tanin \nSebanyak 0,5 gram sampel dimasukkan kedalam gelas kimia kemudian  \nditambahkan  20  mL  aquades  lalu  dididihkan  dan  disaring.  Setelah  itu  0,5  mL  \nfiltrat ditambahkan ferriklorida 0,1% dan diamati terjadinya perubahan warna.      \n2. Saponin \nKe  dalam  gelas  kimia  dimasukkan  sampel  sebanyak  2  gram,    lalu    ditambah  \ndengan  20  mL aquades  kemudian  dididihkan  lalu disaring.  Diambil  10 mL \nfiltratnya dan ditambahkan 5 mL aquades kemudian dikocok kuat hingga  \nterbentuk  busa.  Lalu  busanya  ditambahkan  3  tetes  minyak  zaitun,  setelah  itu  \ndikocok kembali dan diamati terbentuknya emulsi. \n3. Flavonoid  \nSebanyak 2 gram sampel dimasukkan ke dalam gelas kimia,  lalu ditambah dengan \n20 mL aquades kemudian dididihkan dan disaring. 0,5 mL Filtratnya  \nditambahkan 5 tetes aluminium klorida 1% dan diamati. \n \n\n4. Alkaloid \n Sebanyak  3  gram  sampel  ditambah  10  mL  larutan  0,05  N  amoniakloroform. \nKemudian campuran dikocok  selama  satu  menit, kemudian disaring kedalam \ntabung  reaksi.  Kepada  filtrat  tersebut  ditambahkan  5  mLH2SO4  dan  dikocok \ndengan teratur, didiamkan sampai  terbentuk  dua lapisan. Lapisan  atas  (fase  air) \ndipisahkan dan diuji dengan pereaksi Meyer dan Wagner. \n \nc. Kultivasi dan Perhitungan Kepadatan Bakteri \n \nIsolat bakteri Aeromonas hydrophila merupakan peremajaaan stok isolat \ndi Laboratorium Budidaya Perairan yang berasal dari BPBAT Sukabumi. \nKultivasi awal menggunakan media cair (Tryptic Soy Broth/TSB) dengan \nmenambahkan  satu  ose  bakteri.  Inkubasi  biakan  dilakukan  pada  suhu  ruang \nselama  24  jam.  Perhitungan  kepadatan  bakteri  menggunakan  spektrofotometer \npada panjang gelombang 600 nm (McBriney et al., 2016) dengan menggunakan \nkurva  standar  yang  telah  dibuat  sebelumnya.  Kurva  standar  kepadatan  bakteri \ndiperoleh  dari  jumlah  koloni  yang  terhitung  dengan  metode  total  plate  count \n(TPC) dan nilai absorbansi optical density (OD) yang terbaca di spektrofotometer. \nPendugaan kepadatan bakteri untuk uji selanjutnya akan menggunakan persamaan \nliniear yang dihasilkan dari kurva standar. \nd. Penentuan nilai minimum bactericidal concentration (MBC) dan minimum \ninhibitory concentration (MIC) \n \nPenentuan nilai MBC dan MIC menggunakan konsentrasi obat bertingkat \nmulai  dari  0%  (akuades  steril),  20%,  40%,  60%,  80%  dan  100%  serta  larutan \ntetracycline 50 ug/ml.  \n \n \nUji MBC menentukan jumlah konsentrasi terendah dari obat yang mampu \nmembunuh bakteri. Biakan bakteri pada media cair (broth) yang telah ditentukan \nkepadatannya (106 CFU/ml) ditambahkan dengan bahan obat dengan \nperbandingan  1:1  (v/v)  selanjutnya  diinkubasi selama  24 jam  dengan  suhu \nruangan (Hoseinzadeh et al., 2016).  Adapun konsentrasi yang digunakan adalah \nSetelah diinkubasi, biakan dituang sebanyak 0,1 ml kedalam media agar (TSA) \nyang sudah steril. Nilai MBC dapat ditentukan apabila tidak terdapat koloni pada \npermukaan agar. \n\n \nUji MIC menentukan jumlah konsentrasi terendah dari obat yang mampu \nmenghambat pertumbuhan bakteri. Biakan bakteri pada media cair (broth) yang \ntelah  ditentukan  kepadatannya  (106 CFU/ml)  ditambahkan  dengan  bahan  obat \ndengan perbandingan 1:1 (v/v) selanjutnya diinkubasi selama 24 jam dengan suhu \nruangan  (Hoseinzadeh  et  al.,  2016).    Setelah  inkubasi,  dilakukan  pengukuran \nkepadatan bakteri dengan menggunakan spektrofotometer pada panjang \ngelombang 600 nm (McBriney et al., 2016).  \n \ne. Penentuan Effective Concentration 50 (EC50) \n \nEC50 adalah konsentrasi yang efektif untuk membunuh 50% dari populasi \nbakteri.  Perhitungan EC50 menggunakan rumus matematika yang mengacu pada \nAlexander et al. (1999). \n \n𝐸𝐶 50 = 𝐷 −  \n(𝐴 − 50% 𝑘𝑒𝑝𝑎𝑑𝑎𝑡𝑎𝑛 𝑏𝑎𝑘𝑡𝑒𝑟𝑖 𝑚𝑎𝑘𝑠𝑖𝑚𝑎𝑙) 𝑥 𝑋\n𝑦\n \nKeterangan : \nD = dosis tertinggi yang paling dekat dengan 50% dari kepadatan bakteri \nA = jumlah kepadatan bakteri tertinggi \nX  =  selisih  dosis  antara  dosis  tertinggi  yang  paling  dekat  dengan  50%  dari \nkepadatan bakteri dan dosis tererndah yang paling dekat dengan populasi bakteri \n50%) \nY  =  selisih  antara  jumlah  bakteri  tertinggi  dengan  jumlah  bakteri  50%  dari \npopulasi \n \nNilai EC50 akan digunakan untuk menentukan nila indeksi kombinasi (CI) dalam \naplikasi CalcuSyn. \nf.  Analisis Data \nData uji In Vitro akan dianalisis menggunakan analisis indeksi kombinasi \nmenggunakan  program  perangkat  lunak  yang  ramah  pengguna  CalcuSyn.  Efek \nsinergis terjadi apabila angka C<1 dan jika C=1 maka kombinasi hanya bersifat \naditif,  sedangkan  C>1  maka  bahan  obat  tersebut  bersifat  antagonistik.  Data \nkombinasi sebelum menggunakan program CalcuSyn akan mengunakan \n\npersamaan  linear  dan  menggunakan  grafik  standar  untuk  menunjang  data  efek \nsinergis. Sedangkan uji fitokimia dianalisis secara deskriptif yang didukung studi \nliteratur. \n \nDeskripsi Tugas Peneliti \n \nPelaksanaan dan pembagian tugas dalam kegiatan penelitian ini disusun \nberdasarkan  bidang  keahlian  dari  masing-masing  peneliti  yang  disajikan  pada  tabel \nberikut.  \n \nTabel 1. Deskripsi Tugas Peneliti \nNO Kegiatan \n PIC Pelaksana \nUraian Tugas \n1 \nPersiapan \nbahan \ndan alat \nMadyasta RR \nNabella \nMelakukan \npengumpulan \nbahan \nbaku \ndan \nhewan \nuji \nbeserta \nketersediaan \nalat \nyang \nakan \ndigunakan \n2 \nAnalisa fitokimia \nMadyasta RR \nNabella \nMelakukan \nanalisa \nkandungan \nvitamin C, flavonoid, tanin, saponin \ndan alkaloid secara periodik \n3 \nAnalisa in vitro \nSefti Heza Dwinanti \nMadyasta RR \nWinda \nMelakukan kegiatan mikrobiologi \nuntuk mengukur MIC danMBC  \n4 \nAnalisa invivo \nSefti Heza Dwinanti \nTanbiyaskur \nWinda \nPemeliharaan hewan uji, analisis \nhistopatologi, analisis gambaran \ndarah \n5 \nAnalisa data \nSefti Heza Dwinanti \nTanbiyaskur \nMadyasta RR \nMelakukan analisa terkait data yang \nsudah diperoleh sesuai dengan \nkeahlian masing-masing \n6 \nLaporan  akhir  dan \npenyusunan artikel \nTim \nPenyusun laporan akhir  \n \n \n \n\n"
                }
            ],
            "doc_pre_process": [
                {
                    "title": "Text Cleaning",
                    "result": [
                        {
                            "title": "JUDUL",
                            "content": "KAJIAN EFEK SINERGIS DARI BAWANG PUTIH DAN BELIMBING WULUH SEBAGAI KANDIDAT OBAT UNTUK PENYAKIT IKAN"
                        },
                        {
                            "title": "RANGKUMAN",
                            "content": "Peningkatan keamanan pangan terhadap konsumsi ikan menjadi perhatian khusus untuk keberlangsungan budidaya ikan Oleh karena itu penggunaan obat obatan dan bahan kimia yang berpotensi mengganggu kesehatan manusia telah dilarang penggunaanya dalam kegiatan akuakultur Salah satu kendala yang dihadapi dalam kegiatan budidaya adalah kejadian penyakit yang secara langsung dapat menyebabkan kerugian secara materil akibat dari gagal panen atau turunnya nilai jual ikan dikarenakan kondisi ikan yang cacat Kejadian penyakit merupakan interaksi dari tiga faktor dalam sistem budidaya yaitu kondisi imunitas ikan keberadaan patogen dan kondisi lingkungan pemeliharaan ikan Pengendalian penyakit ikan dapat dilakukan dengan mengontrol salah satu dari faktor tersebut Bawang putih dan belimbing wuluh merupakan salah satu tanaman obat obatan yang telah umum dimanfaatkan dan ditemukan di Indonesia Tanaman ini berpotensi sebagai bahan obat karena memiliki senyawa yang bersifat antibakterial antiviral anti inflamasi dan juga anti fungal Pemanfaatan bawang putih dan belimbing wuluh untuk pengobatan ikan secara tunggal memiliki therpais yang baik Sebagaimana yang diketahui kombinasi obat obatan termasuk herbal mempunyai peluang positif komplementasi yang dapat meningkatkan efektifitas pengobatan atau memiliki peluang negatif antagonistik berupa turunnya kinerja bahan aktif atau bahkan dapat menimbulkan kematian Penelitian ini merupakan penelitian eksperimental lanjutan yang bertujuan untuk mengkaji pemanfaatan bawang putih dan belimbing wuluh sebagai kandidat obat untuk mengatasi penyakit bakterial pada ikan Kegunaan dari penelitian ini antara lain memberikan informasi dan acuan penggunaan belimbing wuluh dan bawang putih bagi petani untuk mengobati infeksi penyakit bakterial selama masa budidaya Hipotesis yang digunakan adalah kombinasi belimbing wuluh dan bawang putih memiliki efek sinergis yang mampu meningkatkan efektifitas pengobatan pada ikan yang terserang penyakit Luaran penelitian akan dipresentasikan pada seminar internasional yang menerbitkan proceeding terindeks Scopus produk tepat guna yang dapat dimanfaatkan oleh masyarakat pembudidaya dan menjadi bahan ajar pada mata kuliah Manajemen Kesehatan Ikan sub tema Fitofarmaka dalam Akuakultur TKT penelitian adalah tingkat dimana dilakukan pembuktian konsep terhadap efektifitas pengobatan dengan memanfaatkan belimbing wuluh dan bawang putih pada ikan yang terinfeksi penyakit Kata Kunci Bawang putih Belimbing wuluh Ethnomedicine penyakit ikan"
                        },
                        {
                            "title": "LATAR BELAKANG",
                            "content": "Peningkatan keamanan pangan terhadap konsumsi ikan menjadi perhatian khusus untuk keberlangsungan budidaya ikan Oleh karena itu penggunaan obat obatan dan bahan kimia yang berpotensi mengganggu kesehatan manusia telah dilarang penggunaanya dalam kegiatan akuakultur Penyakit pada ikan merupakan salah satu masalah serius yang dihadapi oleh para pembudidaya ikan karena berpotensi menimbulkan kerugian yang sangat besar Kerugian yang terjadi dapat berupa peningkatan kematian ikan dan juga dapat menyebabkan penurunan kualitas ikan sehingga secara ekonomis berakibat pada penurunan harga jual ikan Umumnya pengobatan penyakit ini menggunakan bahan kimia obat yang tidak ramah lingkungan seperti penggunaan antibiotik Akan tetapi penggunaan bahan kimia secara terus menerus pada kegiatan budidaya mempunyai dampak negatif terhadap lingkungan ikan dan manusia Beberapa bakteri yang sudah resisten terhadap antibiotik antara lain Aeromonas sp dan Pseudomonas sp Untuk menghindari dampak negatif penggunaan antibiotik tersebut diperlukan berbagai metode salah satunya adalah pemanfaatan tanaman obat untuk menanggulangi penyakit selama budidaya ikan dengan memanfaatkan bahan alami Beberapa bahan alami yang telah dimanfaatkan untuk meningkatkan kekebalan tubuh telah diujikan pada beberapa jenis ikan dan memberikan efek positif terhadap nilai proteksi ikan Hal ini dikarenakan beberapa bahan herbal memiliki efek menstimulus sistem imun dan juga anti bakterial Salah satu tanaman obat yang mudah ditemukan di Indonesia adalah belimbing wuluh dan bawang putih Sari buah belimbing wuluh Averrhoa bilimbi memiliki kandungan senyawa kimia diantaranya adalah flavonoid dan fenol Selain itu vitamin C yang terkandung dalam belimbing wuluh berperan sebagai zat antioksidan Sedangkan bawang putih mengandung zat aktif allicin allin dan organik sulfida yang dapat bersifat sebagai antibakterial dan antiviral Pemanfaatan kedua tanaman herbal tersebut telah banyak dimanfaatkan secara tunggal dan memberikan dampak positif terhadap pengobatan akibat infeksi patogen pada ikan ataupun udang yang dibudidayakan Secara umum sinergis dalam ilmu pengobatan didefinisikan sebagai interaksi antara dua atau lebih agent obat yang diproduksi untuk meningkatkan efek pengobatan dari bahan aktif yang terkandung dalam obat dibandingkan jika obat tersebut diberikan secara tunggal Pemanfaatan bawang putih dan belimbing wuluh diharapkan mampu memberikan nilai pengobatan yang lebih tinggi dibandingkan dengan pemanfaatan tunggalnya sehingga menghasilkan durasi pengobatan yang lebih singkat dan mampu menekan angka kematian akibat infeksi menjadi lebih kecil"
                        },
                        {
                            "title": "KAJIAN TEORI",
                            "content": "State of the art Penyakit merupakan masalah yang serius dalam budidaya ikan karena dapat menimbulkan kegagalan panen dan kerugian ekonomi yang besar Pemanfaatan bahan obat kimia untuk menanggulangi penyakit memilik efek negatif terhadap lingkungan ikan dan manusia Oleh karena itu perlu dikaji alternatif pengendalian penyakit yang lebih aman sehingga mendukung untuk perikanan berkelanjutan Kejadian penyakit pada ikan dipicu oleh tiga faktor antara kondisi imunitas ikan keberadaan patogen dan juga keseimbangan lingkungan perairan Untuk mengatasi permasalahan tersebut perlu pengkajian tanaman obat yang dapat diaplikasikan pada sistem budidaya Syarat utama tanaman obat adalah mudah ditemukan memiliki efek antibakterial dan immunostimulan serta aman jika diaplikasikan untuk keberlanjutan produksi Tanaman obat dapat menjadi alternatif dikarenakan harganya yang murah dan lebih cocok dijadikan alternatif untuk kemoterapi pada kegiatan akuakultur Hal ini dikarenakan komponen bioaktif yang terkandung memiliki sifat sebagai anti stress imunostimulan dan efek anti bakterial fungi virus dan parasit Belimbing wuluh memiliki kandungan zat antibakterial maupun zat antioksidan yang mampu meningkatkan imunitas ikan Zat zat aktif yang terkandung dalam buah belimbing wuluh antara lain flavonoid alkaloid tanin saponin dan vitamin C Sari buah belimbing wuluh mampu mencegah infeksi bakteri Aeromonas salmonicida pada konsentrasi g mL Sedangkan bawang putih mengandung zat antibakterial dan juga bersifat sebagai imunostimulant karena mengandung antioksidan seperti organosulfur termasuk allicin ataupun allin dan golongan folifenol Efek sinergis dari tanaman obat dapat dikelompokkan menjadi dua golongan Pertama apabila terdapat dua atau lebih bahan aktif obat yang bekerja pada resptor biologi yang sama atau target yang sama sehingga dapat meningkatkan daya pengobatan berdasarkan interaksi positf Kedua sinergitas dapat terjadi selama proses farmakinetic absorbsi distribusi metabolisme dan eliminasi yang mengarah ke perubahan secara kuantitatif bahan aktif obat di dalam tubuh dan oleh karena itu kombinasi tersebut dapat mempengaruhi efek pengobatan Berdasarkan komponen yang dimiliki oleh bawang putih dan belimbing wuluh efek sinergis sangat mungkin terjadi dikarenakan kedua tanaman obat tersebut dapat dikatogorikan pada golongan pertama Road map Gambar Peta Jalan Penelitian"
                        },
                        {
                            "title": "METODE PENELITIAN",
                            "content": "Penelitian ini merupakan penelitian eksperimental dengan beberapa perlakuan yang akan mengkaji efek sinergis antara bawang putih dan belimbing wuluh terhadap pengobatan penyakit pada ikan Tahapan penelitian ini terdiri dari preparasi bahan uji analisa fitokimia terhadap kombnasi belimbing wuluh dan bawang putih kultivasi bakteri uji in vitro yang disajikan pada diagram alir berikut Gambar Diagram alir penelitian Bahan dan Alat Penelitian ini akan menggunakan bahan utama seperti belimbing wuluh matang bawang putih benih ikan lele pakan ikan lele dan bakteri Aeromonas hydrophila Alat yang digunakan adalah peralatan mikrobiologi standar Metode Penelitian Penelitian ini akan mengkaji pencampuran dua ekstrak tanaman yaitu bawang putih BP dan belimbing wuluh BW terhadap efek pengobatan yang dihasilkan terhadap penyakit MAS Rancangan percobaan yang digunakan dalam penelitian ini adalah RAL Rancangan Acak Lengkap yang terdiri perlakuan dan ulangan konsentrasi perlakuan yang digunakan antara lain Tahap I Preparasi Sari Belimbing Wuluh dan ekstraksi bawang puth Tahap II Analisa Fitokimia Kandungan Vitamin C Flavonoid Phenol Saponin Tanin Alkaloid Analisa In vitro EC Uji MIC dan Uji MBC Antbakterial Uji Sinergitas P Ekstrak bawang putih P Ekstrak belimbing wuluh P Pencampuran Ekstrak bawang putih dan belimbing wuluh P Pencampuran Ekstrak bawang putih dan belimbing wuluh P Pencampuran Ekstrak bawang putih dan belimbing wuluh Cara Kerja a Preparasi Sari Belimbing Wuluh dan ekstrak bawang putih Belimbing wuluh yang digunakan adalah belimbing wuluh dewasa dengan tingkat kematangan dengan ciri kulit daging buah lembut Belimbing wuluh dan bawang putih uji dicuci bersih dan dikering udara Setelah kering belimbing wuluh dan bawang putih diblender tanpa menambahkan air dengan perbandingan sesuai perlakuan Pemisahan antara serat dan sari dilakukan dengan melakukan penyaringan dan sentrifugasi pada kecepatan g selama menit pada suhu 40C untuk mengendapkan partikel yang terlewat dari saringan b Analisa Fitokimia Tanin Sebanyak gram sampel dimasukkan kedalam gelas kimia kemudian ditambahkan mL aquades lalu dididihkan dan disaring Setelah itu mL filtrat ditambahkan ferriklorida dan diamati terjadinya perubahan warna Saponin Ke dalam gelas kimia dimasukkan sampel sebanyak gram lalu ditambah dengan mL aquades kemudian dididihkan lalu disaring Diambil mL filtratnya dan ditambahkan mL aquades kemudian dikocok kuat hingga terbentuk busa Lalu busanya ditambahkan tetes minyak zaitun setelah itu dikocok kembali dan diamati terbentuknya emulsi Flavonoid Sebanyak gram sampel dimasukkan ke dalam gelas kimia lalu ditambah dengan mL aquades kemudian dididihkan dan disaring mL Filtratnya ditambahkan tetes aluminium klorida dan diamati Alkaloid Sebanyak gram sampel ditambah mL larutan N amoniakloroform Kemudian campuran dikocok selama satu menit kemudian disaring kedalam tabung reaksi Kepada filtrat tersebut ditambahkan mLH2SO dan dikocok dengan teratur didiamkan sampai terbentuk dua lapisan Lapisan atas fase air dipisahkan dan diuji dengan pereaksi Meyer dan Wagner c Kultivasi dan Perhitungan Kepadatan Bakteri Isolat bakteri Aeromonas hydrophila merupakan peremajaaan stok isolat di Laboratorium Budidaya Perairan yang berasal dari BPBAT Sukabumi Kultivasi awal menggunakan media cair Tryptic Soy Broth TSB dengan menambahkan satu ose bakteri Inkubasi biakan dilakukan pada suhu ruang selama jam Perhitungan kepadatan bakteri menggunakan spektrofotometer pada panjang gelombang nm McBriney et al dengan menggunakan kurva standar yang telah dibuat sebelumnya Kurva standar kepadatan bakteri diperoleh dari jumlah koloni yang terhitung dengan metode total plate count TPC dan nilai absorbansi optical density OD yang terbaca di spektrofotometer Pendugaan kepadatan bakteri untuk uji selanjutnya akan menggunakan persamaan liniear yang dihasilkan dari kurva standar d Penentuan nilai minimum bactericidal concentration MBC dan minimum inhibitory concentration MIC Penentuan nilai MBC dan MIC menggunakan konsentrasi obat bertingkat mulai dari akuades steril dan serta larutan tetracycline ug ml Uji MBC menentukan jumlah konsentrasi terendah dari obat yang mampu membunuh bakteri Biakan bakteri pada media cair broth yang telah ditentukan kepadatannya CFU ml ditambahkan dengan bahan obat dengan perbandingan v v selanjutnya diinkubasi selama jam dengan suhu ruangan Hoseinzadeh et al Adapun konsentrasi yang digunakan adalah Setelah diinkubasi biakan dituang sebanyak ml kedalam media agar TSA yang sudah steril Nilai MBC dapat ditentukan apabila tidak terdapat koloni pada permukaan agar Uji MIC menentukan jumlah konsentrasi terendah dari obat yang mampu menghambat pertumbuhan bakteri Biakan bakteri pada media cair broth yang telah ditentukan kepadatannya CFU ml ditambahkan dengan bahan obat dengan perbandingan v v selanjutnya diinkubasi selama jam dengan suhu ruangan Hoseinzadeh et al Setelah inkubasi dilakukan pengukuran kepadatan bakteri dengan menggunakan spektrofotometer pada panjang gelombang nm McBriney et al e Penentuan Effective Concentration EC EC adalah konsentrasi yang efektif untuk membunuh dari populasi bakteri Perhitungan EC menggunakan rumus matematika yang mengacu pada Alexander et al 𝐸𝐶 𝐷 𝐴 𝑘𝑒𝑝𝑎𝑑𝑎𝑡𝑎𝑛 𝑏𝑎𝑘𝑡𝑒𝑟𝑖 𝑚𝑎𝑘𝑠𝑖𝑚𝑎𝑙 𝑥 𝑋 𝑦 Keterangan D dosis tertinggi yang paling dekat dengan dari kepadatan bakteri A jumlah kepadatan bakteri tertinggi X selisih dosis antara dosis tertinggi yang paling dekat dengan dari kepadatan bakteri dan dosis tererndah yang paling dekat dengan populasi bakteri Y selisih antara jumlah bakteri tertinggi dengan jumlah bakteri dari populasi Nilai EC akan digunakan untuk menentukan nila indeksi kombinasi CI dalam aplikasi CalcuSyn f Analisis Data Data uji In Vitro akan dianalisis menggunakan analisis indeksi kombinasi menggunakan program perangkat lunak yang ramah pengguna CalcuSyn Efek sinergis terjadi apabila angka C dan jika C maka kombinasi hanya bersifat aditif sedangkan C maka bahan obat tersebut bersifat antagonistik Data kombinasi sebelum menggunakan program CalcuSyn akan mengunakan persamaan linear dan menggunakan grafik standar untuk menunjang data efek sinergis Sedangkan uji fitokimia dianalisis secara deskriptif yang didukung studi literatur Deskripsi Tugas Peneliti Pelaksanaan dan pembagian tugas dalam kegiatan penelitian ini disusun berdasarkan bidang keahlian dari masing masing peneliti yang disajikan pada tabel berikut Tabel Deskripsi Tugas Peneliti NO Kegiatan PIC Pelaksana Uraian Tugas Persiapan bahan dan alat Madyasta RR Nabella Melakukan pengumpulan bahan baku dan hewan uji beserta ketersediaan alat yang akan digunakan Analisa fitokimia Madyasta RR Nabella Melakukan analisa kandungan vitamin C flavonoid tanin saponin dan alkaloid secara periodik Analisa in vitro Sefti Heza Dwinanti Madyasta RR Winda Melakukan kegiatan mikrobiologi untuk mengukur MIC danMBC Analisa invivo Sefti Heza Dwinanti Tanbiyaskur Winda Pemeliharaan hewan uji analisis histopatologi analisis gambaran darah Analisa data Sefti Heza Dwinanti Tanbiyaskur Madyasta RR Melakukan analisa terkait data yang sudah diperoleh sesuai dengan keahlian masing masing Laporan akhir dan penyusunan artikel Tim Penyusun laporan akhir"
                        }
                    ]
                },
                {
                    "title": "Case Folding",
                    "result": [
                        {
                            "title": "JUDUL",
                            "content": "kajian efek sinergis dari bawang putih dan belimbing wuluh sebagai kandidat obat untuk penyakit ikan"
                        },
                        {
                            "title": "RANGKUMAN",
                            "content": "peningkatan keamanan pangan terhadap konsumsi ikan menjadi perhatian khusus untuk keberlangsungan budidaya ikan oleh karena itu penggunaan obat obatan dan bahan kimia yang berpotensi mengganggu kesehatan manusia telah dilarang penggunaanya dalam kegiatan akuakultur salah satu kendala yang dihadapi dalam kegiatan budidaya adalah kejadian penyakit yang secara langsung dapat menyebabkan kerugian secara materil akibat dari gagal panen atau turunnya nilai jual ikan dikarenakan kondisi ikan yang cacat kejadian penyakit merupakan interaksi dari tiga faktor dalam sistem budidaya yaitu kondisi imunitas ikan keberadaan patogen dan kondisi lingkungan pemeliharaan ikan pengendalian penyakit ikan dapat dilakukan dengan mengontrol salah satu dari faktor tersebut bawang putih dan belimbing wuluh merupakan salah satu tanaman obat obatan yang telah umum dimanfaatkan dan ditemukan di indonesia tanaman ini berpotensi sebagai bahan obat karena memiliki senyawa yang bersifat antibakterial antiviral anti inflamasi dan juga anti fungal pemanfaatan bawang putih dan belimbing wuluh untuk pengobatan ikan secara tunggal memiliki therpais yang baik sebagaimana yang diketahui kombinasi obat obatan termasuk herbal mempunyai peluang positif komplementasi yang dapat meningkatkan efektifitas pengobatan atau memiliki peluang negatif antagonistik berupa turunnya kinerja bahan aktif atau bahkan dapat menimbulkan kematian penelitian ini merupakan penelitian eksperimental lanjutan yang bertujuan untuk mengkaji pemanfaatan bawang putih dan belimbing wuluh sebagai kandidat obat untuk mengatasi penyakit bakterial pada ikan kegunaan dari penelitian ini antara lain memberikan informasi dan acuan penggunaan belimbing wuluh dan bawang putih bagi petani untuk mengobati infeksi penyakit bakterial selama masa budidaya hipotesis yang digunakan adalah kombinasi belimbing wuluh dan bawang putih memiliki efek sinergis yang mampu meningkatkan efektifitas pengobatan pada ikan yang terserang penyakit luaran penelitian akan dipresentasikan pada seminar internasional yang menerbitkan proceeding terindeks scopus produk tepat guna yang dapat dimanfaatkan oleh masyarakat pembudidaya dan menjadi bahan ajar pada mata kuliah manajemen kesehatan ikan sub tema fitofarmaka dalam akuakultur tkt penelitian adalah tingkat dimana dilakukan pembuktian konsep terhadap efektifitas pengobatan dengan memanfaatkan belimbing wuluh dan bawang putih pada ikan yang terinfeksi penyakit kata kunci bawang putih belimbing wuluh ethnomedicine penyakit ikan"
                        },
                        {
                            "title": "LATAR BELAKANG",
                            "content": "peningkatan keamanan pangan terhadap konsumsi ikan menjadi perhatian khusus untuk keberlangsungan budidaya ikan oleh karena itu penggunaan obat obatan dan bahan kimia yang berpotensi mengganggu kesehatan manusia telah dilarang penggunaanya dalam kegiatan akuakultur penyakit pada ikan merupakan salah satu masalah serius yang dihadapi oleh para pembudidaya ikan karena berpotensi menimbulkan kerugian yang sangat besar kerugian yang terjadi dapat berupa peningkatan kematian ikan dan juga dapat menyebabkan penurunan kualitas ikan sehingga secara ekonomis berakibat pada penurunan harga jual ikan umumnya pengobatan penyakit ini menggunakan bahan kimia obat yang tidak ramah lingkungan seperti penggunaan antibiotik akan tetapi penggunaan bahan kimia secara terus menerus pada kegiatan budidaya mempunyai dampak negatif terhadap lingkungan ikan dan manusia beberapa bakteri yang sudah resisten terhadap antibiotik antara lain aeromonas sp dan pseudomonas sp untuk menghindari dampak negatif penggunaan antibiotik tersebut diperlukan berbagai metode salah satunya adalah pemanfaatan tanaman obat untuk menanggulangi penyakit selama budidaya ikan dengan memanfaatkan bahan alami beberapa bahan alami yang telah dimanfaatkan untuk meningkatkan kekebalan tubuh telah diujikan pada beberapa jenis ikan dan memberikan efek positif terhadap nilai proteksi ikan hal ini dikarenakan beberapa bahan herbal memiliki efek menstimulus sistem imun dan juga anti bakterial salah satu tanaman obat yang mudah ditemukan di indonesia adalah belimbing wuluh dan bawang putih sari buah belimbing wuluh averrhoa bilimbi memiliki kandungan senyawa kimia diantaranya adalah flavonoid dan fenol selain itu vitamin c yang terkandung dalam belimbing wuluh berperan sebagai zat antioksidan sedangkan bawang putih mengandung zat aktif allicin allin dan organik sulfida yang dapat bersifat sebagai antibakterial dan antiviral pemanfaatan kedua tanaman herbal tersebut telah banyak dimanfaatkan secara tunggal dan memberikan dampak positif terhadap pengobatan akibat infeksi patogen pada ikan ataupun udang yang dibudidayakan secara umum sinergis dalam ilmu pengobatan didefinisikan sebagai interaksi antara dua atau lebih agent obat yang diproduksi untuk meningkatkan efek pengobatan dari bahan aktif yang terkandung dalam obat dibandingkan jika obat tersebut diberikan secara tunggal pemanfaatan bawang putih dan belimbing wuluh diharapkan mampu memberikan nilai pengobatan yang lebih tinggi dibandingkan dengan pemanfaatan tunggalnya sehingga menghasilkan durasi pengobatan yang lebih singkat dan mampu menekan angka kematian akibat infeksi menjadi lebih kecil"
                        },
                        {
                            "title": "KAJIAN TEORI",
                            "content": "state of the art penyakit merupakan masalah yang serius dalam budidaya ikan karena dapat menimbulkan kegagalan panen dan kerugian ekonomi yang besar pemanfaatan bahan obat kimia untuk menanggulangi penyakit memilik efek negatif terhadap lingkungan ikan dan manusia oleh karena itu perlu dikaji alternatif pengendalian penyakit yang lebih aman sehingga mendukung untuk perikanan berkelanjutan kejadian penyakit pada ikan dipicu oleh tiga faktor antara kondisi imunitas ikan keberadaan patogen dan juga keseimbangan lingkungan perairan untuk mengatasi permasalahan tersebut perlu pengkajian tanaman obat yang dapat diaplikasikan pada sistem budidaya syarat utama tanaman obat adalah mudah ditemukan memiliki efek antibakterial dan immunostimulan serta aman jika diaplikasikan untuk keberlanjutan produksi tanaman obat dapat menjadi alternatif dikarenakan harganya yang murah dan lebih cocok dijadikan alternatif untuk kemoterapi pada kegiatan akuakultur hal ini dikarenakan komponen bioaktif yang terkandung memiliki sifat sebagai anti stress imunostimulan dan efek anti bakterial fungi virus dan parasit belimbing wuluh memiliki kandungan zat antibakterial maupun zat antioksidan yang mampu meningkatkan imunitas ikan zat zat aktif yang terkandung dalam buah belimbing wuluh antara lain flavonoid alkaloid tanin saponin dan vitamin c sari buah belimbing wuluh mampu mencegah infeksi bakteri aeromonas salmonicida pada konsentrasi g ml sedangkan bawang putih mengandung zat antibakterial dan juga bersifat sebagai imunostimulant karena mengandung antioksidan seperti organosulfur termasuk allicin ataupun allin dan golongan folifenol efek sinergis dari tanaman obat dapat dikelompokkan menjadi dua golongan pertama apabila terdapat dua atau lebih bahan aktif obat yang bekerja pada resptor biologi yang sama atau target yang sama sehingga dapat meningkatkan daya pengobatan berdasarkan interaksi positf kedua sinergitas dapat terjadi selama proses farmakinetic absorbsi distribusi metabolisme dan eliminasi yang mengarah ke perubahan secara kuantitatif bahan aktif obat di dalam tubuh dan oleh karena itu kombinasi tersebut dapat mempengaruhi efek pengobatan berdasarkan komponen yang dimiliki oleh bawang putih dan belimbing wuluh efek sinergis sangat mungkin terjadi dikarenakan kedua tanaman obat tersebut dapat dikatogorikan pada golongan pertama road map gambar peta jalan penelitian"
                        },
                        {
                            "title": "METODE PENELITIAN",
                            "content": "penelitian ini merupakan penelitian eksperimental dengan beberapa perlakuan yang akan mengkaji efek sinergis antara bawang putih dan belimbing wuluh terhadap pengobatan penyakit pada ikan tahapan penelitian ini terdiri dari preparasi bahan uji analisa fitokimia terhadap kombnasi belimbing wuluh dan bawang putih kultivasi bakteri uji in vitro yang disajikan pada diagram alir berikut gambar diagram alir penelitian bahan dan alat penelitian ini akan menggunakan bahan utama seperti belimbing wuluh matang bawang putih benih ikan lele pakan ikan lele dan bakteri aeromonas hydrophila alat yang digunakan adalah peralatan mikrobiologi standar metode penelitian penelitian ini akan mengkaji pencampuran dua ekstrak tanaman yaitu bawang putih bp dan belimbing wuluh bw terhadap efek pengobatan yang dihasilkan terhadap penyakit mas rancangan percobaan yang digunakan dalam penelitian ini adalah ral rancangan acak lengkap yang terdiri perlakuan dan ulangan konsentrasi perlakuan yang digunakan antara lain tahap i preparasi sari belimbing wuluh dan ekstraksi bawang puth tahap ii analisa fitokimia kandungan vitamin c flavonoid phenol saponin tanin alkaloid analisa in vitro ec uji mic dan uji mbc antbakterial uji sinergitas p ekstrak bawang putih p ekstrak belimbing wuluh p pencampuran ekstrak bawang putih dan belimbing wuluh p pencampuran ekstrak bawang putih dan belimbing wuluh p pencampuran ekstrak bawang putih dan belimbing wuluh cara kerja a preparasi sari belimbing wuluh dan ekstrak bawang putih belimbing wuluh yang digunakan adalah belimbing wuluh dewasa dengan tingkat kematangan dengan ciri kulit daging buah lembut belimbing wuluh dan bawang putih uji dicuci bersih dan dikering udara setelah kering belimbing wuluh dan bawang putih diblender tanpa menambahkan air dengan perbandingan sesuai perlakuan pemisahan antara serat dan sari dilakukan dengan melakukan penyaringan dan sentrifugasi pada kecepatan g selama menit pada suhu 40c untuk mengendapkan partikel yang terlewat dari saringan b analisa fitokimia tanin sebanyak gram sampel dimasukkan kedalam gelas kimia kemudian ditambahkan ml aquades lalu dididihkan dan disaring setelah itu ml filtrat ditambahkan ferriklorida dan diamati terjadinya perubahan warna saponin ke dalam gelas kimia dimasukkan sampel sebanyak gram lalu ditambah dengan ml aquades kemudian dididihkan lalu disaring diambil ml filtratnya dan ditambahkan ml aquades kemudian dikocok kuat hingga terbentuk busa lalu busanya ditambahkan tetes minyak zaitun setelah itu dikocok kembali dan diamati terbentuknya emulsi flavonoid sebanyak gram sampel dimasukkan ke dalam gelas kimia lalu ditambah dengan ml aquades kemudian dididihkan dan disaring ml filtratnya ditambahkan tetes aluminium klorida dan diamati alkaloid sebanyak gram sampel ditambah ml larutan n amoniakloroform kemudian campuran dikocok selama satu menit kemudian disaring kedalam tabung reaksi kepada filtrat tersebut ditambahkan mlh2so dan dikocok dengan teratur didiamkan sampai terbentuk dua lapisan lapisan atas fase air dipisahkan dan diuji dengan pereaksi meyer dan wagner c kultivasi dan perhitungan kepadatan bakteri isolat bakteri aeromonas hydrophila merupakan peremajaaan stok isolat di laboratorium budidaya perairan yang berasal dari bpbat sukabumi kultivasi awal menggunakan media cair tryptic soy broth tsb dengan menambahkan satu ose bakteri inkubasi biakan dilakukan pada suhu ruang selama jam perhitungan kepadatan bakteri menggunakan spektrofotometer pada panjang gelombang nm mcbriney et al dengan menggunakan kurva standar yang telah dibuat sebelumnya kurva standar kepadatan bakteri diperoleh dari jumlah koloni yang terhitung dengan metode total plate count tpc dan nilai absorbansi optical density od yang terbaca di spektrofotometer pendugaan kepadatan bakteri untuk uji selanjutnya akan menggunakan persamaan liniear yang dihasilkan dari kurva standar d penentuan nilai minimum bactericidal concentration mbc dan minimum inhibitory concentration mic penentuan nilai mbc dan mic menggunakan konsentrasi obat bertingkat mulai dari akuades steril dan serta larutan tetracycline ug ml uji mbc menentukan jumlah konsentrasi terendah dari obat yang mampu membunuh bakteri biakan bakteri pada media cair broth yang telah ditentukan kepadatannya cfu ml ditambahkan dengan bahan obat dengan perbandingan v v selanjutnya diinkubasi selama jam dengan suhu ruangan hoseinzadeh et al adapun konsentrasi yang digunakan adalah setelah diinkubasi biakan dituang sebanyak ml kedalam media agar tsa yang sudah steril nilai mbc dapat ditentukan apabila tidak terdapat koloni pada permukaan agar uji mic menentukan jumlah konsentrasi terendah dari obat yang mampu menghambat pertumbuhan bakteri biakan bakteri pada media cair broth yang telah ditentukan kepadatannya cfu ml ditambahkan dengan bahan obat dengan perbandingan v v selanjutnya diinkubasi selama jam dengan suhu ruangan hoseinzadeh et al setelah inkubasi dilakukan pengukuran kepadatan bakteri dengan menggunakan spektrofotometer pada panjang gelombang nm mcbriney et al e penentuan effective concentration ec ec adalah konsentrasi yang efektif untuk membunuh dari populasi bakteri perhitungan ec menggunakan rumus matematika yang mengacu pada alexander et al 𝐸𝐶 𝐷 𝐴 𝑘𝑒𝑝𝑎𝑑𝑎𝑡𝑎𝑛 𝑏𝑎𝑘𝑡𝑒𝑟𝑖 𝑚𝑎𝑘𝑠𝑖𝑚𝑎𝑙 𝑥 𝑋 𝑦 keterangan d dosis tertinggi yang paling dekat dengan dari kepadatan bakteri a jumlah kepadatan bakteri tertinggi x selisih dosis antara dosis tertinggi yang paling dekat dengan dari kepadatan bakteri dan dosis tererndah yang paling dekat dengan populasi bakteri y selisih antara jumlah bakteri tertinggi dengan jumlah bakteri dari populasi nilai ec akan digunakan untuk menentukan nila indeksi kombinasi ci dalam aplikasi calcusyn f analisis data data uji in vitro akan dianalisis menggunakan analisis indeksi kombinasi menggunakan program perangkat lunak yang ramah pengguna calcusyn efek sinergis terjadi apabila angka c dan jika c maka kombinasi hanya bersifat aditif sedangkan c maka bahan obat tersebut bersifat antagonistik data kombinasi sebelum menggunakan program calcusyn akan mengunakan persamaan linear dan menggunakan grafik standar untuk menunjang data efek sinergis sedangkan uji fitokimia dianalisis secara deskriptif yang didukung studi literatur deskripsi tugas peneliti pelaksanaan dan pembagian tugas dalam kegiatan penelitian ini disusun berdasarkan bidang keahlian dari masing masing peneliti yang disajikan pada tabel berikut tabel deskripsi tugas peneliti no kegiatan pic pelaksana uraian tugas persiapan bahan dan alat madyasta rr nabella melakukan pengumpulan bahan baku dan hewan uji beserta ketersediaan alat yang akan digunakan analisa fitokimia madyasta rr nabella melakukan analisa kandungan vitamin c flavonoid tanin saponin dan alkaloid secara periodik analisa in vitro sefti heza dwinanti madyasta rr winda melakukan kegiatan mikrobiologi untuk mengukur mic danmbc analisa invivo sefti heza dwinanti tanbiyaskur winda pemeliharaan hewan uji analisis histopatologi analisis gambaran darah analisa data sefti heza dwinanti tanbiyaskur madyasta rr melakukan analisa terkait data yang sudah diperoleh sesuai dengan keahlian masing masing laporan akhir dan penyusunan artikel tim penyusun laporan akhir"
                        }
                    ]
                },
                {
                    "title": "Tokenisasi",
                    "result": [
                        {
                            "title": "JUDUL",
                            "content": "kajian, efek, sinergis, dari, bawang, putih, dan, belimbing, wuluh, sebagai, kandidat, obat, untuk, penyakit, ikan"
                        },
                        {
                            "title": "RANGKUMAN",
                            "content": "peningkatan, keamanan, pangan, terhadap, konsumsi, ikan, menjadi, perhatian, khusus, untuk, keberlangsungan, budidaya, ikan, oleh, karena, itu, penggunaan, obat, obatan, dan, bahan, kimia, yang, berpotensi, mengganggu, kesehatan, manusia, telah, dilarang, penggunaanya, dalam, kegiatan, akuakultur, salah, satu, kendala, yang, dihadapi, dalam, kegiatan, budidaya, adalah, kejadian, penyakit, yang, secara, langsung, dapat, menyebabkan, kerugian, secara, materil, akibat, dari, gagal, panen, atau, turunnya, nilai, jual, ikan, dikarenakan, kondisi, ikan, yang, cacat, kejadian, penyakit, merupakan, interaksi, dari, tiga, faktor, dalam, sistem, budidaya, yaitu, kondisi, imunitas, ikan, keberadaan, patogen, dan, kondisi, lingkungan, pemeliharaan, ikan, pengendalian, penyakit, ikan, dapat, dilakukan, dengan, mengontrol, salah, satu, dari, faktor, tersebut, bawang, putih, dan, belimbing, wuluh, merupakan, salah, satu, tanaman, obat, obatan, yang, telah, umum, dimanfaatkan, dan, ditemukan, di, indonesia, tanaman, ini, berpotensi, sebagai, bahan, obat, karena, memiliki, senyawa, yang, bersifat, antibakterial, antiviral, anti, inflamasi, dan, juga, anti, fungal, pemanfaatan, bawang, putih, dan, belimbing, wuluh, untuk, pengobatan, ikan, secara, tunggal, memiliki, therpais, yang, baik, sebagaimana, yang, diketahui, kombinasi, obat, obatan, termasuk, herbal, mempunyai, peluang, positif, komplementasi, yang, dapat, meningkatkan, efektifitas, pengobatan, atau, memiliki, peluang, negatif, antagonistik, berupa, turunnya, kinerja, bahan, aktif, atau, bahkan, dapat, menimbulkan, kematian, penelitian, ini, merupakan, penelitian, eksperimental, lanjutan, yang, bertujuan, untuk, mengkaji, pemanfaatan, bawang, putih, dan, belimbing, wuluh, sebagai, kandidat, obat, untuk, mengatasi, penyakit, bakterial, pada, ikan, kegunaan, dari, penelitian, ini, antara, lain, memberikan, informasi, dan, acuan, penggunaan, belimbing, wuluh, dan, bawang, putih, bagi, petani, untuk, mengobati, infeksi, penyakit, bakterial, selama, masa, budidaya, hipotesis, yang, digunakan, adalah, kombinasi, belimbing, wuluh, dan, bawang, putih, memiliki, efek, sinergis, yang, mampu, meningkatkan, efektifitas, pengobatan, pada, ikan, yang, terserang, penyakit, luaran, penelitian, akan, dipresentasikan, pada, seminar, internasional, yang, menerbitkan, proceeding, terindeks, scopus, produk, tepat, guna, yang, dapat, dimanfaatkan, oleh, masyarakat, pembudidaya, dan, menjadi, bahan, ajar, pada, mata, kuliah, manajemen, kesehatan, ikan, sub, tema, fitofarmaka, dalam, akuakultur, tkt, penelitian, adalah, tingkat, dimana, dilakukan, pembuktian, konsep, terhadap, efektifitas, pengobatan, dengan, memanfaatkan, belimbing, wuluh, dan, bawang, putih, pada, ikan, yang, terinfeksi, penyakit, kata, kunci, bawang, putih, belimbing, wuluh, ethnomedicine, penyakit, ikan"
                        },
                        {
                            "title": "LATAR BELAKANG",
                            "content": "peningkatan, keamanan, pangan, terhadap, konsumsi, ikan, menjadi, perhatian, khusus, untuk, keberlangsungan, budidaya, ikan, oleh, karena, itu, penggunaan, obat, obatan, dan, bahan, kimia, yang, berpotensi, mengganggu, kesehatan, manusia, telah, dilarang, penggunaanya, dalam, kegiatan, akuakultur, penyakit, pada, ikan, merupakan, salah, satu, masalah, serius, yang, dihadapi, oleh, para, pembudidaya, ikan, karena, berpotensi, menimbulkan, kerugian, yang, sangat, besar, kerugian, yang, terjadi, dapat, berupa, peningkatan, kematian, ikan, dan, juga, dapat, menyebabkan, penurunan, kualitas, ikan, sehingga, secara, ekonomis, berakibat, pada, penurunan, harga, jual, ikan, umumnya, pengobatan, penyakit, ini, menggunakan, bahan, kimia, obat, yang, tidak, ramah, lingkungan, seperti, penggunaan, antibiotik, akan, tetapi, penggunaan, bahan, kimia, secara, terus, menerus, pada, kegiatan, budidaya, mempunyai, dampak, negatif, terhadap, lingkungan, ikan, dan, manusia, beberapa, bakteri, yang, sudah, resisten, terhadap, antibiotik, antara, lain, aeromonas, sp, dan, pseudomonas, sp, untuk, menghindari, dampak, negatif, penggunaan, antibiotik, tersebut, diperlukan, berbagai, metode, salah, satunya, adalah, pemanfaatan, tanaman, obat, untuk, menanggulangi, penyakit, selama, budidaya, ikan, dengan, memanfaatkan, bahan, alami, beberapa, bahan, alami, yang, telah, dimanfaatkan, untuk, meningkatkan, kekebalan, tubuh, telah, diujikan, pada, beberapa, jenis, ikan, dan, memberikan, efek, positif, terhadap, nilai, proteksi, ikan, hal, ini, dikarenakan, beberapa, bahan, herbal, memiliki, efek, menstimulus, sistem, imun, dan, juga, anti, bakterial, salah, satu, tanaman, obat, yang, mudah, ditemukan, di, indonesia, adalah, belimbing, wuluh, dan, bawang, putih, sari, buah, belimbing, wuluh, averrhoa, bilimbi, memiliki, kandungan, senyawa, kimia, diantaranya, adalah, flavonoid, dan, fenol, selain, itu, vitamin, c, yang, terkandung, dalam, belimbing, wuluh, berperan, sebagai, zat, antioksidan, sedangkan, bawang, putih, mengandung, zat, aktif, allicin, allin, dan, organik, sulfida, yang, dapat, bersifat, sebagai, antibakterial, dan, antiviral, pemanfaatan, kedua, tanaman, herbal, tersebut, telah, banyak, dimanfaatkan, secara, tunggal, dan, memberikan, dampak, positif, terhadap, pengobatan, akibat, infeksi, patogen, pada, ikan, ataupun, udang, yang, dibudidayakan, secara, umum, sinergis, dalam, ilmu, pengobatan, didefinisikan, sebagai, interaksi, antara, dua, atau, lebih, agent, obat, yang, diproduksi, untuk, meningkatkan, efek, pengobatan, dari, bahan, aktif, yang, terkandung, dalam, obat, dibandingkan, jika, obat, tersebut, diberikan, secara, tunggal, pemanfaatan, bawang, putih, dan, belimbing, wuluh, diharapkan, mampu, memberikan, nilai, pengobatan, yang, lebih, tinggi, dibandingkan, dengan, pemanfaatan, tunggalnya, sehingga, menghasilkan, durasi, pengobatan, yang, lebih, singkat, dan, mampu, menekan, angka, kematian, akibat, infeksi, menjadi, lebih, kecil"
                        },
                        {
                            "title": "KAJIAN TEORI",
                            "content": "state, of, the, art, penyakit, merupakan, masalah, yang, serius, dalam, budidaya, ikan, karena, dapat, menimbulkan, kegagalan, panen, dan, kerugian, ekonomi, yang, besar, pemanfaatan, bahan, obat, kimia, untuk, menanggulangi, penyakit, memilik, efek, negatif, terhadap, lingkungan, ikan, dan, manusia, oleh, karena, itu, perlu, dikaji, alternatif, pengendalian, penyakit, yang, lebih, aman, sehingga, mendukung, untuk, perikanan, berkelanjutan, kejadian, penyakit, pada, ikan, dipicu, oleh, tiga, faktor, antara, kondisi, imunitas, ikan, keberadaan, patogen, dan, juga, keseimbangan, lingkungan, perairan, untuk, mengatasi, permasalahan, tersebut, perlu, pengkajian, tanaman, obat, yang, dapat, diaplikasikan, pada, sistem, budidaya, syarat, utama, tanaman, obat, adalah, mudah, ditemukan, memiliki, efek, antibakterial, dan, immunostimulan, serta, aman, jika, diaplikasikan, untuk, keberlanjutan, produksi, tanaman, obat, dapat, menjadi, alternatif, dikarenakan, harganya, yang, murah, dan, lebih, cocok, dijadikan, alternatif, untuk, kemoterapi, pada, kegiatan, akuakultur, hal, ini, dikarenakan, komponen, bioaktif, yang, terkandung, memiliki, sifat, sebagai, anti, stress, imunostimulan, dan, efek, anti, bakterial, fungi, virus, dan, parasit, belimbing, wuluh, memiliki, kandungan, zat, antibakterial, maupun, zat, antioksidan, yang, mampu, meningkatkan, imunitas, ikan, zat, zat, aktif, yang, terkandung, dalam, buah, belimbing, wuluh, antara, lain, flavonoid, alkaloid, tanin, saponin, dan, vitamin, c, sari, buah, belimbing, wuluh, mampu, mencegah, infeksi, bakteri, aeromonas, salmonicida, pada, konsentrasi, g, ml, sedangkan, bawang, putih, mengandung, zat, antibakterial, dan, juga, bersifat, sebagai, imunostimulant, karena, mengandung, antioksidan, seperti, organosulfur, termasuk, allicin, ataupun, allin, dan, golongan, folifenol, efek, sinergis, dari, tanaman, obat, dapat, dikelompokkan, menjadi, dua, golongan, pertama, apabila, terdapat, dua, atau, lebih, bahan, aktif, obat, yang, bekerja, pada, resptor, biologi, yang, sama, atau, target, yang, sama, sehingga, dapat, meningkatkan, daya, pengobatan, berdasarkan, interaksi, positf, kedua, sinergitas, dapat, terjadi, selama, proses, farmakinetic, absorbsi, distribusi, metabolisme, dan, eliminasi, yang, mengarah, ke, perubahan, secara, kuantitatif, bahan, aktif, obat, di, dalam, tubuh, dan, oleh, karena, itu, kombinasi, tersebut, dapat, mempengaruhi, efek, pengobatan, berdasarkan, komponen, yang, dimiliki, oleh, bawang, putih, dan, belimbing, wuluh, efek, sinergis, sangat, mungkin, terjadi, dikarenakan, kedua, tanaman, obat, tersebut, dapat, dikatogorikan, pada, golongan, pertama, road, map, gambar, peta, jalan, penelitian"
                        },
                        {
                            "title": "METODE PENELITIAN",
                            "content": "penelitian, ini, merupakan, penelitian, eksperimental, dengan, beberapa, perlakuan, yang, akan, mengkaji, efek, sinergis, antara, bawang, putih, dan, belimbing, wuluh, terhadap, pengobatan, penyakit, pada, ikan, tahapan, penelitian, ini, terdiri, dari, preparasi, bahan, uji, analisa, fitokimia, terhadap, kombnasi, belimbing, wuluh, dan, bawang, putih, kultivasi, bakteri, uji, in, vitro, yang, disajikan, pada, diagram, alir, berikut, gambar, diagram, alir, penelitian, bahan, dan, alat, penelitian, ini, akan, menggunakan, bahan, utama, seperti, belimbing, wuluh, matang, bawang, putih, benih, ikan, lele, pakan, ikan, lele, dan, bakteri, aeromonas, hydrophila, alat, yang, digunakan, adalah, peralatan, mikrobiologi, standar, metode, penelitian, penelitian, ini, akan, mengkaji, pencampuran, dua, ekstrak, tanaman, yaitu, bawang, putih, bp, dan, belimbing, wuluh, bw, terhadap, efek, pengobatan, yang, dihasilkan, terhadap, penyakit, mas, rancangan, percobaan, yang, digunakan, dalam, penelitian, ini, adalah, ral, rancangan, acak, lengkap, yang, terdiri, perlakuan, dan, ulangan, konsentrasi, perlakuan, yang, digunakan, antara, lain, tahap, i, preparasi, sari, belimbing, wuluh, dan, ekstraksi, bawang, puth, tahap, ii, analisa, fitokimia, kandungan, vitamin, c, flavonoid, phenol, saponin, tanin, alkaloid, analisa, in, vitro, ec, uji, mic, dan, uji, mbc, antbakterial, uji, sinergitas, p, ekstrak, bawang, putih, p, ekstrak, belimbing, wuluh, p, pencampuran, ekstrak, bawang, putih, dan, belimbing, wuluh, p, pencampuran, ekstrak, bawang, putih, dan, belimbing, wuluh, p, pencampuran, ekstrak, bawang, putih, dan, belimbing, wuluh, cara, kerja, a, preparasi, sari, belimbing, wuluh, dan, ekstrak, bawang, putih, belimbing, wuluh, yang, digunakan, adalah, belimbing, wuluh, dewasa, dengan, tingkat, kematangan, dengan, ciri, kulit, daging, buah, lembut, belimbing, wuluh, dan, bawang, putih, uji, dicuci, bersih, dan, dikering, udara, setelah, kering, belimbing, wuluh, dan, bawang, putih, diblender, tanpa, menambahkan, air, dengan, perbandingan, sesuai, perlakuan, pemisahan, antara, serat, dan, sari, dilakukan, dengan, melakukan, penyaringan, dan, sentrifugasi, pada, kecepatan, g, selama, menit, pada, suhu, 40c, untuk, mengendapkan, partikel, yang, terlewat, dari, saringan, b, analisa, fitokimia, tanin, sebanyak, gram, sampel, dimasukkan, kedalam, gelas, kimia, kemudian, ditambahkan, ml, aquades, lalu, dididihkan, dan, disaring, setelah, itu, ml, filtrat, ditambahkan, ferriklorida, dan, diamati, terjadinya, perubahan, warna, saponin, ke, dalam, gelas, kimia, dimasukkan, sampel, sebanyak, gram, lalu, ditambah, dengan, ml, aquades, kemudian, dididihkan, lalu, disaring, diambil, ml, filtratnya, dan, ditambahkan, ml, aquades, kemudian, dikocok, kuat, hingga, terbentuk, busa, lalu, busanya, ditambahkan, tetes, minyak, zaitun, setelah, itu, dikocok, kembali, dan, diamati, terbentuknya, emulsi, flavonoid, sebanyak, gram, sampel, dimasukkan, ke, dalam, gelas, kimia, lalu, ditambah, dengan, ml, aquades, kemudian, dididihkan, dan, disaring, ml, filtratnya, ditambahkan, tetes, aluminium, klorida, dan, diamati, alkaloid, sebanyak, gram, sampel, ditambah, ml, larutan, n, amoniakloroform, kemudian, campuran, dikocok, selama, satu, menit, kemudian, disaring, kedalam, tabung, reaksi, kepada, filtrat, tersebut, ditambahkan, mlh2so, dan, dikocok, dengan, teratur, didiamkan, sampai, terbentuk, dua, lapisan, lapisan, atas, fase, air, dipisahkan, dan, diuji, dengan, pereaksi, meyer, dan, wagner, c, kultivasi, dan, perhitungan, kepadatan, bakteri, isolat, bakteri, aeromonas, hydrophila, merupakan, peremajaaan, stok, isolat, di, laboratorium, budidaya, perairan, yang, berasal, dari, bpbat, sukabumi, kultivasi, awal, menggunakan, media, cair, tryptic, soy, broth, tsb, dengan, menambahkan, satu, ose, bakteri, inkubasi, biakan, dilakukan, pada, suhu, ruang, selama, jam, perhitungan, kepadatan, bakteri, menggunakan, spektrofotometer, pada, panjang, gelombang, nm, mcbriney, et, al, dengan, menggunakan, kurva, standar, yang, telah, dibuat, sebelumnya, kurva, standar, kepadatan, bakteri, diperoleh, dari, jumlah, koloni, yang, terhitung, dengan, metode, total, plate, count, tpc, dan, nilai, absorbansi, optical, density, od, yang, terbaca, di, spektrofotometer, pendugaan, kepadatan, bakteri, untuk, uji, selanjutnya, akan, menggunakan, persamaan, liniear, yang, dihasilkan, dari, kurva, standar, d, penentuan, nilai, minimum, bactericidal, concentration, mbc, dan, minimum, inhibitory, concentration, mic, penentuan, nilai, mbc, dan, mic, menggunakan, konsentrasi, obat, bertingkat, mulai, dari, akuades, steril, dan, serta, larutan, tetracycline, ug, ml, uji, mbc, menentukan, jumlah, konsentrasi, terendah, dari, obat, yang, mampu, membunuh, bakteri, biakan, bakteri, pada, media, cair, broth, yang, telah, ditentukan, kepadatannya, cfu, ml, ditambahkan, dengan, bahan, obat, dengan, perbandingan, v, v, selanjutnya, diinkubasi, selama, jam, dengan, suhu, ruangan, hoseinzadeh, et, al, adapun, konsentrasi, yang, digunakan, adalah, setelah, diinkubasi, biakan, dituang, sebanyak, ml, kedalam, media, agar, tsa, yang, sudah, steril, nilai, mbc, dapat, ditentukan, apabila, tidak, terdapat, koloni, pada, permukaan, agar, uji, mic, menentukan, jumlah, konsentrasi, terendah, dari, obat, yang, mampu, menghambat, pertumbuhan, bakteri, biakan, bakteri, pada, media, cair, broth, yang, telah, ditentukan, kepadatannya, cfu, ml, ditambahkan, dengan, bahan, obat, dengan, perbandingan, v, v, selanjutnya, diinkubasi, selama, jam, dengan, suhu, ruangan, hoseinzadeh, et, al, setelah, inkubasi, dilakukan, pengukuran, kepadatan, bakteri, dengan, menggunakan, spektrofotometer, pada, panjang, gelombang, nm, mcbriney, et, al, e, penentuan, effective, concentration, ec, ec, adalah, konsentrasi, yang, efektif, untuk, membunuh, dari, populasi, bakteri, perhitungan, ec, menggunakan, rumus, matematika, yang, mengacu, pada, alexander, et, al, 𝐸𝐶, 𝐷, 𝐴, 𝑘𝑒𝑝𝑎𝑑𝑎𝑡𝑎𝑛, 𝑏𝑎𝑘𝑡𝑒𝑟𝑖, 𝑚𝑎𝑘𝑠𝑖𝑚𝑎𝑙, 𝑥, 𝑋, 𝑦, keterangan, d, dosis, tertinggi, yang, paling, dekat, dengan, dari, kepadatan, bakteri, a, jumlah, kepadatan, bakteri, tertinggi, x, selisih, dosis, antara, dosis, tertinggi, yang, paling, dekat, dengan, dari, kepadatan, bakteri, dan, dosis, tererndah, yang, paling, dekat, dengan, populasi, bakteri, y, selisih, antara, jumlah, bakteri, tertinggi, dengan, jumlah, bakteri, dari, populasi, nilai, ec, akan, digunakan, untuk, menentukan, nila, indeksi, kombinasi, ci, dalam, aplikasi, calcusyn, f, analisis, data, data, uji, in, vitro, akan, dianalisis, menggunakan, analisis, indeksi, kombinasi, menggunakan, program, perangkat, lunak, yang, ramah, pengguna, calcusyn, efek, sinergis, terjadi, apabila, angka, c, dan, jika, c, maka, kombinasi, hanya, bersifat, aditif, sedangkan, c, maka, bahan, obat, tersebut, bersifat, antagonistik, data, kombinasi, sebelum, menggunakan, program, calcusyn, akan, mengunakan, persamaan, linear, dan, menggunakan, grafik, standar, untuk, menunjang, data, efek, sinergis, sedangkan, uji, fitokimia, dianalisis, secara, deskriptif, yang, didukung, studi, literatur, deskripsi, tugas, peneliti, pelaksanaan, dan, pembagian, tugas, dalam, kegiatan, penelitian, ini, disusun, berdasarkan, bidang, keahlian, dari, masing, masing, peneliti, yang, disajikan, pada, tabel, berikut, tabel, deskripsi, tugas, peneliti, no, kegiatan, pic, pelaksana, uraian, tugas, persiapan, bahan, dan, alat, madyasta, rr, nabella, melakukan, pengumpulan, bahan, baku, dan, hewan, uji, beserta, ketersediaan, alat, yang, akan, digunakan, analisa, fitokimia, madyasta, rr, nabella, melakukan, analisa, kandungan, vitamin, c, flavonoid, tanin, saponin, dan, alkaloid, secara, periodik, analisa, in, vitro, sefti, heza, dwinanti, madyasta, rr, winda, melakukan, kegiatan, mikrobiologi, untuk, mengukur, mic, danmbc, analisa, invivo, sefti, heza, dwinanti, tanbiyaskur, winda, pemeliharaan, hewan, uji, analisis, histopatologi, analisis, gambaran, darah, analisa, data, sefti, heza, dwinanti, tanbiyaskur, madyasta, rr, melakukan, analisa, terkait, data, yang, sudah, diperoleh, sesuai, dengan, keahlian, masing, masing, laporan, akhir, dan, penyusunan, artikel, tim, penyusun, laporan, akhir"
                        }
                    ]
                },
                {
                    "title": "Stopword Removal",
                    "result": [
                        {
                            "title": "JUDUL",
                            "content": "kajian, efek, sinergis, bawang, putih, belimbing, wuluh, kandidat, obat, penyakit, ikan"
                        },
                        {
                            "title": "RANGKUMAN",
                            "content": "peningkatan, keamanan, pangan, konsumsi, ikan, perhatian, keberlangsungan, budidaya, ikan, penggunaan, obat, obatan, bahan, kimia, berpotensi, mengganggu, kesehatan, manusia, dilarang, penggunaanya, kegiatan, akuakultur, salah, kendala, dihadapi, kegiatan, budidaya, kejadian, penyakit, menyebabkan, kerugian, materil, akibat, gagal, panen, turunnya, nilai, jual, ikan, kondisi, ikan, cacat, kejadian, penyakit, interaksi, faktor, sistem, budidaya, kondisi, imunitas, ikan, keberadaan, patogen, kondisi, lingkungan, pemeliharaan, ikan, pengendalian, penyakit, ikan, mengontrol, salah, faktor, bawang, putih, belimbing, wuluh, salah, tanaman, obat, obatan, umum, dimanfaatkan, ditemukan, indonesia, tanaman, berpotensi, bahan, obat, memiliki, senyawa, bersifat, antibakterial, antiviral, anti, inflamasi, anti, fungal, pemanfaatan, bawang, putih, belimbing, wuluh, pengobatan, ikan, tunggal, memiliki, therpais, kombinasi, obat, obatan, herbal, peluang, positif, komplementasi, meningkatkan, efektifitas, pengobatan, memiliki, peluang, negatif, antagonistik, turunnya, kinerja, bahan, aktif, menimbulkan, kematian, penelitian, penelitian, eksperimental, lanjutan, bertujuan, mengkaji, pemanfaatan, bawang, putih, belimbing, wuluh, kandidat, obat, mengatasi, penyakit, bakterial, ikan, kegunaan, penelitian, informasi, acuan, penggunaan, belimbing, wuluh, bawang, putih, petani, mengobati, infeksi, penyakit, bakterial, budidaya, hipotesis, kombinasi, belimbing, wuluh, bawang, putih, memiliki, efek, sinergis, meningkatkan, efektifitas, pengobatan, ikan, terserang, penyakit, luaran, penelitian, dipresentasikan, seminar, internasional, menerbitkan, proceeding, terindeks, scopus, produk, dimanfaatkan, masyarakat, pembudidaya, bahan, ajar, kuliah, manajemen, kesehatan, ikan, sub, tema, fitofarmaka, akuakultur, tkt, penelitian, tingkat, dimana, pembuktian, konsep, efektifitas, pengobatan, memanfaatkan, belimbing, wuluh, bawang, putih, ikan, terinfeksi, penyakit, kunci, bawang, putih, belimbing, wuluh, ethnomedicine, penyakit, ikan"
                        },
                        {
                            "title": "LATAR BELAKANG",
                            "content": "peningkatan, keamanan, pangan, konsumsi, ikan, perhatian, keberlangsungan, budidaya, ikan, penggunaan, obat, obatan, bahan, kimia, berpotensi, mengganggu, kesehatan, manusia, dilarang, penggunaanya, kegiatan, akuakultur, penyakit, ikan, salah, serius, dihadapi, pembudidaya, ikan, berpotensi, menimbulkan, kerugian, kerugian, peningkatan, kematian, ikan, menyebabkan, penurunan, kualitas, ikan, ekonomis, berakibat, penurunan, harga, jual, ikan, pengobatan, penyakit, bahan, kimia, obat, ramah, lingkungan, penggunaan, antibiotik, penggunaan, bahan, kimia, menerus, kegiatan, budidaya, dampak, negatif, lingkungan, ikan, manusia, bakteri, resisten, antibiotik, aeromonas, sp, pseudomonas, sp, menghindari, dampak, negatif, penggunaan, antibiotik, metode, salah, satunya, pemanfaatan, tanaman, obat, menanggulangi, penyakit, budidaya, ikan, memanfaatkan, bahan, alami, bahan, alami, dimanfaatkan, meningkatkan, kekebalan, tubuh, diujikan, jenis, ikan, efek, positif, nilai, proteksi, ikan, bahan, herbal, memiliki, efek, menstimulus, sistem, imun, anti, bakterial, salah, tanaman, obat, mudah, ditemukan, indonesia, belimbing, wuluh, bawang, putih, sari, buah, belimbing, wuluh, averrhoa, bilimbi, memiliki, kandungan, senyawa, kimia, flavonoid, fenol, vitamin, terkandung, belimbing, wuluh, berperan, zat, antioksidan, bawang, putih, mengandung, zat, aktif, allicin, allin, organik, sulfida, bersifat, antibakterial, antiviral, pemanfaatan, tanaman, herbal, dimanfaatkan, tunggal, dampak, positif, pengobatan, akibat, infeksi, patogen, ikan, udang, dibudidayakan, umum, sinergis, ilmu, pengobatan, didefinisikan, interaksi, agent, obat, diproduksi, meningkatkan, efek, pengobatan, bahan, aktif, terkandung, obat, dibandingkan, obat, tunggal, pemanfaatan, bawang, putih, belimbing, wuluh, diharapkan, nilai, pengobatan, tinggi, dibandingkan, pemanfaatan, tunggalnya, menghasilkan, durasi, pengobatan, singkat, menekan, angka, kematian, akibat, infeksi"
                        },
                        {
                            "title": "KAJIAN TEORI",
                            "content": "state, of, the, art, penyakit, serius, budidaya, ikan, menimbulkan, kegagalan, panen, kerugian, ekonomi, pemanfaatan, bahan, obat, kimia, menanggulangi, penyakit, memilik, efek, negatif, lingkungan, ikan, manusia, dikaji, alternatif, pengendalian, penyakit, aman, mendukung, perikanan, berkelanjutan, kejadian, penyakit, ikan, dipicu, faktor, kondisi, imunitas, ikan, keberadaan, patogen, keseimbangan, lingkungan, perairan, mengatasi, permasalahan, pengkajian, tanaman, obat, diaplikasikan, sistem, budidaya, syarat, utama, tanaman, obat, mudah, ditemukan, memiliki, efek, antibakterial, immunostimulan, aman, diaplikasikan, keberlanjutan, produksi, tanaman, obat, alternatif, harganya, murah, cocok, dijadikan, alternatif, kemoterapi, kegiatan, akuakultur, komponen, bioaktif, terkandung, memiliki, sifat, anti, stress, imunostimulan, efek, anti, bakterial, fungi, virus, parasit, belimbing, wuluh, memiliki, kandungan, zat, antibakterial, zat, antioksidan, meningkatkan, imunitas, ikan, zat, zat, aktif, terkandung, buah, belimbing, wuluh, flavonoid, alkaloid, tanin, saponin, vitamin, sari, buah, belimbing, wuluh, mencegah, infeksi, bakteri, aeromonas, salmonicida, konsentrasi, ml, bawang, putih, mengandung, zat, antibakterial, bersifat, imunostimulant, mengandung, antioksidan, organosulfur, allicin, allin, golongan, folifenol, efek, sinergis, tanaman, obat, dikelompokkan, golongan, bahan, aktif, obat, resptor, biologi, target, meningkatkan, daya, pengobatan, berdasarkan, interaksi, positf, sinergitas, proses, farmakinetic, absorbsi, distribusi, metabolisme, eliminasi, mengarah, perubahan, kuantitatif, bahan, aktif, obat, tubuh, kombinasi, mempengaruhi, efek, pengobatan, berdasarkan, komponen, dimiliki, bawang, putih, belimbing, wuluh, efek, sinergis, tanaman, obat, dikatogorikan, golongan, road, map, gambar, peta, jalan, penelitian"
                        },
                        {
                            "title": "METODE PENELITIAN",
                            "content": "penelitian, penelitian, eksperimental, perlakuan, mengkaji, efek, sinergis, bawang, putih, belimbing, wuluh, pengobatan, penyakit, ikan, tahapan, penelitian, preparasi, bahan, uji, analisa, fitokimia, kombnasi, belimbing, wuluh, bawang, putih, kultivasi, bakteri, uji, in, vitro, disajikan, diagram, alir, gambar, diagram, alir, penelitian, bahan, alat, penelitian, bahan, utama, belimbing, wuluh, matang, bawang, putih, benih, ikan, lele, pakan, ikan, lele, bakteri, aeromonas, hydrophila, alat, peralatan, mikrobiologi, standar, metode, penelitian, penelitian, mengkaji, pencampuran, ekstrak, tanaman, bawang, putih, bp, belimbing, wuluh, bw, efek, pengobatan, dihasilkan, penyakit, mas, rancangan, percobaan, penelitian, ral, rancangan, acak, lengkap, perlakuan, ulangan, konsentrasi, perlakuan, tahap, preparasi, sari, belimbing, wuluh, ekstraksi, bawang, puth, tahap, ii, analisa, fitokimia, kandungan, vitamin, flavonoid, phenol, saponin, tanin, alkaloid, analisa, in, vitro, ec, uji, mic, uji, mbc, antbakterial, uji, sinergitas, ekstrak, bawang, putih, ekstrak, belimbing, wuluh, pencampuran, ekstrak, bawang, putih, belimbing, wuluh, pencampuran, ekstrak, bawang, putih, belimbing, wuluh, pencampuran, ekstrak, bawang, putih, belimbing, wuluh, preparasi, sari, belimbing, wuluh, ekstrak, bawang, putih, belimbing, wuluh, belimbing, wuluh, dewasa, tingkat, kematangan, ciri, kulit, daging, buah, lembut, belimbing, wuluh, bawang, putih, uji, dicuci, bersih, dikering, udara, kering, belimbing, wuluh, bawang, putih, diblender, air, perbandingan, sesuai, perlakuan, pemisahan, serat, sari, penyaringan, sentrifugasi, kecepatan, menit, suhu, 40c, mengendapkan, partikel, terlewat, saringan, analisa, fitokimia, tanin, gram, sampel, dimasukkan, kedalam, gelas, kimia, ml, aquades, dididihkan, disaring, ml, filtrat, ferriklorida, diamati, perubahan, warna, saponin, gelas, kimia, dimasukkan, sampel, gram, ditambah, ml, aquades, dididihkan, disaring, diambil, ml, filtratnya, ml, aquades, dikocok, kuat, terbentuk, busa, busanya, tetes, minyak, zaitun, dikocok, diamati, terbentuknya, emulsi, flavonoid, gram, sampel, dimasukkan, gelas, kimia, ditambah, ml, aquades, dididihkan, disaring, ml, filtratnya, tetes, aluminium, klorida, diamati, alkaloid, gram, sampel, ditambah, ml, larutan, amoniakloroform, campuran, dikocok, menit, disaring, kedalam, tabung, reaksi, filtrat, mlh2so, dikocok, teratur, didiamkan, terbentuk, lapisan, lapisan, fase, air, dipisahkan, diuji, pereaksi, meyer, wagner, kultivasi, perhitungan, kepadatan, bakteri, isolat, bakteri, aeromonas, hydrophila, peremajaaan, stok, isolat, laboratorium, budidaya, perairan, berasal, bpbat, sukabumi, kultivasi, media, cair, tryptic, soy, broth, tsb, ose, bakteri, inkubasi, biakan, suhu, ruang, jam, perhitungan, kepadatan, bakteri, spektrofotometer, gelombang, nm, mcbriney, et, al, kurva, standar, kurva, standar, kepadatan, bakteri, diperoleh, koloni, terhitung, metode, total, plate, count, tpc, nilai, absorbansi, optical, density, od, terbaca, spektrofotometer, pendugaan, kepadatan, bakteri, uji, persamaan, liniear, dihasilkan, kurva, standar, penentuan, nilai, minimum, bactericidal, concentration, mbc, minimum, inhibitory, concentration, mic, penentuan, nilai, mbc, mic, konsentrasi, obat, bertingkat, akuades, steril, larutan, tetracycline, ug, ml, uji, mbc, menentukan, konsentrasi, terendah, obat, membunuh, bakteri, biakan, bakteri, media, cair, broth, ditentukan, kepadatannya, cfu, ml, bahan, obat, perbandingan, diinkubasi, jam, suhu, ruangan, hoseinzadeh, et, al, konsentrasi, diinkubasi, biakan, dituang, ml, kedalam, media, tsa, steril, nilai, mbc, ditentukan, koloni, permukaan, uji, mic, menentukan, konsentrasi, terendah, obat, menghambat, pertumbuhan, bakteri, biakan, bakteri, media, cair, broth, ditentukan, kepadatannya, cfu, ml, bahan, obat, perbandingan, diinkubasi, jam, suhu, ruangan, hoseinzadeh, et, al, inkubasi, pengukuran, kepadatan, bakteri, spektrofotometer, gelombang, nm, mcbriney, et, al, penentuan, effective, concentration, ec, ec, konsentrasi, efektif, membunuh, populasi, bakteri, perhitungan, ec, rumus, matematika, mengacu, alexander, et, al, 𝐸𝐶, 𝐷, 𝐴, 𝑘𝑒𝑝𝑎𝑑𝑎𝑡𝑎𝑛, 𝑏𝑎𝑘𝑡𝑒𝑟𝑖, 𝑚𝑎𝑘𝑠𝑖𝑚𝑎𝑙, 𝑥, 𝑋, 𝑦, keterangan, dosis, tertinggi, kepadatan, bakteri, kepadatan, bakteri, tertinggi, selisih, dosis, dosis, tertinggi, kepadatan, bakteri, dosis, tererndah, populasi, bakteri, selisih, bakteri, tertinggi, bakteri, populasi, nilai, ec, menentukan, nila, indeksi, kombinasi, ci, aplikasi, calcusyn, analisis, data, data, uji, in, vitro, dianalisis, analisis, indeksi, kombinasi, program, perangkat, lunak, ramah, pengguna, calcusyn, efek, sinergis, angka, kombinasi, bersifat, aditif, bahan, obat, bersifat, antagonistik, data, kombinasi, program, calcusyn, mengunakan, persamaan, linear, grafik, standar, menunjang, data, efek, sinergis, uji, fitokimia, dianalisis, deskriptif, didukung, studi, literatur, deskripsi, tugas, peneliti, pelaksanaan, pembagian, tugas, kegiatan, penelitian, disusun, berdasarkan, bidang, keahlian, peneliti, disajikan, tabel, tabel, deskripsi, tugas, peneliti, no, kegiatan, pic, pelaksana, uraian, tugas, persiapan, bahan, alat, madyasta, rr, nabella, pengumpulan, bahan, baku, hewan, uji, beserta, ketersediaan, alat, analisa, fitokimia, madyasta, rr, nabella, analisa, kandungan, vitamin, flavonoid, tanin, saponin, alkaloid, periodik, analisa, in, vitro, sefti, heza, dwinanti, madyasta, rr, winda, kegiatan, mikrobiologi, mengukur, mic, danmbc, analisa, invivo, sefti, heza, dwinanti, tanbiyaskur, winda, pemeliharaan, hewan, uji, analisis, histopatologi, analisis, gambaran, darah, analisa, data, sefti, heza, dwinanti, tanbiyaskur, madyasta, rr, analisa, terkait, data, diperoleh, sesuai, keahlian, laporan, penyusunan, artikel, tim, penyusun, laporan"
                        }
                    ]
                },
                {
                    "title": "Stemming",
                    "result": [
                        {
                            "title": "JUDUL",
                            "content": "kaji, efek, sinergis, bawang, putih, belimbing, wuluh, kandidat, obat, sakit, ikan"
                        },
                        {
                            "title": "RANGKUMAN",
                            "content": "tingkat, aman, pangan, konsumsi, ikan, perhati, langsung, budidaya, ikan, guna, obat, obat, bahan, kimia, potensi, ganggu, sehat, manusia, larang, penggunaanya, giat, akuakultur, salah, kendala, hadap, giat, budidaya, jadi, sakit, sebab, rugi, materil, akibat, gagal, panen, turun, nilai, jual, ikan, kondisi, ikan, cacat, jadi, sakit, interaksi, faktor, sistem, budidaya, kondisi, imunitas, ikan, ada, patogen, kondisi, lingkung, pelihara, ikan, kendali, sakit, ikan, kontrol, salah, faktor, bawang, putih, belimbing, wuluh, salah, tanam, obat, obat, umum, manfaat, temu, indonesia, tanam, potensi, bahan, obat, milik, senyawa, sifat, antibakterial, antiviral, anti, inflamasi, anti, fungal, manfaat, bawang, putih, belimbing, wuluh, obat, ikan, tunggal, milik, therpais, kombinasi, obat, obat, herbal, peluang, positif, komplementasi, tingkat, efektifitas, obat, milik, peluang, negatif, antagonistik, turun, kerja, bahan, aktif, timbul, mati, teliti, teliti, eksperimental, lanjut, tuju, kaji, manfaat, bawang, putih, belimbing, wuluh, kandidat, obat, atas, sakit, bakterial, ikan, guna, teliti, informasi, acu, guna, belimbing, wuluh, bawang, putih, tani, obat, infeksi, sakit, bakterial, budidaya, hipotesis, kombinasi, belimbing, wuluh, bawang, putih, milik, efek, sinergis, tingkat, efektifitas, obat, ikan, serang, sakit, luar, teliti, presentasi, seminar, internasional, terbit, proceeding, indeks, scopus, produk, manfaat, masyarakat, pembudidaya, bahan, ajar, kuliah, manajemen, sehat, ikan, sub, tema, fitofarmaka, akuakultur, tkt, teliti, tingkat, mana, bukti, konsep, efektifitas, obat, manfaat, belimbing, wuluh, bawang, putih, ikan, infeksi, sakit, kunci, bawang, putih, belimbing, wuluh, ethnomedicine, sakit, ikan"
                        },
                        {
                            "title": "LATAR BELAKANG",
                            "content": "tingkat, aman, pangan, konsumsi, ikan, perhati, langsung, budidaya, ikan, guna, obat, obat, bahan, kimia, potensi, ganggu, sehat, manusia, larang, penggunaanya, giat, akuakultur, sakit, ikan, salah, serius, hadap, pembudidaya, ikan, potensi, timbul, rugi, rugi, tingkat, mati, ikan, sebab, turun, kualitas, ikan, ekonomis, akibat, turun, harga, jual, ikan, obat, sakit, bahan, kimia, obat, ramah, lingkung, guna, antibiotik, guna, bahan, kimia, terus, giat, budidaya, dampak, negatif, lingkung, ikan, manusia, bakteri, resisten, antibiotik, aeromonas, sp, pseudomonas, sp, hindar, dampak, negatif, guna, antibiotik, metode, salah, satu, manfaat, tanam, obat, tanggulang, sakit, budidaya, ikan, manfaat, bahan, alami, bahan, alami, manfaat, tingkat, kebal, tubuh, uji, jenis, ikan, efek, positif, nilai, proteksi, ikan, bahan, herbal, milik, efek, stimulus, sistem, imun, anti, bakterial, salah, tanam, obat, mudah, temu, indonesia, belimbing, wuluh, bawang, putih, sari, buah, belimbing, wuluh, averrhoa, bilimbi, milik, kandung, senyawa, kimia, flavonoid, fenol, vitamin, kandung, belimbing, wuluh, peran, zat, antioksidan, bawang, putih, kandung, zat, aktif, allicin, allin, organik, sulfida, sifat, antibakterial, antiviral, manfaat, tanam, herbal, manfaat, tunggal, dampak, positif, obat, akibat, infeksi, patogen, ikan, udang, dibudidayakan, umum, sinergis, ilmu, obat, definisi, interaksi, agent, obat, produksi, tingkat, efek, obat, bahan, aktif, kandung, obat, banding, obat, tunggal, manfaat, bawang, putih, belimbing, wuluh, harap, nilai, obat, tinggi, banding, manfaat, tunggal, hasil, durasi, obat, singkat, tekan, angka, mati, akibat, infeksi"
                        },
                        {
                            "title": "KAJIAN TEORI",
                            "content": "state, of, the, art, sakit, serius, budidaya, ikan, timbul, gagal, panen, rugi, ekonomi, manfaat, bahan, obat, kimia, tanggulang, sakit, milik, efek, negatif, lingkung, ikan, manusia, kaji, alternatif, kendali, sakit, aman, dukung, ikan, lanjut, jadi, sakit, ikan, picu, faktor, kondisi, imunitas, ikan, ada, patogen, imbang, lingkung, air, atas, masalah, kaji, tanam, obat, aplikasi, sistem, budidaya, syarat, utama, tanam, obat, mudah, temu, milik, efek, antibakterial, immunostimulan, aman, aplikasi, lanjut, produksi, tanam, obat, alternatif, harga, murah, cocok, jadi, alternatif, kemoterapi, giat, akuakultur, komponen, bioaktif, kandung, milik, sifat, anti, stress, imunostimulan, efek, anti, bakterial, fungi, virus, parasit, belimbing, wuluh, milik, kandung, zat, antibakterial, zat, antioksidan, tingkat, imunitas, ikan, zat, zat, aktif, kandung, buah, belimbing, wuluh, flavonoid, alkaloid, tanin, saponin, vitamin, sari, buah, belimbing, wuluh, cegah, infeksi, bakteri, aeromonas, salmonicida, konsentrasi, ml, bawang, putih, kandung, zat, antibakterial, sifat, imunostimulant, kandung, antioksidan, organosulfur, allicin, allin, golong, folifenol, efek, sinergis, tanam, obat, kelompok, golong, bahan, aktif, obat, resptor, biologi, target, tingkat, daya, obat, dasar, interaksi, positf, sinergitas, proses, farmakinetic, absorbsi, distribusi, metabolisme, eliminasi, arah, ubah, kuantitatif, bahan, aktif, obat, tubuh, kombinasi, pengaruh, efek, obat, dasar, komponen, milik, bawang, putih, belimbing, wuluh, efek, sinergis, tanam, obat, dikatogorikan, golong, road, map, gambar, peta, jalan, teliti"
                        },
                        {
                            "title": "METODE PENELITIAN",
                            "content": "teliti, teliti, eksperimental, laku, kaji, efek, sinergis, bawang, putih, belimbing, wuluh, obat, sakit, ikan, tahap, teliti, preparasi, bahan, uji, analisa, fitokimia, kombnasi, belimbing, wuluh, bawang, putih, kultivasi, bakteri, uji, in, vitro, saji, diagram, alir, gambar, diagram, alir, teliti, bahan, alat, teliti, bahan, utama, belimbing, wuluh, matang, bawang, putih, benih, ikan, lele, pakan, ikan, lele, bakteri, aeromonas, hydrophila, alat, alat, mikrobiologi, standar, metode, teliti, teliti, kaji, campur, ekstrak, tanam, bawang, putih, bp, belimbing, wuluh, bw, efek, obat, hasil, sakit, mas, rancang, coba, teliti, ral, rancang, acak, lengkap, laku, ulang, konsentrasi, laku, tahap, preparasi, sari, belimbing, wuluh, ekstraksi, bawang, puth, tahap, ii, analisa, fitokimia, kandung, vitamin, flavonoid, phenol, saponin, tanin, alkaloid, analisa, in, vitro, ec, uji, mic, uji, mbc, antbakterial, uji, sinergitas, ekstrak, bawang, putih, ekstrak, belimbing, wuluh, campur, ekstrak, bawang, putih, belimbing, wuluh, campur, ekstrak, bawang, putih, belimbing, wuluh, campur, ekstrak, bawang, putih, belimbing, wuluh, preparasi, sari, belimbing, wuluh, ekstrak, bawang, putih, belimbing, wuluh, belimbing, wuluh, dewasa, tingkat, matang, ciri, kulit, daging, buah, lembut, belimbing, wuluh, bawang, putih, uji, cuci, bersih, kering, udara, kering, belimbing, wuluh, bawang, putih, blender, air, banding, sesuai, laku, pisah, serat, sari, nyaring, sentrifugasi, cepat, menit, suhu, 40c, endap, partikel, lewat, saring, analisa, fitokimia, tanin, gram, sampel, masuk, dalam, gelas, kimia, ml, aquades, didih, saring, ml, filtrat, ferriklorida, amat, ubah, warna, saponin, gelas, kimia, masuk, sampel, gram, tambah, ml, aquades, didih, saring, ambil, ml, filtrat, ml, aquades, kocok, kuat, bentuk, busa, busa, tetes, minyak, zaitun, kocok, amat, bentuk, emulsi, flavonoid, gram, sampel, masuk, gelas, kimia, tambah, ml, aquades, didih, saring, ml, filtrat, tetes, aluminium, klorida, amat, alkaloid, gram, sampel, tambah, ml, larut, amoniakloroform, campur, kocok, menit, saring, dalam, tabung, reaksi, filtrat, mlh2so, kocok, atur, diam, bentuk, lapis, lapis, fase, air, pisah, uji, reaksi, meyer, wagner, kultivasi, hitung, padat, bakteri, isolat, bakteri, aeromonas, hydrophila, peremajaaan, stok, isolat, laboratorium, budidaya, air, asal, bpbat, sukabumi, kultivasi, media, cair, tryptic, soy, broth, tsb, ose, bakteri, inkubasi, biak, suhu, ruang, jam, hitung, padat, bakteri, spektrofotometer, gelombang, nm, mcbriney, et, al, kurva, standar, kurva, standar, padat, bakteri, oleh, koloni, hitung, metode, total, plate, count, tpc, nilai, absorbansi, optical, density, od, baca, spektrofotometer, duga, padat, bakteri, uji, sama, liniear, hasil, kurva, standar, tentu, nilai, minimum, bactericidal, concentration, mbc, minimum, inhibitory, concentration, mic, tentu, nilai, mbc, mic, konsentrasi, obat, tingkat, akuades, steril, larut, tetracycline, ug, ml, uji, mbc, tentu, konsentrasi, rendah, obat, bunuh, bakteri, biak, bakteri, media, cair, broth, tentu, padat, cfu, ml, bahan, obat, banding, inkubasi, jam, suhu, ruang, hoseinzadeh, et, al, konsentrasi, inkubasi, biak, tuang, ml, dalam, media, tsa, steril, nilai, mbc, tentu, koloni, muka, uji, mic, tentu, konsentrasi, rendah, obat, hambat, tumbuh, bakteri, biak, bakteri, media, cair, broth, tentu, padat, cfu, ml, bahan, obat, banding, inkubasi, jam, suhu, ruang, hoseinzadeh, et, al, inkubasi, ukur, padat, bakteri, spektrofotometer, gelombang, nm, mcbriney, et, al, tentu, effective, concentration, ec, ec, konsentrasi, efektif, bunuh, populasi, bakteri, hitung, ec, rumus, matematika, acu, alexander, et, al, terang, dosis, tinggi, padat, bakteri, padat, bakteri, tinggi, selisih, dosis, dosis, tinggi, padat, bakteri, dosis, tererndah, populasi, bakteri, selisih, bakteri, tinggi, bakteri, populasi, nilai, ec, tentu, nila, indeks, kombinasi, ci, aplikasi, calcusyn, analisis, data, data, uji, in, vitro, analis, analisis, indeks, kombinasi, program, perangkat, lunak, ramah, guna, calcusyn, efek, sinergis, angka, kombinasi, sifat, aditif, bahan, obat, sifat, antagonistik, data, kombinasi, program, calcusyn, mengunakan, sama, linear, grafik, standar, tunjang, data, efek, sinergis, uji, fitokimia, analis, deskriptif, dukung, studi, literatur, deskripsi, tugas, teliti, laksana, bagi, tugas, giat, teliti, susun, dasar, bidang, ahli, teliti, saji, tabel, tabel, deskripsi, tugas, teliti, no, giat, pic, laksana, urai, tugas, siap, bahan, alat, madyasta, rr, nabella, kumpul, bahan, baku, hewan, uji, serta, sedia, alat, analisa, fitokimia, madyasta, rr, nabella, analisa, kandung, vitamin, flavonoid, tanin, saponin, alkaloid, periodik, analisa, in, vitro, sefti, heza, dwinanti, madyasta, rr, winda, giat, mikrobiologi, ukur, mic, danmbc, analisa, invivo, sefti, heza, dwinanti, tanbiyaskur, winda, pelihara, hewan, uji, analisis, histopatologi, analisis, gambar, darah, analisa, data, sefti, heza, dwinanti, tanbiyaskur, madyasta, rr, analisa, kait, data, oleh, sesuai, ahli, lapor, susun, artikel, tim, susun, lapor"
                        }
                    ]
                }
            ]
        }
    }
    // handling props
    return (
        <>
        <GlobalStyles/>
        <div>
            <Head/>
            <Container className="row my-3 py-3 px-0 mx-auto">
                <h2>Hasil Deteksi Kemiripan Dokumen</h2>
                {/* section detail dokumen */}
                    
                <Container className="col-6 mr-3">
                    <StyledContainer>
                        <h4>Bagian Dokumen</h4>
                        {(PreProcessed.doc_parted.length===0)? <div>Sedang dimuat...</div>: 
                            <ol>
                                {PreProcessed.doc_parted.map((part, i) => (
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
                    {(PreProcessed.doc_pre_processed.length===0)? <div>Sedang dimuat...</div> : 
                        <ol>
                            {PreProcessed.doc_pre_processed.map((step, i) => (
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
                <Container className="col-6 ml-3">
                    <StyledContainer>
                        <h4>Tentang Dokumen</h4>
                        { isObjectEmpty(MetaData)? 
                            <div>Tidak ada dokumen yang dimuat, silahkan masukkan dokumen terlebih dahulu</div> 
                            : 
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
                        }
                    </StyledContainer>
                    <StyledContainer>
                        {/* <h2>Hasil Vektorisasi dan Deteksi Kemiripan dengan CBR</h2> */}
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
                            <Button className="col-4" bsPrefix="custom-btn" type="submit">Proses Dokumen</Button>
                        </StyledForm>
                        <h5>Hasil Pembobotan</h5>
                        { (Config.value==='')? <div>Silahkan pilih konfigurasi lalu klik <b>"Proses Dokumen"</b></div> : <></> } 
                        { (Result.weightedItems.length===0)? <></> : 
                            <ol>
                                { Result.weightedItems.map((part, index) => (
                                    <StyledContainer key={index}>
                                        <h6><li>{part.chapter}</li></h6>
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
                                                    {part.data.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.token}</td>
                                                            <td>{row.frequency}</td>
                                                            <td>{row.idf}</td>
                                                            <td>{row.weight}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </StyledSection>
                                        <p className="mb-2"><i>Total term/kata dalam bagian dokumen: {part.data.length} kata</i></p>
                                    </StyledContainer>
                                ))}
                            </ol>
                        }
                        { (isLoading && Result.weightedItems.length===0)? <div><b><i>Sedang melakukan perhitungan...</i></b></div> : <></> }
                        { (Config.value==='')? <></>:
                            <StyledContainer>
                                <p>Formula TF-IDF yang digunakan (berdasarkan konfigurasi)</p>
                                <StyledImage className="center" src={`${Config.value}.svg`} alt={"Formula TF-IDF"}></StyledImage>
                            </StyledContainer>
                        }
                    </StyledContainer>
                </Container>
                <Container className="row my-3 mx-auto">
                    <h3>Hasil Deteksi Kemiripan Dokumen dengan CBR</h3>
                    { (Config.value==='')? <div>Silahkan pilih konfigurasi lalu klik <b>"Proses Dokumen"</b></div> : <></> }
                    
                    <ol>
                        <StyledContainer>
                            <h4><li>Retrieval</li></h4>
                            <p>Voluptate mollit consectetur nulla irure nulla veniam in anim irure adipisicing enim eu.</p>
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
                        </StyledContainer>
                        <StyledContainer>
                            <h4><li>Reused</li></h4>
                            <p>Pada tahap ini diambil hanya bagian dokumen dengan nilai kemiripan diatas nilai <i>Threshold</i></p>
                            <p><i>Threshold = 0.2 (Saptono et. al., 2018</i></p>
                            { (Result.reusedItems.length===0)? <></> :
                                <ol type="a">
                                    { Result.reusedItems.map((part, index) => (
                                        <StyledContainer key={index}>
                                            <h5><li>{part.chapter}</li></h5>
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
                                            <p><i>Total bagian dokumen yang tersaring (reused): {part.data.length} bagian dokumen</i></p>
                                        </StyledContainer>
                                    ))}
                                </ol>
                            }
                        </StyledContainer>
                    </ol>
                    { !(Config.isResultLoaded)? <></>:
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
                                            {data.doc_cbr[0].result.map((row, i) => (
                                                <tr key={i}>
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
                                            {data.doc_cbr[1].result.map((row, i) => (
                                                <tr key={i}>
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
                                            {data.doc_cbr[2].result.map((row, i) => (
                                                <tr key={i}>
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
                    }
                </Container>
                <StyledContainer>
                    <h4>Hasil Pengujian</h4>
                    <StyledSection bigger={true}>
                        { !(Config.isResultLoaded)? <></>:
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
                                { History.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.doc_part_name}</td>
                                        <td>{row.config}</td>
                                        <td>{row.num_retrieved}</td>
                                        <td>{row.num_reused}</td>
                                        <td>{row.cos_sim_value}</td>
                                        <td>{row.runtime}</td>
                                    </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                        }
                    </StyledSection>
                </StyledContainer>
            </Container>
        </div>
        </>
    )
}

export default PageResult;