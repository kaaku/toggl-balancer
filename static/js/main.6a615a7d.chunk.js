(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{168:function(e,t,a){e.exports=a(378)},375:function(e,t,a){},378:function(e,t,a){"use strict";a.r(t);var n=a(63);Object(n.b)();var r=a(161),i=a.n(r),o=a(17),s=a(150),c=a(56),l=a(0),u=a.n(l),m=a(21),d=a.n(m);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var h=a(44),f=a(45),g=a(47),p=a(46),b=a(48),y=a(28),E=a(18),D=a.n(E),O=a(9),v=a.n(O),k=a(162),j=a(29),w=a.n(j),T=a(154),C=a.n(T),M=a(66),S=a.n(M),Y=a(70),R=a.n(Y),B=a(67),x=a.n(B),P=a(152),I=a.n(P),_=a(151),z=a.n(_),N=a(153),A=a.n(N),V=a(68),q=a.n(V),F=a(69),L=a.n(F),U=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(p.a)(t).call(this,e))).state={apiToken:"",rememberMe:!0},a.handleChange=a.handleChange.bind(Object(y.a)(Object(y.a)(a))),a.handleClose=a.handleClose.bind(Object(y.a)(Object(y.a)(a))),a}return Object(b.a)(t,e),Object(f.a)(t,[{key:"handleChange",value:function(e){this.setState({apiToken:e.target.value})}},{key:"handleClose",value:function(){var e=this.props.onClose,t=this.state;e(t.apiToken,t.rememberMe)}},{key:"render",value:function(){var e=this,t=this.props,a=t.open,n=t.mandatory,r=this.state,i=r.apiToken,o=r.rememberMe;return u.a.createElement(S.a,{open:a,disableBackdropClick:n,disableEscapeKeyDown:n,"aria-labelledby":"form-dialog-title"},u.a.createElement(z.a,{id:"form-dialog-title"},"Enter your Toggl API Token"),u.a.createElement(x.a,null,u.a.createElement(I.a,null,"Your Toggl time entries will be fetched using your API Token, which you can find from your"," ",u.a.createElement("a",{href:"https://www.toggl.com/app/profile",target:"_blank",rel:"noopener noreferrer"},"Toggl profile ",u.a.createElement(q.a,{fontSize:"small"},"open_in_new"))),u.a.createElement(L.a,{autoFocus:!0,fullWidth:!0,margin:"dense",label:"API Token",onChange:this.handleChange}),u.a.createElement(A.a,{control:u.a.createElement(C.a,{color:"primary",checked:o,onChange:function(t,a){return e.setState({rememberMe:a})}}),label:"Remember me"})),u.a.createElement(R.a,null,u.a.createElement(w.a,{color:"primary",onClick:this.handleClose,disabled:!n||!i},"Submit")))}}]),t}(l.Component);U.defaultProps={mandatory:!1};var W=Object(o.withStyles)({},{withTheme:!0})(U),H=a(163),J=a(16),G=a(19),K=a.n(G),$=function(e){var t=e.duration,a=e.useColors,n=e.textProps,r=0===t?"":t>0?"+":"-",i=v.a.duration(Math.abs(t),"seconds"),o="".concat(Math.floor(i.asHours()),":").concat(i.minutes().toString().padStart(2,"0"));return a&&(n.color=t<0?"error":"primary"),u.a.createElement(K.a,n,r,o)};$.defaultProps={useColors:!1,textProps:{}};var Q=Object(o.withStyles)({},{withTheme:!0})($),X=a(7),Z=a.n(X),ee=a(34),te=a.n(ee),ae=Object(o.withStyles)(function(e){return{calendarCell:{padding:10,height:"100%"},disabled:{backgroundColor:e.palette.grey[200]}}},{withTheme:!0})(function(e){for(var t=e.year,a=e.month,n=e.data,r=e.defaultContent,i=e.classes,o=v()({year:t,month:a-1,day:1}),s=v()(o).startOf("week"),c=v()(o).endOf("month").startOf("day"),l=v()(c).endOf("week").startOf("day"),m=[],d=[],h=Math.round(v.a.duration(l.diff(s)).asDays())+1;m.length<h;)m.push(v()(s).add(m.length,"days").format("YYYY-MM-DD"));for(;m.length>0;)d.push(m.splice(0,7));return u.a.createElement(u.a.Fragment,null,d.map(function(e){return u.a.createElement(D.a,{container:!0,spacing:16,key:v()(e[0]).week()},e.map(function(e){return u.a.createElement(D.a,{item:!0,xs:!0,key:e},u.a.createElement(te.a,{className:Z()(i.calendarCell,Object(J.a)({},i.disabled,v()(e).month()+1!==a))},u.a.createElement(K.a,{variant:"overline",gutterBottom:!0},v()(e).format("DD")),n[e]&&n[e],!n[e]&&v()(e).month()+1===a&&r))}))}))});function ne(e,t){return Object.keys(e).filter(function(e){return v()(e).month()===t}).reduce(function(t,a){return Object.assign(t,Object(J.a)({},a,e[a]))},{})}function re(e){return Object.assign.apply(Object,[{}].concat(Object(H.a)(Object.keys(e).map(function(t){return Object(J.a)({},t,(a=e[t],u.a.createElement(Q,{duration:a.duration,useColors:!0,textProps:{variant:"h6",align:"center"}})));var a}))))}var ie=Object(o.withStyles)(function(e){return{root:{padding:10*e.spacing.unit}}},{withTheme:!0})(function(e){var t=e.startDate,a=e.endDate,n=e.timeEntriesByDate,r=e.classes;if(!t.isAfter(a)){for(var i=[],o=v()(t).startOf("month");o.isBefore(a);){var s=ne(n,o.month());i.push({firstDayOfMonth:o,totalDiff:Object.values(s).reduce(function(e,t){return e+t.duration},0),monthViewData:re(s)}),o=v()(o).add(1,"month")}return u.a.createElement(D.a,{container:!0,justify:"center",spacing:40,className:r.root},i.map(function(e){var t=e.firstDayOfMonth,a=e.totalDiff,n=e.monthViewData;return u.a.createElement(D.a,{item:!0,xs:12,lg:6,key:t.format("YYYY-MM")},u.a.createElement(D.a,{container:!0,justify:"space-between"},u.a.createElement(D.a,{item:!0},u.a.createElement(K.a,{variant:"h2",gutterBottom:!0},t.format("MMMM YYYY"))),u.a.createElement(D.a,{item:!0},u.a.createElement(Q,{duration:a,useColors:!0,textProps:{variant:"h2",gutterBottom:!0}}))),u.a.createElement(ae,{year:t.year(),month:t.month()+1,data:n,defaultContent:u.a.createElement(K.a,{variant:"h6",color:"textSecondary",align:"center"},"-")}))}))}}),oe=[{title:"Last month",getDateRange:function(){return{startDate:v()().subtract(1,"month").startOf("month"),endDate:v()().startOf("month").subtract(1,"day")}}},{title:"This month",getDateRange:function(){return{startDate:v()().startOf("month"),endDate:v()().endOf("month").startOf("day")}},default:!0},{title:"This year",getDateRange:function(){return{startDate:v()().startOf("year"),endDate:v()().endOf("month").startOf("day")}}}],se=Object(o.withStyles)(function(e){return{root:{padding:5*e.spacing.unit},quickSelections:{marginTop:2*e.spacing.unit}}},{withTheme:!0})(function(e){var t=e.startDate,a=e.endDate,n=e.onChange,r=e.classes,i=v()().year();return u.a.createElement(te.a,{className:r.root},u.a.createElement(D.a,{container:!0,justify:"space-evenly",spacing:40},u.a.createElement(D.a,{item:!0},u.a.createElement(c.a,{label:"From",format:t&&t.year()!==i?"MMMM Do, YYYY":"MMMM Do",value:t,maxDate:a,autoOk:!0,showTodayButton:!0,onChange:function(e){return n({startDate:e,endDate:a})}})),u.a.createElement(D.a,{item:!0},u.a.createElement(c.a,{label:"To",format:a&&a.year()!==i?"MMMM Do, YYYY":"MMMM Do",value:a,minDate:t,autoOk:!0,showTodayButton:!0,onChange:function(e){return n({startDate:t,endDate:e})}}))),u.a.createElement(D.a,{container:!0,justify:"space-evenly",spacing:40,className:r.quickSelections},oe.map(function(e){return u.a.createElement(D.a,{item:!0,key:e.title},u.a.createElement(w.a,{onClick:function(){return n(e.getDateRange())},size:"small"},e.title))})))}),ce=oe.find(function(e){return e.default}).getDateRange(),le=v.a.duration("7:30").asSeconds();function ue(e){return e.map(function(e){return Object.assign(e,{start:v()(e.start),end:v()(e.end),duration:e.duration<0?v()().unix()+e.duration:e.duration,isRunning:e.duration<0})}).sort(function(e,t){return e.start.diff(t.start)}).reduce(function(e,t){var a=v()(t.start).format("YYYY-MM-DD"),n=e[a]||{timeEntries:[],duration:-le,hasRunningEntry:!1};return n.timeEntries.push(t),n.duration+=t.duration,n.hasRunningEntry=n.hasRunningEntry||t.isRunning,Object.assign(e,Object(J.a)({},a,n))},{})}var me=function(e,t,a){if(!e&&!t)throw Error("Either start date or end date is required");if(!a)throw Error("API token is required");var n=e?v()(e).startOf("day"):null,r=t?v()(t).add(1,"day").startOf("day"):null;if(n&&!n.isValid()||r&&!r.isValid())throw Error("Start date and/or end date were invalid");var i=new URL("https://www.toggl.com/api/v8/time_entries"),o={};return n&&(o.start_date=n.toISOString()),r&&(o.end_date=r.toISOString()),i.search=new URLSearchParams(o),fetch(i,{method:"GET",headers:new Headers({Authorization:"Basic ".concat(btoa("".concat(a,":api_token"))),"Content-Type":"application/json"})}).then(function(e){return e.json()}).then(ue)},de=a(160),he=a.n(de),fe=a(159),ge=function(e){var t=e.size,a=e.visible,n=e.classes;return a?u.a.createElement(he.a,{title:"You have a running time entry",placement:"top"},u.a.createElement(q.a,{fontSize:t,className:n.root},"fiber_manual_record")):null};ge.defaultProps={size:"default",visible:!0};var pe=Object(o.withStyles)(function(e){return{root:{color:fe.red[500],marginLeft:2*e.spacing.unit,verticalAlign:"top",animation:"blinker 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite"}}},{withTheme:!0})(ge),be=(a(375),function(e){function t(e){var a;Object(h.a)(this,t),a=Object(g.a)(this,Object(p.a)(t).call(this,e));var n=localStorage,r=n.apiToken,i=n.startDate,o=n.endDate,s=i&&o?{startDate:v()(i),endDate:v()(o)}:ce;return a.state=Object.assign({apiToken:r,timeEntriesByDate:{}},s),a.handleDialogClose=a.handleDialogClose.bind(Object(y.a)(Object(y.a)(a))),a.handleDateRangeChange=a.handleDateRangeChange.bind(Object(y.a)(Object(y.a)(a))),a}return Object(b.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.state.apiToken&&this.updateTimeEntries()}},{key:"componentDidUpdate",value:function(e,t){var a=this.state,n=a.startDate,r=a.endDate,i=a.apiToken;t.startDate===n&&t.endDate===r&&t.apiToken===i||this.updateTimeEntries()}},{key:"updateTimeEntries",value:function(){var e=this,t=this.state,a=t.startDate,n=t.endDate,r=t.apiToken;me(a,n,r).then(function(t){return e.setState({timeEntriesByDate:t})},function(t){return e.setState({error:t.toString()})})}},{key:"handleDialogClose",value:function(e,t){t&&localStorage.setItem("apiToken",e),this.setState({apiToken:e})}},{key:"handleDateRangeChange",value:function(e){Object.keys(e).forEach(function(t){return localStorage.setItem(t,e[t].format("YYYY-MM-DD"))}),this.setState(e)}},{key:"render",value:function(){var e=this.state,t=e.startDate,a=e.endDate,n=e.apiToken,r=e.timeEntriesByDate,i=e.error,o=this.props.classes;if(!n)return u.a.createElement(W,{open:!n,mandatory:!n,onClose:this.handleDialogClose});var s=Object.values(r).reduce(function(e,t){return e+t.duration},0),c=Object.values(r).some(function(e){return e.hasRunningEntry});return u.a.createElement(u.a.Fragment,null,u.a.createElement(D.a,{container:!0,justify:"center",className:o.dateSelectorContainer},u.a.createElement(D.a,{item:!0},u.a.createElement(se,{startDate:t,endDate:a,onChange:this.handleDateRangeChange})),!t.isSame(a,"month")&&u.a.createElement(D.a,{item:!0,xs:12},u.a.createElement(k.a,{variant:"h2",align:"center",className:o.totalTimeDiff},"Total: ",u.a.createElement(Q,{duration:s,useColors:!0,textProps:{variant:"inherit",inline:!0}}),u.a.createElement(pe,{size:"large",visible:c})))),Object.keys(r).length>0&&u.a.createElement(ie,{startDate:t,endDate:a,timeEntriesByDate:r}),i&&u.a.createElement("div",null,i))}}]),t}(l.Component)),ye=Object(o.withStyles)(function(e){return{dateSelectorContainer:{marginTop:5*e.spacing.unit},totalTimeDiff:{marginTop:3*e.spacing.unit}}},{withTheme:!0})(be),Ee=Object(o.createMuiTheme)({typography:{useNextVariants:!0}});d.a.render(u.a.createElement(n.a,{theme:Ee},u.a.createElement(i.a,null),u.a.createElement(c.b,{utils:s.a},u.a.createElement(ye,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[168,2,1]]]);
//# sourceMappingURL=main.6a615a7d.chunk.js.map