// @flow
import * as Alexa from './type/alexa';

type Result = {
  sessionAttributes?: Alexa.SessionAttributes,
  response: Alexa.Response,
};

export function startSessionAsync(
  request: Alexa.Request,
  session: Alexa.Session,
): void {
  console.log(`Starting session: ${session.sessionId}`);
}

export function endSessionAsync(
  request: Alexa.Request,
  session: Alexa.Session,
): Result {
  console.log(`Ending session: ${session.sessionId}`);
  return {
    response: {
      shouldEndSession: true,
    },
  };
}

export async function launchAsync(
  request: Alexa.Request,
  session: Alexa.Session,
): Promise<Result> {
  return {
    response: {
      shouldEndSession: false,
    },
  };
}

export async function handleIntentAsync(
  request: Alexa.Request,
  session: Alexa.Session,
): Promise<Result> {

  return {
    sessionAttributes: {},
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Hi James',
      },
    },
  };
}

//
// // --------------- Functions that control the skill's behavior -----------------------
//
// function getWelcomeResponse(callback) {
//     // If we wanted to initialize the session to have some attributes we could add those here.
//     const sessionAttributes = {};
//     const cardTitle = 'Welcome';
//     const speechOutput = 'Welcome to the Alexa Skills Kit sample. ' +
//         'Please tell me your favorite color by saying, my favorite color is red';
//     // If the user either does not reply to the welcome message or says something that is not
//     // understood, they will be prompted again with this text.
//     const repromptText = 'Please tell me your favorite color by saying, ' +
//         'my favorite color is red';
//     const shouldEndSession = false;
//
//     callback(sessionAttributes,
//         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
// }
//
// function createFavoriteColorAttributes(favoriteColor) {
//     return {
//         favoriteColor,
//     };
// }
//
// /**
//  * Sets the color in the session and prepares the speech to reply to the user.
//  */
// function setColorInSession(intent, session, callback) {
//     const cardTitle = intent.name;
//     const favoriteColorSlot = intent.slots.Color;
//     let repromptText = '';
//     let sessionAttributes = {};
//     const shouldEndSession = false;
//     let speechOutput = '';
//
//     if (favoriteColorSlot) {
//         const favoriteColor = favoriteColorSlot.value;
//         sessionAttributes = createFavoriteColorAttributes(favoriteColor);
//         speechOutput = `I now know your favorite color is ${favoriteColor}. You can ask me ` +
//             "your favorite color by saying, what's my favorite color?";
//         repromptText = "You can ask me your favorite color by saying, what's my favorite color?";
//     } else {
//         speechOutput = "I'm not sure what your favorite color is. Please try again.";
//         repromptText = "I'm not sure what your favorite color is. You can tell me your " +
//             'favorite color by saying, my favorite color is red';
//     }
//
//     callback(sessionAttributes,
//          buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
// }
//
// function getColorFromSession(intent, session, callback) {
//     let favoriteColor;
//     const repromptText = null;
//     const sessionAttributes = {};
//     let shouldEndSession = false;
//     let speechOutput = '';
//
//     if (session.attributes) {
//         favoriteColor = session.attributes.favoriteColor;
//     }
//
//     if (favoriteColor) {
//         speechOutput = `Your favorite color is ${favoriteColor}. Goodbye.`;
//         shouldEndSession = true;
//     } else {
//         speechOutput = "I'm not sure what your favorite color is, you can say, my favorite color " +
//             ' is red';
//     }
//
//     // Setting repromptText to null signifies that we do not want to reprompt the user.
//     // If the user does not respond or says something that is not understood, the session
//     // will end.
//     callback(sessionAttributes,
//          buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
// }


// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
// function onSessionStarted(sessionStartedRequest, session) {
//     console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
// }

/**
 * Called when the user launches the skill without specifying what they want.
 */
// function onLaunch(launchRequest, session, callback) {
//     console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
//
//     // Dispatch to your skill's launch.
//     getWelcomeResponse(callback);
// }

/**
 * Called when the user specifies an intent for this skill.
 */
// function onIntent(intentRequest, session, callback) {
//     console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);
//
//     const intent = intentRequest.intent;
//     const intentName = intentRequest.intent.name;
//
//     // Dispatch to your skill's intent handlers
//     if (intentName === 'MyColorIsIntent') {
//         setColorInSession(intent, session, callback);
//     } else if (intentName === 'WhatsMyColorIntent') {
//         getColorFromSession(intent, session, callback);
//     } else if (intentName === 'AMAZON.HelpIntent') {
//         getWelcomeResponse(callback);
//     } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
//         handleSessionEndRequest(callback);
//     } else {
//         throw new Error('Invalid intent');
//     }
// }
//
