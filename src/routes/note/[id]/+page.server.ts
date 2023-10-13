import type { PageServerLoad } from './$types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { Action, Note } from '$lib/server/schema';
import mongoose from 'mongoose';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const noteId = new mongoose.Types.ObjectId(params.id);

	let document;

	try {
		document = await Note.findOne({ user_id: session.user.userId, _id: noteId });
	} catch (error) {
		return fail(400, { description: error.message });
	}

	if (!document) throw redirect(302, '/notes');

	const filter = { note_id: noteId }
	const documents = await Action.find(filter);
	let actions = [];
	
	if (documents) {
		documents.forEach(({ _id, description, dueDate, steps }) => {
      let newSteps = [];

      steps.forEach(s=> {
        newSteps.push({
          done: s.done,
          achievementDescription: s.achievementDescription,
          id: s._id.toString(),
        }) 
      });

			actions.push({
				id: _id.toString(),
				description,
				steps: newSteps, 
				dueDate,
			})
		});
	}

	const note = {
		text: document.text,
		tags: document.tags,
		list: document.list,
		id: document._id.toString()
	};

	return {
		note,
		actions
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const objId = new mongoose.Types.ObjectId(id);

		try {
			const note = await Note.findOneAndDelete({ _id: objId });
		} catch (error) {
			return fail(400, { description: error.message });
		}
	},
	addToList: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const objId = new mongoose.Types.ObjectId(id);
		const list = formData.get('list');

		const filter = { _id: objId };
		const update = { list: list };
		const options = { new: true };

		try {
			const note = await Note.findOneAndUpdate(filter, update, options);
		} catch (error) {
			return fail(400, { description: error.message });
		}
	},
	createAction: async ({ request, params }) => {
		const formData = await request.formData();
		const description = formData.get("description");
		const dueDate = formData.get("dueDate");
		const achievementDescription = formData.get("achievementDescription")
		const note_id = new mongoose.Types.ObjectId(params.id);

		const action = new Action({
			description,
			dueDate,
			steps: [{
				done: false,
				achievementDescription,
			}],
			note_id
		})

		let newAction;
		try {
			newAction = await action.save();
		} catch (error) {

		}

		const filter = { _id: note_id };
		const update = { $push: { actions: newAction._id } }

		try {
			// const result = Note.findOneAndUpdate(filter, update)
		} catch (error) {
      return fail(400, { description: error.message})
		}
	},
	createStep: async ({ request, params }) => {
		const formData = await request.formData();
    const step = formData.get("step");
    const action_id = new mongoose.Types.ObjectId(formData.get("id")
)  
    const filter = { _id: action_id };
    const update = { 
    $push: { 
      steps: {
        achievementDescription: step,
        done: false
        }
      }
    }
    
    try {
      const result = await Action.findOneAndUpdate(filter, update, {new: true})
    } catch (error) {
       
    }
    // TODO: add create step action
	}
};
