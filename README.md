# hapi-filesystem-router
Filesystem based routing for Hapi.

> Package is usable but new. It makes an effort to follow [semantic versioning](https://docs.npmjs.com/about-semantic-versioning) witch means backward incompatible changes will be introduced only in major releases. But removing "^" from all your production dependencies is a good practice anyway.

It allows you to add routes based on directory structure. 

This package is made for those who have relatively deeply nested routing on their sites and want stricter project structure.

### Simple example
Following directories structure will add 3 routes. 
- __routes__
     - [get.ts](examples/simple/routes/get.ts)
     - __item__
       - __{id}__
         - [get.ts](examples/simple/routes/item/{id}/get.ts)
         - [post.ts](examples/simple/routes/item/{id}/post.ts)

```typescript
import { attachRoutes } from 'hapi-filesystem-router';
// ...
const server = Hapi.server({});

await attachRoutes(server);

await server.start();
// ...
```

Results in 

| method |    path    |
|------|----------|
| GET    | /          |
| GET    | /item/*{id}* |
| POST   | /item/*{id}* |      

### More complex example
You can have multiple roots and specify different default configurations for them. 
As example you can use it for separating routes that require authorization/authentication.  
- __routes__
     - __private__
       - __item__
         - __{id}__
           - [get.ts](examples/auth/routes/private/item/{id}/get.ts)
           - [post.ts](examples/auth/routes/private/item/{id}/post.ts)
     - __public__
       - [get.ts](examples/auth/routes/public/get.ts)
       - __item__
         - __{id}__
           - [get.ts](examples/auth/routes/public/item/{id}/get.ts)
           - [post.ts](examples/auth/routes/public/item/{id}/post.ts)

```typescript
import { attachRoutes } from 'hapi-filesystem-router';
// ...
const server = Hapi.server({});

await attachRoutes(server, 'routes/public');
await attachRoutes(server, 
  'routes/private', // path to the root of routes 
  'protected', // prefix that will be added to actual route (see results)
  {
    options: {
      auth: {
        scope: ['admin'],
        strategy: 'session',
      },
    },
  });

await server.start();
// ...
```

Results in

| method |         path         | auth    | scope |
|--------|--------------------|---------|-------|
| GET    | /                    | none    | none  |
| GET    | /item/*{id}*           | none    | none  |
| POST   | /item/*{id}*           | none    | none  |
| GET    | /protected/item/*{id}* | **session** | **admin** |
| POST   | /protected/item/*{id}* | **session** | **admin** |         

### Handler 

File with handler should be named as any http method except for 'head' and `export default` hapi [route object](https://hapi.dev/api/?v=20.0.3#-serverrouteroute).  

```typescript
// routes/item/{id}/post.ts 
import Joi from 'joi';
import { FSRM } from 'hapi-filesystem-router';

const route: FSRM<{
  payload: { title: string };
  params: { id: string };
}> = {
  options: {
    validate: {
      payload: Joi.object({
        title: Joi.string().length(255),
      }),
      params: Joi.object({
        id: Joi.string(),
      }),
    },
  },
  handler: async (request, h) => {
    const { title } = request.payload;
    const { id } = request.params;
    return {
      id,
      title,
      updatedAt: new Date().toISOString(),
    };
  },
};

export default route;
```


### Typescript
Package is written in Typescript, so types are included. 

### Node.js
Package is tested on Node v14+ (LTS).

### Hapi
Package is tested on Hapi v20+.
