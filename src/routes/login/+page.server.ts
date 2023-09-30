import { auth } from '$lib/server/lucia';
import { type Actions, fail } from '@sveltejs/kit';
import { LuciaError } from 'lucia';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (typeof username !== 'string' || username.length < 1 || username.length > 31)
			return fail(400, { message: 'Invalid username' });

		if (typeof password !== 'string' || password.length < 1 || password.length > 255)
			return fail(400, { message: 'Invalid password' });

		try {
			const key = await auth.useKey('username', username.toLowerCase(), password);
			const session = await auth.createSession({ userId: key.userId, attributes: {} });
			locals.auth.setSession(session);
		} catch (error) {
			if (
				error instanceof LuciaError &&
				(error.message === 'AUTH_INVALID_KEY_ID' || error.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, { message: 'Incorrect username or password' });
			}
			return fail(500, { message: 'An unknown error occured' });
		}
	}
};