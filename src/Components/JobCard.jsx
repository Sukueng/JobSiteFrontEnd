import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import "./Header.css"
import swal from "sweetalert2"
import axios from 'axios';
function JobCard() {
    const navigate = useNavigate()
    const { data } = useParams();
    const items = JSON.parse(decodeURIComponent(data));
    const [submitcheck, setsubmitcheck] = useState(true)


    const checkapply = {
        postid: items.id,
        umail: localStorage.getItem("umail")
    }
    

    useEffect(() => {
        axios.post("https://jobsearchingsite.onrender.com/user/checkapply", checkapply).then((result) => {
            console.log(result.data)
            setsubmitcheck(result.data)
        }).catch((err) => {
            console.log(err)
        })

        // axios.post("https://jobsearchingsite.onrender.com/user/applies", localStorage.getItem("_id")).then((result) => {
        //     console.log(result.data)
        //     setsubmitcheck(result.data)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }, [])

    const apply = () => {
        const userdata = {
            companyid: items.company_id,
            uname: localStorage.getItem("umail"),
            appliedfor: items.title,
            postid: items.id
        }
        if (localStorage.getItem("uname") != null) {
            axios.post("https://jobsearchingsite.onrender.com/user/addcompanyid", userdata).then((result) => {
                console.log(result)
                swal.fire("Done!", "Applied Successfully", "success")
                navigate("/")
            })
        } else {

            swal.fire("Warning!", "Please Login and Apply", "warning")
            navigate("/userlogin")
        }
    }



    return (
        <>
            <Header></Header>
            <div className='jobcontainer mt-5'>
                <div className="row">
                    <div className="col"><h1 style={{ color: 'orange' }}>{items.companyname}</h1></div>
                </div>
                <div className="row mb-4">
                    <div className="col"><h5>{items.title}</h5></div>
                </div>

                <div className="row">
                    <div className="col"><p style={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold' }}>Description :</p></div>
                </div>

                <div className="row">
                    <div className="col"><p style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>&nbsp;&nbsp;&nbsp;&nbsp;{items.description} </p></div>
                </div>

                <div className="row">
                    <div className="col"><p style={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold' }}>Skills Needed : <span style={{ fontWeight: 'lighter' }}>&nbsp;&nbsp;{items.skills}</span></p></div>
                </div>


                <div className="row">
                    <div className="col"><p style={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold' }}>Experience Required : <span style={{ fontWeight: 'lighter' }}>&nbsp;&nbsp;{items.experience}</span></p></div>
                </div>

                <div className="row">
                    <div className="col"><p style={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold' }}>Location : <span style={{ fontWeight: 'lighter' }}>&nbsp;&nbsp;{items.location}</span></p></div>
                </div>

                <div className="row ">
                    {submitcheck === true ?
                        <div className="col d-flex justify-content-center">
                            <button className='btn btn-success' onClick={() => apply()}>Apply</button>
                        </div> : <div className="col d-flex justify-content-center">
                            <button className='btn btn-warning' >Already applied</button>
                        </div>}

                </div>



            </div>
        </>
    )
}

export default JobCard