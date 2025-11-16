"use client"
import {useEffect, useState} from "react"
import Header from "../../components/Header"
import CompetitionCard from "../../components/CompetitionCard"
export default function CompetitionsPage(){
  const [comps,setComps]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    fetch("http://localhost:3001/api/competitions").then(r=>r.json()).then(d=>{setComps(d);setLoading(false)}).catch(()=>setLoading(false))
  },[])
  return (
    <>
      <Header/>
      <main className="container">
        <div className="hero neonLarge">
          <h2>Competitions</h2>
          <p>Find upcoming competitions. Register before the deadline.</p>
        </div>
        <div className="grid">
          {loading && <div className="center">Loading...</div>}
          {comps.map(c=><CompetitionCard key={c.id} comp={c}/>)}
        </div>
      </main>
    </>
  )
}
