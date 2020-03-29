// BUSINESS LOGIC --------------------------------------------------------------------------------
var players = [];
var raidAttack;
var modalPlayerCode;

function Titan(raidAttack) {
    this.titanNumber = raidAttack.titanNumber,
    this.titanName = raidAttack.titanName,
    this.titanDamage = raidAttack.titanDamage,
    this.head = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    this.leftArm = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    this.rightArm = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    this.leftHand = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    this.rightHand = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    this.torso = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    this.leftLeg = {
      armor : 0,
      body : 0,
      skeleton : 0
    },
    this.rightLeg = {
      armor : 0,
      body : 0,
      skeleton : 0
    }
};

function Player(raidAttack) {
  this.playerName = raidAttack.playerName;
  this.playerCode = raidAttack.playerCode;
  this.raidAttacks = [];
  this.raidAttacks.push(raidAttack);
  this.totalRaidAttacks = raidAttack.totalRaidAttacks;
  this.totalDamage = 0;
  this.averageDamage = 0;
  this.titan = new Array();
};

Player.prototype.updateDamage = function(raidAttack) {

  this.totalDamage += raidAttack.armorHead + raidAttack.armorLeftArm + raidAttack.armorLeftHand + raidAttack.armorLeftLeg + raidAttack.armorRightArm
    + raidAttack.armorRightHand + raidAttack.armorRightLeg+ raidAttack.armorTorso + raidAttack.bodyHead
    + raidAttack.bodyLeftArm + raidAttack.bodyLeftHand + raidAttack.bodyLeftLeg + raidAttack.bodyRightArm + raidAttack.bodyRightHand
    + raidAttack.bodyRightLeg + raidAttack.bodyTorso + raidAttack.skeletonHead + raidAttack.skeletonLeftArm + raidAttack.skeletonLeftHand
    + raidAttack.skeletonLeftLeg + raidAttack.skeletonRightArm + raidAttack.skeletonRightHand + raidAttack.skeletonRightLeg + raidAttack.skeletonTorso;

  this.averageDamage = Math.round(this.totalDamage / this.totalRaidAttacks);

  var tempTitan = new Titan(raidAttack);

  tempTitan.head.armor += raidAttack.armorHead;
  tempTitan.head.body += raidAttack.bodyHead;
  tempTitan.head.skeleton += raidAttack.skeletonHead;

  tempTitan.leftArm.armor += raidAttack.armorLeftArm;
  tempTitan.leftArm.body += raidAttack.bodyLeftArm;
  tempTitan.leftArm.skeleton += raidAttack.skeletonLeftArm;

  tempTitan.rightArm.armor += raidAttack.armorRightArm;
  tempTitan.rightArm.body += raidAttack.bodyRightArm;
  tempTitan.rightArm.skeleton += raidAttack.skeletonRightArm;

  tempTitan.leftHand.armor += raidAttack.armorLeftHand;
  tempTitan.leftHand.body += raidAttack.bodyLeftHand;
  tempTitan.leftHand.skeleton += raidAttack.skeletonLeftHand;

  tempTitan.rightHand.armor += raidAttack.armorRightHand;
  tempTitan.rightHand.body += raidAttack.bodyRightHand;
  tempTitan.rightHand.skeleton += raidAttack.skeletonRightHand;

  tempTitan.torso.armor += raidAttack.armorTorso;
  tempTitan.torso.body += raidAttack.bodyTorso;
  tempTitan.torso.skeleton += raidAttack.skeletonTorso;

  tempTitan.leftLeg.armor += raidAttack.armorLeftLeg;
  tempTitan.leftLeg.body += raidAttack.bodyLeftLeg;
  tempTitan.leftLeg.skeleton += raidAttack.skeletonLeftLeg;

  tempTitan.rightLeg.armor += raidAttack.armorRightLeg;
  tempTitan.rightLeg.body += raidAttack.bodyRightLeg;
  tempTitan.rightLeg.skeleton += raidAttack.skeletonRightLeg;

  this.titan.push(tempTitan);
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
            players[i].playerCode + "\">" + players[i].playerName + "</a></td>" +
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
    $(".player-detail-panel").remove();
    var modalLink = $(event.relatedTarget);
    modalPlayerCode = $(modalLink).attr("name");

    for (let i = 0; i < players.length; i++) {
      if(players[i].playerCode === modalPlayerCode) {
        var player = players[i];
        break;
      }
    }

    for (let i = 0; i < player.titan.length; i++) {
      $("#modal-text").append(
        "<div class=\"panel panel-default player-detail-panel\">" +
          "<div class=\"panel-heading\">" +
            "<h2 class=\"panel-title\">" + player.titan[i].titanName + " - Total Damage: " + player.titan[i].titanDamage + "</h2>" +
          "</div>" +
          "<div class=\"panel-body\">" +
            "<table>" +
              "<tr>" +
                "<th></th>" + 
                "<th>Head</th>" + 
                "<th>Torso</th>" + 
                "<th>Left Arm</th>" + 
                "<th>Right Arm</th>" + 
                "<th>Left Hand</th>" + 
                "<th>Right Hand</th>" + 
                "<th>Left Leg</th>" + 
                "<th>Right Leg</th>" + 
              "</tr>" +
              "<tr>" +
                "<th>Armor</th>" + 
                "<td>" + player.titan[i].head.armor + "</td>" + 
                "<td>" + player.titan[i].torso.armor + "</td>" + 
                "<td>" + player.titan[i].leftArm.armor + "</td>" + 
                "<td>" + player.titan[i].rightArm.armor + "</td>" + 
                "<td>" + player.titan[i].leftHand.armor + "</td>" + 
                "<td>" + player.titan[i].rightHand.armor + "</td>" + 
                "<td>" + player.titan[i].leftLeg.armor + "</td>" + 
                "<td>" + player.titan[i].rightLeg.armor + "</td>" + 
              "</tr>" +
              "<tr>" +
                "<th>Body</th>" + 
                "<td>" + player.titan[i].head.body + "</td>" + 
                "<td>" + player.titan[i].torso.body + "</td>" + 
                "<td>" + player.titan[i].leftArm.body + "</td>" + 
                "<td>" + player.titan[i].rightArm.body + "</td>" + 
                "<td>" + player.titan[i].leftHand.body + "</td>" + 
                "<td>" + player.titan[i].rightHand.body + "</td>" + 
                "<td>" + player.titan[i].leftLeg.body + "</td>" + 
                "<td>" + player.titan[i].rightLeg.body + "</td>" + 
              "</tr>" +
              "<tr>" +
                "<th>Skeleton</th>" + 
                "<td>" + player.titan[i].head.skeleton + "</td>" + 
                "<td>" + player.titan[i].torso.skeleton + "</td>" + 
                "<td>" + player.titan[i].leftArm.skeleton + "</td>" + 
                "<td>" + player.titan[i].rightArm.skeleton + "</td>" + 
                "<td>" + player.titan[i].leftHand.skeleton + "</td>" + 
                "<td>" + player.titan[i].rightHand.skeleton + "</td>" + 
                "<td>" + player.titan[i].leftLeg.skeleton + "</td>" + 
                "<td>" + player.titan[i].rightLeg.skeleton + "</td>" + 
              "</tr>" +
            "</table>" +
          "</div>" +
        "</div>"
      );
    }
  });
});