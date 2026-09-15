# NOX 
- Superhero Help Portal

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




