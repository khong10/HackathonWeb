var member = [{memberId: 100, name: "John", follower: 10, following:50, songId: 100, songName: "Love Me Like You Do", img:"./img/1.png"},
              {memberId: 200, name: "May", follower: 20, following:300, songId: 200, songName: "Shape of You",img:"./img/2.png" },
              {memberId: 300, name: "Peter", follower: 15, following:500, songId: 300, songName: "Shape of You", img:"./img/3.png"},
              {memberId: 400, name: "Davince", follower: 30, following:60, songId: 400, songName: "Shape of You", img:"./img/4.png"},
];



window.onload = function() {

    var a = 300;
    var b;
    for (var i = 0; i < member.length; i++){
        if(a == member[i].memberId){
            b = i;
        }
    }
    

    var memberContainer = document.querySelector("#memberArray");
   
    var paraImg = "<p>";
    var myImageStr = " ";
    myImageStr += "<img class = 'profile' alt= '" +"profile image" + "' src='" + member[b].img + "' />";
    paraImg += myImageStr;
    paraImg += '</p>';

    var spanF = "<span class = 'memID'>";
    spanF += "Member ID: " + member[b].memberId + "</span>";
       
    var para = "<p class = 'memName'>";
    para += "Member Name: " + member[b].name + "</p>";

    var para2 = "<p class = 'memFollower'>";
    para2 += "Follower: " + member[b].follower + "</p>";

    var para3 = "<p class = 'memFollowing'>";
    para3 += "Following: " + member[b].following + "</p>";

    memberContainer.innerHTML+= paraImg + spanF + para + para2 + para3;
};