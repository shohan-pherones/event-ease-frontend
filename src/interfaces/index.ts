export interface MessageResponse {
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
}

export interface IUserResponse extends MessageResponse {
  user: IUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  name: string;
}

export interface IAuth extends MessageResponse {
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

export interface IEventsResponse extends MessageResponse {
  events: IEvent[];
}

export interface IEventResponse extends MessageResponse {
  event: IEvent;
}
