export default function Card ({id,title,body}){
    return (
        <div className="card-content">
        <h1>{id}</h1>
        <h1>{title}</h1>
        <p>{body}</p>
        </div>
        )
}