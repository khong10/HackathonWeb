
window.onload = function(){

    var member = [{name: "John", follower: 10, following:50, songId: 100, img:"../img/1.png"},
                  {name: "May", follower: 20, following:300, songId: 200, img:"../2.png"},
                  {name: "Peter", follower: 15, following:500, songId: 300, img:"../img/3.png"},
                  {name: "Davince", follower: 30, following:60, songId: 400, img:"../img/4.png"}];
    var songs = [{songId: 100, songName: "Love Me Like You Do", singerName: "Ellie Goulding", vote: 20}, 
                 {songId: 200, songName: "Shape of You", singerName:"Ed Sheeran", vote: 10},
                 {songId: 300, songName: "Shape of You", singerName:"Ed Sheeran", vote: 30},
                 {songId: 400, songName: "Shape of You", singerName:"Ed Sheeran", vote: 50}];


    var tBody = document.querySelector("#data");

    var i, j;
    var temp = Object.create(member);
    var count = 0;
    var rank = [];
    for (i = songs.length - 1; i > 0; i--) {
        for (j = 0; j < i; j++) {
            if (songs[j].vote > songs[j+1].vote) {

                temp.songId = songs[j].songId;
                temp.songName = songs[j].songName;
                temp.singerName = songs[j].singerName;
                temp.vote = songs[j].vote;

                
                songs[j].songId = songs[j+1].songId;
                songs[j].songName = songs[j+1].songName;
                songs[j].singerName = songs[j+1].songName;
                songs[j].vote = songs[j+1].vote;

                
                songs[j+1].songId = temp.songId;
                songs[j+1].songName = temp.songName;
                songs[j+1].singerName = temp.singerName;
                songs[j+1].vote = temp.vote;
                
                console.log(songs[j].songId);
                
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





