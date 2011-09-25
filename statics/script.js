window.addEventListener('load', function(e) {

  var table = document.querySelector('table');

  update();
  function update() {
    var req = new XMLHttpRequest();  
    req.open('GET', '/statuses.json?' + new Date().getTime());  
    req.onreadystatechange = function (e) {  
      if (req.readyState == 4 && req.status == 200) {
        var statuses = JSON.parse(req.responseText);  
        var html = [];
        html.push('<tr>'); 
        html.push('<th>Target</th>'); 
        html.push('<th>Status</th>'); 
        html.push('<th>Last</th>'); 
        html.push('<th>Logs</th>'); 
        html.push('</tr>'); 
        for (var i = 0; i < statuses.length; i++) {
          var status = statuses[i];
          html.push('<tr>'); 
          html.push('<td><a href="' + status.url + '" target="_blank">' + status.name + '</a></td>'); 
          html.push('<td class="' + status.status.toLowerCase() + '">' + status.status + '</td>'); 
          html.push('<td>' + status.last + '</td>'); 
          html.push('<td><a href="logs/' + status.name + '.log" target="_blank">' + status.name + '.log</a></td>'); 
          html.push('</tr>'); 
        }
        table.innerHTML = html.join('\n');
      }  
    };  
    req.send(null);  
  }

}, false);
