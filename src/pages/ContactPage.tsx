import { ArrowUpRight, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { contact, whatsappLink } from '../data/content';
import { PageHero } from '../components/PageHero';
import { EnquiryForm } from '../components/EnquiryForm';

export function ContactPage() {
  return <>
    <PageHero title="Let’s build something better." eyebrow="CONTACT TCS"
      description="Give us a call or send us a message to find out more about our company and discuss your project." />
    <section className="section-shell directory-section contact-page-grid">
      <div>
        <div className="contact-info-card">
          <MapPin size={24}/><h2>Visit our office</h2>
          <address>{contact.address}</address>
          <a className="text-link" target="_blank" rel="noreferrer"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}>
            Open in maps<ArrowUpRight size={16}/>
          </a>
        </div>
        <div className="contact-info-card">
          <Phone size={23}/><h2>Call our team</h2>
          <a href={`tel:${contact.phoneLink}`}>{contact.phone}</a>
          <a href={`tel:${contact.secondaryPhoneLink}`}>{contact.secondaryPhone}</a>
        </div>
        <div className="contact-info-card">
          <Mail size={23}/><h2>Email us</h2>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <div className="contact-info-card">
          <MessageCircle size={24}/><h2>Message us on WhatsApp</h2>
          <p>Share your project requirements directly with our team.</p>
          <a className="button button-dark" href={whatsappLink()} target="_blank" rel="noreferrer">
            Start a conversation<ArrowUpRight size={16}/>
          </a>
        </div>
      </div>
      <EnquiryForm/>
    </section>
  </>;
}
