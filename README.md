# notes

a simple note app
built with

- SvelteKit
- Lucia
- Mongoose

## using GTD for workflow w notes

The basic idea is to help your mind organizing itself in 5 steps.

1. Capture
2. Clarify
3. Organize
4. Reflect
5. Engange

```mermaid
graph TD
    A[Inbox] --- B(Is it actionable?)
    B --> |Yes| C[One or multiple steps?]
    B --> |No| D[Trash, Maybe/Someday, References ]
    C --> |multiple steps| E[Projects]
    C --> |one step| F[Less than 2 minutes?]
    F --> |yes| G[Just do it]
    F --> |no| H[delegate or wait]
    F --> |defer it| I["Calendar (decide on completion date)"]
```
