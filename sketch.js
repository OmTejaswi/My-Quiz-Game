var canva;

var title;
var question;
var question1, question2, question3, question4;

var inputName, inputAns;
var gameState = 0;
var playerCount = 0;
var submit;
var db;
var nameVal, asnVal;

var readpc = 0;
var readgs = 0;
var state = 0;

var title2;

var instruct;

var cons = [];
var names = [];
var cons1, cons2, cons3, cons4;

var correctAns = 2;

function setup(){
  canvas = createCanvas(850,400);

  title = createElement("h2");
  title.html("My Quiz Game");
  title.position(350,0);

  question = createElement("h4");
  question.html("Question:- What starts and ends with lettet 'E', but has only one1 letter?");
  question.position(200,50);

  question1 = createElement("h5");
  question1.html("1: Everyone");
  question1.position(200,90);

  question2 = createElement("h5");
  question2.html("2: Enevelop");
  question2.position(200,110);

  question3 = createElement("h5");
  question3.html("3: Estimate");
  question3.position(200,130);

  question4 = createElement("h5");
  question4.html("4: Example");
  question4.position(200,150);

  title2 = createElement("h2").html("<u>Result Of the Quiz<u>").position(350,0).style("color","red");
  instruct = createElement("h3").html("*Note: Contestant who answered correct are highleted in green color!").position(100,200).style("color","blue")

  inputName = createInput().attribute("placeholder","Enter Your Name").position(100,300);
  inputAns = createInput().attribute("placeholder","Enter Your Answer").position(500,300);

  submit = createButton("Submit").position(350,350);

  //database
  db = firebase.database();

  db.ref("pc").on("value", function(data){
    readpc = data.val();
  })

  db.ref("gs").on("value", function(data){
    readgs = data.val();
  })

  
  

  submit.mousePressed(function(){
    playerCount = readpc;
    playerCount+=1;

    db.ref("/").update({
      pc: playerCount,
    })

    nameVal = inputName.value();
    asnVal = inputAns.value();

    
    db.ref("players/player"+readpc).set({
      name: nameVal,
      answer: asnVal
    })

    state +=1;

    
   
  })

  result();
}
function draw(){

  title2.hide();

  if(readpc >= 4){
    background("yellow")
  } else {
    background("pink")
  }

  if(playerCount >= 1) {
    state = 1;
  }

  if(playerCount >= 4) {
    gameState = 1;
  }
  

  if(state === 1 || gameState === 1) {
    inputName.hide();
    inputAns.hide();
    submit.hide();
  }
  
  

  db.ref("/").update({
    gs: gameState,
  })



  if(readpc >= 4){
    textSize(30);
    title.hide();
    inputName.hide();
    inputAns.hide();
    submit.hide();
    
    title2.show();
     

    cons1 = createElement("h4").html(cons[0]+": " + cons[4]).position(200,250).style("color","red")
    cons2 = createElement("h4").html(cons[1]+": " + cons[5]).position(200,280).style("color","red")
    cons3 = createElement("h4").html(cons[2]+": " + cons[6]).position(200,310).style("color","red")
    cons4 = createElement("h4").html(cons[3]+": " + cons[7]).position(200,340).style("color","red")

    
    
    colour();
  }
 
}

async function result() {
 await db.ref("players/player1/answer").on("value", function(data){
    cons.push(data.val());
  })

 await db.ref("players/player2/answer").on("value", function(data){
    cons.push(data.val());
  })

  await db.ref("players/player3/answer").on("value", function(data){
    cons.push(data.val());
  })
  await db.ref("players/player4/answer").on("value", function(data){
    cons.push(data.val());
  })




  await db.ref("players/player1/name").on("value", function(data){
    cons.push(data.val());
  })

 await db.ref("players/player2/name").on("value", function(data){
    cons.push(data.val());
  })

  await db.ref("players/player3/name").on("value", function(data){
    cons.push(data.val());
  })
  await db.ref("players/player4/name").on("value", function(data){
    cons.push(data.val());
  })

   
}

async function colour() {
  var finder = cons.findIndex(function(con){
    return con == 2;
  })   

  if(finder === 0) {
    cons1.style("color","green")
  }
  if(finder === 1) {
    cons2.style("color","green")
  }
  if(finder === 2) {
    cons3.style("color","green")
  }
  if(finder === 3) {
    cons4.style("color","green")
  }
}