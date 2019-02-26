# Step 6 - Frontend Pt. 2

## MyFeelings Class

> We want to encapsulate our visualization into a class called MyFeelings. NOTE the use of p5.js instance mode to create individual canvases for each data object entry.

Add `public/MyFeelings.js`:

```js
class MyFeelings {
  /**
     * 
    // anxiety: 5
    // contentment: 10
    // createdAt: "2019-02-03T21:00:59.347Z"
    // fitness: false
    // mood: "happy"
    // productivity: 9
    // stress: 6
     */

  constructor(_data) {
    this.width = 160;
    this.height = 160;
    this.data = _data;
    this.render = this.render.bind(this);
  }

  render(sketch) {
    // remember that the "this" keyword, won't be available do to scope
    const w = this.width;
    const h = this.height;
    const data = this.data;
    const starWidth = 80;

    sketch.setup = function() {
      sketch.createCanvas(w, h);
      sketch.noLoop();
    };

    sketch.draw = function() {
      if (data.fitness) {
        sketch.background(218, 247, 166);
      } else {
        sketch.background(247, 223, 241);
      }

      sketch.push();
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.beginShape();
      sketch.noStroke();
      // anxiety
      // angle 0
      sketch.vertex(
        sketch.cos(sketch.radians(0)) *
          sketch.map(data.anxiety, 1, 10, 1, starWidth),
        sketch.sin(sketch.radians(0)) *
          sketch.map(data.anxiety, 1, 10, 1, starWidth)
      );

      // contentment
      sketch.vertex(
        sketch.cos(sketch.radians(90)) *
          sketch.map(data.contentment, 1, 10, 1, starWidth),
        sketch.sin(sketch.radians(90)) *
          sketch.map(data.contentment, 1, 10, 1, starWidth)
      );

      // productivity
      sketch.vertex(
        sketch.cos(sketch.radians(180)) *
          sketch.map(data.productivity, 1, 10, 1, starWidth),
        sketch.sin(sketch.radians(180)) *
          sketch.map(data.productivity, 1, 10, 1, starWidth)
      );

      // stress
      sketch.vertex(
        sketch.cos(sketch.radians(270)) *
          sketch.map(data.stress, 1, 10, 1, starWidth),
        sketch.sin(sketch.radians(270)) *
          sketch.map(data.stress, 1, 10, 1, starWidth)
      );

      sketch.endShape(sketch.CLOSE);

      sketch.stroke(0);
      sketch.line(-5, 0, 5, 0);
      sketch.line(0, -5, 0, 5);
      sketch.pop();
    };
  }
}
```

And make sure to update your `public/index.html` file.

```html
<html>
  <head>
    <title>My Data Feelings App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app"></div>
    <!-- P5JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.sound.min.js"></script>
    <!-- MyFeelings -->
    <script src="MyFeelings.js"></script>
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

Now it's time to wire up all the front end components!

## Add App functionality

> There's a lot going on here, but we will talk through those pieces. For now, just copy this updated `App` class

This is the `public/App.js` class

```js
class App {
  // NOTE: Requires p5.js dom library (e.g. see select())
  constructor(_views) {
    this.views = _views;
    this.setup = this.setup.bind(this)
    this.submitFeelings = this.submitFeelings.bind(this)
  }

  async showViz() {
    select('#app').elt.innerHTML = this.views.visHTML;

    let dataFeelings = await client.service('feelings').find({
      query: {
        $sort: {
          createdAt: -1
        },
        $limit: false,

      }
    });

    this.createDataFeelings(dataFeelings)

  }

  createDataFeelings(_dataFeelings) {
    _dataFeelings.data.forEach((item, idx) => {
      let newSketch = new MyFeelings(item);
      let newDiv = createDiv()
      let divId = `vis-${idx}`
      newDiv.parent('vis-grid');
      newDiv.class('grid-item');
      newDiv.elt.id = divId;
      newDiv.elt.innerHTML = `<small style="font-size:9px">${item.createdAt}</small><br><small style="font-size:9px">${item.mood}</small>`
      new p5(newSketch.render, divId);
    })
  }

