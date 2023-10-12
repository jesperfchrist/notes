import type { PageServerLoad } from './$types';
import { Note } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const filter = { user_id: session.user.userId };
	const documents = await Note.find(filter);
	if (!documents) throw redirect(302, '/');

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
