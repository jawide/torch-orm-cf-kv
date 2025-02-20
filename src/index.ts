/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { DataStore } from '@torch-orm/core';
import { CloudflareKVDataAdapter } from './CloudflareKVDataAdapter';

export * from './CloudflareKVDataAdapter';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const adapter = new CloudflareKVDataAdapter({
			kv: env.TORCH_ORM_TEST,
		});
		const store = new DataStore({
			collection: 'config',
			adapter,
		});
		await store.set('enable', true);
		const enable = await store.get('enable');
		return Response.json({ enable });
	},
} satisfies ExportedHandler<Env>;
