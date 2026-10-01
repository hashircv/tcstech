import { useState } from "react";
import type { FormEvent } from "react";
import { Mail } from "lucide-react";
import { contact } from "../data/content";

const roles = [
  "Fresher",
  "Trainee Mechanical Technician",
  "Trainee Electrical Technician",
  "Trainee Diploma Electrical Engineer",
  "Trainee Diploma Mechanical Engineer",
  "Trainee Graduate Electrical Engineer",
  "Trainee Graduate Mechanical Engineer",
  "Mechanical Supervisor",
  "Electrical Supervisor",
  "AC Technician",
  "Electrical Technician",
  "Commissioning Electrical Engineer",
  "Commissioning Mechanical Engineer",
  "Commissioning Manager Electrical",
  "Commissioning Manager Mechanical",
  "Accounts Officer",
  "HR Officer",
  "Admin Officer",
  "Receptionist",
];
export function EnquiryForm({ career = false }: { career?: boolean }) {
  const [draft, setDraft] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body =
      [...data.entries()]
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n\n") + (career ? "\n\nPlease find my CV attached." : "");
    const subject = career
      ? `Career enquiry — ${data.get("Position applied for")}`
      : `Project enquiry — ${data.get("Name")}`;
    setDraft(
      `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }
  return (
    <form
      className="enquiry-form"
      onSubmit={submit}
      onChange={() => setDraft("")}
    >
      <h2>{career ? "Introduce yourself" : "Tell us about your project"}</h2>
      <p className="form-intro">
        {career
          ? "Prepare your application details below, then attach your CV in your email app."
          : "Complete the details below to prepare an email to our team."}
      </p>
      <div className="form-grid">
        <label>
          Full name
          <input name="Name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email address
          <input
            name="Email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
        <label>
          Phone number{!career && " (optional)"}
          <input
            name="Phone"
            type="tel"
            autoComplete="tel"
            required={career}
            maxLength={40}
          />
        </label>
        {career && (
          <>
            <label>
              Qualification
              <select name="Qualification" required defaultValue="">
                <option value="" disabled>
                  Select qualification
                </option>
                {[
                  "Fresher — Mechanical / Electrical",
                  "Diploma Mechanical / Electrical",
                  "Graduate Mechanical / Electrical",
                  "Postgraduate Mechanical / Electrical",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Position applied for
              <select name="Position applied for" required defaultValue="">
                <option value="" disabled>
                  Select a position
                </option>
                {roles.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              UAE experience
              <select name="UAE experience" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
            <label>
              Years of UAE experience
              <input
                type="number"
                name="Years of UAE experience"
                min="0"
                max="60"
                defaultValue="0"
              />
            </label>
            <label>
              Expected salary (AED)
              <input
                name="Expected salary (AED)"
                type="number"
                min="0"
                required
              />
            </label>
            <fieldset>
              <legend>Certifications (if applicable)</legend>
              <label className="checkbox-label">
                <input type="checkbox" name="Certification — CSA" value="Yes" />
                CSA
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="Certification — NEBB"
                  value="Yes"
                />
                NEBB
              </label>
            </fieldset>
            <label>
              How did you hear about us?
              <select name="Referral source" defaultValue="">
                <option value="">Select (optional)</option>
                <option>Google Search</option>
                <option>Website</option>
                <option>Other</option>
              </select>
            </label>
          </>
        )}
      </div>
      <label>
        {career ? "Career goal / cover letter" : "Your message"}
        <textarea
          name={career ? "Career goal / cover letter" : "Message"}
          rows={5}
          required
          maxLength={2500}
        />
      </label>
      {career && (
        <>
          <p className="form-note">
            CV / résumé: attach a PDF, DOC or DOCX file to your email before
            sending. To upload it directly instead, use the{" "}
            <a
              href="https://tcstech.me/career/"
              target="_blank"
              rel="noreferrer"
            >
              existing online application form
            </a>
            .
          </p>
          <label className="checkbox-label">
            <input
              name="Declaration"
              value="Information confirmed accurate"
              type="checkbox"
              required
            />
            I declare that the information provided is true and correct.
          </label>
        </>
      )}
      <button className="button button-dark" type="submit">
        <Mail size={17} />
        Prepare email
      </button>
      <p className="form-note">
        Nothing is submitted or stored by this form. You review and send the
        message in your email app.
      </p>
      {draft && (
        <div className="draft-ready" role="status">
          <strong>Your email draft is ready.</strong>
          <p>
            {career
              ? "Open the draft, attach your CV, and send it to complete your application."
              : "Open the draft and send it to contact TCS."}
          </p>
          <a className="button button-dark" href={draft}>
            Open email draft
          </a>
        </div>
      )}
    </form>
  );
}
