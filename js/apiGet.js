var xhr = new XMLHttpRequest();
xhr.open('GET', "https://api.7digital.com/1.2/track/search?shopId=2020&oauth_consumer_key=7d4vr6cgb392&q=i&usageTypes=adsupportedstreaming&page=2", true);
xhr.send();

xhr.onreadystatechange = processRequest;
function processRequest(e) {
    if (xhr.readyState == 4) {
      	var object = [];
        var response = xhr.responseText;
      	var responseJSON = xmlToJson(StringToXMLDom(response));
        responseJSON.response.searchResults.searchResult.forEach(element => {
          object.push({track:element.track.title, 
                       artist:element.track.artist.name, 
                       image: element.track.artist.image,
                       score:element.score, 
                       trackId: element.track['@attributes'].id});
        });
      	object=shuffle(object);
      	console.log(object);
    }
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