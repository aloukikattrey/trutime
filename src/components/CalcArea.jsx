import React, { useState } from 'react';
import './Dropdown'
import Dropdown from './Dropdown';
import './DropdownTime'
import DropdownTime from './DropdownTime';

export default function CalcArea() {
    const [formValues, setFormValues] = useState({
        hrsIN: '',
        minIN: '',
        hrOUT: '',
        minOUT: '',
    });
    const [calc2Vals, setCalc2Vals] = useState({
        newHr: '',
        newMn: '',
        newDay: '',
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
    const [timeToComplete, setTimeToComplete] = useState(10);
    const [active, setActive] = useState('calc1');
    const [isError, setisError] = useState(false);


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
    function getTimeToComplete(value) {
        setTimeToComplete(value);
    }

    function handleClick() {

        let z;
        if (tapinDay == 'AM' && tapoutDay == 'AM') {

            let x = ((Number(formValues.hrOUT)) * 60 + (Number(formValues.minOUT)))
            let y = (Number(formValues.hrsIN) * 60) + Number(formValues.minIN)

            if (y > x) {
                setisError(true)
            } else {
                setisError(false)
            }

            z = x - y
            chngHrsPassed(Math.trunc(z / 60));
            chngMinPassed(z % 60)


        } else if (tapinDay == 'AM' && tapoutDay == 'PM') {
            setisError(false)
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

        } else if (tapinDay == 'PM' && tapoutDay == 'PM') {
            let x = ((Number(formValues.hrOUT) == 12 ? 12 : Number(formValues.hrOUT) + 12) * 60) + Number(formValues.minOUT);
            let y = ((Number(formValues.hrsIN) == 12 ? 12 : Number(formValues.hrsIN) + 12) * 60) + Number(formValues.minIN);
            if (y > x) {
                setisError(true)
            } else {
                setisError(false)
            }
            z = x - y;
            chngHrsPassed(Math.trunc(z / 60));
            chngMinPassed(z % 60);

        } else if (tapinDay == 'PM' && tapoutDay == 'AM') {
            let x = ((Number(formValues.hrOUT)) * 60 + (Number(formValues.minOUT)));
            let y = ((Number(formValues.hrsIN) == 12 ? 12 : Number(formValues.hrsIN) + 12) * 60) + Number(formValues.minIN);
            z = (12 * 60 - y) + x; // Minutes till midnight + AM minutes
            chngHrsPassed(Math.trunc(z / 60));
            chngMinPassed(z % 60);

        }

        const remMinutes = (timeToComplete * 60) - z;

        console.log(remMinutes);
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
        chngFinalMins(finalMins.toString().padStart(2, '0'));
        chngShow(true);

        //handleclick end
    }

    function handleClick2() {
        setisError(false);

        let hours = parseInt(Number(formValues.hrsIN), 10);
        let minutes = parseInt(Number(formValues.minIN), 10);

        // Convert 12-hour format to 24-hour format
        if (tapinDay === "PM" && hours !== 12) {
            hours += 12;
        }
        if (tapinDay === "AM" && hours === 12) {
            hours = 0;
        }

        // Create a date object and add 10 hours
        let date = new Date();
        date.setHours(hours + timeToComplete, minutes, 0);

        // Convert back to 12-hour format
        let newHours = date.getHours();
        let newMinutes = date.getMinutes();
        let newTypeofDay = newHours >= 12 ? "PM" : "AM";

        newHours = newHours % 12 || 12; // Convert 24-hour format to 12-hour
        newMinutes = newMinutes.toString().padStart(2, '0'); // Ensure two-digit minutes

        setCalc2Vals({
            newHr: newHours,
            newMn: newMinutes,
            newDay: newTypeofDay,
        });
        chngShow(true);

    }

    function handleCalc1() {
        if (active == 'calc2') {
            setActive('calc1')
        }
    }

    function handleCalc2() {
        setisError(false);
        if (active == 'calc1') {
            setActive('calc2')
        }

    }

    var content = (
        <div>
            <div className='datacalc1 mt-10  pl-4 '>
                <div className='flex mb-2 border-b border-gray-400 pb-1'>
                    <p className='w-1/6'>Check-out:</p> <p> {calc2Vals.newHr}:{calc2Vals.newMn} {calc2Vals.newDay}</p>
                </div>
            </div>

        </div>
    )

    return (
        <div className='boss flex justify-center items-center w-full'>
            <div className='bossbaby flex justify-center items-center p-10 w-1/2'>
                <div className=''>
                    <div className='forBlock h-full flex  gap-1'>

                        <div className='forFlex flex gap-1'>

                            <div className="tap-in border border-gray-400 bg-gray-100 p-2 rounded items-center justify-center">
                                <div className='flex items-center justify-center mb-1'>
                                    <p className='text-xs text-gray-800'>Check-in Time</p>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <input className='w-1/6 h-8 pl-2 rounded' type="number"
                                        name="hrsIN"
                                        value={formValues.hrsIN}
                                        onChange={handleChange}
                                        placeholder="0" />
                                    <p className='ml-1 mr-1'>:</p>
                                    <input className='w-1/6 h-8 pl-2 mr-2 rounded' type="number"
                                        name="minIN"
                                        value={formValues.minIN}
                                        onChange={handleChange}
                                        placeholder="0" />
                                    <Dropdown valFunc={getTapinDay} />
                                </div>
                            </div>

                            {active == 'calc1' &&
                                <div className="tap-out border border-gray-400  bg-gray-100 w-max  p-2 rounded items-center justify-center ">
                                    <div className='flex items-center justify-center mb-1'>
                                        <p className='text-xs text-gray-800'>Check-out Time</p>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <input className='w-1/6 h-8 pl-2 rounded ' type="number"
                                            name="hrOUT"
                                            value={formValues.hrOUT}
                                            onChange={handleChange}
                                            placeholder="0" />
                                        <p className='ml-1 mr-1'>:</p>
                                        <input className='w-1/6 h-8 pl-2 mr-2 rounded' type="number"
                                            name="minOUT"
                                            value={formValues.minOUT}
                                            onChange={handleChange}
                                            placeholder="0" />
                                        <Dropdown valFunc={getTapoutDay} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='buttonboss flex'>
                        <button className='btn bg-indigo-800 pl-4 pr-4 text-white rounded cursor-pointer'
                            onClick={active == 'calc1' ? handleClick : handleClick2}>Calculate</button>
                        </div>
                    </div>
                    <div className='toolboss'>
                    <div className='toolbar border border-gray-400 flex mt-1 items-center bg-gray-100 p-2 rounded w-max text-sm' >
                        <div className='flex items-center justify-center'>
                            <p className='mr-2'>Time To Complete</p>
                            <DropdownTime valFunc={getTimeToComplete} />
                        </div>
                        <div className='tool2 flex ml-10'>
                            <div className={`calc1 cursor-pointer border border-indigo-900 rounded-3xl pr-2 pl-2  p-1 mr-2 ${active == 'calc1' ? "active" : ""}`} onClick={handleCalc1}>
                                <p className='text-xs'>Calculate TruTime</p>
                            </div>
                            <div className={`calc2 cursor-pointer  border border-indigo-900 rounded-3xl pl-2 pr-2 p-1  ${active == 'calc2' ? "active" : ""}`} onClick={handleCalc2}>
                                <p className='text-xs'>Calculate Check out Time</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    {show &&
                        (isError ? <div className='datacalc1 mt-5'><p className='text-red-600'>Error: Check-in and Check-out Time are Overlapping</p></div> : active == 'calc2' ? content : active == 'calc1' ?
                            <div className='datacalc1 mt-10  pl-4 '>
                                <div className='flex mb-2 border-b border-gray-400 pb-1'>
                                    <p className='w-1/6'>TruTime:</p> <p> {hrsPassed} hrs {minPassed} mins</p>
                                </div>
                                <div className='flex mb-2  border-b border-gray-400 pb-1'>
                                    <p className='w-1/6'>TopUp Hours:</p>
                                    {hrsPassed == timeToComplete || hrsPassed > timeToComplete ? <p className='text-green-700'>   Time Already Completed</p> : <p> {topupHrs} hrs {topupMins} mins</p>}

                                </div>

                                <div className='flex'>
                                    <p className='w-1/6'>Apply Time: </p>
                                    {hrsPassed == timeToComplete || hrsPassed > timeToComplete ? <p className='text-green-700'>  Time Already Completed</p> : <p className='flex mr-2'>  {formValues.hrOUT} : {(Number(formValues.minOUT) + 1).toString().padStart(2, '0')} {tapoutDay}  to  {finalHRs00} : {finalMins00} {tapoutDay}</p>}
                                </div>
                            </div>
                            : null
                        )
                    }
                </div>
            </div>
        </div>
    )
}