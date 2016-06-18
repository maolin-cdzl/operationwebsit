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
	var chartContent = document.createElement("div");
	chartContent.setAttribute("id",server);
	chartContent.setAttribute("class","flot-chart-content");

	var chart = document.createElement("div");
	chart.setAttribute("class","flot-chart");
	chart.appendChild(chartContent);
	
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

$(document).ready(function(){
	var api = $.eChatApi();
	var doms = {};
	var onlineSeries = {};
	var plots = {};
	var options = {
        grid: {
            borderWidth: 1,
            minBorderMargin: 4,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#fff", "#e4f4f4"]
            },
            margin: {
                top: 2,
                bottom: 2,
                left: 2
            }
        },
        xaxis: {
			mode: "time",
			tickSize: [2,"second"],
            tickFormatter: function(v,axis) {
				if( v % 10000 == 0 ) {		// 10 second
					var date = new Date(v);
					var str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
					console.log("xaxis: %s",str);
					return str;
				} else {
					return "";
				}
            },
			axisLabel: "Time",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 10
		},
		yaxis: {
			min: 0,
			max: 20000,
			tickFormatter: function(v, axis) {
				if (v % 1000 == 0) {
					var str = v + "";
					console.log("yaxis: %s",str);
					return str;
				} else {
					return "";
				}
			},
			axisLabel: "在线用户",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 6
		},
		legend: {
			show: true
		}
	};

	
	function updateServerOnline(load) {
		var dom = doms[load.server];
		var plot = plots[load.server];
		var series = onlineSeries[load.server];
		if( dom == null || plot == null || series == null ) {
			console.log("Can not found server: %s",load.server);
			return;
		}

		var maximum = dom.outerWidth() / 2 || 300;
		console.log("Update %s,maximum %d,datalen %d",load.server,maximum,series[0].data.length);

		//server bug,publish data stuck
		series[0].data.push([load.bucket,load.userLoad.onlines]);
		if( series[0].data.length > maximum ) {
			series[0].data = series[0].data.slice(1);
		}
		plot.setData(series);
		plot.draw();
	}

	api.getServerList(function(servers) {
		createServerPanels(servers);
		for(var i=0; i < servers.length; i++) {
			var server = servers[i];
			console.log('create server series: %s', server);

			var dom = $("#" + server);
			if( dom == null ) {
				console.log("can not found dom: %s","#"+server);
			}
			var series = [{
			   label: server, 
			   data: [],
			   lines: { show: true, lineWidth: 1.2 }
			}];
			var plot = $.plot(dom,series,options);

			doms[server] = dom;
			onlineSeries[server] = series;
			plots[server] = plot;
		}

		api.listenServerEvent({
			onMessage: function(e) {
				console.info(e);
			},
			onError: function(e) {
				console.info(e);
			},
			events: {
				serverload: function(e) {
					updateServerOnline(JSON.parse(e.data));
				}
			}
		});
	});
});
