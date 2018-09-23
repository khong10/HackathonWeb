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
          object=shuffle(object);
		var tBody = document.querySelector("#data");

	for(i = 0; i < object.length; i++){
		var row = createTextRow([object[i].artist,
		object[i].track,
		object[i].image, object[i].trackId]);
		var tdElem = document.createElement("td");
		var imgElem = document.createElement("img");
		imgElem.src = object[i].image;
		imgElem.alt = "Avatar";
		tdElem.appendChild(imgElem);
		row.appendChild(tdElem);
		tBody.appendChild(row);		
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
