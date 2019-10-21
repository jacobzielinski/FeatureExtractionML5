//#region var
let mobilenet;
let video;
let label = ""
let toClear;
let classifier;
let addButtonUp;
let addButtonDown;
let neutralButton;
let trainButton;
//#endregion

let firstImage = "Connor"
let secondImage = "Bottle of Drink"
let neautral = "Wall"

//#region classifer
function modelReady(){
   console.log("model is Ready!")
   
}

function videoReady(){
   console.log("video is Ready!")
}

function whileTraining(loss) {
   if(loss == null){
   console.log("Training Complete");
   classifier.classify(gotResults);
   }else{
      console.log(loss);
   }
}

function gotResults(error, results){
   if(error) {
      console.error(error)
   // } else if (results[0].label !== firstImage && results[0].label !== secondImage) {
   //       document.getElementById("test").innerHTML = "Not recognized"
   //    }else{
   }else{
      console.log(results)
      // label = results[0].label
      document.getElementById("test").innerHTML = results[0].label + " " + Math.floor(results[0].confidence * 100) + "%";
      classifier.classify(gotResults)
      }
      // toClear.clear()
   }



function  setup () {
   // createCanvas(640, 550);
   video = createCapture(VIDEO)
   // video.hide()
   background(0);
   mobilenet = ml5.featureExtractor('MobileNet', modelReady)
   classifier = mobilenet.classification(video, videoReady)
//#endregion
   addButtonUp = createButton('Face');
   addButtonUp.mousePressed(function(){
      classifier.addImage(firstImage)
   })

   addButtonDown = createButton('Item');
   addButtonDown.mousePressed(function () {
      classifier.addImage(secondImage)
   })

   neutralButton = createButton('Neutral');
   neutralButton.mousePressed(function () {
      classifier.addImage(neautral)
   })

   trainButton = createButton('TRAIN');
   trainButton.mousePressed(function () {
      classifier.train(whileTraining);
   })
}





