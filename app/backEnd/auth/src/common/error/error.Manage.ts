import { HttpException, HttpStatus } from "@nestjs/common";

export class errorManage extends Error{
    constructor({message,type}:{type:keyof typeof HttpStatus,message:string}){
        super(`${type}::${message}`);
    }

    public static errorManage(message:string){
        const name=message.split("::")[0];
        if(!name){
            throw new HttpException(message,HttpStatus[name]);
        }else{
            throw new HttpException(message,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}