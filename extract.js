const fs = require('fs');
const https = require('https');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
};

https.get('https://gemini.google.com/share/43aaf90a3782', options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('raw_share.html', data);
    
    // Extract JSON or strings from AF_initDataCallback
    const matches = data.match(/AF_initDataCallback\(\{[\s\S]*?\}\);/g) || [];
    console.log('Matches count:', matches.length);
    let extracted = [];
    matches.forEach(m => {
      // Find strings in data array
      const strMatches = m.match(/"([^"]{10,})"/g) || [];
      strMatches.forEach(s => {
        const clean = s.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"');
        if (!clean.includes('http') && !clean.includes('gstatic') && !clean.includes('font') && !clean.includes('css') && !clean.includes('Google') && clean.length > 15) {
          extracted.push(clean);
        }
      });
    });
    console.log('--- EXTRACTED TEXTS ---');
    console.log(Array.from(new Set(extracted)).join('\n---\n'));
  });
});
