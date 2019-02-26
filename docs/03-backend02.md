# Step 3 - Backend Part 2

## Edit the `feelings` model
> Models in the world of databases are specifications for the kinds of data that you expect to contain and also receive from your application. By setting a model, you define and can also know that these properties will be part of every entry. 

Navigate to `src/models/feelings.model.js`

Untouched, our model looks like this:
```js
// feelings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const feelings = new Schema({
    text: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('feelings', feelings);
};

```

Let's add some properties that might be of interest for us:

```js
// feelings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const feelings = new Schema({
    mood: { 
        type: String, // text
        required: true 
    },
    anxiety:{
        type: Number, // scale from 1 to 10
        required: true
    },
    stress:{
        type: Number, // scale from 1 to 10
        required: true
    },
    contentment:{
        type: Number, // scale from 1 to 10
        required: true
    },
    productivity:{
        type: Number, // scale from 1 to 10
        required: true
    },
    fitness:{
        type: Boolean, // true or false
        required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('feelings', feelings);
};

```

Save your file and know that when it comes time to submitting data to our database, our database will only accept those data properties of those types. This is good practice to make sure that the data you're getting is the type you want it to be.

## Your first POST request
> Test that your feelings database is working by posting data to your feelings using CURL

CURL is a commandline tool that allows you to make requests of servers. Using this nice list of CURL requests -- https://gist.github.com/subfuzion/08c5d85437d5d4f00e58 --, let's send some data to our database.

As an example, POST request, we can see some structure here:
```sh
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data
```
* `curl` is the tool we're using
* `-d` is a flag to indicate that the thing that comes after it is data
* `-H` is a flag to indicate a "header" which specifies meta data about your data request. here we let our database know that JSON is coming in! Incoming!!!
* `-X POST` is the specification for what kind of CURL request we're making. In this case we want to create new data on the server using POST.
* `http://localhost:3000/data` is the API endpoint we want to send data to.

So based on that, for our `http://localhost:3030/feelings` we could POST:

```sh
curl -d  '{"mood":"happy", "anxiety": 5, "stress": 6, "contentment": 10, "productivity": 9, "fitness": false}' -H "Content-Type: application/json" -X POST http://localhost:3030/feelings
```

If all is well, we'll get a result that looks like:

```sh
{"_id":"5c57568bffeba6503d82bb2c","mood":"happy","anxiety":5,"stress":6,"contentment":10,"productivity":9,"fitness":false,"createdAt":"2019-02-03T21:00:59.347Z","updatedAt":"2019-02-03T21:00:59.347Z","__v":0}%
```

Notice we have an `_id` field that has been populated as well as a `createdAt` and `updatedAt` property. It's working!!!


Now, try again going to in our browser: `localhost:3030/feelings` and see that we now can see the data we just posted:

```json
{"total":1,"limit":10,"skip":0,"data":[{"_id":"5c57568bffeba6503d82bb2c","mood":"happy","anxiety":5,"stress":6,"contentment":10,"productivity":9,"fitness":false,"createdAt":"2019-02-03T21:00:59.347Z","updatedAt":"2019-02-03T21:00:59.347Z","__v":0}]}
```

HOW COOOL IS THISSSSSSS!!!! I can hardly contain myself. I hope you are feeling the same excitement as me! Now, before we go totally off the rails, let's build out an interface in which to submit and visualize data using p5.js

## Checkpoint #2: Backend recap

Ok, so we've made it this far:

On the backend...
- we have a nodejs/express app that was generated using feathersjs with REST endpoints setup for our `feelings` database
- Our feelings database has a data model which includes a variety of text, numerical, and boolean types of data fields 
- we have data now living in our database

On the front end... 
- we have a basic html file and p5.js included. 

Some questions we will need to answer:
- 1. Can we build a basic interface to **browse** what is living in our database?
- 2. Can we build a basic interface to **submit** to our database?
- 3. Can we build a basic interface to **login and signu** to be able to access our application?

The answer to all of those questions is undoubtedly yes, however the question is how? 

Let's approach it super simply for now:

- First: let's create a view to display our data visuals (these will be super simple for now, but you will make them awesome).
- Second: let's create a view to submit our data feelings.
- Third: let's create a view to only show login details if a user is not authenticated.