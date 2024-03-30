import React, { useEffect, useState } from 'react'
import Header from './Header'
import { motion } from "framer-motion"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function CompanyDashboard() {

    const setdate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate.toString()
    }
    const [data, setdata] = useState({
        title: '',
        skills: '',
        salary: '',
        description: '',
        experience: "",
        location: '',
        companylogo: '',
        company_id: localStorage.getItem("_id"),
        postdate: setdate(),
        companyname: localStorage.getItem("Companyname")
    })

    const clearform = () => {
        setdata({
            title: '',
            skills: '',
            salary: '',
            description: '',
            experience: '',
            location: '',
            companylogo: '',

            postdate: "",

        });
    };




    const navigate = useNavigate()


    if (localStorage.getItem("Companyname") === null) {
        navigate("/")
    }

    const [underline, setunderline] = useState("allpost")

    const [allpost, setallpost] = useState([])
    const [alluser, setalluser] = useState([])

    const val = {
        _id: localStorage.getItem("_id")
    }
    const [popup, setpopup] = useState(false)


    const restdata = () => {
        data.title = ""
        data.skills = ""
        data.salary = ""
        data.description = ""
        data.experience = ""
    }

    const popUpManagefalse = () => {
        setpopup(false)
    }

    const getallpost = () => {
        axios.post("https://jobsearchingsite.onrender.com/post/findPostById", localStorage.getItem("_id")).then((result) => {
            // console.log(result.data)
            setallpost(result.data)
        }).catch((err) => {
            console.log(err)
        })

    }


    const submit = (e) => {
        e.preventDefault()
        setdate()
        axios.post("https://jobsearchingsite.onrender.com/post/addpost", data).then((result) => {
            // console.log(result.data)
            Swal.fire('Done !', 'Post Added succesfully', 'success')
            clearform()
            setpopup(false)
            getallpost()

        })
    }

    const handleDownloadPdf = (resume) => {
        const link = document.createElement('a');
        link.href = resume;
        link.download = 'Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    useEffect(() => {


        if (localStorage.getItem("Companyname") === null) {
            navigate("/")
        }


        axios.post("https://jobsearchingsite.onrender.com/company/findCompanyByMail", localStorage.getItem("_id")).then((result) => {
            setdata({ ...data, companylogo: result.data.logo })
            // console.log(val)
            getallpost()

        }).catch((err) => {
            console.log(err)
        })

        axios.post("https://jobsearchingsite.onrender.com/user/applies", localStorage.getItem("_id")).then((result) => {
            console.log("the data is ", result.data[0])
            setalluser(result.data)
        })

    }, [])

    const deletePost = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("https://jobsearchingsite.onrender.com/post/deletePost", item).then((result) => {
                    getallpost()
                }).catch((error) => {
                    console.log("error accured")
                })
                console.log('Deleted');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log('Cancelled');
            }
        });

    }
    return (
        <div>
            <Header></Header>
            <div className="dashboardcontainer mt-4" style={{ margin: 'auto', maxWidth: '80%', }}>
                <h3>Hello Mr/Ms <span style={{ color: 'orange' }}>{localStorage.getItem("Companyname")}</span> Admin</h3>

                <div className="row mt-5 " style={{ borderRadius: '10px' }}>
                    <div className="col  d-flex justify-content-center"><h1 style={{ color: '#65066C' }}>DashBoard</h1></div>
                </div>

                <div className="row mt-4 " style={{ borderRadius: '10px' }}>
                    <div className="col ">
                        <a href='#' style={{ textDecoration: 'none', color: 'black' }}><h4 onClick={() => setunderline("allpost")}>All posts</h4></a>
                        {underline === "allpost" ? <div className="underline" ></div> : ""}
                    </div>
                    <div className="col ">
                        <a href='#' style={{ textDecoration: 'none', color: 'black' }}><h4 onClick={() => setunderline("addnew")}>Applies</h4></a>
                        {underline === "addnew" ? <div className="underline"  ></div> : ""}
                    </div>
                    <div className="col d-flex justify-content-end"><button className='addbutton btn btn-sm btn-success' onClick={() => setpopup(true)}>Add New Post</button></div>
                </div>


                {/* data showing dashboard */}
                {underline === "allpost" ?
                    <div className="row mt-3 " style={{ borderRadius: '10px', backgroundImage: 'linear-gradient(to left top, #0a103b, #0d0f3a, #0f0f39, #110e38, #130e37)' }}>
                        {allpost.map((items) => (
                            <div className="col-lg-3 mb-2 mt-2 me-1 ms-1 " style={{ border: '1px solid white', borderRadius: '10px' }}>
                                <h5 style={{ color: 'white', fontWeight: 'bold' }}>{items.title}</h5>
                                <div className="row">
                                    <div className="col" style={{ color: 'white' }}><h6>Salary : {items.salary}</h6></div>
                                </div>
                                <div className="row">
                                    <div className="col" style={{ color: 'white' }}><h6>Skills : {items.skills}</h6></div>
                                </div>
                                <div className="row">
                                    <div className="col" style={{ color: 'white' }}><h6>Experience : {items.experience}</h6></div>
                                </div>
                                <div className="row">
                                    <div className="col" style={{ color: 'white' }}><h6>Posted On : {items.postdate}</h6></div>
                                </div>
                                <div className="row ">
                                    <div className="col d-flex justify-content-center"><button className='btn btn-danger m-2' onClick={() => deletePost(items)}>Delete</button></div>
                                </div>
                            </div>
                        ))}
                    </div> : ""}

                {underline === "addnew" ?

                    <div className="row mt-3 " style={{ borderRadius: '10px', backgroundImage: 'linear-gradient(to left top, #0a103b, #0d0f3a, #0f0f39, #110e38, #130e37)' }}>

                        <div className="row p-2">
                            {alluser.map((item) => {
                                return (

                                    <div className="col-lg-3 mb-2 mt-2 me-1 ms-2 " style={{border:'1px solid white',borderRadius:'10px'}}>
                                        <p className='text-white'>Applicant Name : <span style={{color:'orange'}}>{item.name}</span></p>
                                        <p className='text-white'>Applied Role : <span style={{color:'orange'}}>{item.appliedfor}</span></p>
                                        <button className='btn btn-primary mb-1 ms1 text-center' onClick={() => handleDownloadPdf(item.resume)}>Download Resume</button>

                                    </div>

                                );
                            })}
                        </div>
                    </div>


                    : ""}





                {/* Popup window for post */}

                {popup === true ?
                    <div className="postcontainer-fluid position-fixed top-0 start-0" style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", height: "100%", overflowY: "auto" }} >
                        <div>
                            <motion.form animate={{ y: +7, opacity: 1 }} initial={{ y: -70, opacity: 0 }} transition={{ type: "tween", duration: 0.5 }} className='formcontainer mx-auto my-4 ' onSubmit={submit}>
                                <div className="row">
                                    <div className="ms-5 col d-flex justify-content-end"> <h3 className=' text-center text-white'>Add new Job</h3></div>
                                    <div className="col d-flex justify-content-end"><button type='button' className='btn btn-danger' onClick={() => popUpManagefalse()}>X</button></div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" style={{ color: 'white' }}>Job Title</label>
                                    <input type="text" className="form-control" value={data.title} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, title: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" style={{ color: 'white' }}>Skills Needed</label>
                                    <input type="text" className="form-control" value={data.skills} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, skills: e.target.value })} placeholder='Like C,Java,Python etc' required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" style={{ color: 'white' }}>Salary Upto</label>
                                    <input type="number" className="form-control" value={data.salary} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, salary: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" style={{ color: 'white' }}>Job Description</label>
                                    <textarea type="text" className="form-control" value={data.description} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, description: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" style={{ color: 'white' }}>location</label>
                                    <input type="text" className="form-control" value={data.location} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, location: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" style={{ color: 'white' }}>Experience Required</label>
                                    <select className="form-control" value={data.experience} id="exampleSelect" style={{ fontWeight: 'bold' }} onChange={(e) => setdata({ ...data, experience: e.target.value })} required>
                                        <option></option>
                                        <option>0-1</option>
                                        <option>2-4</option>
                                        <option>4-8</option>
                                        <option>Above 8</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </motion.form>
                        </div>
                    </div> : ""}


            </div>
        </div>
    )
}

export default CompanyDashboard