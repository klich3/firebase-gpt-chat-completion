# Firebase Cloud Functions for GPT Chat Completion

![firebase+gpt](images/firebase_and_gpt.jpg?raw=true)

Example of ChatGPT implementation in Firebase with functions. They are via internal calls with call and response.
***Issue:***: This method seems to be slower than the other Stream method because it does not stream.

## SETUP

In `functions` folder create file `.env` with your OpenAI Api key.

Sample: 
```text
OPEN_AI_KEY="sk-<your key here>"
```

## SETUP WITH CUSTOM FUNCTIONS FOLDER

To use functions in a custom folder different from the default, suppose the destination folder is `functions` inside we create a new folder named `gpt-chat-completion` and copy files from this project that are inside the `functions` folder. Then edit the `firebase.json` file from the root folder of your project.

```json
{
	...
	"firestore": {
		...
	},
	...
	"functions": [
		{
			"source": "functions/gpt-chat-completion",
			"codebase": "gpt-chat-completion",
			"predeploy": ["npm --prefix \"$RESOURCE_DIR\" run lint"],
			"ignore": [
				"node_modules",
				".git",
				"firebase-debug.log",
				"firebase-debug.*.log"
			],
			"runtime": "nodejs16"
		}
	]
	...
}
```

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