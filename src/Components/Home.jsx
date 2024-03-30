import React, { useEffect, useState } from 'react'
import Header from './Header'
import "./Header.css"
import { useScroll } from 'framer-motion'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useTypewriter, Cursor } from 'react-simple-typewriter'



function Home() {
    const [effect] = useTypewriter({
        words: ["...", "..."],
        loop: {},
        typeSpeed: 300,
        deleteSpeed: 100
    })
    const [loading, setloading] = useState(false)


    const [data, setdata] = useState([])

    const district = require("../assets/district.json")
    const jobposition = require("../assets/position.json")
    const [location, setlocation] = useState("")
    const [position, setposition] = useState("")
    const [temp, settemp] = useState("")
    const [temp2, settemp2] = useState("")
    const [issearch, setissearch] = useState(false)

    // console.log(location)

    const changelocation = (loc) => {
        console.log("loc is ", loc)
        setlocation(loc)
        settemp(loc)
    }

    const [arr,setarr]=useState([])

    const handleData = () => {
        const newarr = []

        if (location && position) {
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i].location)
                if (data[i].location.toLowerCase() === location.toLowerCase() && data[i].title.toLowerCase() === position.toLowerCase()) {
                    newarr.push(data[i])
                }
            }
            
            if (newarr.length === 0) {
                Swal.fire("Sorry :(", "No Post Available for the location", "info")
            } else {
                setissearch(true)
            }
        }

        if (location && !position) {
            for (var j = 0; j < data.length; j++) {
                console.log(data[j].location)
                if (data[j].location.toLowerCase() === location.toLowerCase()) {
                    newarr.push(data[j])
                }
            }
            if (newarr.length === 0) {
                Swal.fire("Sorry :(", "No Post Available for the Position", "info")
            } else {
                setissearch(true)
            }
        }
        if (!location && position) {
            for (var k = 0; k < data.length; k++) {
                console.log(data[k].title)
                if (data[k].title.toLowerCase() === position.toLowerCase()) {
                    newarr.push(data[k])
                }
            }
            if (newarr.length === 0) {
                Swal.fire("Sorry :(", "No Post Available for the location", "info")
            } else {
                setissearch(true)
            }
        }
        setarr(newarr)

    }

    const changeposition = (loc) => {
        console.log("loc is ", loc)
        setposition(loc)
        settemp2(loc)
    }
    // console.log(district)

    useEffect(() => {
        setloading(true)
        // console.log(loading)
        axios.get("https://jobsearchingsite.onrender.com/post/getAll").then((result) => {
            // console.log(result.data)
            setdata(result.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setloading(false)
        })
    }, [])
    // console.log(loading)

    return (
        <div>
            <Header></Header>

            <div className="container text-center  mt-5" style={{ border: '1px solid black', display: 'flex', maxWidth: '80%', justifyContent: 'space-between', padding: '1.2%', borderRadius: '10px' }}>


                <div className="d-flex justify-content-center"><i class="bi bi-search fs-5" style={{ color: 'black' }}></i></div>
                <div className="flex-grow-1 mx-1"> <div className="col"><input className="form-control" value={position} type="text" placeholder='Search by designation' onChange={(e) => setposition(e.target.value)} /></div></div>
                {position && <div className="d-flex justify-content-center" onClick={() => {
                    setposition("")
                    setissearch(false)
                }}><i class="bi bi-x fs-5" style={{ color: 'blue' }}></i></div>}

                <div className="d-flex justify-content-center"><i class="bi bi-geo-alt-fill fs-5" style={{ color: 'black' }}></i></div>
                <div className="flex-grow-1 mx-1 me-1"> <div className="col"><input className="form-control" value={location} type="text" placeholder='Search by location' onChange={(e) => setlocation(e.target.value)} /></div></div>
                {location && <div className="d-flex justify-content-center" onClick={() => {
                    setlocation("")
                    setissearch(false)
                }}><i class="bi bi-x fs-5" style={{ color: 'blue' }}></i></div>}


                <div className=" "><div className="col"><button className='btn btn-primary' onClick={() => handleData()}>Search</button></div></div>
            </div>

            <div className="container" style={{ display: 'flex', maxWidth: '80%', justifyContent: 'start', position: 'relative' }}>
                <div className="row m-1" style={{ width: '100%' }}>
                    <div className="col-12 col-lg-6 position-absolute" style={{ top: 0, left: 0, zIndex: '1', borderRadius: '10px', backgroundColor: 'white' }}>
                        {position && position !== temp2 ?
                            <div className="position" style={{ height: '400px', backgroundColor: 'white', border: '1px', boxShadow: '10x 10px 10px black', overflow: 'hidden' }}>
                                {jobposition.filter((item) => {
                                    const dist = item.position.toLowerCase();
                                    const val = position.toLowerCase();
                                    return position && dist.startsWith(val) && position !== temp2;
                                }).map((item) => {
                                    return (
                                        <p onClick={() => changeposition(item.position)}>{item.position}</p>
                                    );
                                })}
                            </div>
                            : ""}
                    </div>
                    <div className="col-12 col-lg-6 position-absolute" style={{ top: 0, right: 0, zIndex: '1', borderRadius: '10px', backgroundColor: 'white' }}>
                        {location && location !== temp ?
                            <div className="location" style={{ height: '250px', backgroundColor: 'white', border: '1px', boxShadow: '10x 10px 10px black', overflow: 'hidden' }}>
                                {district.filter((item) => {
                                    const dist = item.districts.toLowerCase();
                                    const val = location.toLowerCase();
                                    return location && dist.startsWith(val) && location !== temp;
                                }).map((item) => {
                                    return (
                                        <p onClick={() => changelocation(item.districts)}>{item.districts}</p>
                                    );
                                })}
                            </div>
                            : ""}
                    </div>
                </div>
            </div>




            {/* job posts */}
            <div className="title " style={{ display: 'flex', maxWidth: '80%', justifyContent: 'space-between', padding: '1.2%', borderRadius: '10px', margin: 'auto' }} >
                <div className="col mt-2"><h3>Recent Jobs</h3></div>
            </div>

            {loading === true ? <div className='d-flex justify-content-center mt-5'>
                        <h1 className='text-center text-black'>Loading <span className='' style={{color:'orange'}}>{effect}</span></h1>
                    </div> : ''}

            <div className="Containerpost text-center" style={{ display: 'flex', maxWidth: '80%', justifyContent: 'space-between', padding: '1.2%', borderRadius: '10px', margin: 'auto' }} >

                <div className="job-cards row ms-lg-5" style={{ border: '', padding: '10px', width: '100%' }}>
                    
                    {issearch === true ? arr.map((items) => {
                        // console.log(items); // Log items object
                        return (
                            <div className="ms-lg-5 col-lg-3 col-sm-12 me-2 p-3" style={{ border: 'none', borderRadius: '10px', boxShadow: '5px 5px 5px black' }}>
                                <Link to={`/jobcard/${encodeURIComponent(JSON.stringify(items))}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-start" >
                                            <img src={items.companylogo} style={{ width: '100px', height: '100px' }}></img>
                                        </div>
                                        <div className="col-lg-12 col-6 d-flex justify-content-start align-items-center">
                                            <div className="title d-flex justify-content-start"><h5 className='text-primary'>{items.companyname}</h5></div>
                                        </div>
                                    </div>
                                    <div className="title d-flex justify-content-start"><h5>{items.title}</h5></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Skills Needed: {items.skills} </p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Experience Required: <span style={{ fontWeight: 'bold' }}>{items.experience}</span></p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Posted On: <span style={{ fontWeight: 'bold' }}>{items.postdate}</span></p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Location: <span style={{ fontWeight: 'bold' }}>{items.location}</span></p></div>

                                </Link>
                            </div>

                        );
                    }) : data.map((items) => {
                        // console.log(items); // Log items object
                        return (
                            <div className="ms-lg-5 col-lg-3 col-sm-12 me-2 p-3" style={{ border: 'none', borderRadius: '10px', boxShadow: '5px 5px 5px black' }}>
                                <Link to={`/jobcard/${encodeURIComponent(JSON.stringify(items))}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-start" >
                                            <img src={items.companylogo} style={{ width: '100px', height: '100px' }}></img>
                                        </div>
                                        <div className="col-lg-12 col-6 d-flex justify-content-start align-items-center">
                                            <div className="title d-flex justify-content-start"><h5 className='text-primary'>{items.companyname}</h5></div>
                                        </div>
                                    </div>
                                    <div className="title d-flex justify-content-start"><h5>{items.title}</h5></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Skills Needed: {items.skills} </p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Experience Required: <span style={{ fontWeight: 'bold' }}>{items.experience}</span></p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Posted On: <span style={{ fontWeight: 'bold' }}>{items.postdate}</span></p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Location: <span style={{ fontWeight: 'bold' }}>{items.location}</span></p></div>
                                </Link>
                            </div>

                        );
                    })}
{/*                     
                    {data.map((items) => {
                        // console.log(items); // Log items object
                        return (
                            <div className="ms-lg-5 col-lg-3 col-sm-12 me-2 p-3" style={{ border: 'none', borderRadius: '10px', boxShadow: '5px 5px 5px black' }}>
                                <Link to={`/jobcard/${encodeURIComponent(JSON.stringify(items))}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className="row">
                                        <div className="col d-flex justify-content-start" >
                                            <img src={items.companylogo} style={{ width: '100px', height: '100px' }}></img>
                                        </div>
                                        <div className="col-lg-12 col-6 d-flex justify-content-start align-items-center">
                                            <div className="title d-flex justify-content-start"><h5 className='text-primary'>{items.companyname}</h5></div>
                                        </div>
                                    </div>
                                    <div className="title d-flex justify-content-start"><h5>{items.title}</h5></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Skills Needed: {items.skills} </p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Experience Required: <span style={{ fontWeight: 'bold' }}>{items.experience}</span></p></div>
                                    <div className="title d-flex justify-content-start"><p style={{ fontStyle: 'italic' }}>Posted On: <span style={{ fontWeight: 'bold' }}>{items.postdate}</span></p></div>
                                </Link>
                            </div>

                        );
                    })} */}
                </div>

            </div>



        </div>
    )
}

export default Home