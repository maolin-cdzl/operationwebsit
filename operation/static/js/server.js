/*
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
*/

function setupDatePicker() {
	$('#dp-start').datetimepicker({locale: 'zh_CN'});
	$('#dp-end').datetimepicker({
		locale: 'zh_CN',
		useCurrent: false //Important! See issue #1075
	});
	$("#dp-start").on("dp.change", function (e) {
		$('#dp-end').data("DateTimePicker").minDate(e.date);
	});
	$("#dp-end").on("dp.change", function (e) {
		$('#dp-start').data("DateTimePicker").maxDate(e.date);
	});

	var now = new Date();
	$('#dp-end').data('DateTimePicker').date(now);
	now.setHours(0);
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);
	$('#dp-start').data('DateTimePicker').date(now);
}

var rtflotopt= {
	grid: {
		borderWidth: 1,
		minBorderMargin: 4,
		labelMargin: 10,
		//backgroundColor: {
		//    colors: ["#fff", "#e4f4f4"]
		//},
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
			var date = new Date(v);
			if( date.getSeconds() % 10 == 0 ) {		// 10 second
				var str =  date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
				return str;
			} else {
				return "";
			}
		},
		axisLabel: "时间(秒)",
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
				return str;
			} else {
				return "";
			}
		},
		axisLabel: "数量",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelPadding: 6
	},
	legend: {
		show: true
	}
};


var ulflotopt= {
	grid: {
		borderWidth: 1,
		minBorderMargin: 4,
		labelMargin: 10,
		//backgroundColor: {
		//    colors: ["#fff", "#e4f4f4"]
		//},
		margin: {
			top: 2,
			bottom: 2,
			left: 2
		}
	},
	xaxis: {
		mode: "time",
		tickSize: [10,"minute"],
		tickFormatter: function(v,axis) {
			var date = new Date(v);
			if( date.getMinutes() == 0 ) {		// hour
				var str = date.getDate() + "-" + date.getHours();
				return str;
			} else {
				return "";
			}
		},
		axisLabel: "时间(日期.小时)",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelPadding: 10
	},
	yaxis: {
		min: 0,
		max: 5000,
		tickFormatter: function(v, axis) {
			if (v % 1000 == 0) {
				var str = v + "";
				return str;
			} else {
				return "";
			}
		},
		axisLabel: "数量",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelPadding: 6
	},
	legend: {
		show: true,
		labelFormatter: function(label, series){
          return '<a href="#" onClick="toggleULPlot('+series.idx+'); return false;">'+label+'</a>';
        }
	}
};

var slflotopt= {
	grid: {
		borderWidth: 1,
		minBorderMargin: 4,
		labelMargin: 10,
		//backgroundColor: {
		//    colors: ["#fff", "#e4f4f4"]
		//},
		margin: {
			top: 2,
			bottom: 2,
			left: 2
		}
	},
	xaxis: {
		mode: "time",
		tickSize: [10,"minute"],
		tickFormatter: function(v,axis) {
			var date = new Date(v);
			if( date.getMinutes() == 0 ) {		// hour
				var str = date.getDate() + "-" + date.getHours();
				return str;
			} else {
				return "";
			}
		},
		axisLabel: "时间(日期.小时)",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelPadding: 10
	},
	yaxis: {
		min: 0,
		max: 1000,
		tickFormatter: function(v, axis) {
			if (v % 1000 == 0) {
				var str = v + "";
				return str;
			} else {
				return "";
			}
		},
		axisLabel: "数量",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelPadding: 6
	},
	legend: {
		show: true,
		labelFormatter: function(label, series){
			console.log('labelFormatter,label: %s',label);
			console.log(series);
			return '<a href="#" onClick="toggleSLPlot('+series.idx+'); return false;">'+label+'</a>';
        }
	}
};

rtplot = null;
ulplot = null;
slplot = null;

function toggleULPlot(seriesIdx) {
	console.log('toggleULPlot: %d', seriesIdx);
	if( ulplot ) {
		var data = ulplot.getData();
		data[seriesIdx].lines.show = !data[seriesIdx].lines.show;
		ulplot.setData(data);
		ulplot.draw();
	}
}

function toggleSLPlot(seriesIdx) {
	if( slplot ) {
		var data = slplot.getData();
		data[seriesIdx].lines.show = !data[seriesIdx].lines.show;
		slplot.setData(data);
		slplot.draw();
	}
}

