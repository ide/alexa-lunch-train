/**
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interface-reference
 * @flow
 */

// Session

export type Session = {|
  new: boolean,
  sessionId: string,
  attributes: SessionAttributes,
  application: Application,
  user: User,
|};

export type SessionAttributes = {[key: string]: Object};

export type Application = {|
  applicationId: string,
|};

export type User = {|
  userId: string,
  accessToken?: string,
|};

// Context

export type Context = {|
  System: {|
    application: Application,
    user: User,
    device: {[name: string]: Object};
  |},
  AudioPlayer: {|
    token?: string,
    offsetInMilliseconds?: number,
    playerActivity: 'IDLE' | 'PAUSED' | 'PLAYING' | 'BUFFER_UNDERRUN' | 'FINISHED' | 'STOPPED',
  |},
|};

// Requests

export type Request =
  LaunchRequest |
  IntentRequest |
  SessionEndedRequest;

type BaseRequest = {|
  type: string,
  requestId: string,
  timestamp: string,
  locale: string,
|};

export type LaunchRequest = BaseRequest & {|
  type: 'LaunchRequest',
|};

export type IntentRequest = BaseRequest & {|
  type: 'IntentRequest',
  intent: {|
    name: 'string',
    slots: {[name: string]: Slot},
  |},
|};

export type Slot = {|
  name: string,
  value: string,
|};

export type SessionEndedRequest = BaseRequest & {|
  type: 'SessionEndedRequest',
  reason: 'USER_INITIATED' | 'ERROR' | 'EXCEEDED_MAX_REPROMPTS',
  error: {|
    type: 'INVALID_RESPONSE' | 'DEVICE_COMMUNICATION_ERROR' | 'INTERNAL_ERROR',
    message: string,
  |},
|};

// Responses

export type Response = {|
  outputSpeech?: OutputSpeech,
  card?: Card,
  reprompt?: {|
    outputSpeech?: OutputSpeech,
  |},
  shouldEndSession?: boolean,
  directives?: Directive[],
|};

export type OutputSpeech = PlainTextOutputSpeech | SSMLOutputSpeech;

export type PlainTextOutputSpeech = {|
  type: 'PlainText',
  text: string,
|};

export type SSMLOutputSpeech = {|
  type: 'SSML',
  text: string,
|};

export type Card =
  SimpleCard |
  StandardCard |
  LinkAccountCard;

export type SimpleCard = {|
  type: 'Simple',
  title?: string,
  content?: string,
|};

export type StandardCard = {|
  type: 'Standard',
  title?: string,
  text?: string,
  image?: {|
    smallImageUrl?: string,
    largeImageUrl?: string,
  |},
|};

export type LinkAccountCard = {|
  type: 'LinkAccount',
|};

export type Directive = {
  type: string,
};
