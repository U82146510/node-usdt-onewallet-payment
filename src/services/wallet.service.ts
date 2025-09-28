import { TronWeb } from "tronweb";
import { User } from "../models/User.js";
import {Types} from 'mongoose';

const tronWeb = new TronWeb({fullHost:"https://api.trongrid.io"});

export async function ensureUserWallet(userId:string){
    let user = await User.findOne({userId});
    if(user && user.walletAddress){
        return user;
    }

    const account = await tronWeb.createAccount();

    if(user){
        user.walletAddress = account.address.base58;
        user.privateKey = account.privateKey;
        await user.save();
        return user;
    }else{
        const newUser =  await User.create({
            userId,
            walletAddress:account.address.base58,
            privateKey:account.privateKey,
            balance:Types.Decimal128.fromString('0')
        });
        return newUser;
    }
    
};