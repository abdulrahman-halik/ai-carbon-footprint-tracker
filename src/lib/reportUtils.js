import { renderHeader, renderRecipient, renderSeal, renderBody, renderMetrics, renderSignature, defaultBodyText } from './certificateParts';

export function createCertificateSVG({
    title = 'Certificate of Achievement',
    recipient = 'Awarded To',
    achievement = 'For outstanding sustainability progress',
    metrics = [], // array of { label, value }
    issuer = 'Carbon Insights Team',
    id = '',
    logoDataUrl = ''
} = {}) {
    const date = new Date();
    const formattedDate = date.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 1600 1100" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;display:block;margin:0 auto;">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbfbff"/>
      <stop offset="100%" stop-color="#eef2ff"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="18" flood-color="#000" flood-opacity="0.12" />
    </filter>
    <filter id="textShadow">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)" />

  <!-- subtle watermark -->
  <g transform="translate(400,150)">
    <text transform="rotate(-22)" x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="140" fill="#0f172a" opacity="0.04">SUSTAINABLE</text>
  </g>

  <!-- framed panel -->
  <g transform="translate(80,70)">
    <rect x="0" y="0" width="1440" height="960" rx="28" fill="#ffffff" stroke="#eef2ff" />

    <!-- corner flourish -->
    <path d="M20,20 L80,20 C120,20 120,80 80,80 L20,80 Z" fill="#f8fafc" opacity="0.9" />
    <path d="M1400,20 L1340,20 C1300,20 1300,80 1340,80 L1400,80 Z" fill="#f8fafc" opacity="0.9" />

    ${renderHeader(title, achievement)}

    <!-- left column: recipient + metrics -->
    ${renderRecipient(recipient)}

    <!-- decorative gold seal -->
    ${renderSeal(logoDataUrl)}

    <!-- body text -->
    ${renderBody(defaultBodyText())}

    <!-- metrics (below body) -->
    ${renderMetrics(metrics)}

    <!-- signature area -->
    ${renderSignature(issuer, formattedDate, id)}
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
