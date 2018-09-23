var member = [{memberId: 100, name: "John", follower: 10, following:50, songId: 100, songName: "Love Me Like You Do", img:"./img/1.png"},
              {memberId: 200, name: "May", follower: 20, following:300, songId: 200, songName: "Shape of You",img:"./img/2.png" },
              {memberId: 300, name: "Peter", follower: 15, following:500, songId: 300, songName: "Shape of You", img:"./img/3.png"},
              {memberId: 400, name: "Davince", follower: 30, following:60, songId: 400, songName: "Shape of You", img:"./img/4.png"},
];

var songs = [{songId: 100, songName: "Love Me Like You Do", singerName: "Ellie Goulding"}, 
             {songId: 200, songName: "Shape of You", singerName:"Ed Sheeran"}];


window.onload = function() {

    var memberContainer = document.querySelector("#memberArray");
   
    var paraImg = "<p>";
    var myImageStr = " ";
    myImageStr += "<img alt= '" +"profile image" + "' src='" + member[0].img + "' />";
    paraImg += myImageStr;
    paraImg += '</p>';

    var spanF = "<span>";
    spanF += "Member ID: " + member[0].memberId + "</span>";
       
    var para = "<p>";
    para += "Member Name: " + member[0].name + "</p>";

    var para2 = "<p>";
    para2 += "Follower: " + member[0].follower + "</p>";

    var para3 = "<p>";
    para3 += "Following: " + member[0].following + "</p>";

    memberContainer.innerHTML+= paraImg + spanF + para + para2 + para3;

};