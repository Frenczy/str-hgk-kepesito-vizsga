export class School {
  _id?:string;
  name:string;
  city: string;
  street: string;
  zipcode: number;
  classrooms?: string[];  // references for classroom entities
}
