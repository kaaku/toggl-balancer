(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,t,a){e.exports=a(165)},158:function(e,t,a){},165:function(e,t,a){"use strict";a.r(t);var n=a(224),r=a(97),o=a(7),i=a.n(o),s=(a(121),a(89)),c=a(51),l=a(0),u=a.n(l),d=a(12),m=a.n(d),h=a(223);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=a(20),g=a(55),y=a(56),p=a(72),E=a(57),b=a(31),v=a(71),k=a(226),D=a(220),O=a(222),w=a(99),T=a(100),C=a(4),j=a(227),M=a(228),S=a(219),Y=a(214),B=a(215),R=a(213),x=a(218),P=a(216),W=a(225),A=function(e){function t(e){var a;return Object(g.a)(this,t),(a=Object(p.a)(this,Object(E.a)(t).call(this,e))).state={apiToken:e.oldApiToken,rememberMe:!0},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(b.a)(a)),a.handleCancel=a.handleCancel.bind(Object(b.a)(a)),a}return Object(v.a)(t,e),Object(y.a)(t,[{key:"handleChange",value:function(e){this.setState({apiToken:e.target.value})}},{key:"handleSubmit",value:function(){var e=this.props.onClose,t=this.state;e({apiToken:t.apiToken,rememberMe:t.rememberMe})}},{key:"handleCancel",value:function(){(0,this.props.onClose)({})}},{key:"render",value:function(){var e=this,t=this.props,a=t.open,n=t.mandatory,r=this.state,o=r.apiToken,i=r.rememberMe;return u.a.createElement(M.a,{open:a,disableBackdropClick:n,disableEscapeKeyDown:n,"aria-labelledby":"form-dialog-title"},u.a.createElement(R.a,{id:"form-dialog-title"},"Enter your Toggl API Token"),u.a.createElement(Y.a,null,u.a.createElement(B.a,null,"Your Toggl time entries will be fetched using your API Token, which you can find from your"," ",u.a.createElement("a",{href:"https://www.toggl.com/app/profile",target:"_blank",rel:"noopener noreferrer"},"Toggl profile ",u.a.createElement(P.a,{fontSize:"small"},"open_in_new"))),u.a.createElement(W.a,{type:"password",autoFocus:!0,fullWidth:!0,margin:"dense",label:"API Token",value:o,onChange:this.handleChange}),u.a.createElement(x.a,{control:u.a.createElement(j.a,{color:"primary",checked:i,onChange:function(t,a){return e.setState({rememberMe:a})}}),label:"Remember me"})),u.a.createElement(S.a,null,!n&&u.a.createElement(D.a,{color:"primary",onClick:this.handleCancel},"Cancel"),u.a.createElement(D.a,{variant:"contained",color:"primary",onClick:this.handleSubmit,disabled:!o},"Submit")))}}]),t}(l.Component);A.defaultProps={oldApiToken:"",open:!0,mandatory:!1};var N=Object(C.a)({},{withTheme:!0})(A),I=a(84),z=function(e){var t=e.duration,a=e.useColors,n=e.textProps,r=0===t?"":t>0?"+":"-",o=i.a.duration(Math.abs(t),"seconds"),s="".concat(Math.floor(o.asHours()),":").concat(o.minutes().toString().padStart(2,"0"));return a&&(n.color=t<0?"error":"primary"),u.a.createElement(I.a,n,r,s)};z.defaultProps={useColors:!1,textProps:{}};var _=Object(C.a)({},{withTheme:!0})(z),q=a(83),F=a.n(q),J=a(166),L=a(221),H=a(230),U=a(74),V=function(e){var t=e.size,a=e.visible,n=e.classes;return a?u.a.createElement(H.a,{title:"You have a running time entry",placement:"top"},u.a.createElement(P.a,{fontSize:t,className:n.root},"fiber_manual_record")):null};V.defaultProps={size:"default",visible:!0};var G=Object(C.a)(function(e){return{root:{color:U.a[500],marginLeft:e.spacing(2),verticalAlign:"top",animation:"blinker 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite"}}},{withTheme:!0})(V),K=u.a.createContext({timeEntriesByDate:{},workdayOverrides:{},toggleWorkday:function(){}}),$=a(98),Q=i.a.duration("7:30").asSeconds();var X={fetchTimeEntries:function(e,t,a,n){if(!e&&!t)throw Error("Either start date or end date is required");if(!a)throw Error("API token is required");var r=e?i()(e).startOf("day"):null,o=t?i()(t).add(1,"day").startOf("day"):null;if(r&&!r.isValid()||o&&!o.isValid())throw Error("Start date and/or end date were invalid");var s=new URL("https://www.toggl.com/api/v8/time_entries"),c={};return r&&(c.start_date=r.toISOString()),o&&(c.end_date=o.toISOString()),s.search=new URLSearchParams(c),fetch(s,{method:"GET",headers:new Headers({Authorization:"Basic ".concat(btoa("".concat(a,":api_token"))),"Content-Type":"application/json"})}).catch(function(){throw Error("Failed to fetch time entries, check your internet connection")}).then(function(e){if(e.ok)return e.json();if(403===e.status)throw Error("Toggl authentication failed, maybe the API token is incorrect?");throw Error("Toggl responded with an unknown error (HTTP ".concat(e.status,")"))}).then(function(e){return function(e,t,a,n){for(var r=a.map(function(e){return Object.assign(e,{start:i()(e.start),end:i()(e.end),duration:e.duration<0?i()().unix()+e.duration:e.duration,isRunning:e.duration<0})}).sort(function(e,t){return e.start.diff(t.start)}).reduce(function(e,t){var a=i()(t.start).format("YYYY-MM-DD"),r=e[a]||{timeEntries:[],duration:X.isWorkday(a,n,!0)?-Q:0,hasRunningEntry:!1};return r.timeEntries.push(t),r.duration+=t.duration,r.hasRunningEntry=r.hasRunningEntry||t.isRunning,Object.assign(e,Object(f.a)({},a,r))},{}),o=e;o.isBefore(t,"day");){var s=o.format("YYYY-MM-DD");r.hasOwnProperty(s)||(r[s]={timeEntries:[],duration:X.isWorkday(s,n,!1)?-Q:null,hasRunningEntry:!1}),o=o.add(1,"day")}return r}(r,o,e,n)})},refreshDurations:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={};return Object.entries(t).forEach(function(t){var r=Object($.a)(t,2),o=r[0],i=r[1],s=i.timeEntries.length>0,c=e.isWorkday(o,a,s),l=null;(s||c)&&(l=i.timeEntries.map(function(e){return e.duration}).reduce(function(e,t){return e+t},0)+(c?-Q:0));n[o]=Object.assign({},i,{duration:l})}),n},isWorkday:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return t.hasOwnProperty(e)?t[e]:![6,7].includes(i()(e).isoWeekday())&&a}},Z=function(e){var t=e.date,a=e.duration,n=e.hasRunningEntry,r=e.disabled,o=e.classes,s=i()().isSame(t,"day"),c=Number.isSafeInteger(a);return u.a.createElement(K.Consumer,null,function(e){var l=e.workdayOverrides,d=e.toggleWorkday;return u.a.createElement(J.a,{className:F()(o.calendarCell,Object(f.a)({},o.disabled,r))},u.a.createElement(I.a,{variant:"overline",inline:!0,gutterBottom:!0,className:F()(o.dayOfMonth,Object(f.a)({},o.today,s))},i()(t).format("DD")),u.a.createElement(G,{size:"small",visible:n}),!r&&u.a.createElement(L.a,{checked:X.isWorkday(t,l,c),onChange:function(){return d(t)},color:"primary"}),c&&u.a.createElement(_,{duration:a,useColors:!0,textProps:{variant:"h6",align:"center"}}),!r&&!c&&u.a.createElement(I.a,{variant:"h6",color:"textSecondary",align:"center"},"-"))})};Z.defaultProps={duration:null,hasRunningEntry:!1,disabled:!1};var ee=Object(C.a)(function(e){return{calendarCell:{padding:10,height:"100%"},disabled:{backgroundColor:e.palette.action.disabledBackground},dayOfMonth:{padding:3},today:{borderRadius:"50%",backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText,fontWeight:e.typography.fontWeightMedium}}},{withTheme:!0})(Z);var te=Object(C.a)({},{withTheme:!0})(function(e){for(var t=e.year,a=e.month,n=e.timeEntriesByDate,r=i()({year:t,month:a-1,day:1}),o=i()(r).startOf("week"),s=i()(r).endOf("month").startOf("day"),c=i()(s).endOf("week").startOf("day"),l=[],d=[],m=Math.round(i.a.duration(c.diff(o)).asDays())+1;l.length<m;)l.push(i()(o).add(l.length,"days").format("YYYY-MM-DD"));for(;l.length>0;)d.push(l.splice(0,7));var h=function(e,t,a){for(var n={},r=i()(t);r.isSameOrBefore(a,"day");){var o=r.format("YYYY-MM-DD");n[o]=Object.assign({duration:null,hasRunningEntry:!1},e[o]),r=r.add(1,"day")}return n}(n,o,c);return u.a.createElement(u.a.Fragment,null,d.map(function(e){return u.a.createElement(O.a,{container:!0,spacing:2,key:i()(e[0]).week()},e.map(function(e){return u.a.createElement(O.a,{item:!0,xs:!0,key:e},u.a.createElement(ee,{date:e,duration:h[e].duration,hasRunningEntry:h[e].hasRunningEntry,disabled:!r.isSame(e,"month")}))}))}))});function ae(e,t){return Object.keys(e).filter(function(e){return i()(e).month()===t}).reduce(function(t,a){return Object.assign(t,Object(f.a)({},a,e[a]))},{})}var ne=Object(C.a)({},{withTheme:!0})(function(e){var t=e.startDate,a=e.endDate,n=e.timeEntriesByDate,r=e.classes;if(t.isAfter(a))return null;var o=function(e,t,a){for(var n=[],r=i()(e).startOf("month");r.isSameOrBefore(t,"day");){var o=ae(a,r.month());n.push({firstDayOfMonth:r,totalDiff:Object.values(o).reduce(function(e,t){return e+t.duration},0)}),r=i()(r).add(1,"month")}return n}(t,a,n);return u.a.createElement(O.a,{container:!0,justify:"center",spacing:5,className:r.root},o.map(function(e){var t=e.firstDayOfMonth,a=e.totalDiff;return u.a.createElement(O.a,{item:!0,xs:12,lg:6,key:t.format("YYYY-MM")},u.a.createElement(O.a,{container:!0,justify:"space-between"},u.a.createElement(O.a,{item:!0},u.a.createElement(I.a,{variant:"h2",gutterBottom:!0},t.format("MMMM YYYY"))),u.a.createElement(O.a,{item:!0},u.a.createElement(_,{duration:a,useColors:!0,textProps:{variant:"h2",gutterBottom:!0}}))),u.a.createElement(te,{year:t.year(),month:t.month()+1,timeEntriesByDate:ae(n,t.month())}))}))}),re=[{title:"Last month",getDateRange:function(){return{startDate:i()().subtract(1,"month").startOf("month"),endDate:i()().startOf("month").subtract(1,"day")}}},{title:"This month",getDateRange:function(){return{startDate:i()().startOf("month"),endDate:i()().endOf("month").startOf("day")}},default:!0},{title:"This year",getDateRange:function(){return{startDate:i()().startOf("year"),endDate:i()().endOf("month").startOf("day")}}}],oe=Object(C.a)(function(e){return{root:{padding:e.spacing(5)},quickSelections:{marginTop:e.spacing(2)}}},{withTheme:!0})(function(e){var t=e.startDate,a=e.endDate,n=e.onChange,r=e.classes,o=i()().year();return u.a.createElement(J.a,{className:r.root},u.a.createElement(O.a,{container:!0,justify:"space-evenly",spacing:5},u.a.createElement(O.a,{item:!0},u.a.createElement(c.a,{label:"From",format:t&&t.year()!==o?"MMMM Do, YYYY":"MMMM Do",value:t,maxDate:a,autoOk:!0,showTodayButton:!0,onChange:function(e){return n({startDate:e,endDate:a})}})),u.a.createElement(O.a,{item:!0},u.a.createElement(c.a,{label:"To",format:a&&a.year()!==o?"MMMM Do, YYYY":"MMMM Do",value:a,minDate:t,autoOk:!0,showTodayButton:!0,onChange:function(e){return n({startDate:t,endDate:e})}}))),u.a.createElement(O.a,{container:!0,justify:"space-evenly",spacing:5,className:r.quickSelections},re.map(function(e){return u.a.createElement(O.a,{item:!0,key:e.title},u.a.createElement(D.a,{onClick:function(){return n(e.getDateRange())},size:"small"},e.title))})))}),ie=re.find(function(e){return e.default}).getDateRange(),se=(a(158),function(e){function t(e){var a;Object(g.a)(this,t),a=Object(p.a)(this,Object(E.a)(t).call(this,e));var n=localStorage,r=n.apiToken,o=n.startDate,s=n.endDate,c=n.workdayOverrides,l={};try{c&&(l=JSON.parse(c))}catch(d){console.warn("Couldn't parse workday overrides from localStorage: ".concat(c)),l={}}var u=o&&s?{startDate:i()(o),endDate:i()(s)}:ie;return a.handleDialogClose=a.handleDialogClose.bind(Object(b.a)(a)),a.handleDateRangeChange=a.handleDateRangeChange.bind(Object(b.a)(a)),a.toggleWorkday=a.toggleWorkday.bind(Object(b.a)(a)),a.state={apiToken:r,showApiTokenDialog:!r,startDate:u.startDate,endDate:u.endDate,timeEntryContext:{timeEntriesByDate:{},workdayOverrides:l,toggleWorkday:a.toggleWorkday}},a}return Object(v.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){this.state.apiToken&&this.updateTimeEntries()}},{key:"componentDidUpdate",value:function(e,t){var a=this.state,n=a.startDate,r=a.endDate,o=a.apiToken;t.startDate===n&&t.endDate===r&&t.apiToken===o||this.updateTimeEntries()}},{key:"toggleWorkday",value:function(e){var t=this.state,a=t.timeEntryContext,n=t.timeEntryContext,r=n.workdayOverrides,o=n.timeEntriesByDate,i=X.isWorkday(e,r,o[e].timeEntries.length>0),s=Object.assign({},r,Object(f.a)({},e,!i)),c=X.refreshDurations(o,s);localStorage.setItem("workdayOverrides",JSON.stringify(s)),this.setState({timeEntryContext:Object.assign({},a,{timeEntriesByDate:c,workdayOverrides:s})})}},{key:"updateTimeEntries",value:function(){var e=this,t=this.state,a=t.startDate,n=t.endDate,r=t.apiToken,o=t.timeEntryContext;try{X.fetchTimeEntries(a,n,r,o.workdayOverrides).then(function(t){return e.setState({timeEntryContext:Object.assign({},o,{timeEntriesByDate:t}),error:void 0})},function(t){return e.setState({timeEntryContext:Object.assign({},o,{timeEntriesByDate:{}}),error:t.message})})}catch(s){var i=s.message;this.setState({error:i})}}},{key:"handleDialogClose",value:function(e){var t=e.apiToken,a=e.rememberMe,n={showApiTokenDialog:!1};t&&(a?localStorage.setItem("apiToken",t):localStorage.removeItem("apiToken"),Object.assign(n,{apiToken:t})),this.setState(n)}},{key:"handleDateRangeChange",value:function(e){Object.keys(e).forEach(function(t){return localStorage.setItem(t,e[t].format("YYYY-MM-DD"))}),this.setState(e)}},{key:"render",value:function(){var e=this,t=this.state,a=t.startDate,n=t.endDate,r=t.apiToken,o=t.showApiTokenDialog,i=t.timeEntryContext,s=t.timeEntryContext.timeEntriesByDate,c=t.error,l=this.props.classes;if(!r)return u.a.createElement(N,{mandatory:!0,onClose:this.handleDialogClose});var d=Object.values(s).reduce(function(e,t){return e+t.duration},0),m=Object.values(s).some(function(e){return e.hasRunningEntry});return u.a.createElement(k.a,{className:l.root},u.a.createElement(N,{open:o,mandatory:!1,oldApiToken:r,onClose:this.handleDialogClose}),u.a.createElement(D.a,{className:l.changeApiToken,color:"primary",onClick:function(){return e.setState({showApiTokenDialog:!0})}},"Change API Token"),u.a.createElement(O.a,{container:!0,justify:"center",className:l.dateSelectorContainer},u.a.createElement(O.a,{item:!0},u.a.createElement(oe,{startDate:a,endDate:n,onChange:this.handleDateRangeChange})),!a.isSame(n,"month")&&u.a.createElement(O.a,{item:!0,xs:12},u.a.createElement(T.a,{variant:"h2",align:"center",className:l.totalTimeDiff},"Total: ",u.a.createElement(_,{duration:d,useColors:!0,textProps:{variant:"inherit",inline:!0}}),u.a.createElement(G,{size:"large",visible:m}))),c&&u.a.createElement(O.a,{item:!0},u.a.createElement(w.a,{className:l.errorNotification,message:c}))),Object.keys(s).length>0&&u.a.createElement(K.Provider,{value:i},u.a.createElement(ne,{startDate:a,endDate:n,timeEntriesByDate:s})))}}]),t}(l.Component)),ce=Object(C.a)(function(e){return{root:{padding:e.spacing(4)},changeApiToken:{position:"absolute",top:e.spacing(2),right:e.spacing(2)},dateSelectorContainer:{marginTop:e.spacing(5),marginBottom:e.spacing(10)},totalTimeDiff:{marginTop:e.spacing(3)},errorNotification:{marginTop:e.spacing(3),backgroundColor:e.palette.error.main}}},{withTheme:!0})(se);i.a.locale("en-gb");var le=Object(r.a)();m.a.render(u.a.createElement(h.a,{theme:le},u.a.createElement(n.a,null),u.a.createElement(c.b,{utils:s.a},u.a.createElement(ce,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[119,1,2]]]);
//# sourceMappingURL=main.f714957d.chunk.js.map