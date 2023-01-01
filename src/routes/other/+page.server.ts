import type { Actions } from '@sveltejs/kit';
import fs from 'fs';

export const actions: Actions = {
	default: async (x) => {
		try {
			const file = (await x.request.formData()).get('file') as File;
			fs.writeFileSync('./files/' + file.name, new Uint8Array(await file.arrayBuffer()));
			return {
				success: true,
				filename: file.name
			};
		} catch (e) {
			console.log(e);
		}
	}
};
