import mongoose,{model,Types,Schema,Document} from "mongoose";

export interface IDeposit extends Document{
    txId:string;
    userId:string;
    amount:Types.Decimal128;
    confirmed:boolean;
};

const DepositSchema = new Schema<IDeposit>({
    txId:{type:String,required:true,unique:true},
    userId:{type:String,unique:true,required:true},
    amount:{type:Schema.Types.Decimal128,required:true},
    confirmed:{type:Boolean,default:false}
});

export const Deposit = model<IDeposit>("Deposit",DepositSchema);