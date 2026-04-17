export function createCertificateSVG({ title = 'Certificate', subtitle = 'Achievement', badge = 'Award', month = '' } = {}) {
    const date = new Date().toLocaleDateString();
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="100%" height="100%" fill="#fff" rx="24"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect x="40" y="40" width="1120" height="720" rx="20" fill="url(#g)" />
  <g transform="translate(80,120)">
    <text x="0" y="0" font-family="Segoe UI, Roboto, Arial" font-size="28" fill="#374151">Sustainability Report</text>
    <text x="0" y="80" font-family="Georgia, serif" font-size="48" font-weight="700" fill="#111827">${title}</text>
    <text x="0" y="130" font-family="Segoe UI, Roboto, Arial" font-size="20" fill="#374151">${subtitle} • ${month}</text>

    <rect x="0" y="180" width="420" height="220" rx="12" fill="#ffffff" stroke="#e6e6fa" />
    <text x="24" y="220" font-family="Segoe UI, Roboto, Arial" font-size="20" fill="#111827">Badge</text>
    <text x="24" y="260" font-family="Segoe UI, Roboto, Arial" font-size="32" font-weight="600" fill="#065f46">${badge}</text>

    <text x="520" y="260" font-family="Segoe UI, Roboto, Arial" font-size="14" fill="#6b7280">Issued</text>
    <text x="520" y="300" font-family="Segoe UI, Roboto, Arial" font-size="20" fill="#111827">${date}</text>
  </g>
</svg>`;
}

export function downloadSVG(svgString, filename) {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
