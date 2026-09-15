# NOX // Superhero Help Portal

A complete TechAscent Machine Test starter project based on the supplied brief.

## What is included
- Responsive superhero landing page
- Original superhero identity: **NOX, the Night Sentinel**
- Animated/stylized CSS hero artwork — no external image required
- Story, powers, mission and CTA
- Conversational chatbot that collects:
  - name
  - age
  - location
  - email
  - grievance/request
- Automatic email notification through EmailJS
- Mobile responsive layout
- Ready for Netlify, Vercel, GitHub Pages, etc.

## Email setup
1. Create an account at EmailJS.
2. Create an email service.
3. Create a template containing these variables:
   `{{visitor_name}}`
   `{{visitor_age}}`
   `{{visitor_location}}`
   `{{visitor_email}}`
   `{{grievance}}`
   `{{submitted_at}}`
4. Copy the Public Key, Service ID and Template ID into `config.js`.
5. Put the candidate's receiving email in `candidateEmail`.

The browser-side EmailJS public key is designed to be public. Do not put private API keys or passwords in this project.

## Run
Because this is plain HTML/CSS/JS, you can simply open `index.html`, but using a local server is recommended:

```bash
python3 -m http.server 5500
```

Then open http://localhost:5500

## Deploy
Drag the folder into Netlify Drop, or import the repository into Vercel.

## Suggested final improvements
- Replace the CSS NOX artwork with a custom illustration if desired.
- Add a small "how NOX works" interaction.
- Add a confirmation reference number after successful submission.
- Add privacy/consent copy before collecting personal information.


## Competition-ready changes in v2
- More distinctive NOX visual identity and HUD details
- Animated scanline / signal aesthetic
- Clear trust/consent step before transmission
- Better validation and error recovery
- Typing indicator for a more natural conversation
- Improved mobile chat layout
- Explicit privacy-oriented microcopy
