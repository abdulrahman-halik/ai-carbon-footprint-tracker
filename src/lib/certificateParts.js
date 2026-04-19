export function renderHeader(title, achievement) {
  return `    <!-- header -->
    <text x="240" y="120" font-family="Georgia, 'Times New Roman', serif" style="font-size:clamp(20px,3.2vw,48px);" fill="#0f172a" font-weight="700">${title}</text>
    <text x="240" y="170" font-family="Segoe UI, Roboto, Arial" style="font-size:clamp(12px,1.6vw,18px);" fill="#6b7280">${achievement}</text>`;
}

export function renderRecipient(recipient) {
  return `    <!-- left column: recipient -->
    <g transform="translate(240,220)">
      <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" style="font-size:clamp(14px,2.2vw,28px);" fill="#374151">Presented to</text>
      <text x="0" y="64" font-family="Georgia, 'Times New Roman', serif" style="font-size:clamp(28px,5.2vw,60px);" font-weight="700" fill="#0f172a" filter="url(#textShadow)">${recipient}</text>
    </g>`;
}

export function renderSeal(logoDataUrl) {
  return `    <!-- decorative gold seal -->
    <g transform="translate(1240,200)">
      <g filter="url(#softShadow)">
        <circle cx="0" cy="0" r="90" fill="url(#gold)" />
        <circle cx="0" cy="0" r="56" fill="#fff" />
      </g>
      ${logoDataUrl ? `<image href="${logoDataUrl}" x="-42" y="-42" width="84" height="84" preserveAspectRatio="xMidYMid slice"/>` : ''}
      <g transform="translate(0,70)">
        <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="20" font-weight="700" text-anchor="middle" fill="#7c2d0e">Certified</text>
        <text x="0" y="28" font-family="Segoe UI, Roboto, Arial" font-size="12" text-anchor="middle" fill="#92400e">Sustainability</text>
      </g>
      <path d="M-36,110 l-52,120 l36,-18 l52,-120 z" fill="#f97316" opacity="0.95" />
      <path d="M36,110 l52,120 l-36,-18 l-52,-120 z" fill="#f59e0b" opacity="0.95" />
    </g>`;
}

export function renderBody(bodyText) {
  return `    <!-- body text -->
    <foreignObject x="240" y="360" width="880" height="200">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Segoe UI, Roboto, Arial; color:#374151; font-size:clamp(12px,1.8vw,18px); line-height:1.5;">
        <p>${bodyText}</p>
      </div>
    </foreignObject>`;
}

export function renderMetrics(metrics) {
  if (!metrics || !metrics.length) return '';
  return `    <!-- metrics (below body) -->
    <g transform="translate(240,560)">
      ${metrics.map((m, i) => `
        <g transform="translate(${i * 240},0)">
          <rect x="0" y="0" width="220" height="88" rx="12" fill="#f8fafc" stroke="#eef2ff" />
          <text x="20" y="28" font-family="Segoe UI, Roboto, Arial" style="font-size:clamp(10px,1.6vw,12px);" fill="#6b7280">${m.label}</text>
          <text x="20" y="60" font-family="Georgia, 'Times New Roman', serif" style="font-size:clamp(16px,3.2vw,22px);" font-weight="700" fill="#0f172a">${m.value}</text>
        </g>
      `).join('')}
    </g>`;
}

export function renderSignature(issuer, formattedDate, id) {
  return `    <!-- signature area -->
    <g transform="translate(240,640)">
      <line x1="0" y1="60" x2="360" y2="60" stroke="#eef2ff" stroke-width="2" />
      <text x="0" y="90" font-family="Segoe UI, Roboto, Arial" style="font-size:clamp(10px,1.6vw,14px);" fill="#6b7280">Authorized by</text>
      <text x="0" y="112" font-family="Georgia, 'Times New Roman', serif" style="font-size:clamp(14px,2.4vw,18px);" fill="#0f172a" font-weight="600">${issuer}</text>
    </g>
    <text x="1200" y="740" font-family="Segoe UI, Roboto, Arial" style="font-size:clamp(10px,1.6vw,14px);" fill="#9ca3af" text-anchor="end">Issued: ${formattedDate}</text>
    <text x="240" y="820" font-family="Segoe UI, Roboto, Arial" style="font-size:clamp(10px,1.6vw,12px);" fill="#9ca3af">Certificate ID: ${id}</text>
    <text x="240" y="840" font-family="Segoe UI, Roboto, Arial" style="font-size:clamp(10px,1.6vw,12px);" fill="#9ca3af">This certificate is digitally generated and valid without a signature.</text>`;
}

export function defaultBodyText() {
  return 'In recognition of measurable actions taken to reduce environmental impact. This certificate acknowledges the recipient\'s continued dedication to lowering carbon emissions and promoting sustainable choices.';
}
