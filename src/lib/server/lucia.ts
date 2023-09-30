import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { mongoose } from "@lucia-auth/adapter-mongoose";
import mongodb from "mongoose";

import { MONGODB_URI } from "$env/static/private";

const User = mongodb.model(
  "User",
  new mongodb.Schema(
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
)

const Key = mongodb.model(
  "Key",
  new mongodb.Schema(
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
)

const Session = mongodb.model(
  "Session",
  new mongodb.Schema(
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

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  adapter: mongoose({
    User,
    Key,
    Session
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username
    }
  }
})

mongodb.connect(MONGODB_URI);

export type Auth = typeof auth;
