/**
 * Participant type definition
 * @description This is a DTO for the participant entity
 */
export type Participant = {
  id: number;
  bookingId: number;
  name: string;
  age: number;
};

/** Null object pattern for the Participant type */
export const NULL_PARTICIPANT: Participant = {
  id: 0,
  bookingId: 0,
  name: '',
  age: 0,
};
