export class Coach {
    
    public id:number
    public email:string
    public firstname:string;
    public lastname:string;

    public sundayavailability:string;
    public mondayavailability:string;
    public tuesdayavailability:string;
    public wednesdayavailability:string;
    public thursdayavailability:string;
    public fridayavailability:string;
    public saturdayavailability:string;

    public password:string;
    public coachtype:string;
  

    constructor(
                id:number,
                email:string, 
                firstname:string, 
                lastname:string, 
                sundayavailability:string, 
                mondayavailability:string,
                tuesdayavailability:string,
                wednesdayavailability:string,
                thursdayavailability:string,
                fridayavailability:string,
                saturdayavailability:string,
                password:string,
                coachType:string 
                ){
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.sundayavailability = sundayavailability;
    this.mondayavailability = mondayavailability;
    this.tuesdayavailability = tuesdayavailability;
    this.wednesdayavailability = wednesdayavailability;
    this.thursdayavailability = thursdayavailability;
    this.fridayavailability = fridayavailability;
    this.saturdayavailability = saturdayavailability
    this.password = password;
    this.coachtype = coachType;
    }
}
