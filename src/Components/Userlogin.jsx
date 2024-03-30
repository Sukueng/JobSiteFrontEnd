import React, { useEffect, useState } from 'react'
import Header from './Header'
import "./Header.css"
import { motion } from "framer-motion"
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import swal from "sweetalert2"
import { Navigate, useNavigate } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function Userlogin() {
    const navigate =useNavigate();

    
  

    const [base64String, setBase64String] = useState('');

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1]; // Extract base64 string
                setBase64String(`data:application/pdf;base64,${base64}`); // Prepend header
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
            reader.readAsDataURL(file); // Read file as data URL (base64)
        }
    };
    useEffect(() => {
        // console.log(base64String);
        setdata({ ...data, resume: base64String })
    }, [base64String]);

    const [data, setdata] = useState({
        name: '',
        email: '',
        password: '',
        resume: "",
    })

    const setpassowrd = () => {
        setlogin("Reset Password")
    }

    const [login, setlogin] = useState("Signup")

    const setLogin = () => {
        resetForm()
        setlogin("Login")
    }
    const setSignin = () => {
        setlogin("Signup")
    }

    const [rsdata, rssetdata] = useState({
        rspassword1: '',
        rsemail: '',
        rspassword2: ''
    })

    const resetForm = () => {
        setdata({
            name: '',
            email: '',
            password: '',
            resume: ''
        });
    };

    const changePassword=()=>{
        // console.log(rsdata)
        if(rsdata.rspassword1 === rsdata.rspassword2){
            axios.post("https://jobsearchingsite.onrender.com/user/changePassword",rsdata).then((result)=>{
                // console.log(result.data)
                swal.fire('Done !', 'Password Changed', 'success')
                setLogin()
            }).catch((err)=>{
                console.log(err)
            })
                
        }else{
         swal.fire('Cancelled', 'Company Already Exist', 'error')
        }
    }

    const submit = (e) => { e.preventDefault()
        console.log("data is",data)
        if(login === "Signup"){

            axios.post("https://jobsearchingsite.onrender.com/user/finduser", data).then((result) => {
                // console.log(result.data)
                if (result.data === null || result.data === "") {
                    axios.post("https://jobsearchingsite.onrender.com/user/adduser", data).then((result) => {
                        // console.log(result.data)
                        swal.fire('Done !', 'Account Added succesfully', 'success')
                        setLogin()
                    }).catch((err) => {
                        console.log(err)
                    })
                }
                else{
                    swal.fire('Cancelled', 'User Already Exist', 'error')
                    setLogin()
                }
            })
        }

        if(login === "Login"){
            axios.post("https://jobsearchingsite.onrender.com/user/findauthuser", data).then((result) => {
                // console.log("userdata is ",result.data)
                if (result.data != "") {
                    // console.log("if entere")

                    if(localStorage.getItem("Companyname") != ""){
                        localStorage.removeItem("Companyname")
                        localStorage.removeItem("_id")
                        localStorage.removeItem("type","company")
                    }
                    localStorage.setItem("uname",result.data.name)
                    localStorage.setItem("umail",result.data.email)
                    localStorage.setItem("type","user")
                   
                   navigate("/")
                  
                }
                else{
                    swal.fire('Cancelled', 'Not Exist', 'error')
                    resetForm()
                    setSignin()
                }
            }) 
        }



    }


    const handleDownloadPdf = () => {
        const link = document.createElement('a');
        link.href = base64String;
        link.download = 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    return (
        <div>
            <Header></Header>

            <motion.form onSubmit={submit} animate={{ y: +7, opacity: 1 }} initial={{ y: -70, opacity: 0 }} transition={{ type: "tween", duration: 0.5 }} className='formcontainer mx-auto my-4' style={{ backgroundColor: '#4E4E4E' }}>

                <div className="row">
                    <div className="ms-5 col d-flex justify-content-center"> <h3 className=' text-center text-white'><span style={{color:'orange'}}>User</span> {login}</h3></div>
                </div>

                {login == 'Signup' ? <div className="mb-3">
                    <label className='mb-2' for="exampleInputEmail1" style={{ color: 'white' }}>Name</label>
                    <input type="text" className="form-control mb-3" value={data.name} id="name" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, name: e.target.value })} required />
                    <div className="mb-3">
                        <label for="exampleInputEmail1" style={{ color: 'white' }}>Email address</label>
                        <input type="email" className="form-control" value={data.email} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, email: e.target.value })} required />

                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" style={{ color: 'white' }}>Password</label>
                        <input type="password" className="form-control" value={data.password} id="password" onChange={(e) => setdata({ ...data, password: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label className='me-2' for="exampleInputPassword1" style={{ color: 'white' }}>Resume</label>
                        <input className='form-control-file' type="file" accept="application/pdf" onChange={handleFileInputChange} required />
                    </div>
                </div> : ""}



                <div id="emailHelp" className="row">
                    {login == 'Login' ?
                        <>
                            <div class="mb-3">
                                <label className='mb-2' for="exampleInputEmail1" style={{ color: 'white' }}>Email address</label>
                                <input type="email" className="form-control" value={data.email} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, email: e.target.value })} required />

                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" style={{ color: 'white' }}>Password</label>
                                <input type="password" className="form-control" value={data.password} id="password" onChange={(e) => setdata({ ...data, password: e.target.value })} required />
                            </div>
                            <div className="col">
                                <a href="#" className='small d-flex  my-3 text-decoration-none' onClick={setpassowrd} style={{ color: 'white' }}>Forgot Password ?</a>
                            </div>
                            <div className="col">
                                <a href="#" className='small d-flex  my-3 text-decoration-none d-flex justify-content-end pe-2' onClick={setSignin} style={{ color: 'white' }}>Signup</a>
                            </div>
                            <div className="btn"><button type="submit" className="btn btn-primary mt-2" style={{ color: 'white' }}>Submit</button></div>
                        </> : ""
                    }
                    {login == 'Signup' ?
                        <div className="col d-flex justify-content-between">
                            <a href="#" className='small text-decoration-none my-3' onClick={setLogin} style={{ color: 'white' }}>Already have Account ?</a>
                            <button type="submit" className="btn btn-primary mt-2" style={{ color: 'white' }}>Submit</button>
                        </div> : ""
                    }
                </div>


                {login == 'Reset Password' ? <>

                    <div className="mb-3">
                        <label for="exampleInputEmail1" style={{ color: 'white' }} >Enter Your Email</label>
                        <input type="text" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => rssetdata({ ...rsdata, rsemail: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputEmail1" style={{ color: 'white' }}>New Password</label>
                        <input type="text" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => rssetdata({ ...rsdata, rspassword1: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" style={{ color: 'white' }}>Enter Again</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => rssetdata({ ...rsdata, rspassword2: e.target.value })} required />
                    </div>

                    <div className="row mt-3">
                        <div className="col d-flex justify-content-between mt-3">
                            <button type="button" className='btn btn-success' onClick={() => setLogin()}>Back</button>
                            <button type='button' className='btn btn-primary' onClick={()=>changePassword()}>Reset</button>
                        </div>

                    </div>

                </> : ""}

            </motion.form>
            {/* <Document file={base64String} onLoadSuccess={ondoload}>
                <Page height={600} pageNumber={pagenum}></Page>
            </Document>

            <button onClick={handleDownloadPdf}>Download PDF</button>
            <h1>helllo</h1> */}
            {/* {base64String && (
                <div>

                </div>
            )} */}
        </div>

    )
}

export default Userlogin