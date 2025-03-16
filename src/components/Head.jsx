import React, { useState } from 'react';


export default function Head() {

    return (
        <div className="bg-indigo-900 h-max py-3 cursor-pointer">
            <div className="cursor-arrow flex justify-between">
                <p className='cursor-arrow  text-white pl-3 font-semibold'>1C</p>
                <p className='font-sans cursor-pointer text-white '>TruTime Calculator</p>
                <span></span>
            </div>
        </div>
    )
}