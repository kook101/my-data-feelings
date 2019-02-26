# Step 2 - Backend pt.1

## Create your `feelings` mongodb collection
> in mongodb land, a collection of data that is related is called a "collection. In order to create a "collection" with REST API endpoints hooked up to it, we can use feathers CLI. It will generate all this stuff for us.

Run:
```sh
feathers generate service
```

You'll get a bunch of prompts. Here's what I chose:

```sh
? What kind of service is it? Mongoose
? What is the name of the service? feelings
? Which path should the service be registered on? /feelings
? What is the database connection string? mongodb://localhost:27017/my_data_feelings
```

NOTE: The databse connection string might be slightly different for you. 

Hooray! you've just created your first Mongodb database and it's already all wired up to your app! 

## Check that your database is up and running

You can check if your databse is going to send us results by checking:

`localhost:3030/feelings`

if you get back a page that shows a json result, then we're in business! 

```json
{"total":0,"limit":10,"skip":0,"data":[]}
```

At this point, if something went wrong, make sure of 2 things:
1. you're running `npm run dev` to make sure your server reloads when you make changes to anything in your project repository
2. your mongodb is alive by running `mongod` in your terminal. Ensure that your mongodb is able to send and recieve data from your server :) 


## Checkpoint #2: REST Endpoints 
> What's happening when you go to `localhost:3030/feelings`?

This is super interesting. We go to a URL and at that URL endpoint, we get back a search result from our database. Since nothing is in there at the moment, we see that our `data:[]` property is an empty array. 

Behind the scenes, feathers.js has set up an entire node.js/express app with REST endpoints for our feelings database. This means we can make GET, PUT, POST, DELETE requests to our featherjs server. Typically to do this, there are a lot more steps and code that you'd need to write yourself, but feathersjs tries to take care of all that as much as possible for us. 

