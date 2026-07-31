import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * OpenNext adapter config for Cloudflare Workers.
 *
 * No incremental cache override is set on purpose. Every content page here is
 * either fully prerendered at build time (served straight from Cloudflare's
 * static assets) or rendered per request from in-bundle data — nothing uses
 * ISR or `revalidate`, so there is nothing for a shared cache to hold.
 *
 * That also keeps the deployment on Cloudflare's free plan: the R2 incremental
 * cache in the adapter's default template requires an R2 bucket, and R2 needs
 * a payment method on file even within its free allowance.
 *
 * If you later add ISR (`export const revalidate = …`) or on-demand
 * revalidation, add an incremental cache here and the matching bindings in
 * wrangler.jsonc — see https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({});
