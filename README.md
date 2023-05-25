# Firebase Cloud Functions for GPT Chat Completion

Crear archivo `.env` con API key

## Deploy

Run `firebase deploy --only functions:gpt-chat-completion`

## Sample usage in REACT

```javascript

import { httpsCallable } from "firebase/functions";
import {
	useFunctions,
} from "reactfire";
...

const functions = useFunctions();
const gptPrompt = httpsCallable(functions, "gptPrompt");

gptPrompt({prompt: [{role: "user", content: "Hello world"}]})

```