import { defineConfig } from 'vite';
import { ViteMinifyPlugin as viteMinifyPlugin } from 'vite-plugin-minify';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import envCompatible from 'vite-plugin-env-compatible';
import path from 'path';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';
import { writeFileSync, mkdirSync, readFileSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
import iconsArray from './vite.application_icons.mjs';
process.env.VITE_MATERIAL_ICONS = iconsArray.join(',');

import poems from './src/data/poetry';
import songsHollow from './src/data/hollow';

const health = () => {
  const required = [
    'REACT_APP_APPLICATION_NAME',
  ];

  const missing = required.filter((key) => !process.env[key]);

  const status = {
    status: missing.length === 0 ? 'ok' : 'error',
    missing,
  };

  mkdirSync('build/status/health', { recursive: true });
  writeFileSync('build/status/health/status.json', JSON.stringify(status, null, 2));

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

const version = () => {
  const versionInfo = {
    version: `v${Date.now()}`,
    date: new Date().toISOString(),
  };
  writeFileSync('build/version.json', JSON.stringify(versionInfo, null, 2), { recusive: true } );
}


function generateVersionFilePlugin() {
  return {
    name: 'generate-version-file',
    apply: 'build',
    closeBundle() {
        version();
        health();
    },
  };
}

function displayEnvVars() {
  console.log(process.env.REACT_APP_MATOMO_URL);
}

function createSiteMap() {

  const base = `https://annieinblack.com`;
  const urls = [
    {
      uri: '/',
      frequency: 'daily',
      priority: '1.00',
    },
    {
      uri: '/about-us',
      frequency: 'weekly',
      priority: '0.80',
    },
    {
      uri: '/our-music',
      frequency: 'daily',
      priority: '0.90',
    },
    {
      uri: '/our-music/hollow',
      frequency: 'daily',
      priority: '0.90',
    },
    {
      uri: '/privacy-policy',
      frequency: 'weekly',
      priority: '0.70',
    }
  ];

  songsHollow.forEach((song) => {
    urls.push({
      uri: `/our-music/hollow/${song.slug}`,
      frequency: 'weekly',
      priority: '0.80',
    });
  });

  poems.forEach((poem) => {
    urls.push({
      uri: `/our-poetry/${poem.slug}`,
      frequency: 'weekly',
      priority: '0.80',
    });
  });

  const lines = [`<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >`];

  urls.forEach((url) => {
    lines.push(`  <url>
    <loc>${base + url.uri}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${ url.frequency || 'daily' }</changefreq>
    <priority>${ url.priority || '1.00'}</priority>
  </url>`
    )
  });

  lines.push(`</urlset>`);

  const outputDir = path.resolve('build');
  const file = path.join(outputDir, 'sitemap.xml');
  const map = lines.join('\n');
  writeFileSync(file, map);

  console.log(`Sitemap created (${file}`);
}

function flatAssetListPlugin() {
  return {
    name: 'flat-asset-list',
    apply: 'build',
    enforce: 'post', // ensures it runs last
    closeBundle() {
      const outputDir = path.resolve('build');
      const extensions = ['.js', '.css', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.woff2', '.ttf', '.ico', '.mp3', '.json'];
      process.env.REACT_APP_DEPLOYMENT_VERSION = Date.now();
      const walk = (dir) => {
        return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) return walk(fullPath);
          const ext = path.extname(entry.name).toLowerCase();
          if (extensions.includes(ext)) {
            return [path.relative(outputDir, fullPath).replaceAll(path.sep, '/')];
          }
          return [];
        });
      };

      const assets = walk(outputDir).sort();
      writeFileSync(path.join(outputDir, '.vite', 'assets.txt'), assets.join('\n'));
      console.log(`✅ flatAssetListPlugin: Wrote ${assets.length} assets to assets.txt`);

      createSiteMap();
      displayEnvVars();
    }
  };
}


export default defineConfig({
  build: {
    outDir: './build',
    sourcemap: false,
    manifest: true,
    chunkSizeWarningLimit: 950,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
  plugins: [
    react(),
    envCompatible({ prefix: 'REACT_APP' }),
    svgr(),
    viteMinifyPlugin({}),
    vitePluginFaviconsInject(
      path.resolve(__dirname, 'src/assets/logos/annie.png'), // inputSource
      {
        appName: 'Annie in Black',
        appShortName: 'Annie In Black',
        appDescription: 'Soundtracks of loss, sorrow and regrets - dark, honest & true',
        theme_color: '#ffffff',
        background: '#000000',
        display: 'standalone',
        dir: "auto",
        lang: "en-GB",
        icons: {
          favicons: true,
          android: false,
          appleIcon: true,
          appleStartup: false,
          windows: false,
          yandex: false,
          firefox: false,
          coast: false
        }
      }
    ),
    // viteCompression(),
    legacy(),
    generateVersionFilePlugin(),
    flatAssetListPlugin(),
  ],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  process: {
    env: {
      BROWSER: 'chrome',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    open: './index.html',
    port: 2100,
    host: true,
    watch: {
      ignored: ['**/coverage/**'], // ✅ Don't watch it
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
});
