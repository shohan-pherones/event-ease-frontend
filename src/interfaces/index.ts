export interface IMessageResponse {
  message: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  events: IEvent[];
  registeredEvents: IEvent[];
  createdAt: Date;
}

export interface IUserResponse extends IMessageResponse {
  user: IUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  name: string;
}

export interface IAuth extends IMessageResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends IAuth {
  user: IUser;
}

export interface IAuthStorage extends IAuth {
  user: IUser | null;
}

export interface IEvent {
  _id: string;
  name: string;
  date: Date;
  location: string;
  maxAttendees: number;
  registeredAttendees: IUser[];
  createdBy: IUser;
}

export interface IEventsResponse extends IMessageResponse {
  events: IEvent[];
}

export interface IEventResponse extends IMessageResponse {
  event: IEvent;
}

export interface IEventRegistrationResponse extends IMessageResponse {
  _id: string;
  registeredEvent: {
    event: IEvent;
    attendee: IUser;
  };
}
