(window["webpackJsonpclubhouse-tracker-frontend"]=window["webpackJsonpclubhouse-tracker-frontend"]||[]).push([[0],{175:function(e,t,a){e.exports=a(329)},329:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(36),c=a.n(l),o=a(30),u=a.n(o),s=a(52),i=a(25),d=a(26),m=a(27),h=a(28),v=a(29),p=a(38),y=a.n(p),f=a(340),E=function(e){var t=e.cardData;return r.a.createElement(f.a.Row,null,r.a.createElement(f.a.Cell,null,t[0]),r.a.createElement(f.a.Cell,null,t[1]))},b=function(e){var t;return t=0===e.data.length?[["No changes yet","-"]]:e.data,r.a.createElement(f.a,{celled:!0,compact:!0,unstackable:!0,inverted:!0},r.a.createElement(f.a.Header,null,r.a.createElement(f.a.Row,null,r.a.createElement(f.a.HeaderCell,{rowSpan:3},e.headerText),r.a.createElement(f.a.HeaderCell,{rowSpan:1},"#"))),r.a.createElement(f.a.Body,null,t.map((function(e,t){return r.a.createElement(E,{key:t,cardData:e})}))))},g=a(54),k=a.n(g),C=a(342),w=a(339),S=a(343),j=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={isLoading:!1,term:"",autocomplete:[],results:[],inStockQty:null,soldQty:null,query:""},a.handleSearchChange=function(e,t){var n=t.value;if(a.setState({isLoading:!0,term:n}),a.state.term.length<1)return a.setState({isLoading:!1,term:"",results:[],inStockQty:null,soldQty:null,query:""});setTimeout((function(){var e=new RegExp(k.a.escapeRegExp(a.state.term),"i");a.setState({isLoading:!1,results:k.a.filter(a.state.autocomplete,(function(t){return e.test(t.title)}))})}),300)},a.handleResultSelect=function(){var e=Object(s.a)(u.a.mark((function e(t,n){var r,l,c,o,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.result,l=r.title,e.next=4,y.a.get("https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveCardDataFromDB");case 4:return c=e.sent,e.next=7,y.a.get("https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveHistoricChangeData");case 7:o=e.sent,s=c.data[l]?c.data[l]:0,i=o.data.inventory_out[l]?o.data.inventory_out[l]:0,a.setState({inStockQty:s,soldQty:i,query:l});case 11:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(s.a)(u.a.mark((function e(){var t,a,n,r,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.get("https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveCardDataFromDB");case 2:return t=e.sent,e.next=5,y.a.get("https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveHistoricChangeData");case 5:a=e.sent,n=Object.keys(t.data).concat(Object.keys(a.data.inventory_out)),r=k.a.uniq(n),l=r.map((function(e){return{title:e}})),this.setState({autocomplete:l});case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.results,n=e.inStockQty,l=e.soldQty,c=e.query;return 0===n&&(n="No"),0===l&&(l="None"),r.a.createElement(C.a,{stackable:!0},r.a.createElement(C.a.Row,{columns:1},r.a.createElement(C.a.Column,{width:16},r.a.createElement(w.a,{onSearchChange:k.a.debounce(this.handleSearchChange,500,{trailing:!0}),onResultSelect:this.handleResultSelect,loading:t,results:a}),n&&l&&r.a.createElement(S.a,{inverted:!0},r.a.createElement(S.a.Content,null,r.a.createElement("div",null,n," ",1===n?"copy":"copies"," of"," ",r.a.createElement("em",null,c)," in stock.",r.a.createElement("br",null),l," sold within the past 60 days."))))))}}]),t}(r.a.Component),O=a(337),x=a(338),D=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={inventory_in:[],inventory_out:[]},a}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(s.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.get("https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveChangeDataFromDB");case 2:t=e.sent,a=Object.entries(t.data.inventory_in),n=Object.entries(t.data.inventory_out),this.setState({inventory_in:a,inventory_out:n});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.inventory_in,t=this.state.inventory_out;return r.a.createElement(O.a,{style:{marginTop:"20px"}},r.a.createElement(S.a,{inverted:!0,as:"h1"},r.a.createElement(S.a.Content,null,r.a.createElement("em",null,'"Got a lot of good things on sale, stranger"'),r.a.createElement("i",{className:"ss ss-pmei ss-2x ss-uncommon"}),r.a.createElement(S.a.Subheader,null,"The Clubhouse's daily Magic: The Gathering singles intake and sales, at a glance"))),r.a.createElement(x.a,null),r.a.createElement(S.a,{inverted:!0,as:"h3"},r.a.createElement(S.a.Content,null,"Search for a card:")),r.a.createElement(j,null),r.a.createElement(x.a,null),r.a.createElement(S.a,{inverted:!0,as:"h3"},r.a.createElement(S.a.Content,null,"Yesterday's movement:")),r.a.createElement(C.a,{stackable:!0},r.a.createElement(C.a.Row,{columns:2},r.a.createElement(C.a.Column,null,r.a.createElement(b,{headerText:"Cards received",data:e})),r.a.createElement(C.a.Column,null,r.a.createElement(b,{headerText:"Cards sold",data:t})))))}}]),t}(r.a.Component);a(328);c.a.render(r.a.createElement(D,null),document.querySelector("#root"))}},[[175,1,2]]]);
//# sourceMappingURL=main.92ca35d1.chunk.js.map