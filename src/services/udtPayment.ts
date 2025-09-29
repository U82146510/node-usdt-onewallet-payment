import { TronWeb } from "tronweb";
import {Decimal} from 'decimal.js';
import dotenv from 'dotenv';
dotenv.config();

const api_trcgrid = process.env.api_trcgrid;
if(!api_trcgrid) throw new Error('missing trongrdp api');

const tronWeb = new TronWeb({
    fullHost:"https://api.trongrid.io",
    headers:{ "TRON-PRO-API-KEY":api_trcgrid}
});

const USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

export async function getUSDTBalance(address:string){
    const contract = await tronWeb.contract().at(USDT_CONTRACT);
    const balance = await contract.balanceOf(address).call();
    return new Decimal(balance.toString()).div(1e6).toNumber();
};