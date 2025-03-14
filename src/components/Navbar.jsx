import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between p-5 items-center bg-gray-100'>
        <div className='flex gap-2'>
            <img className='w-10' src="logo.png" alt="logo" />
            <strong className='text-3xl'><a href="#">DONEZO</a></strong>
        </div>

        <div className="text-base hover:scale-102 hover:underline">
            <a className='flex items-center' target='_blank' href="https://github.com/Rahulbabar222/Donezo">
                <p className='px-2'>View code on Github</p>
                <img className='w-7' src="github.png" alt="" />
            </a>
            
        </div>
    </nav>
)
}

export default Navbar