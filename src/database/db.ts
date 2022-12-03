// db.ts
import Dexie, { type Table } from 'dexie';

export interface Image {
	id?: number;
	name: string;
	image: Blob;
}

export class MySubClassedDexie extends Dexie {
	// 'friends' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	images!: Table<Image>;

	constructor() {
		super('myDatabase');
		this.version(1).stores({
			images: '++id, name, image' // Primary key and indexed props
		});
	}
}

export const db = new MySubClassedDexie();
