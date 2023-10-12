import type { PageServerLoad } from './$types';
import { Note } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const result = await Note.find({ user_id: session.user.userId });
	let notes = [];

	result.forEach((n) => {
		const id = n._id.toString();
		notes.push({
			text: n.text,
			tags: n.tags,
			id
		});
	});

	return { notes };
};
