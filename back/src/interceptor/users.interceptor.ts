import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      // Use the `map` operator to transform the user object
      map((user) => {
        if (user == null) {
          return null;
        }
        // If the user object is an array, map over it and remove the password property from each element
        if (Array.isArray(user)) {
          return user.map(
            ({ password, ...userWithoutPassword }) => userWithoutPassword,
          );
        }

        // Otherwise, assume the user object is a single object and remove the password property
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
    );
  }
}
