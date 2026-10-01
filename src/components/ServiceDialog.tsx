import { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import type { Service } from '../data/content';
import { catalogue } from '../data/catalogue';
export function ServiceDialog({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (service) { ref.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else ref.current?.close();
    return () => { document.body.style.overflow = ''; };
  }, [service]);
  return <dialog ref={ref} className="service-dialog" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dialog-title">
    {service && <div className="dialog-inner"><button className="close-button" aria-label="Close service details" onClick={onClose}><X /></button><p className="eyebrow">{service.category}</p><h2 id="dialog-title">{service.title}</h2><p>{service.description}</p><h3>How we can help</h3><ul>{service.items.map(item => <li key={item}><Check size={18} />{item}</li>)}</ul><h3>Explore the full service details</h3><div className="service-detail-links">{catalogue.filter(item=>item.group===service.id).map(item=><a key={item.slug} href={`/${item.slug}/`}>{item.title}<span aria-hidden="true">↗</span></a>)}</div><a className="button button-dark" href="/contact/">Discuss this service</a></div>}
  </dialog>;
}
