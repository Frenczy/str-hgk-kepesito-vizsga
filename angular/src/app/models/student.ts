import { Classroom } from "./classroom";

export class Student {
  _id?:string;
  firstName: string;
  lastName: string;
  email: string;
  classroom?: Classroom;
}
