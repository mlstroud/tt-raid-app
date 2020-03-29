// BUSINESS LOGIC --------------------------------------------------------------------------------
var players = [];
var raidAttack;
var modalPlayerCode;

function Player(raidAttack) {
  this.playerName = raidAttack.playerName;
  this.playerCode = raidAttack.playerCode
  this.raidAttacks = [];
  this.raidAttacks.push(raidAttack);
  this.totalRaidAttacks = raidAttack.totalRaidAttacks;
  this.totalDamage = 0;
  this.averageDamage = 0;
  this.titan = {
    titanNumber : raidAttack.titanNumber,
    titanName : raidAttack.titanName,
    titanDamage : raidAttack.titanDamage,
    head = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    leftArm = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    rightArm = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    leftHand = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    rightHand = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    torso = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    leftLeg = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    rightLeg = {
      armor : 0,
      body : 0,
      skeleton : 0
    }
  };
};

Player.prototype.updateDamage = function(raidAttack) {

  this.totalDamage += raidAttack.armorHead + raidAttack.armorLeftArm + raidAttack.armorLeftHand + raidAttack.armorLeftLeg + raidAttack.armorRightArm
    + raidAttack.armorRightHand + raidAttack.armorRightLeg+ raidAttack.armorTorso + raidAttack.bodyHead
    + raidAttack.bodyLeftArm + raidAttack.bodyLeftHand + raidAttack.bodyLeftLeg + raidAttack.bodyRightArm + raidAttack.bodyRightHand
    + raidAttack.bodyRightLeg + raidAttack.bodyTorso + raidAttack.skeletonHead + raidAttack.skeletonLeftArm + raidAttack.skeletonLeftHand
    + raidAttack.skeletonLeftLeg + raidAttack.skeletonRightArm + raidAttack.skeletonRightHand + raidAttack.skeletonRightLeg + raidAttack.skeletonTorso;

  this.averageDamage = Math.round(this.totalDamage / this.totalRaidAttacks);

  this.titan.head.armor = raidAttack.armorHead;
  this.titan.head.body = raidAttack.bodyHead;
  this.titan.head.skeleton = raidAttack.skeletonHead;

  this.titan.leftArm.armor = raidAttack.armorLeftArm;
  this.titan.leftArm.body = raidAttack.bodyLeftArm;
  this.titan.leftArm.skeleton = raidAttack.skeletonLeftArm;

  this.titan.rightArm.armor = raidAttack.armorRightArm;
  this.titan.rightArm.body = raidAttack.bodyRightArm;
  this.titan.rightArm.skeleton = raidAttack.skeletonRightArm;

  this.titan.leftHand.armor = raidAttack.armorLeftHand;
  this.titan.leftHand.body = raidAttack.bodyLeftHand;
  this.titan.leftHand.skeleton = raidAttack.skeletonLeftHand;

  this.titan.rightHand.armor = raidAttack.armorRightHand;
  this.titan.rightHand.body = raidAttack.bodyRightHand;
  this.titan.rightHand.skeleton = raidAttack.skeletonRightHand;

  this.titan.torso.armor = raidAttack.armorTorso;
  this.titan.torso.body = raidAttack.bodyTorso;
  this.titan.torso.skeleton = raidAttack.skeletonTorso;

  this.titan.leftLeg.armor = raidAttack.armorLeftLeg;
  this.titan.leftLeg.body = raidAttack.bodyLeftLeg;
  this.titan.leftLeg.skeleton = raidAttack.skeletonLeftLeg;

  this.titan.rightLeg.armor = raidAttack.armorRightLeg;
  this.titan.rightLeg.body = raidAttack.bodyRightLeg;
  this.titan.rightLeg.skeleton = raidAttack.skeletonRightLeg;
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

function getPlayers(playerCode) {
  var playerList = [];

  if(playerCode === "all") {

    for(let i = 0; i < players.length; i++) {
      playerList.push(players[i].playerName);
    }
  
    return playerList;
  }
  else {
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerCode === playerCode){
        return player[i];
      }
    }
    return null;
  }
};

// USER INTERFACE --------------------------------------------------------------------------------
$(document).ready(function () {

  var resultsHidden = true;

  $("#form-raid").submit(function (event) {
    
    readRaidLog();

    for(let i = 0; i < players.length; i++) {
      $("#result-table").append(
        "<tr>" +
          "<td><a href=\"#\" data-toggle=\"modal\" data-target=\"#player-modal\" class=\"player-link\" name=\"" + 
            players[i].playerCode + "\" onclick=\"storeCode\">" + players[i].playerName + "</a></td>" +
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

  $("#player-modal").on('shown.bs.modal', function (event) {
    $("#modal-text").fadeIn();
  });

  $("#player-modal").on('hidden.bs.modal', function () {
    $("#modal-text").hide();
  });

  $(document).on('show.bs.modal', '#player-modal', function (event) {
    $("#modal-text tr:gt(0)").remove();
    var modalLink = $(event.relatedTarget);
    modalPlayerCode = $(modalLink).attr("name");

    for (let i = 0; i < players.length; i++) {
      if(players[i].playerCode === modalPlayerCode) {
        var player = players[i];
        break;
      }
    }

    var playerDamage = {
      head : 0,
      leftArm :0,
      rightArm :0,
    };

    $("#modal-text").append(
      "<tr>" +
        "<td>" + player.playerCode + "</td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
      "</tr>");
  });
});