import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, BadgeCheck, Eye, FileCheck2, X } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import './certifications.css';

const scope = 'Provision of integrated MEP (mechanical, electrical and plumbing) testing and commissioning of MEP works for construction and fit-out projects, LEED and energy efficiency projects, commissioning management, and MEP third-party witness and inspections.';

const certificates = [
  {
    type: 'ISO CERTIFICATION',
    standard: 'ISO 9001:2015',
    name: 'Quality management system',
    number: 'AB80VII62026659',
    issuer: 'Globus Certifications Private Limited',
    image: '/certifications/iso-9001-preview-1.webp',
    pdf: '/certifications/tcs-iso-9001-2015.pdf',
  },
  {
    type: 'ISO CERTIFICATION',
    standard: 'ISO 14001:2015',
    name: 'Environmental management system',
    number: 'CD80VII62026660',
    issuer: 'Globus Certifications Private Limited',
    image: '/certifications/iso-14001-preview-1.webp',
    pdf: '/certifications/tcs-iso-14001-2015.pdf',
  },
  {
    type: 'ISO CERTIFICATION',
    standard: 'ISO 45001:2018',
    name: 'Occupational health and safety management system',
    number: 'EF80VII62026661',
    issuer: 'Globus Certifications Private Limited',
    image: '/certifications/iso-45001-preview-1.webp',
    pdf: '/certifications/tcs-iso-45001-2018.pdf',
  },
  {
    type: 'PROFESSIONAL MEMBERSHIP',
    standard: 'BSRIA',
    name: 'Building Services Research & Intelligence Association',
    number: 'Membership no. CON1776',
    issuer: 'Building Services Research & Intelligence Association',
    image: '/certifications/bsria-membership-preview.webp',
    pdf: '/certifications/tcs-bsria-membership-certificate.pdf',
  },
  {
    type: 'PROFESSIONAL MEMBERSHIP',
    standard: 'CSA',
    name: 'Commissioning Specialists Association · Corporate Member',
    number: 'Membership no. 1051 · Certificate no. 71051789',
    issuer: 'Commissioning Specialists Association',
    image: '/certifications/csa-membership-preview.webp',
    pdf: '/certifications/tcs-csa-corporate-membership-certificate.pdf',
  },
];

export function CertificationPage() {
  const [activeCertificate, setActiveCertificate] = useState<(typeof certificates)[number] | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = previewDialog.current;
    if (!dialog) return;
    if (activeCertificate && !dialog.open) dialog.showModal();
    if (!activeCertificate && dialog.open) dialog.close();
  }, [activeCertificate]);

  return <>
    <PageHero title="Recognised standards. Responsible delivery." eyebrow="CERTIFICATIONS"
      description="Internationally recognised ISO certifications and professional memberships supporting quality, environmental responsibility, safety and commissioning expertise." />
    <section className="section-shell certification-section" aria-label="TCS ISO certificates">
      <div className="certification-intro">
        <span className="certification-intro-icon"><FileCheck2 size={22}/></span>
        <div>
          <p className="eyebrow">MANAGEMENT SYSTEM CERTIFICATION</p>
          <h2>Clear commitments. Documented standards.</h2>
          <p>Explore TCS management system certifications alongside professional memberships in building services and commissioning.</p>
        </div>
      </div>
      <div className="certification-grid">
        {certificates.map((certificate) => (
          <article className="certification-card" key={certificate.standard}>
            <div className="certificate-preview">
              <img src={certificate.image} alt={`${certificate.standard} ${certificate.type.toLowerCase()} preview for TCS Building Energy Efficiency Services`} loading="lazy" width="708" height="1000" />
            </div>
            <div className="certificate-content">
              <p className="eyebrow"><BadgeCheck size={14}/> {certificate.type} · {certificate.standard}</p>
              <h2>{certificate.name}</h2>
              <p className="certificate-number">{certificate.number}</p>
              <p className="certificate-issuer"><span>{certificate.type === 'ISO CERTIFICATION' ? 'Certification body' : 'Association'}</span><strong>{certificate.issuer}</strong></p>
              <div className="certificate-actions">
                <button className="certificate-preview-button" onClick={() => setActiveCertificate(certificate)}>
                  <Eye size={16}/> Preview PDF
                </button>
                <a className="certificate-download" href={certificate.pdf} download>
                  Download <ArrowDownToLine size={16}/>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="certification-scope">
        <p className="eyebrow"><FileCheck2 size={15}/> ISO CERTIFIED SCOPE</p>
        <p>{scope}</p>
      </div>
      <p className="certification-note">Open the original PDF for the complete certificate details and formal terms.</p>
    </section>
    <dialog className="certificate-dialog" ref={previewDialog} aria-labelledby="certificate-dialog-title"
      onClose={() => setActiveCertificate(null)} onClick={(event) => {
        if (event.target === previewDialog.current) setActiveCertificate(null);
      }}>
      {activeCertificate && <>
        <header className="certificate-dialog-header">
          <div><p className="eyebrow">CERTIFICATE PREVIEW</p><h2 id="certificate-dialog-title">{activeCertificate.standard} · {activeCertificate.name}</h2></div>
          <button className="certificate-dialog-close" aria-label="Close certificate preview" onClick={() => setActiveCertificate(null)}><X size={22}/></button>
        </header>
        <iframe title={`${activeCertificate.standard} certificate PDF`} src={`${activeCertificate.pdf}#view=FitH`} />
        <div className="certificate-dialog-footer">
          <span>If the preview does not load, open or download the original PDF.</span>
          <a href={activeCertificate.pdf} target="_blank" rel="noreferrer">Open PDF</a>
          <a href={activeCertificate.pdf} download>Download <ArrowDownToLine size={15}/></a>
        </div>
      </>}
    </dialog>
  </>;
}
