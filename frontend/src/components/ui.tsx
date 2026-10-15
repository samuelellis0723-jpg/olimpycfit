import type {ReactNode} from 'react';
export function Loading(){return <div className="loading" role="status"><span className="loading-dot"/>Cargando tu espacio…</div>}
export function ErrorNotice({message}:{message:string}){return <p className="notice error" role="alert">{message}</p>}
export function Empty({children}:{children:ReactNode}){return <div className="empty">{children}</div>}
export function PageHeading({eyebrow,title,description,action}:{eyebrow:string;title:string;description?:string;action?:ReactNode}){return <header className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description&&<p className="muted">{description}</p>}</div>{action}</header>}
export function Tag({children,tone=''}:{children:ReactNode;tone?:string}){return <span className={`tag ${tone}`}>{children}</span>}
