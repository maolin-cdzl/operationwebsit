
function createServerPanel(server) {
	console.info(server);
	// create head
	var title = document.createElement("h3");
	title.setAttribute("class","panel-title");
	title.innerHTML = server;

	var head = document.createElement("div");
	head.setAttribute("class","panel-heading");
	head.appendChild(title);

	// create body
	var chart = document.createElement("div");
	chart.setAttribute("id",server);
	chart.setAttribute("class","flot-chart-content");
	
	var body = document.createElement("div");
	body.setAttribute("class","panel-body");
	body.appendChild(chart);

	// mix title and body to panel
	var panel = document.createElement("div");
	panel.setAttribute("class","panel panel-default");
	panel.appendChild(head);
	panel.appendChild(body);

	// return wrapper
	var row = document.createElement("div");
	row.setAttribute("class","row");
	row.appendChild(panel);
	return row;
}

function createServerPanels(servers) {
	var container = document.getElementById("server-container");
	for(var i=0; i < servers.length; i++) {
		var panel = createServerPanel(servers[i]);
		container.appendChild(panel);
	}
}

var api;

$(document).ready(function(){
	api = $.eChatApi();

	api.listenServerEvent({
		onMessage: function(e) {
			console.info(e);
		},
		onError: function(e) {
			console.info(e);
		},
		events: {
			server: function(e) {
				console.info(e.data);
			}
		}
	});
	//api.getServerList(function(servers) {
	//	createServerPanels(servers);
	//});
});
