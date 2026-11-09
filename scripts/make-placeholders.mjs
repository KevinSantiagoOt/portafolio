// Genera imágenes SVG de ejemplo en public/images y public/icons.
// Uso: node scripts/make-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("public/images", { recursive: true });
mkdirSync("public/icons", { recursive: true });

const project = (name, a, b, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#g)"/>
  <rect x="300" y="190" width="600" height="520" rx="28" fill="#ffffff" fill-opacity="0.9"/>
  <rect x="340" y="240" width="220" height="22" rx="11" fill="#111" fill-opacity="0.85"/>
  <rect x="340" y="282" width="420" height="14" rx="7" fill="#111" fill-opacity="0.25"/>
  <rect x="340" y="350" width="240" height="300" rx="16" fill="#111" fill-opacity="0.08"/>
  <rect x="610" y="350" width="250" height="140" rx="16" fill="#111" fill-opacity="0.08"/>
  <rect x="610" y="510" width="250" height="140" rx="16" fill="#111" fill-opacity="0.08"/>
  <text x="600" y="820" font-family="Arial, sans-serif" font-size="40" fill="#fff" fill-opacity="0.9" text-anchor="middle">${label}</text>
</svg>`;

const projects = [
  ["project-travel", "#f6d5c8", "#b9cfe0", "Travel Easy"],
  ["project-prints", "#d9b8e8", "#7a8fb8", "Prints"],
  ["project-pulse", "#1f2a44", "#4b6cb7", "Pulse Dashboard"],
  ["project-taskflow", "#2b2b2b", "#6b6b6b", "Taskflow API"],
];
for (const [file, a, b, label] of projects) writeFileSync(`public/images/${file}.svg`, project(file, a, b, label));

writeFileSync(
  "public/images/photo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <defs><radialGradient id="r" cx="0.55" cy="0.35" r="0.7"><stop offset="0" stop-color="#3a3a3a"/><stop offset="1" stop-color="#0d0d0d"/></radialGradient></defs>
  <rect width="600" height="800" fill="url(#r)"/>
  <circle cx="310" cy="300" r="120" fill="#bdbdbd"/>
  <path d="M110 800 C130 560 230 470 310 470 C390 470 490 560 510 800 Z" fill="#9a9a9a"/>
</svg>`,
);

const icon = (color, glyph) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">${glyph(color)}</svg>`;
const icons = {
  react: icon("#61DAFB", (c) => `<g fill="none" stroke="${c}" stroke-width="3"><ellipse cx="32" cy="32" rx="26" ry="10"/><ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(120 32 32)"/></g><circle cx="32" cy="32" r="5" fill="${c}"/>`),
  nextjs: icon("#ffffff", () => `<circle cx="32" cy="32" r="28" fill="#000" stroke="#fff" stroke-width="2"/><path d="M24 20v24M24 20l18 26M40 20v14" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`),
  typescript: icon("#3178C6", (c) => `<rect x="6" y="6" width="52" height="52" rx="8" fill="${c}"/><text x="46" y="50" font-family="Arial" font-weight="700" font-size="24" fill="#fff" text-anchor="end">TS</text>`),
  nodejs: icon("#5FA04E", (c) => `<path d="M32 4l24 14v28L32 60 8 46V18z" fill="${c}"/><text x="32" y="40" font-family="Arial" font-weight="700" font-size="16" fill="#fff" text-anchor="middle">JS</text>`),
  tailwind: icon("#38BDF8", (c) => `<path d="M16 28c3-10 9-14 18-12 5 1 7 5 11 6 5 1 9-1 12-6-3 10-9 14-18 12-5-1-7-5-11-6-5-1-9 1-12 6zM7 42c3-10 9-14 18-12 5 1 7 5 11 6 5 1 9-1 12-6-3 10-9 14-18 12-5-1-7-5-11-6-5-1-9 1-12 6z" fill="${c}"/>`),
  postgresql: icon("#4169E1", (c) => `<ellipse cx="32" cy="16" rx="20" ry="8" fill="${c}"/><path d="M12 16v32c0 4 9 8 20 8s20-4 20-8V16" fill="${c}" fill-opacity="0.75"/><ellipse cx="32" cy="16" rx="20" ry="8" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>`),
};
for (const [name, svg] of Object.entries(icons)) writeFileSync(`public/icons/${name}.svg`, svg);

console.log("placeholders ok");
