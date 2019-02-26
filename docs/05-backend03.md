# Step 4 - Backend Part 3
> In this step, we are going to set up some important features namely authentication, checking to make sure we only have 1 user that can create an account in our app (these are OUR feeings after all)

## Generate Authentication
> Let's create authentication for our application using the feathers CLI 
Generating the authentication routes is as easy as:

```sh
feathers generate authentication
```

You'll be prompted to select some choices. I did the follwing:
```sh
? What authentication providers do you want to use? Other PassportJS strategies
not in this list can still be configured manually. (Press <space> to select, <a>
 to toggle all, <i> to invert selection)Username + Password (Local)
? What is the name of the user (entity) service? users
? What kind of service is it? Mongoose
```

You'll see in the `src/models` folder there is now a `users.model.js` file with the properties that the authentication will accept: email & password.

NOTE: That feathersjs is using `jwt` aka json web tokens and your password never gets stored anywhere.

## Add authentication to CRUD requests
> in this case we will say that authentication must occur for all instances

Navigate to your `src/services/feelings/feelings.hooks.js`. You'll bring in the authentication functionality by requiring the featherjs authetication hook and then adding it before all -- 'before.all[]' -- CRUD operations. What this means is that featherjs will ask whether or not the user is authenticated before every CREATE, READ, UPDATE, DELETE request going on. 

```js
const {authenticate} = require('@feathersjs/authentication').hooks;
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  ...

}
```

## Allow only 1 user
> Since we don't want other people to create accounts and login to see our data, let's just limit the amount of users to 1 -- you! 

Featherjs uses this thing called 'hooks' which are basically like middleware - when a process is started- e.g. create a new user - we check to see if we already have 1 user in the db. If so, then throw an error and do not allow the creation of a a new user / login to continue 

```
feathers generate hook
```

let's call this hook "limit users"

```sh
? What is the name of the hook? limit-users
? What kind of hook should it be? I will add it myself
   create src/hooks/limit-users.js
   create test/hooks/limit-users.test.js
```


Now inside `src/hooks/limit-users.js`
```js
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
      const {app} = context;

      console.log(context.hooks)

      let users = await app.service("users").find();

      // if there are no users, then allow creation, otherwise, do not continue
      if(users.total === 0){
        return context;
      } else {
        throw new Error('Whoops! Only 1 user allowed');
      }
  };
};

```


and to add that hook so that it doesn't allow people to create users. you add it to `src/services/users/users.hooks.js`

```js
const { authenticate } = require('@feathersjs/authentication').hooks;
const limitUsers = require('../../hooks/limit-users.js')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword(), limitUsers()], // see the limitUsers() here <==
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },
 
 ...

```

Whew! Now all the pieces on the back end should be complete. We will have to do a few last things when we deploy our app to the web, but for now, let's get back to the front end interface.