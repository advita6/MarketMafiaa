"use client"
import {useEffect,useState} from "react"
export default function ThemeToggle(){
  const [dark,setDark]=useState(false)
  useEffect(()=>{
    const saved = localStorage.getItem("theme")
    if(saved) setDark(saved==="dark")
    else{
      const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      setDark(prefers)
      localStorage.setItem("theme", prefers ? "dark" : "light")
    }
  },[])
  useEffect(()=>{
    document.documentElement.dataset.theme = dark ? "dark" : "light"
    localStorage.setItem("theme", dark ? "dark" : "light")
  },[dark])
  return <button className="btn icon" onClick={()=>setDark(s=>!s)} aria-label="toggle theme">{dark ? "??" : "??"}</button>
}
