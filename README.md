# Kowsik S — Portfolio Website

A dark-themed, responsive personal portfolio for **Kowsik S**, an aspiring Machine Learning Engineer & Data Analyst. Built with plain HTML5, CSS3, and vanilla JavaScript — no build step, no frameworks.

## Structure

```
kowsik-portfolio/
├── index.html          Main page (all sections)
├── css/style.css        Styling (dark navy/black, blue→violet accents)
├── js/script.js          Nav behavior, scroll reveal, certificate modal, form handling
├── assets/
│   └── certificates/     Certificate images/PDFs + generated thumbnails for the PDF certs
├── resume/
│   └── Kowsik_S_Resume.pdf
└── README.md
```

## Running locally

No build tools needed — just open `index.html` in a browser, or serve the folder:

```bash
cd kowsik-portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- The contact form has no backend wired up. Wire `js/script.js`'s submit handler to a real form service (e.g. Formspree, EmailJS, or a custom endpoint) before relying on it.
- The "Live Demo" link for the MS Agencies Billing App is a placeholder — replace it with the real deployed URL when available.
- Certificate dates for Techforge are shown exactly as printed on the certificate (13-01-2026 to 03-01-2026), even though this reads as inverted — the Experience section instead shows the internship's actual calendar period (January 2026 – February 2026).
- PDF certificates (CodeAlpha, Kalam, VIT) are rendered as JPEG thumbnails for the gallery/modal preview; the "Open Original" link in the certificate modal opens the source PDF.
