import Link from 'next/link'
export default function Home(){
return (
<div>
<div className="header-hero">
<div className="hero-left">
<h1>Mini Compete</h1>
<p className="small-muted">A polished competitions platform. Full-stack demo with beautiful, professional UI and light/dark themes.</p>
</div>
<div>
<Link href="/register"><button className="btn">Get Started</button></Link>
</div>
</div>
<div className="grid">
<div className="card">
<h3>Designed for judges and participants</h3>
<p className="small-muted">Register, create competitions, and join — everything works with your backend.</p>
</div>
<div className="card">
<h3>Modern UI</h3>
<p className="small-muted">Light/dark mode, responsive layout, and subtle animations.</p>
</div>
</div>
<div className="footer">Made by you · Polished by the assistant</div>
</div>
)
}