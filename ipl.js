var faker = require('faker');

function Person(name, age, price){
 this.name = name
 this.age = age
 this.price = price
}

function PlayerType(bat , ball, keep){
 this.bat = bat
 this.ball = ball
 this.keep = keep

}
Player.prototype.skill = function() {
    if ( this.bat && this.ball ){
      return "I'm all rounder !"
    }
    else if (this.bat){
      return "I'm  batsman !"
    }
    else{
      return "I'm just a bowler !"
    }
};

function TeamStaffType(type){
 this.type = type
}

function Player(name, age, price, bat, ball, keep) {
  Person.call(this, name, age, price)
  PlayerType.call(this, bat, ball, keep)

}

function TeamStaff(name, age, price, type){
 Person.call(this, name, age, price)
 TeamStaffType.call(this, type)

}


TeamStaff.prototype.skill = function(){
  if( this.type == "trainer" ){
    return "I'm a trainer"
  }
  else if( this.type == "medicos"){
    return "I'm a medicos"
  }
  else{
    return "I'm coach"
  }
}


function Team(name, mascot, budget, owners){
 this.name = name
 this.mascot = mascot
 this.budget = budget
 this.owners = owners
 var players = [];
 var teamStaff = [];
}

faker.seed(0)
var batsmen = []
var bowler = []
var allRounder = []
var keeper = []


for (var i = 0; i < 90 ; i++) {

  if (i<30){
    var obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:2, max:200}), 1, 0, 0 )
    batsmen.push(obj)
  }
  else if(i >=30 && i < 60){
    var obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:2, max:200}), 0, 1, 0 )
    bowler.push(obj)

  }
  else if (i >= 60 && i < 78 ) {
    var obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:2, max:200}), 1, 1, 0 )
    allRounder.push(obj)
  }
  else{
    var obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:2, max:200}), 0, 0, 1 )
    keeper.push(obj)
  }

}

var teams = []
for (var i = 0; i < 6; i++) {
  var owners = []
  var num = faker.random.number({min:2, max:5})
  for (var j = 0; j < num; j++) {
    var person = new Person(faker.name.findName(), faker.random.number({min:20,max:30}), 0)
    owners.push( person )
  }
  var obj = new Team(faker.address.city(), faker.name.findName(), faker.random.number({min:20, max:50}),owners)
  teams.push(obj)
}
// console.log(teams);
// console.log(teams[1].owners);
console.log(teams);
console.log(teams[1].owners);
console.log(batsmen[0].skill());









// Do here LOGIC AUCTION
