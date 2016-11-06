// @flow
import moment from 'moment';

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
  request: Alexa.SessionEndedRequest,
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
  request: Alexa.LaunchRequest,
  session: Alexa.Session,
): Promise<Result> {
  return {
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Tell me when and where you want to eat.',
      },
      reprompt: {
        outputSpeech: {
          type: 'PlainText',
          text: `I didn't get that. Say: remind me to get lunch at one thirty.`,
        },
      },
      shouldEndSession: false,
    },
  };
}

export async function handleIntentAsync(
  request: Alexa.IntentRequest,
  session: Alexa.Session,
): Promise<Result> {
  let { intent } = request;
  switch (intent.name) {
    case 'ScheduleLunch':
      return await scheduleLunchAsync(request, session);
    case 'AMAZON.CancelIntent':
    case 'AMAZON.StopIntent':
      return await cancelLunchAsync(request, session);
    case 'AMAZON.HelpIntent':
      return provideHelp();
    default:
      throw new Error(`Unknown intent: ${intent.name}`);
  }
}

async function scheduleLunchAsync(
  request: Alexa.IntentRequest,
  session: Alexa.Session,
): Promise<Result> {
  let {
    Location: { value: location },
    Time: { value: time },
    Duration: { value: duration },
  } = request.intent.slots;

  if (!time) {
    if (!duration) {
      duration = 'PT15M'; // 15 minutes
    }
    let scheduledMoment = moment.interval(duration).end();
    time = scheduledMoment.format('H:mm A');
  }


  // TODO: Schedule lunch with Slack

  let speechText = 'oh';
  if (location) {
    if (time) {
      speechText = `OK, I'll remind you to go to ${location} at ${time}.`;
    } else if (duration) {
      speechText = `OK, I'll remind you to go to ${location} in ${duration}.`;
    } else {
      speechText = `OK, I'll remind you to go to ${location} in fifteen minutes.`;
    }
  }
  console.log(speechText);

  return {
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: speechText,
      }
    },
  };
}

async function cancelLunchAsync(
  request: Alexa.IntentRequest,
  session: Alexa.Session,
): Promise<Result> {
  return {
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: `OK, let me know whenever you want to plan lunch again.`,
      },
    },
    shouldEndSession: true,
  };
}

function provideHelp(): Result {
  return {
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: `I'll remind you in Slack to eat. For example, say: remind me to get lunch at one thirty.`,
      },
    },
  };
}
