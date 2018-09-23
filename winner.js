
window.onload = function(){

    var member = [{name: "John", follower: 10, following:50, songId: 100, img:"../img/1.png"},
                  {name: "May", follower: 20, following:300, songId: 200, img:"../2.png"},
                  {name: "Peter", follower: 15, following:500, songId: 300, img:"../img/3.png"},
                  {name: "Davince", follower: 30, following:60, songId: 400, img:"../img/4.png"}];
    var songs = [{Id: 100, songName: "Love Me Like You Do", singerName: "Ellie Goulding", vote: 20}, 
                 {Id: 200, songName: "Shape of You", singerName:"Ed Sheeran", vote: 10},
                 {Id: 300, songName: "Shape of You", singerName:"Ed Sheeran", vote: 30},
                 {Id: 400, songName: "Shape of You", singerName:"Ed Sheeran", vote: 50}];

    var tBody = document.querySelector("#data");
 
    var i, j;
    var temp = Object.create(member);
    for (i = songs.length - 1; i > 0; i--) {
        for (j = 0; j < i; j++) {
            if (songs[j].vote > songs[j+1].vote) {
                temp = songs[j];
                songs[j]= songs[j+1];
                songs[j+1] = temp; 
            }
        }
    }

    var valid = false;

    for(i = 0; i < 4; i++){
        for(j = 0; j < member.length || valid == false; j++){
        valid = (songs[i].Id == member[j].songId)? false: true;
            if(valid) {
                var row  = createTextRow([songs[i].songName, songs[i].singerName, member[j].name]);
                var tdElem = document.createElement("td");
                var imgElem = document.createElement("img");
                imgElem.src = member[i].img;
                tdElem.appendChild(imgElem);
                row.appendChild(tdElem);
                tBody.appendChild(row);	
                break;
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




