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
    const painInput = select("#pain-input");
    const pLevelInput = select("#pLevel-input");
    const rageInput = select("#rage-input");
    const angerInput = select("#anger-input");
    const beAnnoyedInput = select("#beAnnoyed-input");
    const joyInput = select("#joy-input");
    const harmoniousInput = select("#harmonious-input");
    const calmInput = select("#calm-input");
    const fuzzyBrainInput = select("#fuzzyBrain-input");
    const torpurInput = select("#torpur-input");
    const sleepForeverInput = select("#sleepForever-input");

    const submitInput = select("#submit-input");

    // on buttonpress submit feelings!
    submitInput.mousePressed(this.submitFeelings);
    // create an array of those inputs to iterate through them
    // we will set the inital state of the slider labels
    // we will also make sure to change the slider label value on .changed()
    const inputs = [pLevelInput, rageInput, angerInput, beAnnoyedInput, joyInput, harmoniousInput, calmInput, fuzzyBrainInput, torpurInput, sleepForeverInput,];
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
        pain: myForm.get('pain'),
        pLevel: myForm.get('pLevel'),
        rage: myForm.get('rage'),
        anger: myForm.get('anger'),
        beAnnoyed: myForm.get('beAnnoyed'),
        joy: myForm.get('joy'),
        harmonious: myForm.get('harmonious'),
        calm: myForm.get('calm'),
        fuzzyBrain: myForm.get('fuzzyBrain'),
        torpur: myForm.get('torpur'),
        sleepForever: myForm.get('sleepForever'),

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
