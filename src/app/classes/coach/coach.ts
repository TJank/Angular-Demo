export class Coach {
    
    public id:number
    public email:string
    public firstname:string;
    public lastname:string;

    public sundayavailability:Number[];
    public mondayavailability:Number[];
    public tuesdayavailability:Number[];
    public wednesdayavailability:Number[];
    public thursdayavailability:Number[];
    public fridayavailability:Number[];
    public saturdayavailability:Number[];

    public password:string;
    public coachtype:string;
  

    constructor(
                id:number,
                email:string, 
                firstname:string, 
                lastname:string, 
                sundayavailability:Number[], 
                mondayavailability:Number[],
                tuesdayavailability:Number[],
                wednesdayavailability:Number[],
                thursdayavailability:Number[],
                fridayavailability:Number[],
                saturdayavailability:Number[],
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
