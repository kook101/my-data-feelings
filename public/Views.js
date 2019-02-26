class Views {
    constructor() {

      this.loginHTML = `
      <main class="login container">
          <section>
              <h1>Voice from Body</h1>
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
              <h1>Voice from Body <small class="btn" id="admin">⚙︎</small><small id="logout"  class="btn" style="font-size:12px; margin-left:20px; cursor:pointer">logout</small></h1>
              <p>This is a series of daily visuals generated from my body & mind status </p>

          </header>
            <!-- all of our sketches will be added here -->
            <section class="grid-container" id="vis-grid"></section>

      </main>
      `

      this.adminHTML = `
          <main>
          <header>
              <h1>Voice from Body</h1>
              <p>Use the various inputs to submit data about your body & mind status</p>
              <small class="btn" style="text-decoration:underline" id="vis">🔙 back to viz</small>
          </header>
          <section class="grid-container">

            <div class="" id="myControls">
              <form id="moodForm" onsubmit="submitFeelings()" method="post">
              <fieldset>
                <legend>Pain</legend>
                <input type="text" id="pain-input" name="pain" placeholder="e.g. head, heart, elbow">
              </fieldset>
              <fieldset>
                  <legend>Pain Level</legend>
                  <input type="range" id="pLevel-input" name="pLevel" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="pLevel-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>Rage</legend>
                  <input type="range" id="rage-input" name="rage" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="rage-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>Anger</legend>
                  <input type="range" id="anger-input" name="anger" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="anger-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>BeAnnoyed</legend>
                  <input type="range" id="beAnnoyed-input" name="beAnnoyed" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="beAnnoyed-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>Joy</legend>
                  <input type="range" id="joy-input" name="joy" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="joy-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>Harmonious</legend>
                  <input type="range" id="harmonious-input" name="harmonious" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="harmonious-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>Calm</legend>
                  <input type="range" id="calm-input" name="calm" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="calm-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>FuzzyBrain</legend>
                  <input type="range" id="fuzzyBrain-input" name="fuzzyBrain" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="fuzzyBrain-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>Torpur</legend>
                  <input type="range" id="torpur-input" name="torpur" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="torpur-input-label"></span>
              </fieldset>
              <fieldset>
                  <legend>SleepForever</legend>
                  <input type="range" id="sleepForever-input" name="sleepForever" placeholder="e.g. happy" min="0" max="10" value="0">
                  <span id="sleepForever-input-label"></span>
              </fieldset>

            </form>
            <button id="submit-input">Submit</button>
            </div>
            </section>
          </main>
      `
    }
  }
