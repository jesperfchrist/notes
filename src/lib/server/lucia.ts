import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { mongoose } from '@lucia-auth/adapter-mongoose';
import mongodb from 'mongoose';
import { MONGODB_URI } from '$env/static/private';
import { Key, Session, User } from './schema';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: mongoose({
		User,
		Key,
		Session
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

mongodb.connect(MONGODB_URI);

export type Auth = typeof auth;
