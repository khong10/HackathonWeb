window.onload = function(){
var xhr = new XMLHttpRequest();
xhr.open('GET', "https://api.7digital.com/1.2/track/search?shopId=2020&oauth_consumer_key=7d4vr6cgb392&q=i&usageTypes=adsupportedstreaming", true);
xhr.send();
xhr.onreadystatechange = processRequest; 

function processRequest(e) {
    if (xhr.readyState == 4) {
      	var object = [];
        var response = xhr.responseText;
      	var responseJSON = xmlToJson(StringToXMLDom(response));
      	let random = Math.random();
        responseJSON.response.searchResults.searchResult.forEach(element => {
          let vote=Math.floor(parseFloat(element.score['#text'])*200*random);
          let follower = Math.floor(vote*0.8);
          object.push({track:element.track.title['#text'], 
                       artist:element.track.artist.name['#text'], 
                       image: element.track.artist.image['#text'],
                       score:element.score['#text'], 
                       vote: vote,
                       follower: follower,
                       trackId: element.track['@attributes'].id});
        });
		window.data=shuffle(object);
		window.count=0;
		window.voteClicked=false;
		window.follow1Clicked=false;
		window.follow2Clicked=false;
		setData(window.count);
		}
		}

	function setData(count){
		var audio1 = document.querySelector("#audio1");
		var source = document.createElement("source");
		source.src="../audio/"+window.data[count].trackId+".mp3";
		audio1.appendChild(source);

		var follow1 = document.querySelector("#follow1");
		follow1.innerHTML = window.data[count].follower;
		var vote1 = document.querySelector("#vote1");
		vote1.innerHTML = window.data[count].vote;

		var img1 = document.querySelector("#img1");
		img1.src=window.data[count++].image;
		img1.style="width:40%;height:80%;"
		
		var audio2 = document.querySelector("#audio2");
		var source = document.createElement("source");
		source.src="../audio/"+window.data[count].trackId+".mp3";
		audio2.appendChild(source);
		
		var follow2 = document.querySelector("#follow2");
		follow2.innerHTML = window.data[count].follower;
		var vote2 = document.querySelector("#vote2");
		vote2.innerHTML = window.data[count].vote;

		var img2 = document.querySelector("#img2");
		img2.src=window.data[count++].image;
		img2.style="width:40%;height:80%;"
	}

	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}

function StringToXMLDom(string){
	var xmlDoc=null;
	if (window.DOMParser)
	{
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(string,"text/xml");
	}
	else // Internet Explorer
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(string);
	}
	return xmlDoc;
}

function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
}

function follow(i){
	if(i==1){
		var follow1 = document.querySelector("#follow1");
		if(window.follow1Clicked==false) follow1.innerHTML = window.data[window.count].follower+1;
		else follow1.innerHTML = window.data[window.count].follower;
		follow1Clicked=!follow1Clicked;
	}else{
		let count=window.count+1;
		var follow2 = document.querySelector("#follow2");
		if(window.follow2Clicked==false) follow2.innerHTML = window.data[count].follower+1;
		else follow2.innerHTML = window.data[count].follower;
		follow2Clicked=!follow2Clicked;
	}
}

function vote(i){
	let count= window.count;
	var vote1 = document.querySelector("#vote1");
	var vote2 = document.querySelector("#vote2");
	if(i==1){		
		if(window.voteClicked) vote2.innerHTML=window.data[count+1].vote;
		vote1.innerHTML = window.data[count].vote+1;
	}else{
		if(window.voteClicked) vote1.innerHTML=window.data[count].vote;
		vote2.innerHTML = window.data[count+1].vote+1;
	}
	voteClicked=true;
}
