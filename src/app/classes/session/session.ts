export class Session {

    public user:string;
    public user_firstname:string;
    public user_lastname:string;
    public user_phonenum:string;

    public session_type:string;
    public coach_email:string;
    public coach_name:string

    public message:string;
    public date:string;
    public time:Number;

    public session_status:string
    public session_key:string

    constructor(
        username:string, 
        user_firstname:string, 
        user_lastname:string,
        user_phonenum:string,
        session_type:string,
        coach_email:string,
        coach_name:string,
        msg:string,
        date:string,
        time:number,
        session_status:string,
    ) {
        this.user = username;
        this.user_firstname = user_firstname;
        this.user_lastname = user_lastname;
        this.user_phonenum = user_phonenum;
        this.session_type = session_type;
        this.coach_email = coach_email;
        this.coach_name = coach_name;
        this.message = msg;
        this.date = date;
        this.time = time;
        this.session_status = session_status;
        this.session_key = date + time + username + coach_email + session_type;
    }
    
}
