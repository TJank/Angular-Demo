export class Admin {

    public id:number;
    public username:string;
    public email:string;
    public firstname:string;
    public lastname:string;
    public password:string;

    constructor(id:number, username:string, email:string, firstname:string, lastname:string, password:string){
      this.id = id
      this.username = username
      this.email = email
      this.firstname = firstname
      this.lastname = lastname
      this.password = password
    }
}
