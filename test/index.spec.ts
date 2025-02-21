// test/index.spec.ts
import { runAdapterTests } from '@torch-orm/test';
import { env } from 'cloudflare:test';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { CloudflareKVDataAdapter } from '../src/index';

// // For now, you'll need to do something like this to get a correctly-typed
// // `Request` to pass to `worker.fetch()`.
// const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

// describe('Hello World worker', () => {
// 	it('responds with Hello World! (unit style)', async () => {
// 		const request = new IncomingRequest('http://example.com');
// 		// Create an empty context to pass to `worker.fetch()`.
// 		const ctx = createExecutionContext();
// 		const response = await worker.fetch(request, env, ctx);
// 		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
// 		await waitOnExecutionContext(ctx);
// 		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
// 	});

// 	it('responds with Hello World! (integration style)', async () => {
// 		const response = await SELF.fetch('https://example.com');
// 		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
// 	});
// });

runAdapterTests(
	'CloudflareKVDataAdapter',
	() =>
		new CloudflareKVDataAdapter({
			kv: (env as any).TORCH_ORM_TEST,
		}),
	{ describe, it, beforeEach, afterAll, expect }
);
