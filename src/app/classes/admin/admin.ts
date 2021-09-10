export class Admin {

    public id:number;
    public username:String;
    public email:String;
    public firstname:String;
    public lastname:String;
    public password:String;

    constructor(id:number, username:String, email:String, firstname:String, lastname:String, password:String){
      this.id = id
      this.username = username
      this.email = email
      this.firstname = firstname
      this.lastname = lastname
      this.password = password
    }
}
