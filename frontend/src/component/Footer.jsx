import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <footer className='w-full bg-[#dbfcfcec] pt-12 pb-6 mt-12'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10'>
          <div className='space-y-5'>
            <div className='flex items-center gap-2'>
              <img src={logo} alt="Logo" className='w-10 h-10'/>
              <p className='text-xl text-[#1e2223] font-semibold'>OneCart</p>
            </div>
            <p className='text-[15px] text-[#1e2223] leading-relaxed hidden md:block'>OneCart is your all-in-one online shopping destination.</p>
            <p className='text-[15px] text-[#1e2223] md:hidden'>Fast. Easy. Reliable.</p>
          </div>
          <div className='space-y-3'>
            <p className='text-xl text-[#1e2223] font-semibold'>Quick Links</p>
            <ul className='space-y-2'>
              <li className='text-[15px] text-[#1e2223] cursor-pointer'>Home</li>
              <li className='text-[15px] text-[#1e2223] cursor-pointer'>About Us</li>
              <li className='text-[15px] text-[#1e2223] cursor-pointer hidden md:block'>Delivery</li>
              <li className='text-[15px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
            </ul>
          </div>
          <div className='space-y-3'>
            <p className='text-xl text-[#1e2223] font-semibold'>Get In Touch</p>
            <ul className='space-y-2'>
              <li className='text-[15px] text-[#1e2223]'>+91-9876543210</li>
              <li className='text-[15px] text-[#1e2223]'>contact@onecart.com</li>
              <li className='text-[15px] text-[#1e2223] hidden md:block'>+1-123-456-7890</li>
              <li className='text-[15px] text-[#1e2223] hidden md:block'>admin@onecart.com</li>
            </ul>
          </div>
          <div className='space-y-5'>
            <p className='text-xl text-[#1e2223] font-semibold'>Newsletter</p>
            <p className='text-[15px] text-[#1e2223]'>Subscribe & Get 20% Off</p>
            <div className='flex gap-2 items-center'>
              <input type='email' placeholder='Your email address' className='flex-1 h-11 px-4 rounded-lg border border-[#3b3b5c] bg-white focus:border-[#3bcee8] focus:outline-none transition-colors'/>
              <button className='h-11 px-6 bg-[#3bcee848] text-white rounded-lg hover:bg-[#3bcee860] transition-colors'>Subscribe</button>
            </div>
          </div>
        </div>
        <div className='w-full h-px bg-slate-400 my-6'></div>
        <div className='text-center text-[14px] text-[#1e2223] pb-4'>Copyright 2025@onecart.com - All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer





