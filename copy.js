var faker = require('faker');

// Definations
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
 this.players = [];
 this.teamStaff = [];
}


// Create  random objects
faker.seed(12)
var allPlayers = []
var obj;
for (var i = 0; i < 90 ; i++) {

  if (i<30){
	obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:20, max:200}), 1, 0, 0 )
	allPlayers.push(obj)
  }
  else if(i >=30 && i < 60){
	obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:20, max:200}), 0, 1, 0 )
	allPlayers.push(obj)

  }
  else if (i >= 60 && i < 78 ) {
	obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:20, max:200}), 1, 1, 0 )
	allPlayers.push(obj)
  }
  else{
	obj = new Player(faker.name.findName(), faker.random.number({min:20, max:35}), faker.random.number({min:20, max:200}), 0, 0, 1 )
	allPlayers.push(obj)
  }

}

var teams = []
for (var i = 0; i < 6; i++) {
  var owners = []
  var num = faker.random.number({min:1, max:3})
  for (var j = 0; j < num; j++) {
	var person = new Person(faker.name.findName(), faker.random.number({min:20,max:30}), 0)
	owners.push( person )
  }
  var obj = new Team(faker.address.city(), faker.name.findName(), faker.random.number({min:2000, max:5000}),owners)
  teams.push(obj)
}
// ==============================================================================================================================
// Auction Functions
function getNumPlayers(team ,type){
  num = 0
  players = team.players
  if ( typeof players == "undefined" ) return 0
  for (var i = 0; i < players.length; i++) {
	if (type == "bat"){
	  if( players[i].bat==1 || (players[i].bat==1 && players[i].bowl==1) ) num += 1
	}
	else if( type == "bowl"){
	  if( players[i].bowl==1  && players[i].bat==0 ) num += 1
	}
	else if( type == 'keep' ){
	  if(players[i].keep==1) num += 1
	}
  }
  return num
}

function returnPlayerType(player){
	if( player.bat==1 && player.bowl==0 ) return "bat"
	else if (player.bat==1 && player.bowl==1) return "bat"
	else if (player.bowl==1 && player.bat==0 ) return  "bowl"
	else return "keep"
}

function satisfyConstrains(num , type){
	if (type == "bat"){
		if (num < 7) return true
		else return false
	}
	else if (type == "bowl"){
		if (num < 6) return true
		else return false
	}
	else if (type == "keep"){
		if (num < 2) return true
		else return false
	}
}

var reason = "";
function validate(team, player){
	type = returnPlayerType(player)
	if( team.budget >= player.price){
		if (satisfyConstrains(getNumPlayers(team ,type), type)) return true
		else {
			reason = "team structure"
			return false
		}
	}
	else{
		reason = "budgets"
		return false
	}
}

Team.prototype.sendbid = function(){
	delay = faker.random.number({min:0, max:600})
	return delay
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
// Real Auction starts
var queue = [];
for (var i = 0; i < allPlayers.length; i++) {
	//console.log("Bidding for " + allPlayers[i])
	// sleep(10000)
	queue = []
	player = allPlayers[i]
	for ( var j = 0 ; j < 6 ; j++){     //sendingbid
		team = teams[j]
		delay = team.sendbid()          // teamdelay
		queue.push({
    		key:   team,
    		value: delay
		});
  	}

	queue.sort(function(a, b){         //sort team delay
	    return a.value-b.value
	})
     sleep(1000)
	flag = true
	while (flag) {
		bid = queue.shift()
		team = bid.key
		price = player.price
		if ( validate(team, player) ){
			team.players.push(player)
			team.budget -= price
			console.log( player.name +  " is sold to " + team.name + " for " + price)
			// console.log(team.name + " now has following players \n")
			// console.log(team.players)
			flag = false
		}
		else{
			console.log("Bid from" + team.name + " Rejected due to " + reason)
			console.log("Current  budget is " + team.budget)
		}
		if ( queue.length == 0 ) flag = false
	}
}
