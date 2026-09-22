# John Gabriel — Developer Portfolio

A standalone, dependency-free portfolio built with HTML5, CSS3 and vanilla JavaScript.

## Open the website

1. Extract the complete ZIP.
2. Open the `portfolio` folder.
3. Double-click `index.html` to open it in a modern browser.

Keep the files together. No terminal commands, package installation, build process, internet connection or local server are needed.

## Project structure

- `index.html` — complete page content, navigation and project preview concepts.
- `style.css` — design tokens, layout, responsive styles and animation.
- `script.js` — editable project/contact data, navigation, reveals, modal, cursor and interaction logic.
- `assets/images/portrait.png` — your exact uploaded portrait, copied without modifying its image bytes.
- `assets/projects/` — place real project screenshots here.
- `assets/icons/favicon.svg` — JG browser tab icon.

## Customize your information

### Contact links

At the top of `script.js`, fill in `CONTACT.email`, `CONTACT.github` and `CONTACT.linkedin`. Enter the email address alone and full `https://` URLs for profiles. Until filled in, contact buttons explain that the details are coming soon; they do not send visitors to fabricated profiles.

### Project details

Edit each entry in `PROJECTS` at the top of `script.js`. Add repository and live URLs to `github` and `live`. Leave unavailable links empty. Put a screenshot in `assets/projects/`, then set `screenshot` to its relative path, for example `assets/projects/waveks-home.png`. This adds it to the project modal.

The main project panels are deliberately labeled presentation concepts, not actual screenshots. To replace one, find its `project-preview` button in `index.html`, preserve the button and its `data-open` attribute, and replace its inner content with your image. Give the image meaningful alt text. Update concept labels and project status text accordingly. Sample gym numbers are illustrative, not project results.

### Personal copy and experience

Edit the Hero, About, Experience and Skills sections in `index.html`. The journey uses learning stages rather than unverified dates or employment claims. Adjust roles, skills, project status and availability to accurately reflect your experience. Change matching project copy in both `index.html` and `PROJECTS` as needed.

### Portrait

The portrait is already at `assets/images/portrait.png`. Its source file is unchanged. Its transparent background is integrated with CSS layering and a soft bottom fade. Keep this relative path, or update the image source in `index.html`.

### Colors and typography

Edit `:root` at the top of `style.css`. `--accent` controls the green accent. Arial/Helvetica and Georgia are system fonts, so the page remains fully usable offline without remote fonts.

## Interactions

- Navigation tracks the current section; the mobile menu supports Escape and keyboard navigation.
- Project detail dialogs support Escape, outside click, close buttons, keyboard focus containment and focus restoration.
- The marquee has a pause/resume control.
- Pointer effects are limited to suitable desktop devices.
- Reduced-motion preferences disable animated reveals, parallax, marquee motion and cursor effects.
- Tall desktop viewports use stacked sticky project panels; smaller screens use normal document flow.

## Notes

This is a static portfolio, not the backend for the showcased projects. Contact requires your actual details. Project screenshots and public links must be supplied by you. No form submissions, analytics or third-party scripts are included.