$(document).ready(function(){

	var api = $.eChatApi();
	var curServer = null;
	var rtSeries = [{
		label: '在线用户',
		data : []
	}];
	rtplot = $.plot($('#runtime-status'),rtSeries,rtflotopt);

	setupDatePicker();
	api.getServerList(function(servers) {
		var btnGroup = document.getElementById("server-list");
		for(var i=0; i < servers.length; i++) {
			var server = servers[i];
			var btn = document.createElement("button");
			btn.setAttribute("type","button");
			btn.setAttribute("class","btn btn-default");
			btn.innerHTML = server;
			btnGroup.appendChild(btn);
		}
		setCurrentServer(servers[0]);

		$('#server-list button').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			
			if(curServer != $(this)[0].innerHTML ) {
				setCurrentServer($(this)[0].innerHTML);
			}
		});

		$('#refresh').click(function(){
			if( curServer ) {
				setCurrentServer(curServer);
			}
		});
	});

	function setCurrentServer(server) {
		if( server != curServer ) {
			console.log('set server from %s to %s',curServer,server);
			curServer = server;
			rtSeries[0].data = [];
			rtplot.setData(rtSeries);
			rtplot.draw();

			api.stopListenServerEvent();
			api.listenServerEvent('appload-' + server,{
				onMessage: function(e) {
					console.info(e);
				},
				onError: function(e) {
					console.info(e);
				},
				events: {
					serverload: function(e) {
						var report = JSON.parse(e.data);
						rtSeries[0].data.push( [report.bucket,report.userLoad.onlines] );
						if( rtSeries[0].data.length > 100 ) {
							rtSeries[0].data = rtSeries[0].data.slice(1);
						}
						rtplot.setData(rtSeries);
						rtplot.draw();
					}
				}
			});
		}
		
		var start = $('#dp-start').data('DateTimePicker').date();
		var end = $('#dp-end').data('DateTimePicker').date();
		var options = {
			start: start.format('YYYY-MM-DD HH:mm:ss'),
			end: end.format('YYYY-MM-DD HH:mm:ss')
		};
		api.serverUserLoad(server,options,function(loads){
			console.log('recv user loads: %d',loads.length);
			var userLoadSeries = [
				{ idx: 0,label: '在线用户',  data: [], lines: { show: true} },
				{ idx: 1,label: '上线用户',  data: [], lines: { show: true} },
				{ idx: 2,label: '登陆人次',  data: [], lines: { show: true} },
				{ idx: 3,label: '下线用户',  data: [], lines: { show: true} },
				{ idx: 4,label: '登出人次',  data: [], lines: { show: true} },
				{ idx: 5,label: '掉线用户',  data: [], lines: { show: true} },
				{ idx: 6,label: '掉线人次',  data: [], lines: { show: true} },
				{ idx: 7,label: '平均掉线时长(秒)',  data: [], lines: {show: true} }
			];

			var maxValue = 0;
			for(var i=0; i < loads.length; i++){
				var load = loads[i];
				var report = load['l:report'];
				var ts = new Date(load.time).getTime();
				
				maxValue = Math.max(maxValue,report.onlines,report.loginUsers,report.loginTimes,report.logoutUsers,report.logoutTimes,report.brokenUsers,report.brokenTimes);

				userLoadSeries[0].data.push( [ts,report.onlines] );
				userLoadSeries[1].data.push( [ts,report.loginUsers] );
				userLoadSeries[2].data.push( [ts,report.loginTimes] );
				userLoadSeries[3].data.push( [ts,report.logoutUsers] );
				userLoadSeries[4].data.push( [ts,report.logoutTimes] );
				userLoadSeries[5].data.push( [ts,report.brokenUsers] );
				userLoadSeries[6].data.push( [ts,report.brokenTimes] );
				if( report.brokenTimes > 0 ) {
					userLoadSeries[7].data.push( [ts,report.totalOnlineSeconds / report.brokenTimes] );
				} else {
					userLoadSeries[7].data.push( [ts,0] );
				}
			}
			ulflotopt.yaxis.max = 5000;
			while( ulflotopt.yaxis.max < maxValue ) {
				ulflotopt.yaxis.max += 5000;
			}
			ulplot = $.plot($('#user-load'),userLoadSeries,ulflotopt);
		});

		api.serverSpeakLoad(server,options,function(loads){
			console.log('recv speakloads: %d',loads.length);
			var speakLoadSeries = [
				{ idx: 0,label: '发言人次', data: [], lines: {show: true} },
				{ idx: 1,label: '发言用户', data: [], lines: {show: true} },
				{ idx: 2,label: '活跃群组', data: [], lines: {show: true} },
				{ idx: 3,label: '掉话人次', data: [], lines: {show: true} },
				{ idx: 4,label: '掉话用户', data: [], lines: {show: true} },
				{ idx: 5,label: '掉话群组', data: [], lines: {show: true} },
				{ idx: 6,label: '平均掉话时长(秒)', data: [] , lines: {show: true}},
			];

			var maxValue = 1000;
			for(var i=0; i < loads.length; i++){
				var load = loads[i];
				var report = load['l:report'];
				var ts = new Date(load.time).getTime();
				maxValue = Math.max(maxValue,report.speakingTimes,report.speakingUsers,report.speakingGroups,report.lostAutoUsers,report.lostAutoGroups);

				speakLoadSeries[0].data.push([ts,report.speakingTimes]);
				speakLoadSeries[1].data.push([ts,report.speakingUsers]);
				speakLoadSeries[2].data.push([ts,report.speakingGroups]);
				speakLoadSeries[3].data.push([ts,report.lostAutoTimes]);
				speakLoadSeries[4].data.push([ts,report.lostAutoUsers]);
				speakLoadSeries[5].data.push([ts,report.lostAutoGroups]);
				if( report.lostAutoTimes > 0 ) {
					speakLoadSeries[6].data.push([ts,report.speakingSeconds / report.speakingTimes]);
				} else {
					speakLoadSeries[6].data.push([ts,0]);
				}
			}
			slflotopt.yaxis.max = 1000;
			while( slflotopt.yaxis.max < maxValue ) {
				slflotopt.yaxis.max += 500;
			}
			console.log('y:%d maxValue:%d',slflotopt.yaxis.max,maxValue);
			slplot = $.plot($('#speak-load'),speakLoadSeries,slflotopt);
		});
	}



});
