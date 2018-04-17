export class User {
    _id: string;
    name: String;
    password: String;
    email: String;
    image: String;
  
    constructor() {
      this._id = ""
      this.image = "https://openclipart.org/download/260694/circle-stroked-15.svg"
      this.name = ""
      this.password = null
      this.email = null
      
    }
  }
  
  export default User;
  