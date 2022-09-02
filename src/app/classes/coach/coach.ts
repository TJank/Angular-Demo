export class Coach {
    
    public id:number
    public email:string
    public firstname:string;
    public lastname:string;

    public sundayavailability:number[];
    public mondayavailability:number[];
    public tuesdayavailability:number[];
    public wednesdayavailability:number[];
    public thursdayavailability:number[];
    public fridayavailability:number[];
    public saturdayavailability:number[];

    public password:string;
    public coachtype:string;
  

    constructor(
                id:number,
                email:string, 
                firstname:string, 
                lastname:string, 
                sundayavailability:number[], 
                mondayavailability:number[],
                tuesdayavailability:number[],
                wednesdayavailability:number[],
                thursdayavailability:number[],
                fridayavailability:number[],
                saturdayavailability:number[],
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
