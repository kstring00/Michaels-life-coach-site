const roles = ["Marriage","Career","Family","Parenthood","Relationships","Identity","Direction","Purpose","Change"];
export function RoleStrip(){ const all=[...roles,...roles]; return <div className="role-strip"><div className="role-track">{all.map((r,i)=><span key={`${r}-${i}`}>{r}</span>)}</div></div> }
