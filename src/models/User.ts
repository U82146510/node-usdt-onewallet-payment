import mongoose,{Types,Schema,Document, model} from 'mongoose';

export interface IUser extends Document{
    userId:string;
    walletAddress:string;
    privateKey:string;
    balance:Types.Decimal128;
};

const UserSchema = new Schema<IUser>({
    userId:{type:String,required:true,unique:true},
    walletAddress:{type:String,required:true},
    privateKey:{type:String,required:true},
    balance:{type:Schema.Types.Decimal128,default:Types.Decimal128.fromString("0")}
});

export const User = model<IUser>("User",UserSchema);