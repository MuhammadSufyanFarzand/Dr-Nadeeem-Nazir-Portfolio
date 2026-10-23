import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function persistPortraitPlugin(): Plugin {
  return {
    name: 'persist-portrait-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-portrait', (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            const dataUrl = typeof parsed?.dataUrl === 'string' ? parsed.dataUrl : '';
            if (dataUrl.startsWith('data:image/')) {
              const targetFile = path.resolve(__dirname, 'src/data/savedPortrait.ts');
              const currentContent = fs.existsSync(targetFile)
                ? fs.readFileSync(targetFile, 'utf-8')
                : '';
              const nextContent = `/**\n * Permanent portrait storage.\n */\nexport const SAVED_PORTRAIT_DATA_URL: string = ${JSON.stringify(dataUrl)};\n`;
              if (currentContent !== nextContent) {
                fs.writeFileSync(targetFile, nextContent, 'utf-8');
              }
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), persistPortraitPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
