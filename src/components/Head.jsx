import React, { useState } from 'react';


export default function Head() {

    return (
        <div className="bg-blue-900 h-max py-3 cursor-pointer">
            <div className="cursor-arrow flex justify-between">
                <p className='cursor-arrow text-white pl-3'>1C</p>
                <p className='cursor-pointer text-white'>TruTime Calculator</p>
                <span></span>
            </div>
        </div>
    )
}