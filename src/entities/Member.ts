import { ObjectId } from "mongodb";

interface Member { 
    _id: ObjectId,
    MemberID: string; 
    Name: string;
    Address: string;
    Email: string;
    Phone: string;
    RegistrationDate: string;
}

export default Member;