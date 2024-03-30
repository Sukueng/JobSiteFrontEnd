import React, { useEffect, useState } from 'react'
import Header from './Header'
import { motion } from "framer-motion"
import axios from 'axios'
import swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'

function EditProfiles() {
    const navigate = useNavigate()
    const [newdata, setnewdata] = useState({
        name: '',
        email: '',
        password: '',
        resume: ''
    })

    const [companydata, setcompanydata] = useState({
        name: '',
        email: '',
        password: '',
        description: ''
    })

    

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
        if (localStorage.getItem("type") === "user") {
            axios.post("https://jobsearchingsite.onrender.com/user/findByMail", { mail: localStorage.getItem("umail") }).then((result) => {
                // console.log(result.data);
                setnewdata(result.data)
            }).catch((err) => {
                console.log(err)
            })
        }else if(localStorage.getItem("type") === "company"){
            axios.post("https://jobsearchingsite.onrender.com/company/findCompanyByMail",localStorage.getItem("_id")).then((result) => {
                console.log("data si",result.data);
                setcompanydata(result.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [])


    const usersubmit = (e) => {
        e.preventDefault()
        setnewdata({ ...newdata, resume: base64String })

        axios.post("https://jobsearchingsite.onrender.com/user/edituser", newdata).then((result) => {
            // console.log("okkk")
            localStorage.removeItem("uname")
            localStorage.removeItem("uemail")
            localStorage.removeItem("type")
            swal.fire('Done !', 'Edited succesfully Please Login Again', 'success')
            navigate("/userlogin")
            
        }).catch((err) => {
            console.log(err)
        })

       
    }

    const companysubmit = (e) => {
        e.preventDefault()
       

        axios.post("https://jobsearchingsite.onrender.com/company/editcompany", companydata).then((result) => {
            // console.log("okkk")
            localStorage.removeItem("Companyname")
            localStorage.removeItem("_id")
            localStorage.removeItem("type")
            swal.fire('Done !', 'Edited succesfully Please Login Again', 'success')
            navigate("/company")
            
        }).catch((err) => {
            console.log(err)
        })

      
    }
    return (
        <div>
            <Header></Header>
            {localStorage.getItem("type") === "user" ?
                <motion.form onSubmit={usersubmit} animate={{ y: +7, opacity: 1 }} initial={{ y: -70, opacity: 0 }} transition={{ type: "tween", duration: 0.5 }} className='formcontainer mx-auto my-4' style={{ backgroundColor: '#4E4E4E' }}>

                    <div className="row">
                        <div className="ms-5 col d-flex justify-content-center"> <h3 className=' text-center text-white'>Edit Profile</h3></div>
                    </div>

                    <div className="mb-3">
                        <label className='mb-2' for="exampleInputEmail1" style={{ color: 'white' }}>Name</label>
                        <input type="text" value={newdata.name} className="form-control mb-3" onChange={(e) => setnewdata({ ...newdata, name: e.target.value })} id="name" aria-describedby="emailHelp" required />
                        <div className="mb-3">
                            <label for="exampleInputEmail1" style={{ color: 'white' }}>Email address</label>
                            <input type="email" value={newdata.email} className="form-control" onChange={(e) => setnewdata({ ...newdata, email: e.target.value })} id="email" aria-describedby="emailHelp" required />

                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" style={{ color: 'white' }}>New Password</label>
                            <input type="text" value={newdata.password} className="form-control" onChange={(e) => setnewdata({ ...newdata, password: e.target.value })} id="password" required />
                        </div>

                        <div className="mb-3">
                            <label className='me-2' for="exampleInputPassword1" style={{ color: 'white' }}>New Resume</label>
                            <input className='form-control-file' type="file" accept="application/pdf" onChange={handleFileInputChange} />
                        </div>
                        <div className="mb-3" style={{display:'flex', justifyContent:'space-between'}}>
                            <button className='btn btn-success' type='submit'>Reset</button>
                            <button className='btn btn-danger' type='submit' onClick={()=>navigate("/")}>Cancel</button>
                        </div>
                     
                    </div>




                </motion.form> : <motion.form onSubmit={companysubmit} animate={{ y: +7, opacity: 1 }} initial={{ y: -70, opacity: 0 }} transition={{ type: "tween", duration: 0.5 }} className='formcontainer mx-auto my-4' style={{ backgroundColor: '#4E4E4E' }}>

<div className="row">
    <div className="ms-5 col d-flex justify-content-center"> <h3 className=' text-center text-white'>Edit Profile</h3></div>
</div>

<div className="mb-3">
    <label className='mb-2' for="exampleInputEmail1" style={{ color: 'white' }}>Company Name</label>
    <input type="text" value={companydata.name} className="form-control mb-3" onChange={(e) => setcompanydata({ ...companydata, name: e.target.value })} id="name" aria-describedby="emailHelp" required />
    <div className="mb-3">
        <label for="exampleInputEmail1" style={{ color: 'white' }}>Email address</label>
        <input type="email" value={companydata.email} className="form-control" onChange={(e) => setcompanydata({ ...companydata, email: e.target.value })} id="email" aria-describedby="emailHelp" required />

    </div>
    <div className="mb-3">
        <label for="exampleInputPassword1" style={{ color: 'white' }}>New Password</label>
        <input type="text" value={companydata.password} className="form-control" onChange={(e) => setcompanydata({ ...companydata, password: e.target.value })} id="password" required />
    </div>

    <div className="mb-3">
        <label className='me-2' for="exampleInputPassword1" style={{ color: 'white' }}>Description</label>
        <textarea type="text" className="form-control" value={companydata.description} id="password" onChange={(e) => setcompanydata({ ...companydata, description: e.target.value })} required />
    </div>
    <div className="mb-3">
        <button className='btn btn-success' type='submit'>Reset</button>
    </div>
</div>




</motion.form>}



        </div>
    )
}

export default EditProfiles