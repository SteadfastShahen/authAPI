import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver } from 'graphql'
import { verify } from 'jsonwebtoken';
import createError from 'http-errors'
import { JwtPayloadId, JWT_AUTH, INVALID_TOKEN, NO_AUTH } from '../helper';
import { User } from '../models/User';

function authDirectiveTransformer( schema: any, directiveName: any ) {
    return mapSchema( schema, {
  
      [ MapperKind.OBJECT_FIELD ]: ( fieldConfig ) => {
  
        const authDirective = getDirective( schema, fieldConfig, directiveName ) ?.[0];
  
        if ( authDirective ) {
  
          const { resolve = defaultFieldResolver } = fieldConfig;
  
          fieldConfig.resolve = async function ( source, args, context, info ) {
            const result = await resolve( source, args, context, info );
            const token = context.userToken
            if ( !token ) {
                throw createError( 400, JWT_AUTH );
            }
            try {
                const { _id } = verify( token, process.env.TOKEN_SECRET as string ) as JwtPayloadId;
                const currUser = await User.findOne({ _id })
                if( !currUser )
                    throw createError( 400, INVALID_TOKEN);
                return result;
            } catch (err) {
                throw createError( 400, NO_AUTH);
            }
          }
          return fieldConfig;
        }
      }
    });
  }

export {
    authDirectiveTransformer
}