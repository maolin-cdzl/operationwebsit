api = undefined;
current_cid = 0;
ulplot = undefined;
slplot = undefined;

userLoadSeries = [
	{ idx: 0,label: '在线用户',  data: [], lines: { show: true} },
	{ idx: 1,label: '上线用户',  data: [], lines: { show: true} },
	{ idx: 2,label: '登陆人次',  data: [], lines: { show: true} },
	{ idx: 3,label: '下线用户',  data: [], lines: { show: true} },
	{ idx: 4,label: '登出人次',  data: [], lines: { show: true} },
	{ idx: 5,label: '掉线用户',  data: [], lines: { show: true} },
	{ idx: 6,label: '掉线人次',  data: [], lines: { show: true} },
	{ idx: 7,label: '平均掉线时长(秒)',  data: [], lines: {show: true} }
];

speakLoadSeries = [
	{ idx: 0,label: '发言人次', data: [], lines: {show: true} },
	{ idx: 1,label: '发言用户', data: [], lines: {show: true} },
	{ idx: 2,label: '活跃群组', data: [], lines: {show: true} },
	{ idx: 3,label: '掉话人次', data: [], lines: {show: true} },
	{ idx: 4,label: '掉话用户', data: [], lines: {show: true} },
	{ idx: 5,label: '掉话群组', data: [], lines: {show: true} },
	{ idx: 6,label: '平均掉话时长(秒)', data: [] , lines: {show: true}},
];

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
			return '<a href="#" onClick="toggleSLPlot('+series.idx+'); return false;">'+label+'</a>';
        }
	}
};


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

function toggleULPlot(seriesIdx) {
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

function updateUserList() {
	$('#user-list').children().remove();
	api.companyUsers(current_cid,function(users,err){
		if( !users ) {
			return;
		}
		for(var i=0; i < users.length; i++) {
			$('#user-list').append('<a href="/runtime/user/detail/?uid=' + users[i] + '" class="list-group-item">' + users[i] + '</a>');
		}
	});
}

function updateGroupList() {
	$('#group-list').children().remove();
	api.companyGroups(current_cid,function(groups,err){
		if( !groups ) {
			return;
		}
		for(var i=0; i < groups.length; i++){
			$('#group-list').append('<a href="/runtime/group/detail/?gid=' + groups[i] + '" class="list-group-item">' + groups[i] + '</a>');
		}
	});
}

function updateSubsList() {
	$('#subs-list').children().remove();
	api.companySubs(current_cid,function(subs,err){
		if( !subs ) {
			return;
		}
		for(var i=0; i < subs.length; i++){
			$('#subs-list').append('<a href="/runtime/company/detail/?cid=' + subs[i] + '" class="list-group-item">' + subs[i] + '</a>');
		}
	});
}

function resetUserLoad() {
	for(var i=0; i < userLoadSeries.length; i++) {
		userLoadSeries[i].data = [];
	}
	ulplot = $.plot($('#user-load'),userLoadSeries,ulflotopt);
}

function updateUserLoad() {
	if( ! current_cid ) {
		return;
	}
	var start = $('#dp-start').data('DateTimePicker').date();
	var end = $('#dp-end').data('DateTimePicker').date();
	var options = {
		start: start.format('YYYY-MM-DD HH:mm:ss'),
		end: end.format('YYYY-MM-DD HH:mm:ss')
	};
	resetUserLoad();
	api.companyUserLoad(current_cid,options,function(loads){
		if( !loads ) {
			return;
		}
		console.log('recv user loads: %d',loads.length);

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
}

function resetSpeakLoad() {
	for(var i=0; i < speakLoadSeries.length; i++) {
		speakLoadSeries[i].data = [];
	}
	slplot = $.plot($('#speak-load'),speakLoadSeries,slflotopt);
}

function updateSpeakLoad() {
	if( ! current_cid ) {
		return;
	}
	var start = $('#dp-start').data('DateTimePicker').date();
	var end = $('#dp-end').data('DateTimePicker').date();
	var options = {
		start: start.format('YYYY-MM-DD HH:mm:ss'),
		end: end.format('YYYY-MM-DD HH:mm:ss')
	};
	resetSpeakLoad();

	api.companySpeakLoad(current_cid,options,function(loads){
		if( !loads ) {
			return;
		}
		console.log('recv speakloads: %d',loads.length);
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
		slplot = $.plot($('#speak-load'),speakLoadSeries,slflotopt);
	});
}

function initFromUrl() {
	var cid = api.getURLParameter('cid');
	if( cid ) {
		$('#cid-edit').val(cid);
		refresh();
	}
}

function refresh() {
	var cid = $('#cid-edit').val();
	if( !cid || cid == current_cid ) {
		return;
	}
	current_cid = cid;
	updateUserList();
	updateGroupList();
	updateSubsList();

	updateUserLoad();
	updateSpeakLoad();
}

$(document).ready(function(){
	api = $.eChatApi();
	setupDatePicker();
	resetUserLoad();
	resetSpeakLoad();
	$('#cid-btn').click(function(){
		refresh();
	});
	$('#cid-edit').keydown(function(e){
		if(e.keyCode == 13) {
			refresh();
		}
	});
	$('#refresh').click(function(){
		updateUserLoad();
		updateSpeakLoad();
	});
	
	initFromUrl();
})

