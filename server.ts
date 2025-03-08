import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server.js'; // Ensure this correctly points to your main.server.js file

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: false, // Prevents automatically serving index.html
  }));

  // All regular routes use the Angular engine
  server.get('*', async (req, res, next) => {
    try {
      const html = await commonEngine.render({
        bootstrap, // Uses the updated bootstrapApplication function
        documentFilePath: indexHtml,
        url: req.originalUrl,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });

      res.status(200).send(html);
    } catch (err) {
      console.error('SSR Rendering Error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  return server;
}

// Start server function
function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`🚀 Angular SSR Server running at: http://localhost:${port}`);
  });
}

run();
