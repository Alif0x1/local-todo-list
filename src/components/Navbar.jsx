/* eslint-disable no-unused-vars */
import { useState } from 'react'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between  font-serif bg-violet-950 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-xl  mx-9 '>I Task</span>
        </div>
        <ul className="flex gap-5 mx-9" >
            <li className='cursor-pointer hover:font-bold translate-all duration-500'>Home</li>
            <li className='cursor-pointer hover:font-bold translate-all duration-500'>YourTask</li>
        </ul>
    </nav>
  )
}

export default Navbar
