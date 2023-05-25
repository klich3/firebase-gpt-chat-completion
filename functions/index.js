/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz) 
index.js (c) 2023 
Created:  2023-05-25 18:49:39 
Desc: firebase cloud functions gpt chat completion
Docs: documentation
*/

const {
	OPEN_AI_KEY,
} = process.env;

const { Configuration, OpenAIApi } = require("openai");
const openaiApi = new OpenAIApi(new Configuration({ apiKey: OPEN_AI_KEY })); 

const functions = require("firebase-functions");

exports.gptPrompt = functions.https.onCall((data, context) => {
	if (!context.auth) {
		// return { message: 'Authentication Required!', code: 401 };
		// https://firebase.google.com/docs/functions/callable#handle_errors
		throw new functions.https.HttpsError(
			"failed-precondition",
			"The function must be called while authenticated."
		);
	}

    const { prompt } = data;

    try {
        openaiApi
				.createChatCompletion({
					model: "gpt-3.5-turbo",
					messages: prompt,
				})
				.then((r) => {
					return {status: 200, message: r.data.choices[0].message.content};
				});
    }catch(e){
        return { status: 400, message: "Bad Request" };
    }
});