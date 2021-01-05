"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Players",
      [
        {
          name: "Patrick Mahomes II",
          tagName: "PatrickMahomes",
          teamName: "KC",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16413/headshot/250x250.webp",
        },
        {
          name: "Josh Allen",
          tagName: "JoshAllen",
          teamName: "BUF",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17298/headshot/250x250.webp",
        },
        {
          name: "Kyler Murray",
          tagName: "KylerMurray",
          teamName: "ARI",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/18600/headshot/250x250.webp",
        },
        {
          name: "Aaron Rodgers",
          tagName: "AaronRodgers",
          teamName: "GB",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/9001/headshot/250x250.webp",
        },
        {
          name: "Deshaun Watson",
          tagName: "DeshaunWatson",
          teamName: "HOU",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16398/headshot/250x250.webp",
        },
        {
          name: "Lamar Jackson",
          tagName: "LamarJackson",
          teamName: "BAL",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17233/headshot/250x250.webp",
        },
        {
          name: "Justin Herbert",
          tagName: "JustinHerbert",
          teamName: "LAC",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/18635/headshot/250x250.webp",
        },
        {
          name: "Russell Wilson",
          tagName: "RussellWilson",
          teamName: "SEA",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/11180/headshot/250x250.webp",
        },
        {
          name: "Tyreek Hill",
          tagName: "TyreekHill",
          teamName: "KC",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/15802/headshot/250x250.webp",
        },
        {
          name: "Davante Adams",
          tagName: "DavanteAdams",
          teamName: "GB",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/12123/headshot/250x250.webp",
        },
        {
          name: "DeAndre Hopkins",
          tagName: "DeAndreHopkins",
          teamName: "ARI",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/11606/headshot/250x250.webp",
        },
        {
          name: "Calvin Ridley",
          tagName: "CalvinRidley",
          teamName: "ATL",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17258/headshot/250x250.webp",
        },
        {
          name: "Allen Robinson II",
          tagName: "AllenRobinson",
          teamName: "CHI",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/12126/headshot/250x250.webp",
        },
        {
          name: "Keenan Allen",
          tagName: "KeenanAllen",
          teamName: "LAC",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/11616/headshot/250x250.webp",
        },
        {
          name: "Stefon Diggs",
          tagName: "StefonDiggs",
          teamName: "BUF",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/13981/headshot/250x250.webp",
        },
        {
          name: "Robert Woods",
          tagName: "RobertWoods",
          teamName: "LAR",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/11610/headshot/250x250.webp",
        },
        {
          name: "A.J. Brown",
          tagName: "AJBrown",
          teamName: "TEN",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/18218/headshot/250x250.webp",
        },
        {
          name: "Justin Jefferson",
          tagName: "JustinJefferson",
          teamName: "MIN",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/19236/headshot/250x250.webp",
        },
        {
          name: "Alvin Kamara",
          tagName: "AlvinKamara",
          teamName: "NO",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16421/headshot/250x250.webp",
        },
        {
          name: "Derrick Henry",
          tagName: "DerrickHenry",
          teamName: "TEN",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/15514/headshot/250x250.webp",
        },
        {
          name: "Dalvin Cook",
          tagName: "DalvinCook",
          teamName: "MIN",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16374/headshot/250x250.webp",
        },
        {
          name: "Aaron Jones",
          tagName: "AaronJones",
          teamName: "GB",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16673/headshot/250x250.webp",
        },
        {
          name: "Austin Ekeler",
          tagName: "AustinEkeler",
          teamName: "LAC",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16483/headshot/250x250.webp",
        },
        {
          name: "David Montgomery",
          tagName: "DavidMontgomery",
          teamName: "CHI",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/18239/headshot/250x250.webp",
        },
        {
          name: "Nick Chubb",
          tagName: "NickChubb",
          teamName: "CLE",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17246/headshot/250x250.webp",
        },
        {
          name: "Miles Sanders",
          tagName: "MilesSanders",
          teamName: "PHI",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/18283/headshot/250x250.webp",
        },
        {
          name: "Chris Carson",
          tagName: "ChrisCarson",
          teamName: "SEA",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16754/headshot/250x250.webp",
        },
        {
          name: "Travis Kelce",
          tagName: "TravisKelce",
          teamName: "KC",
          position: "TE",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/11594/headshot/250x250.webp",
        },
        {
          name: "Darren Waller",
          tagName: "DarrenWaller",
          teamName: "LV",
          position: "TE",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/14104/headshot/250x250.webp",
        },
        {
          name: "T.J. Hockenson",
          tagName: "TJHockenson",
          teamName: "DET",
          position: "TE",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/18290/headshot/250x250.webp",
        },
        {
          name: "Mark Andrews",
          tagName: "MarkAndrews",
          teamName: "BAL",
          position: "TE",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17269/headshot/250x250.webp",
        },
        {
          name: "Robert Tonyan",
          tagName: "RobertTonyan",
          teamName: "GB",
          position: "TE",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16502/headshot/250x250.webp",
        },
        {
          name: "Hunter Henry",
          tagName: "HunterHenry",
          teamName: "LAC",
          position: "TE",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/15561/headshot/250x250.webp",
        },
        {
          name: "Dallas Goedert",
          tagName: "DallasGoedert",
          teamName: "PHI",
          position: "TE",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17270/headshot/250x250.webp",
        },
        {
          name: "Younghoe Koo",
          tagName: "YounghoeKoo",
          teamName: "ATL",
          position: "K",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16910/headshot/250x250.webp",
        },
        {
          name: "Justin Tucker",
          tagName: "JustinTucker",
          teamName: "BAL",
          position: "K",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/11465/headshot/250x250.webp",
        },
        {
          name: "Harrison Butker",
          tagName: "HarrisonButker",
          teamName: "KC",
          position: "K",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16712/headshot/250x250.webp",
        },
        {
          name: "Jason Sanders",
          tagName: "Jason Sanders",
          teamName: "MIA",
          position: "K",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17533/headshot/250x250.webp",
        },
        {
          name: "Wil Lutz",
          tagName: "WilLutz",
          teamName: "NO",
          position: "K",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16026/headshot/250x250.webp",
        },
        {
          name: "Ryan Succop",
          tagName: "Ryan Succop",
          teamName: "TB",
          position: "K",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/9549/headshot/250x250.webp",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Players", null, {});
  },
};
