export class User {

    public id:number
    public username:String;
    public email:String;
    public firstname:String;
    public lastname:String;
    public dateofbirth:String;
    public phonenumber:String;
    public password:String;

    constructor(id:number, username:String, email:String, firstname:String, lastname:String, dateofbirth:String, phonenumber:String, password:String){
      this.id = id
      this.username = username
      this.email = email
      this.firstname = firstname
      this.lastname = lastname
      this.dateofbirth = dateofbirth
      this.phonenumber = phonenumber
      this.password = password
    }
}
