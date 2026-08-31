import http from 'http';
import { env } from './backend/config/env';
import { logger } from './backend/utils/logger';

/**
 * Development Proxy Helper
 * Can be used to inspect or forward requests between Next.js and standalone Express
 */
export function createDevProxy(targetPort: number = env.PORT) {
  const server = http.createServer((req, res) => {
    const options: http.RequestOptions = {
      hostname: 'localhost',
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      logger.error('Proxy routing error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Proxy Gateway Error', message: err.message }));
    });

    req.pipe(proxyReq, { end: true });
  });

  return server;
}
