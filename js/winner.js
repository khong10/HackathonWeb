
window.onload = function(){

    var member = [{memberId: 100, name: "John", follower: 10, following:50, songId: 100, img:"/Users/yuciou/Desktop/HackathonWeb/img/1.png",},
    {memberId: 200, name: "May", follower: 20, following:300, songId: 200,img:"/Users/yuciou/Desktop/HackathonWeb/img/2.png" },
    {memberId: 300, name: "Peter", follower: 15, following:500, songId: 300, img:"/Users/yuciou/Desktop/HackathonWeb/img/3.png"},
    {memberId: 400, name: "Davince", follower: 30, following:60, songId: 400, img:"/Users/yuciou/Desktop/HackathonWeb/img/4.png"}];
var songs = [{songId: 100, songName: "Love Me Like You Do", singerName: "Ellie Goulding", vote: 20}, 
   {songId: 200, songName: "Shape of You", singerName:"Ed Sheeran", vote: 10}];


    var tBody = document.querySelector("#data");

    var i, j, temp;
    var count = 0;
    var rank = [];
    for (i = songs.length - 1; i > 0; i--) {
        for (j = 0; j < i; j++) {
            if (songs[j] > songs[j+1]) {
                temp = songs[j];
                songs[j] = songs[j+1];
                songs[j+1] = temp;
                rank[count++] = temp;
            }
        }
        if(count > 10) break;
    }

    var valid = false;
    var tempMember = "";

    for(i = 0; i < rank.length; i++){
        for(j = 0; j < member.length && valid == 0; j++){
        valid = rank[i].songId == member[j].songId ? 1: 0;
            if(valid) {
                tempMember = tempMember[j].name;
                var row  = createTextRow([rank[i].songName, rank[i].singerName, tempMember]);
                var tdElem = document.createElement("td");
                var imgElem = document.createElement("img");
                imgElem.src = rank[i].img;
                imgElem.alt = "Avatar";
                tdElem.appendChild(imgElem);
                row.appendChild(tdElem);
                tBody.appendChild(row);		
            }
        }	
    }
}

function createTextRow(data){
	var rowElement = document.createElement("tr");
	for(var i = 0; i < data.length; i++){
		var col = document.createElement("td");
		col.appendChild(document.createTextNode(data[i]));
		rowElement.appendChild(col);
	}
	return rowElement;
}





