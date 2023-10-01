import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { Note } from '$lib/server/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const result = await Note.find({ user_id: session.user.userId });
	let notes = [];

	result.forEach((n) => {
		notes.push({
			text: n.text
		});
	});

	return { notes };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		const text = formData.get('text');

		const session = await locals.auth.validate();

		if (!session) return fail(401);

		const newNote = new Note({
			text,
			user_id: session.user.userId
		});

		newNote.save();
	}
};
