const domains = ["Divorce", "Empty nest", "Career change"];

export function Marquee() {
  const all = [...domains, ...domains, ...domains, ...domains];
  return <div className="marquee"><div className="marquee-track">{all.map((d, i) => <span key={i}>{d}</span>)}</div></div>;
}
