import type { PageServerLoad } from './$types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { Note } from '$lib/server/schema';
import mongoose from 'mongoose';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const noteId = new mongoose.Types.ObjectId(params.id);

	let note;

	try {
		note = await Note.findOne({ user_id: session.user.userId, _id: noteId });
	} catch (error) {
		return fail(400, { description: error.message });
	}

	if (!note) throw redirect(302, '/notes');

	return {
		note: {
			text: note.text,
			tags: note.tags,
			id: note._id.toString()
		}
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		const formData = await request.formData();
		const id = formData.get('id');
		const objId = new mongoose.Types.ObjectId(id);

		try {
			const note = await Note.findOneAndDelete({ _id: objId });
		} catch (error) {
			return fail(400, { description: error.message });
		}
	}
};
