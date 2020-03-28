// BUSINESS LOGIC --------------------------------------------------------------------------------
var players = [];
var raidAttack;

function Player(raidAttack) {
  this.playerName = raidAttack.playerName;
  this.playerCode = raidAttack.playerCode
  this.raidAttacks = [];
  this.raidAttacks.push(raidAttack);
  this.totalRaidAttacks = raidAttack.totalRaidAttacks;
  this.totalDamage = 0;
  this.averageDamage = 0;
};

Player.prototype.updateDamage = function(raidAttack) {

  this.totalDamage += raidAttack.armorHead + raidAttack.armorLeftArm + raidAttack.armorLeftHand + raidAttack.armorLeftLeg + raidAttack.armorRightArm
    + raidAttack.armorRightHand + raidAttack.armorRightLeg+ raidAttack.armorTorso + raidAttack.bodyHead
    + raidAttack.bodyLeftArm + raidAttack.bodyLeftHand + raidAttack.bodyLeftLeg + raidAttack.bodyRightArm + raidAttack.bodyRightHand
    + raidAttack.bodyRightLeg + raidAttack.bodyTorso + raidAttack.skeletonHead + raidAttack.skeletonLeftArm + raidAttack.skeletonLeftHand
    + raidAttack.skeletonLeftLeg + raidAttack.skeletonRightArm + raidAttack.skeletonRightHand + raidAttack.skeletonRightLeg + raidAttack.skeletonTorso;

  this.averageDamage = Math.round(this.totalDamage / this.totalRaidAttacks);
};

function readRaidLog() {
  var raidLog = $("#raid-input").val();

  var parsedRaidLog = raidLog.split("\n");

  for(let i = 0; i < parsedRaidLog.length; i++) {

    var line = parsedRaidLog[i].split(",");

    var raidAttack = {
      playerName        : line[0],
      playerCode        : line[1],
      totalRaidAttacks  : parseInt(line[2]),
      titanNumber       : parseInt(line[3]),
      titanName         : line[4],
      titanDamage       : parseInt(line[5]),
      armorHead         : parseInt(line[6]),
      armorTorso        : parseInt(line[7]),
      armorLeftArm      : parseInt(line[8]),
      armorRightArm     : parseInt(line[9]),
      armorLeftHand     : parseInt(line[10]),
      armorRightHand    : parseInt(line[11]),
      armorLeftLeg      : parseInt(line[12]),
      armorRightLeg     : parseInt(line[13]),
      bodyHead          : parseInt(line[14]),
      bodyTorso         : parseInt(line[15]),
      bodyLeftArm       : parseInt(line[16]),
      bodyRightArm      : parseInt(line[17]),
      bodyLeftHand      : parseInt(line[18]),
      bodyRightHand     : parseInt(line[19]),
      bodyLeftLeg       : parseInt(line[20]),
      bodyRightLeg      : parseInt(line[21]),
      skeletonHead      : parseInt(line[22]),
      skeletonTorso     : parseInt(line[23]),
      skeletonLeftArm   : parseInt(line[24]),
      skeletonRightArm  : parseInt(line[25]),
      skeletonLeftHand  : parseInt(line[26]),
      skeletonRightHand : parseInt(line[27]),
      skeletonLeftLeg   : parseInt(line[28]),
      skeletonRightLeg  : parseInt(line[29])
    };

    updatePlayer(raidAttack);
  }
};

function updatePlayer(raidAttack) {

  //$("#test").append(raidAttack.playerName + " "  + raidAttack.playerCode +  "<br>");

  // Check if player code already exists in players.
  // If it does, update that player, if not then create new player and add to list.
  
  if (players.length === 0) {

    var player = new Player(raidAttack);
    player.updateDamage(raidAttack);
    players.push(player);
  }
  else {
    var found = false;

    for (let i = 0; i < players.length; i++) {
      if (players[i].playerCode === raidAttack.playerCode) {
        players[i].raidAttacks.push(raidAttack);
        players[i].updateDamage(raidAttack);
        found = true;
        break;
      }
    }

    if(found === false) {

      var player = new Player(raidAttack);
      player.updateDamage(raidAttack);
      players.push(player);
    }
  } 
};

function getPlayers() {
  var playerList = [];

  for(let i = 0; i < players.length; i++) {
    playerList.push(players[i].playerName);
  }

  return playerList;
};

// USER INTERFACE --------------------------------------------------------------------------------

$(document).ready(function () {

  var resultsHidden = true

  $("#form-raid").submit(function (event) {
    
    readRaidLog();

    for(let i = 0; i < players.length; i++) {
      $("#result-table").append(
        "<tr>" +
          "<td>" + players[i].playerName + "</td>" +
          "<td>" + players[i].totalDamage + "</td>" +
          "<td>" + players[i].averageDamage + "</td>" +
          "<td>" + players[i].totalRaidAttacks + "</td>" +
        "</tr>"
      );
    }

    // Display or reload results
    if (resultsHidden) {
      $("#results").slideDown('slow');
      resultsHidden = false;
    }
    else {
      $("#results").fadeOut('slow', function() {
        $("#results").fadeIn('slow');
      });
    }

    event.preventDefault();
  });
});