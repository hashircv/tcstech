import { ArrowUpRight, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Brand } from './Brand';
import { contact, whatsappLink } from '../data/content';
import './footer.css';

export function Footer() {
  return <>
    <footer className="site-footer">
      <div className="section-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand/>
            <p>Expert engineering for better buildings, healthier spaces and a sustainable future.</p>
            <a className="footer-enquiry" href="/contact/">Start an enquiry<ArrowUpRight size={18}/></a>
          </div>
          <nav className="footer-links" aria-label="Company links">
            <h2 className="footer-label">Explore TCS</h2>
            <a href="/">Home</a>
            <a href="/about/">About us</a>
            <a href="/our-team/">Our team</a>
            <a href="/markets/">Markets</a>
            <a href="/career/">Careers</a>
            <a href="/news-insight/">News & insights</a>
          </nav>
          <nav className="footer-links" aria-label="Services and projects">
            <h2 className="footer-label">Our work</h2>
            <a href="/services/">All services</a>
            <a href="/completed/">Completed projects</a>
            <a href="/on-going/">Ongoing projects</a>
            <a href="/contact/">Contact us</a>
          </nav>
          <div className="footer-contact">
            <h2 className="footer-label">Get in touch</h2>
            <a className="footer-contact-link" href={`mailto:${contact.email}`}><Mail size={17}/>{contact.email}</a>
            <a className="footer-contact-link" href={`tel:${contact.phoneLink}`}><Phone size={17}/>{contact.phone}</a>
            <a className="footer-contact-link" href={`tel:${contact.secondaryPhoneLink}`}><Phone size={17}/>{contact.secondaryPhone}</a>
            <a className="footer-contact-link" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={18}/>WhatsApp us</a>
            <div className="footer-address"><MapPin size={19}/><address>{contact.address}</address></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TCS Building Energy Efficiency Services. All rights reserved.</span>
          <a href="#">Back to top ↑</a>
        </div>
      </div>
    </footer>
    <a className="whatsapp-button" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Message TCS on WhatsApp">
      <span className="whatsapp-icon" aria-hidden="true"><MessageCircle size={28}/><Phone size={13}/></span>
      <span className="whatsapp-label">Message us</span>
    </a>
  </>;
}
