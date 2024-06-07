import React, { useEffect, useState } from 'react'
import PageHeader from './../components/PageHeader';
import { useParams } from 'react-router-dom';
import { FaLocationDot,FaClock,FaDollarSign } from "react-icons/fa6";
import Swal from 'sweetalert2'

const JobDetails = () => {
    const {id}=useParams();
    const [job,setJob]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:3000/all-jobs/${id}`).then(res=>res.json()).then(data=>{
            setJob(data);
        })
    },[])

    const handleApply=async()=>{
        const { value: url } = await Swal.fire({
            input: "url",
            inputLabel: "URL address",
            inputPlaceholder: "Enter the URL"
          });
          if (url) {
            Swal.fire(`Entered URL: ${url}`);
          }
    }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <PageHeader title="Job Details Page " path={` / Single Job`}/>

        <div>
            <h4 className='font-bold mt-3'>Job ID: {job._id}</h4>    
            <h2 className='font-semibold text-blue text-2xl mt-2'>{job.jobTitle} @ {job.companyName}</h2>
            <h5 className='font-light mt-2'>{job.description}</h5>
            <div className='flex flex-wrap gap-5 mt-2'>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1  font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"><FaLocationDot/><pre> </pre>{job.jobLocation}</span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1  font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"><FaClock/><pre> </pre>{job.salaryType}</span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1  font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"><FaDollarSign/><pre> </pre>${job.minPrice}-{job.maxPrice}K </span>
            </div>
            <button className='bg-blue px-8 py-2 text-white mt-6' onClick={handleApply}>Apply Now</button>
        </div>
    </div>
  )
}

export default JobDetails