import type { PageServerLoad } from './$types';
import { Note } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const documents = await Note.find({ user_id: session.user.userId });
	let notes = [];

	documents.forEach(({ text, tags, list, _id }) => {
		const id = _id.toString();
		notes.push({
			text,
			tags,
			list,
			id
		});
	});

	return { notes };
};
