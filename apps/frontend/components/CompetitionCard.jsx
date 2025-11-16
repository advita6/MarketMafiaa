import Link from "next/link"
export default function CompetitionCard({comp}){
  return (
    <article className="card neon">
      <h3>{comp.title}</h3>
      <p className="muted">{comp.description}</p>
      <div className="meta"><strong>By</strong> {comp.organizer?.name}</div>
      <div className="row space">
        <div className="tags">{comp.tags?.map(t=> <span key={t} className="tag">{t}</span>)}</div>
        <Link href={"/competitions/"+comp.id}><a className="btn small">View</a></Link>
      </div>
    </article>
  )
}
