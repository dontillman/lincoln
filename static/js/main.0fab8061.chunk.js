(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(7),i=n.n(r),s=(n(15),n(8)),l=n(1),u=n(2),d=n(4),c=n(3),m=n(5);n(16);function f(e){return e.reduce(function(e,t){return e+Number.parseFloat(t.donation_amount)},0)}window.emailjs.init("user_1i9AHzUNyq8113pVz7gP0");var p=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(d.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).prettyKey=function(e){var t=e.split("_")[1];return 2<t.length?t.charAt(0).toUpperCase()+t.slice(1):t.toUpperCase()},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.keys,n=t.map(function(t,n){return o.a.createElement("th",{key:n},e.prettyKey(t))}),a=this.props.donations.filter(function(t){return!e.props.anonymousFilter||t.donor_name}).map(function(e,n){return o.a.createElement("tr",{key:n},t.map(function(t,n){return o.a.createElement("td",{key:n},e[t])}))});return o.a.createElement("div",{className:"donationTable"},this.props.donations.length?o.a.createElement("table",null,o.a.createElement("thead",null,o.a.createElement("tr",null,n)),o.a.createElement("tbody",null,a)):o.a.createElement("p",{className:"none"},"No donations loaded.",o.a.createElement("br",null),"Drag a CSV file here to add in donation data."))}}]),t}(a.Component),h=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(c.a)(t).call(this,e))).dropHandler=function(e){if(e.preventDefault(),e.dataTransfer.items)for(var t=e.dataTransfer.items,a=0;a<t.length;a++){var o=t[a];"file"===o.kind&&n.addFile(o.getAsFile())}else e.dataTransfer.file.forEach(n.addFile)},n.state={donationKeys:[],donations:[],anonymousFilter:!1,addCount:0,addresses:""},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"addFile",value:function(e){var t=this,n=new FileReader;n.onload=function(e){var n=function(e){var t=e.split("\n").map(function(e){return e.trim()}).filter(function(e){return e}),n=t.shift().split(","),a=t.map(function(e){var t={};return e.split(",").map(function(e,a){return t[n[a]]=e.trim()}),t});return[n,a]}(e.target.result),a=Object(s.a)(n,2),o=a[0],r=a[1],i=t.state;t.setState({donationKeys:i.donationKeys&&o,donations:i.donations.concat(r),addCount:i.addCount+1}),t.noteNewDonations(r)},n.readAsText(e)}},{key:"noteNewDonations",value:function(e){var t=e.filter(function(e){return!e.donor_name}),n=f(e),a=Math.round(100*t.length/e.length),o=Math.round(100*f(t)/n),r="Add #"+this.state.addCount+": "+e.length+" donations added: value $ "+n.toFixed(2)+", "+a+"% are anonymous, "+o+"% anonymous by value.";this.setState({note:r});var i=this.state.addresses.trim();i&&window.emailjs.send("default_service","default",{subject:"Lincoln Donation Tool Alert",content:r,to_addresses:i})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App",onDragOver:function(e){return e.preventDefault()}},o.a.createElement("p",null,"Table of donations."),o.a.createElement("div",{onDrop:this.dropHandler},o.a.createElement(p,{keys:this.state.donationKeys,donations:this.state.donations,anonymousFilter:this.state.anonymousFilter}),o.a.createElement("p",null,"Total donation amount: $",f(this.state.donations).toFixed(2)),o.a.createElement("p",null,o.a.createElement("button",{onClick:function(t){return e.setState({anonymousFilter:!e.state.anonymousFilter})},className:this.state.anonymousFilter?"on":""},"Filter")," out anonymouse donations."),o.a.createElement("p",null,this.state.note),o.a.createElement("p",null,"Email addresses for alerts (comma delimitted):",o.a.createElement("input",{className:"addresses",value:this.state.addresses,onChange:function(t){return e.setState({addresses:t.target.value})}}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.0fab8061.chunk.js.map