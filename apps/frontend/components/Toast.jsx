"use client"
import {useEffect,useState} from "react"
export default function Toast({message,timeout=3000}){
  const [show,setShow]=useState(Boolean(message))
  useEffect(()=>{if(message){setShow(true); const t=setTimeout(()=>setShow(false),timeout); return ()=>clearTimeout(t)}},[message])
  if(!show) return null
  return <div className="toast neon">{message}</div>
}
