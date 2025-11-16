"use client"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
export default function Header(){
  const token = (typeof window!=="undefined")?localStorage.getItem("token"):null
  return (
    <header className="header neonBar">
      <div className="left">
        <Link href="/"><a className="logo">Mini Compete</a></Link>
      </div>
      <nav className="nav">
        <Link href="/competitions"><a>Competitions</a></Link>
        <Link href="/dashboard"><a>Dashboard</a></Link>
        <Link href="/profile"><a>Profile</a></Link>
      </nav>
      <div className="right">
        <ThemeToggle/>
        {!token ? <Link href="/login"><a className="btn small">Sign in</a></Link> : <button className="btn small ghost" onClick={()=>{localStorage.removeItem("token");location.reload()}}>Sign out</button>}
      </div>
    </header>
  )
}
