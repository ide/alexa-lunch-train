// @flow
import 'source-map-support/register';

import {
  startSessionAsync,
  launchAsync,
  handleIntentAsync,
  endSessionAsync,
} from './skill';

import * as Alexa from './type/alexa';

type Event = {|
  version: string,
  session: Alexa.Session,
  context: Alexa.Context,
  request: Alexa.Request,
|};

type Response = {|
  version: string,
  sessionAttributes?: Alexa.SessionAttributes,
  response: Alexa.Response,
|};

type Callback = (error: ?Error, response?: ?Response) => void;

const SKILL_ID = 'amzn1.ask.skill.ab193b0e-b463-4876-bcbe-188b41352831';

export function handler(
  event: Event,
  context: Object,
  callback: Callback,
): void {
  try {
    handleEventAsync(event, context).then(
      response => { callback(null, response); },
      error => { callback(error); },
    );
  } catch (e) {
    callback(e);
  }
};

async function handleEventAsync(
  event: Event,
  context: Object,
): Promise<Response> {
  let { session, request } = event;
  if (session.application.applicationId !== SKILL_ID) {
    throw new Error(
      `Invalid application ID: ${session.application.applicationId}`,
    );
  }

  if (session.new) {
    await startSessionAsync(request, session);
  }

  let result;
  switch (request.type) {
    case 'LaunchRequest':
      result = await launchAsync(request, session);
      break;
    case 'IntentRequest':
      result = await handleIntentAsync(request, session);
      break;
    case 'SessionEndedRequest':
      result = await endSessionAsync(request, session);
      break;
    default:
      throw new Error(`Unknown request type: ${request.type}`);
  }

  let response = ({
    version: '1.0',
    response: result.response,
  }: Response);
  if (result.sessionAttributes) {
    response.sessionAttributes = result.sessionAttributes;
  }
  return response;
}
