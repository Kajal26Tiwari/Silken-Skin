// Generates a lightweight SVG data URL placeholder for a product name.
// This is used when `thumbnailUrl` is missing so each product still gets a
// distinct visual representation.
export const generateProductPlaceholder = (name = "Product") => {
  const safeName = String(name).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Pick a pastel color based on a hash of the name so different names get different hues
  const hash = [...safeName].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue = hash % 360;
  const bg = `hsl(${hue} 70% 96%)`;
  const fg = `hsl(${hue} 28% 22%)`;

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'>
      <rect width='100%' height='100%' fill='${bg}' rx='8' />
      <g transform='translate(20,40)'>
        <rect x='0' y='0' width='120' height='80' rx='8' fill='${fg}' fill-opacity='0.08'/>
        <circle cx='300' cy='80' r='36' fill='${fg}' fill-opacity='0.06'/>
      </g>
      <text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle'
        font-family='Georgia, serif' font-size='22' fill='${fg}'>${safeName}</text>
    </svg>
  `;

  // Encode and return as data URL
  const encoded = encodeURIComponent(svg).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
};

export default generateProductPlaceholder;
