class MyErrors extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationErrors extends MyErrors {}
export class UsersErrors extends MyErrors {}
