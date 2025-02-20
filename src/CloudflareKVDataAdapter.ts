import { KeyValueDataAdapter } from '@torch-orm/core';

export interface CloudflareKVDataAdapterOptions {
	kv: KVNamespace;
}

export class CloudflareKVDataAdapter extends KeyValueDataAdapter {
	public kv: KVNamespace;

	constructor(options: CloudflareKVDataAdapterOptions) {
		super();
		this.kv = options.kv;
	}

	public async getValue<T>(key: string): Promise<T> {
		return JSON.parse((await this.kv.get(key)) as string) as T;
	}
	public async setValue<T>(key: string, value: T): Promise<void> {
		await this.kv.put(key, JSON.stringify(value));
	}
	public async removeValue(key: string): Promise<void> {
		await this.kv.delete(key);
	}
	public async getIndex(key: string): Promise<string[]> {
		return (await this.kv.list({ prefix: key })).keys.map((key) => key.name);
	}
	public async setIndex(key: string, value: string[]): Promise<void> {
		await this.kv.put(key, JSON.stringify(value));
	}
	public async removeIndex(key: string): Promise<void> {
		await this.kv.delete(key);
	}
}
