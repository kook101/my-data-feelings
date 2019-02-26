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

    constructor(_data){
        this.width = 240;
        this.height = 320;
        this.data = _data;
        this.render = this.render.bind(this);

    }

    render(sketch){
        // remember that the "this" keyword, won't be available do to scope
        const w = this.width;
        const h = this.height;
        const data = this.data;
        const starWidth = 80

        sketch.setup = function() {
            sketch.createCanvas(w, h);
            sketch.noLoop();


        };

        sketch.draw = function() {


          let pLevelColor = map(data.pLevel, 0,10,255,0);
          sketch.background(pLevelColor);


            sketch.push();
            sketch.translate(sketch.width/2, sketch.height/2);
            sketch.beginShape();
            sketch.noStroke();

            // rage
            // angle 0
            if(data.rage>=1){
            let rageColor = map(data.rage, 1,10,100,20);
            sketch.fill(255, rageColor, 20);
            sketch.ellipse(0, 0, 200, 200);
            }else{
              sketch.noFill();
              sketch.ellipse(0,0,0,0);
            }


            // anger
            if(data.anger>=1){
            let angerColor = map(data.anger, 1,10,200, 140);
            sketch.fill(255, angerColor, 20);
            sketch.ellipse(0, 0, 180, 180);
            }else{
              sketch.noFill();
              sketch.ellipse(0,0,0,0);
            }


            // beAnnoyed
            if(data.beAnnoyed>=1){
            let beAnnoydColor = map(data.beAnnoyed, 1,10,255, 180);
            sketch.fill(255,beAnnoydColor, 20);
            sketch.ellipse(0, 0, 160, 160);
            }else{
              sketch.noFill();
              sketch.ellipse(0,0,0,0);
            }

            // joy
            if(data.joy>=1){
            let joyColor = map(data.joy, 1,10,210, 160);
            sketch.fill(joyColor,255, 20);
            sketch.ellipse(0, 0, 140, 140);
            }else{
              sketch.noFill();
              sketch.ellipse(0,0,0,0);
            }

            // harmonious
            if(data.harmonious>=1){
            let harmoniousColor = map(data.harmonious, 1,10,120, 80);
            sketch.fill(harmoniousColor, 255, 20);
            sketch.ellipse(0, 0, 120, 120);
            } else {
            sketch.noFill();
            sketch.ellipse(0,0,0,0);
            }

            //Calm
            if(data.calm>=1){
            let calmColor = map(data.calm, 1,10, 60, 30);
            let calmColor1 = map(data.calm, 1,10, 30, 190);
            sketch.fill(calmColor, 255, calmColor1);
            sketch.ellipse(0, 0, 100, 100);
            } else {
            sketch.noFill();
            sketch.ellipse(0,0,0,0);
            }

            //FuzzyBrain
            if(data.fuzzyBrain>=1){
            let fuzzyBrainColor = map(data.fuzzyBrain, 1,10,210, 255);
            let fuzzyBrainColor1 = map(data.fuzzyBrain, 1,10,255, 200);
            sketch.fill(30, fuzzyBrainColor1, fuzzyBrainColor);
            sketch.ellipse(0, 0, 80, 80);
            } else {
              sketch.noFill();
              sketch.ellipse(0,0,0,0);
            }

            //Torpur
            if(data.torpur>=1){
            let torpurColor = map(data.torpur, 1,10,180, 120);
            sketch.fill(30, torpurColor, 255);
            sketch.ellipse(0, 0, 60, 60);
            } else {
              sketch.noFill();
              sketch.ellipse(0,0,0,0);
            }

            //sleepForever
            if(data.sleepForever>=1){
            let sleepForeverColor = map(data.sleepForever, 1,10,90, 30);
            let sleepForeverColor1 = map(data.sleepForever, 1,10,30, 60);
            sketch.fill(sleepForeverColor1, sleepForeverColor, 255);
            sketch.ellipse(0, 0, 40, 40);
            } else {
              sketch.noFill();
              sketch.ellipse(0,0,0,0);
            }



            sketch.endShape(sketch.CLOSE);

            sketch.stroke(0);
            sketch.line(-5, 0, 5, 0)
            sketch.line(0, -5, 0, 5)
            sketch.pop();

        };
    }

}