  async showAdmin() {
    select("#app").elt.innerHTML = views.adminHTML;

    // select the inputs to track if and when they change
    const anxietyInput = select("#anxiety-input");
    const stressInput = select("#stress-input");
    const contentmentInput = select("#contentment-input");
    const productivityInput = select("#productivity-input");
    const submitInput = select("#submit-input");

    // on buttonpress submit feelings!
    submitInput.mousePressed(this.submitFeelings);
    // create an array of those inputs to iterate through them
    // we will set the inital state of the slider labels
    // we will also make sure to change the slider label value on .changed()
    const inputs = [anxietyInput, stressInput, contentmentInput, productivityInput];
    inputs.forEach(i => {
      // set the initial value
      let label = select(`#${i.elt.id}-label`)
      label.elt.innerHTML = i.elt.value

      // if it changes, then update it by adding an event listener
      i.changed(function (e) {
        label.elt.innerHTML = i.elt.value;
      })
    });
  }

  showLogin(error) {
    if (selectAll('.login').length) {
      select('.heading').elt.insertAdjacentHTML('beforeend', `<p>There was an error: ${error.message}</p>`);
    } else {
      select('#app').elt.innerHTML = views.loginHTML;
    }
  }

  getCredentials() {
    const user = {
      email: document.querySelector('[name="email"]').value,
      password: document.querySelector('[name="password"]').value
    };

    return user;
  };

  async submitFeelings(e) {
    try {
      //   e.preventDefault();
      console.log("submitted!")
      const myForm = new FormData(document.querySelector("#moodForm"));
      const payload = {
        anxiety: myForm.get('anxiety'),
        contentment: myForm.get('contentment'),
        fitness: myForm.get('fitness'),
        mood: myForm.get('mood'),
        productivity: myForm.get('productivity'),
        stress: myForm.get('stress')
      }
      await client.authenticate();
      let newData = await feelings.create(payload);
      await this.showViz();

    } catch (error) {
      return error;
    }
  }



  async login(credentials) {
    try {
      if (!credentials) {
        // Try to authenticate using the JWT from localStorage
        await client.authenticate();
      } else {
        // If we get login information, add the strategy we want to use for login
        const payload = Object.assign({
          strategy: 'local'
        }, credentials);
        await client.authenticate(payload);
      }

      // If successful, show the chat page
      this.showViz();
    } catch (error) {
      // If we got an error, show the login page
      this.showLogin(error);
    }
  }

  async signup(credentials) {
    try {
      // First create the user
      await client.service('users').create(credentials, {
        headers: {
          'X-Requested-With': 'FeathersJS'
        }
      });

    } catch (error) {
      this.showLogin(error);
    }
  }

  setup() {
    document.addEventListener('click', async ev => {
      switch (ev.target.id) {
        case 'signup':
          {
            // For signup, create a new user and then log them in
            const user = this.getCredentials();

            await this.signup(user);
            // If successful log them in
            await this.login(user);

            break;
          }
        case 'login':
          {
            const user = this.getCredentials();

            await this.login(user);

            break;
          }
        case 'logout':
          {
            await client.logout();

            select('#app').elt.innerHTML = views.loginHTML;

            break;
          }
        case 'admin':
          {
            await this.showAdmin();
            break;
          }
        case 'submitFeelings':
          {
            await this.submitFeelings();

            break;
          }
        case 'vis':
          {

            await client.authenticate();
            await this.showViz();
            break;
          }

      }
    });
  }

}
```

## Last, call app.login() in our p5 app.

> Get the app started by running app.setup() and app.login();

```js

let views;
let app;
// NOTE: client will be a variable that interfaces with feathers backend

function setup() {
  // no canvas needed
  noCanvas();
  // noLoop since we dont need the draw loop;
  noLoop();

  views = new Views();
  app = new App(views);
  app.setup()
}

function draw() {
  // Add main here
  app.login()
}

class App {
    ...
}

```

## ✨ Woohoo!

Now you can use the app running locally!
