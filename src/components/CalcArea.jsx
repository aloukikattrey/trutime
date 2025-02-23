import React, { useState } from 'react';
import './Dropdown'
import Dropdown from './Dropdown';

export default function CalcArea() {
    const [formValues, setFormValues] = useState({
        hrsIN: 0,
        minIN: 0,
        hrOUT: 0,
        minOUT: 0,
    });
    const [tapinDay, chngtapinDay] = useState('AM');
    const [tapoutDay, chngtapoutDay] = useState('AM');
    const [hrsPassed, chngHrsPassed] = useState(0);
    const [minPassed, chngMinPassed] = useState(0);
    const [finalHRs00, chngFinalHrs] = useState(0);
    const [finalMins00, chngFinalMins] = useState(0);
    const [topupHrs, chngTopupHrs] = useState(0);
    const [topupMins, chngTopupMins] = useState(0);
    const [show, chngShow] = useState(false);


    function handleChange(event) {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }
    function getTapinDay(value) {
        chngtapinDay(value);
    }
    function getTapoutDay(value) {
        chngtapoutDay(value);
    }

    function handleClick() {
        let z;

        if (tapinDay == 'AM' && tapoutDay == 'AM') {

            let x = ((Number(formValues.hrOUT)) * 60 + (Number(formValues.minOUT)))
            let y = (Number(formValues.hrsIN) * 60) + Number(formValues.minIN)
            z = x - y
            chngHrsPassed(Math.trunc(z / 60));
            chngMinPassed(z % 60)


        } else if (tapinDay == 'AM' && tapoutDay == 'PM') {

            let x;
            if (formValues.hrOUT == 12) {
                x = (12 * 60 + (Number(formValues.minOUT)))
            } else {
                x = ((12 + Number(formValues.hrOUT)) * 60 + (Number(formValues.minOUT)))
            }

            const y = (Number(formValues.hrsIN) * 60) + Number(formValues.minIN)
            z = x - y //total minutes
            chngHrsPassed(Math.trunc(z / 60));
            // chngHrsPassed(z);    
            chngMinPassed(z % 60)

        }

        const remMinutes = 600 - z;
        chngTopupHrs(Math.trunc(remMinutes / 60));
        chngTopupMins(remMinutes % 60);
        let currHrs;
        let currMins;

        let finalHrs;
        let finalMins;


        // increase 1 minute for calculating 10 hours
        if ((Number(formValues.minOUT)) == 59) {
            currHrs = Number(formValues.hrOUT) + 1;
            currMins = 0;
        } else {
            currHrs = Number(formValues.hrOUT)
            currMins = Number(formValues.minOUT) + 1;
        }

        if (currMins + (remMinutes % 60) > 60) {
            finalHrs = currHrs + Math.trunc(remMinutes / 60) + 1;
            finalMins = ((currMins + (remMinutes % 60)) - 60);
            if ((finalMins + 1) == 60) {
                finalMins = 0;
                finalHrs = finalHrs + 1;
            }

        } else {

            finalHrs = currHrs + Math.trunc(remMinutes / 60);
            finalMins = currMins + (remMinutes % 60);
            if ((finalMins) == 60) {
                finalMins = 0;
                finalHrs = finalHrs + 1;
            }
        }
        chngFinalHrs(finalHrs);
        chngFinalMins(finalMins);
        chngShow(true);

    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center pt-10 w-1/2'>
                <div className=''>
                    <div className='boss h-full flex gap-1'>
                        <div className="tap-in flex bg-gray-100 p-2 rounded items-center justify-center">
                            <input className='w-1/6 h-8 pl-2' type="number"
                                name="hrsIN"
                                value={formValues.hrsIN}
                                onChange={handleChange}
                                placeholder="0" />
                            <p className='ml-1 mr-1'>:</p>
                            <input className='w-1/6 h-8 pl-2 mr-2' type="number"
                                name="minIN"
                                value={formValues.minIN}
                                onChange={handleChange}
                                placeholder="0" />
                            <Dropdown valFunc={getTapinDay} />
                        </div>


                        <div className="tap-out flex  bg-gray-100 w-max p-2 rounded items-center justify-center ">
                            <input className='w-1/6 h-8 pl-2' type="number"
                                name="hrOUT"
                                value={formValues.hrOUT}
                                onChange={handleChange}
                                placeholder="0" />
                            <p className='ml-1 mr-1'>:</p>
                            <input className='w-1/6 h-8 pl-2 mr-2' type="number"
                                name="minOUT"
                                value={formValues.minOUT}
                                onChange={handleChange}
                                placeholder="0" />
                            <Dropdown valFunc={getTapoutDay} />

                        </div>
                        <button className='bg-blue-600 p-2 text-white rounded cursor-pointer'
                            onClick={handleClick}>Calculate</button>
                    </div>
                    {show && (
                    <div className='mt-10  pl-4 '>
                        <div className='flex mb-2 border-b border-grey-400 pb-1'>
                            <p>TruTime: {hrsPassed} hrs {minPassed} mins</p>
                        </div>
                        <div className='flex mb-2  border-b border-grey-400 pb-1'>
                            <p>Top Up: {topupHrs} hrs {topupMins} mins</p>

                        </div>

                        <div className='flex'>
                            <p className='flex mr-2'> Final Time:  {formValues.hrOUT} : {Number(formValues.minOUT) + 1} PM  To  {finalHRs00} : {finalMins00} PM</p>
                        </div>
                       


                    </div>
                     )}
                </div>
            </div>
        </div>
    )
}