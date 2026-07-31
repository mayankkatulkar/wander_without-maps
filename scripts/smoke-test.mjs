/**
 * Starts the production server, crawls every internal link reachable from the
 * homepage, and fails if anything does not return 200.
 *
 * This is the check that would have caught the state this site shipped in
 * before: nav and footer links pointing at routes that did not exist.
 *
 * Run locally with:  node scripts/smoke-test.mjs
 */
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = process.env.SMOKE_PORT || 3123;
const BASE = `http://localhost:${PORT}`;
const START_TIMEOUT_MS = 90_000;

/** Routes we expect to exist regardless of whether anything links to them. */
const REQUIRED = ['/', '/sitemap.xml', '/robots.txt', '/search?q=goa'];

const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: process.env,
});

let serverOutput = '';
server.stdout.on('data', (d) => (serverOutput += d));
server.stderr.on('data', (d) => (serverOutput += d));

const shutdown = () => {
  if (!server.killed) server.kill('SIGTERM');
};
process.on('exit', shutdown);
process.on('SIGINT', () => {
  shutdown();
  process.exit(130);
});

async function waitForServer() {
  const deadline = Date.now() + START_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Server exited early (code ${server.exitCode}):\n${serverOutput}`);
    }
    try {
      const res = await fetch(BASE + '/');
      if (res.ok) return;
    } catch {
      // Not listening yet.
    }
    await sleep(500);
  }
  throw new Error(`Server did not start within ${START_TIMEOUT_MS}ms:\n${serverOutput}`);
}

async function crawl() {
  const seen = new Map();
  const queue = [...REQUIRED];
  const linkedFrom = new Map();

  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;

    let status;
    let html = '';
    try {
      const res = await fetch(BASE + path);
      status = res.status;
      if ((res.headers.get('content-type') || '').includes('text/html')) {
        html = await res.text();
      }
    } catch (error) {
      seen.set(path, `ERROR ${error.message}`);
      continue;
    }
    seen.set(path, status);

    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        continue;
      }
      const target = href.split('#')[0];
      if (!target || seen.has(target)) continue;
      if (!linkedFrom.has(target)) linkedFrom.set(target, path);
      queue.push(target);
    }
  }

  return { seen, linkedFrom };
}

try {
  await waitForServer();
  const { seen, linkedFrom } = await crawl();

  const broken = [...seen].filter(([, status]) => status !== 200);

  if (broken.length > 0) {
    console.error(`\n✗ ${broken.length} of ${seen.size} URLs did not return 200:\n`);
    for (const [path, status] of broken) {
      const source = linkedFrom.get(path);
      console.error(`  ${status}  ${path}${source ? `   (linked from ${source})` : ''}`);
    }
    process.exit(1);
  }

  console.log(`✓ crawled ${seen.size} internal URLs, all returned 200`);
  process.exit(0);
} catch (error) {
  console.error(`✗ smoke test failed: ${error.message}`);
  process.exit(1);
}
