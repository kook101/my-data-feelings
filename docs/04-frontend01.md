# Step 4 - Frontend Pt. 1
> Let's start playing with some visual forms and taking care of some of our front end interface and visualization components

Remember this is where we left off:

![p5 mouse sketch](assets/checkpoint1-p5sketch.png)

Let's pick up where we left off and start developing our interface. 



## Create a `style.css`
> We will need to style our application. Create a style.css file in the `/public` folder and add it as a `<link rel="stylesheet" href="style.css">` to your html file. Add these CSS rules into that file:. I'm glossing over this becuase it is not super important for the overall concept, but rather cosmetic. You all should go in and add some personal flavor to your apps.

```css
 /* App Styles */
* {
  box-sizing: border-box;
}

body,
html {
  width: 100%;
  max-width: 1000px;
  height: 100%;
  padding: 10px;
  font-family: 'Monaco', Helvetica, sans-serif;
}

input {
  width: 100%;
  padding: 10px;
  max-width: 800px;
}

input[type="radio"] {
  width: auto;
}

fieldset {
  border-radius: 4px;
  max-width: 800px;
}

.grid-container {
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(auto-fill, 172px);
  padding-bottom: 60px;
}

.grid-item {
  border: 2px solid black;
  padding: 4px;
}

a {
  color: black;
  text-decoration: none;
}


#myControls {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 4;
  padding: 10px;
}

#submit-input {
  width: 100px;
  height: 4em;
  background-color: darkslateblue;
  color: white;
  border-radius: 4px;
  border: none;
  margin-top: 20px;
}

.btn {
  cursor: pointer;
}

```



## Link `style.css` in our `index.html`

NOTE: we have a div with an ID called `<div id="app"></div>` - this is where all of our magic will happen.

```html
<html>
  <head>
    <title>My Data Feelings App</title>
    <!-- Added style.css -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <!-- P5JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.sound.min.js"></script>
    <!-- INDEXJS -->
    <script src="index.js"></script>
  </body>
</html>

```

The `<div id="app"></div>` is where we will change what is rendered on the client depending on if:

1. we are authenticated - do we show a login or the main view?
2. we are looking at the visualizations or submitting data - do we show the main view or admin interface?


## Add feathersjs client library and setup
> Before we get started, let's add feathersjs client library and a new javascript called `feathersClient.js` to setup our the parameters of our featherjs client. 

The feathersClient.js allows us to interface with our backend REST API. It helps us to deal with things like local authentication and also sets up really nice syntax for us to make GET, CREATE, PATCH, UPDATE, DELETE requests.

`feathersClient.js`
```js
const client = feathers();

// Connect to a different URL
const restClient = feathers.rest('http://localhost:3030') // for dev
// const restClient = feathers.rest('https://my-feelings-vis.herokuapp.com') // for production

// Configure an AJAX library (see below) with that client 
client.configure(restClient.fetch(window.fetch));

client.configure(feathers.authentication({
    header: 'Authorization', // the default authorization header for REST
    prefix: '', // if set will add a prefix to the header value. for example if prefix was 'JWT' then the header would be 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOi...'
    path: '/authentication', // the server-side authentication service path
    jwtStrategy: 'jwt', // the name of the JWT authentication strategy
    entity: 'user', // the entity you are authenticating (ie. a users)
    service: 'users', // the service to look up the entity
    cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
    storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
    storage: localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
}));

// Connect to the `http://feathers-api.com/messages` service
// const messages = app.service('messages');
const feelings = client.service('feelings');
```

Our HTML File should now look like this: 

```html
<html>
  <head>
    <title>My Data Feelings App</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <!-- P5JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.sound.min.js"></script>
    <!-- FeathersJS -->
    <script src="//unpkg.com/@feathersjs/client@^3.0.0/dist/feathers.js"></script>
    <script src="feathersClient.js"></script>
    <!-- INDEXJS -->
    <script src="index.js"></script>
  </body>
</html>

```


## Creating views
> web applications work around this idea of "views" - you create templates for how data will be passed in an rendered into view. In our case, we need 3 main views: 1. our login interface, 2. our visualization interface, and 3. our admin interface. 

Let's use a javascript `class` called `Views` to store our view templates so we can conditionally show the view that is relevant. 

* 1. create a new file called `public/Views.js`
* 2. add the code below in
* 3. add the `<script src="Views.js"></script>` tag above your `index.js` in the `index.html` file 

```js

