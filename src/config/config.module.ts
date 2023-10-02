import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from "joi"

@Module({
    imports : [NestConfigModule.forRoot({
        isGlobal : true,
        validationSchema : Joi.object({
            MYSQL_ROOT_PASSWORD : Joi.string().required(),
            MYSQL_DATABASE : Joi.string().required(),
            MYSQL_PASSWORD : Joi.string().required(),
            MYSQL_HOST : Joi.string().required(),
            MYSQL_PORT : Joi.number().required(),
            MYSQL_USERNAME : Joi.string().required(),
            MYSQL_SHYNCRONIZE : Joi.boolean().required()
        }) 
    })]
})
export class ConfigModule {}
