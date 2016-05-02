var content = document.getElementById('txt');

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
        if (xhr.readyState==4 && xhr.status==200)
        {
            var data = JSON.parse(xhr.responseText);
            if(data.status == 'ok'){
                var output = '';
                //regex for ord om flygtninge. Bør opdateres med flere ord.
                var regex = /(flygtning|flygtninge|flygtningene|flygtningepolitik|asyl|asyslsøger|indvandrer|indvandring|asyslansøgere|ghetto)/i;
                //var regex = /(muslim|muslimer|imam|moske|moskeer|muslimske)/i;
                for(var i=0;i<data.items.length;++i){
                  var item = data.items[i];
                  var matches = regex.test(item.description + item.title + item.link);
                  if (matches) {
                      output +=
                        '<b>' + data.items[i].title + '</b><br/>'+
                        data.items[i].content + '<br/>' +
                        data.items[i].link + '<br/><br/>';
                  }
                }
                content.innerHTML = output;
            }
        }
    };
xhr.open('GET','https://rss2json.com/api.json?rss_url=https%3A%2F%2Fdenkorteavis.dk%2Ffeed',true);
xhr.send();