class Views {
    constructor() {
  
      this.loginHTML = `
      <main class="login container">
          <section>
              <h1>My Data Feelings Log</h1>
              <p>A generative data visualization of my feelings submitted every day.</p>
          </section>
          <section>
          <h2 class="heading">Log in or signup</h2>
          <form class="form">
              <fieldset>
                <input class="block" type="email" name="email" placeholder="email">
              </fieldset>
      
              <fieldset>
                <input class="block" type="password" name="password" placeholder="password">
              </fieldset>
      
              <button type="button" id="login" class="">
                Log in
              </button>
      
              <button type="button" id="signup" class="">
                Sign up and log in
              </button>
            </form>
          </div>
          <section>
      
      </main>
      `
  
      this.visHTML = `
      <main>
          <header>
              <h1>My Data Feelings <small class="btn" id="admin">⚙︎</small><small id="logout"  class="btn" style="font-size:12px; margin-left:20px; cursor:pointer">logout</small></h1>
              <p>This is a series of daily visuals generated from my data feelings </p>
              
          </header>
            <!-- all of our sketches will be added here -->
            <section class="grid-container" id="vis-grid"></section>
      </main>
      `
  
      this.adminHTML = `
          <main>
          <header>
              <h1>Data Feelings Admin Console</h1>
              <p>Use the various inputs to submit data about your mood</p>
              <small class="btn" style="text-decoration:underline" id="vis">🔙 back to viz</small>
          </header>
          <section class="grid-container">
          
            <div class="" id="myControls">
              <form id="moodForm" onsubmit="submitFeelings()" method="post">
              <fieldset>
                <legend>mood</legend>
                <input type="text" id="mood-input" name="mood" placeholder="e.g. happy">
              </fieldset>
              <fieldset>
                  <legend>Anxiety</legend>
                  <input type="range" id="anxiety-input" name="anxiety" placeholder="e.g. happy" min="1" max="10">
                  <span id="anxiety-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>stress</legend>
                  <input type="range" id="stress-input" name="stress" placeholder="e.g. happy" min="1" max="10">
                  <span id="stress-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>contentment</legend>
                  <input type="range" id="contentment-input" name="contentment" placeholder="e.g. happy" min="1" max="10">
                  <span id="contentment-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>productivity</legend>
                  <input type="range" id="productivity-input" name="productivity" placeholder="e.g. happy" min="1" max="10">
                  <span id="productivity-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>fitness today?</legend>
                  <div>
                      <p>Yes 😍</p>
                      <input type="radio" id="fitness-input-yes" name="fitness" value="yes"> 
                  </div>
                  <div>
                  <p>No 😭</p>
                  <input type="radio" id="fitness-input-no" name="fitness" value="no" checked> 
                  </div>
              </fieldset>
            </form>
            <button id="submit-input">Submit! 🚀</button>
            </div>
            </section>
          </main>
      `
    }
  }
```

Your HTML file will look like this. Note: I added in some HTML comments.
```html
<html>
  <head>
    <title>My Data Feelings App</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <!-- P5JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.sound.min.js"></script>
    <!-- FeathersJS -->
    <script src="//unpkg.com/@feathersjs/client@^3.0.0/dist/feathers.js"></script>
    <script src="feathersClient.js"></script>
    <!-- VIEWS -->
    <script src="Views.js"></script>
    <!-- INDEXJS -->
    <script src="index.js"></script>
  </body>
</html>

```



## Edit your `public/index.js` file
> It's time to start putting your frontend together. Let's start by editing your index.js file

Here we read in our interface views as a javascript class and instantiate it in `setup()`

```js
let views;

function setup(){
    // no canvas needed
    noCanvas();
    // noLoop since we dont need the draw loop;
    noLoop();

    views = new Views();
}

function draw(){    
    // Add main here

}
```

So far nothing will happen, but we can start to change that now. Let's start by defining another class to contain all of our logic and call it `App`. Inside our App class we will add all of the functions that relate to changing the interface and requesting data, creating a user, logging in, etc. 

As an example, this is what you will see in the App class. NOTE the async/await pattern - dont' worry if you aren't familiar, you will quickly see how it works as we keep developing.

```js

class App{
    constructor(_views){
        this.views = _views;
    }

    // Show the visualization view
    async showViz(){
         select('#app').elt.innerHTML = this.views.visHTML;

    }

    // Show the admin view
    async showAdmin(){
        select('#app').elt.innerHTML = this.views.adminHTML;
    }

    // Show the login view
    async showLogin(){
        select('#app').elt.innerHTML = this.views.loginHTML;

    }
}


```

## Checkpoint: let's request some data from the client
> Try the following in the `index.js` file. Notice in the developer console, you'll see our logged output. If you've manage correctly, you'll see our data point in there!

```js

let views;
let app;
// NOTE: client will be a variable that interfaces with feathers backend

function setup(){
    // no canvas needed
    noCanvas();
    // noLoop since we dont need the draw loop;
    noLoop();

    views = new Views();
    app = new App(views);
}

function draw(){    
    // Add main here
    app.showViz()
}



class App{
    constructor(_views){
        this.views = _views;
    }

    // Show the visualization view
    async showViz(){
         select('#app').elt.innerHTML = this.views.visHTML;
        
        // this is the feathers client in action!
        let dataFeelings = await client.service('feelings').find({
            query: {
              $sort: { createdAt: -1 },
              $limit: false,
            }
          });
        
        console.log(dataFeelings)
    }

    // Show the admin view
    async showAdmin(){
        select('#app').elt.innerHTML = this.views.adminHTML;
    }

    // Show the login view
    async showLogin(){
        select('#app').elt.innerHTML = this.views.loginHTML;

    }
}

```

If this is working, we're right on our way to starting to create some dynamic visualizations.



