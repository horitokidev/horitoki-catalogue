const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://catalog.horitoki.com';
const IMAGE_BASE_URL = 'https://cdn.jsdelivr.net/gh/horitokidev/horitoki-catalogue@main/images/';
const IMG_DIR = './images'; 

const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>`;

const sitemapFooter = `\n</urlset>`;

let urlEntries = '';

if (fs.existsSync(IMG_DIR)) {
    const files = fs.readdirSync(IMG_DIR).filter(file => /\.(webp|jpg|jpeg|png)$/i.test(file));
    
    files.forEach(file => {
        const id = path.parse(file).name; 
        urlEntries += `
  <url>
    <loc>${SITE_URL}/?p=${id}</loc>
    <image:image>
      <image:loc>${IMAGE_BASE_URL}${file}</image:loc>
      <image:title>হরিতকী শাড়ি কোড ${id} - Horitoki Saree BD</image:title>
      <image:caption>এক্সক্লুসিভ প্রিমিয়াম সিল্ক শাড়ি কোড ${id}। Horitoki Saree ক্যাটালগ ২০২৬।</image:caption>
    </image:image>
    <priority>0.8</priority>
  </url>`;
    });
}

const fullSitemap = sitemapHeader + urlEntries + sitemapFooter;
fs.writeFileSync('sitemap.xml', fullSitemap);
console.log('Sitemap generated with ' + urlEntries.length + ' entries.');
