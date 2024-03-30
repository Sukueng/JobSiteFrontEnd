import React, { useEffect, useState } from 'react'
import Header from './Header'
import logo from "../assets/job.png"
import { motion } from "framer-motion"
import "./Header.css"
import axios from "axios"
import swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'

function Company() {
    const navigate = useNavigate();


    useEffect(()=>{
        if(localStorage.getItem("Companyname") != null){
            navigate('/companyDashboard')
        }
    },)

    const [data, setdata] = useState({
        name: '',
        email: '',
        password: '',
        description: '',
        logo: "",
    })

    const [rsdata, rssetdata] = useState({
        rspassword1: '',
        rsemail: '',
        rspassword2: ''
    })

    const resetForm = () => {
        data.name = ""
        data.email = ""
        data.description = ""
        data.password = ""
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setdata({ ...data, logo: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const [popup, setpopup] = useState(false)


    const popUpManagetrue = () => {
        setpopup(true)
        resetForm()
    }
    const popUpManagefalse = () => {
        setpopup(false)
        resetForm()
    }

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

    const changePassword=()=>{
        // console.log(rsdata)
        if(rsdata.rspassword1 === rsdata.rspassword2){
            axios.post("https://jobsearchingsite.onrender.com/company/changePassword",rsdata).then((result)=>{
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

    const submit = (e) => {
        e.preventDefault()

        if(login === "Signup"){
            axios.post("https://jobsearchingsite.onrender.com/company/findcompany", data).then((result) => {
                // console.log(result.data)
                if (result.data === false) {
                    axios.post("https://jobsearchingsite.onrender.com/company/addcompany", data).then((result) => {
                        // console.log(result.data)
                        swal.fire('Done !', 'Account Added succesfully', 'success')
                        setLogin()
                        resetForm()
                    }).catch((err) => {
                        console.log(err)
                    })
                    // console.log(data)
                }
                else if(result.data === true){
                    swal.fire('Cancelled', 'Company Already Exist', 'error')
                    setLogin()
                }
            }).catch((err)=>{
                console.log(err)
            })
        }

        if(login === "Login"){
            axios.post("https://jobsearchingsite.onrender.com/company/findandGetcompany", data).then((result) => {
                // console.log(result)
                if(result.data != ""){

                    if(localStorage.getItem("uname") != ""){
                        localStorage.removeItem("uname")
                        localStorage.removeItem("umail")
                        localStorage.removeItem("type")
                    }
                    localStorage.setItem("Companyname",result.data.name)
                    localStorage.setItem("_id",result.data.id)
                    localStorage.setItem("type","company")
                    navigate("/companyDashboard")
                }

                else{
                    swal.fire('Cancelled', 'Company Not Exist', 'error')
                    setSignin()
                    resetForm()
                }
             }).catch((err)=>{
                console.log(err)
            })
        }

       

    }

    return (
        <div>
            <Header></Header>
            
            <div className="companycontainer mt-5" style={{ margin: 'auto', maxWidth: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="row">
                    <div className="col d-flex align-items-center"><h1>Hire your employee for free !!</h1></div>
                    <div className="col"><img src={logo} style={{ height: '300px', width: '300px' }}></img></div>
                    <div className="col-12 mt-3"><button className='btn btn-primary' onClick={() => popUpManagetrue()}>Create Post</button></div>
                </div>
            </div>

            {popup === true ?
                <div className="postcontainer-fluid position-fixed top-0 start-0" style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", height: "100%",overflowY: "auto" }} >
                    <motion.form onSubmit={submit} animate={{ y: +7, opacity: 1 }} initial={{ y: -70, opacity: 0 }} transition={{ type: "tween", duration: 0.5 }} className='formcontainer mx-auto my-4 '>

                        <div className="row">
                            <div className="ms-5 col d-flex justify-content-end"> <h3 className=' text-center text-white'><spna style={{color:'orange'}}>Company</spna> {login}</h3></div>
                            <div className="col d-flex justify-content-end"><button type='button' className='btn btn-danger' onClick={() => popUpManagefalse()}>X</button></div>
                        </div>


                        {login == 'Signup' ? <div className="mb-3">
                            <label className='mb-2' for="exampleInputEmail1" style={{ color: 'white' }}>Company Name</label>
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
                                <label for="exampleInputPassword1" style={{ color: 'white' }}>Description</label>
                                <textarea type="text" className="form-control" value={data.description} id="password" onChange={(e) => setdata({ ...data, description: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label className='me-2' for="exampleInputPassword1" style={{ color: 'white' }}>Logo</label>
                                <input className='form-control-file' type="file" accept="image/*" onChange={handleImageChange} required />
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
                                    <button type='button' className='btn btn-primary' onClick={changePassword}>Reset</button>
                                </div>

                            </div>

                        </> : ""}

                    </motion.form>
                </div> : ""}


        </div>
    )
}

export default Company