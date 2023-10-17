import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import mongoose from 'mongoose';
import { Note } from '$lib/server/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const filter = { user_id: session.user.userId };
	const documents = await Note.find(filter);

	if (!documents) throw redirect(302, '/');

	let notes = [];

	documents.forEach(({ _id, text, tags, list }) => {
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

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		const text = formData.get('text');
		const count = formData.get('tag-count');

		// TODO: refactor w/ shadcn svelte for zod sveltekit superforms intergration

		if (text.length < 5) {
			return fail(400, { description: 'the text is too short!' });
		}

		let tags = [];

		for (let i = 0; i < parseInt(count); i++) {
			tags.push(formData.get('tag' + i));
		}

		const session = await locals.auth.validate();

		if (!session) return fail(401);

		const newNote = new Note({
			text,
			tags,
			user_id: session.user.userId
		});

		try {
			newNote.save();
		} catch (error) {
			return fail(400, { description: error.message });
		}
	}
};
