import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const CurrentUser  = createParamDecorator( 
    (data:any | never , context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request.session);
        return "hi there !";
});