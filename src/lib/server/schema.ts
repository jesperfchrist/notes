import mongoose from 'mongoose';

const User = mongoose.model(
	'User',
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			username: {
				type: String,
				required: true
			}
		} as const,
		{ _id: false }
	)
);

const Key = mongoose.model(
	'Key',
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			hashed_password: String
		} as const,
		{ _id: false }
	)
);

const Session = mongoose.model(
	'Session',
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			active_expires: {
				type: Number,
				required: true
			},
			idle_expires: {
				type: Number,
				required: true
			}
		} as const,
		{ _id: false }
	)
);

// TODO  list types: "action" || "project" || "calendar" || "waiting"
const Note = mongoose.model(
	'Note',
	new mongoose.Schema({
		text: {
			type: String,
			required: true
		},
		tags: [String],
		list: String,
		user_id: {
			type: String,
			required: true
		}
	})
);

export type Note = mongoose.InferSchemaType<typeof Note>;
export { Session, Key, User, Note };
