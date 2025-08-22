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

const health = () => {
  const required = [
    'REACT_APP_REVIEW_SERVICE',
    'REACT_APP_USER_SERVICE',
    'REACT_APP_APPLICATION_NAME',
    'REACT_APP_TRACKING_APPLICATION_NAME',
    'REACT_APP_PROFILE_IMAGES_URL',
    'REACT_APP_COMPANY_LOGO_IMAGES_URL',
    'REACT_APP_PUBLIC_SEARCH_API_KEY',
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
function flatAssetListPlugin() {
  return {
    name: 'flat-asset-list',
    apply: 'build',
    enforce: 'post', // ensures it runs last
    closeBundle() {
      const outputDir = path.resolve('build');
      const extensions = ['.js', '.css', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.woff2', '.ttf', '.ico', '.mp3', '.json'];

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
        appName: 'Ratecruiter',
        appShortName: 'Ratecruiter',
        appDescription: 'Recruiter transparency and accountability platform.',
        theme_color: '#0d47a1',
        background: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        dir: "auto",
        lang: "en-GB",
        icons: {
          favicons: true,
          android: true,
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
