import React from 'react'
import InputField from './../components/InputField';

const JobPostingData = ({handleChange}) => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now - 24*60*60*1000);
    const sevenDaysAgo = new Date(now - 7*24*60*60*1000);
    const thirtyDaysAgo = new Date(now - 30*24*60*60*1000);
    const yearAgo = new Date();
    yearAgo.setFullYear(now.getFullYear() - 1);

    // Convert date to string
    const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0,10);
    const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0,10);
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0,10);
    const yearAgoDate = yearAgo.toISOString().slice(0,10);

  return (
    <div>
        <h4 className='text-lg font-mediumb-2'>Date of posting</h4>
        <div>
            <label className='sidebar-label-container'>
                <input type="radio" name="test12" id="test12" value="" onChange={handleChange}
                />
                <span className='checkmark'></span>All time
            </label>

            <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title="Last 24 hours" name="test12"/>
            <InputField handleChange={handleChange} value={sevenDaysAgoDate} title="Last 7 days" name="test12"/>
            <InputField handleChange={handleChange} value={thirtyDaysAgoDate} title="Last Month" name="test12"/>
            <InputField handleChange={handleChange} value={yearAgoDate} title="Last Year" name="test12"/>
        </div>
    </div>
  )
}

export default JobPostingData