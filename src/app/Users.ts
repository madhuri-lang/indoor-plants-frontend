export class Users
{
    id: string;
    name: string;
    phone:string;
    email:string;
    password:string;

  constructor(id:string,name: string,phone:string,email:string,password:string)
    {
        this.id=id;
        this.name= name;
        this.phone=phone;
        this.email=email;
        this.password=password;
    }
}