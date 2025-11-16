"use client"
import '../globals.css'
import {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
export default function RootLayout({children}){
const [theme,setTheme]=useState('dark')
useEffect(()=>{
const t=localStorage.getItem('theme')||'dark'
setTheme(t)
document.documentElement.setAttribute('data-theme',t)
},[])
return (
<html lang="en">
<body>
<div className="app-root">
<Navbar theme={theme} setTheme={t=>{setTheme(t);localStorage.setItem('theme',t);document.documentElement.setAttribute('data-theme',t)}} />
<main className="container">{children}</main>
</div>
</body>
</html>
)
}