(function(){"use strict";var e={6913:function(e,r,t){var o=t(6369),a=function(){var e=this,r=e._self._c;e._self._setupProxy;return r("div",{attrs:{id:"app"}},[r("BattleMap")],1)},n=[],i=function(){var e=this,r=e._self._c;e._self._setupProxy;return r("b-container",{staticClass:"battle-map",attrs:{fluid:""}},[r("b-row",{staticClass:"fullHeight"},[r("b-col",{staticClass:"fullHeight",staticStyle:{"padding-left":"0","padding-right":"1px"}},[r("svg",{ref:"map",staticClass:"battle-map-svg",attrs:{width:"100%",height:"100%",viewBox:"0 0 1000 1000"},on:{mousemove:e.onMousemove}},e._l(e.markers,(function(t,o){return r("EntityMarker",{key:`${t.name}-${o}`,attrs:{marker:t,screenCTM:e.screenCTM,mouseLocation:e.currentLocation},on:{markerMoved:e.markerMoved,removeMarker:e.removeMarker}})})),1)]),r("b-col",{staticClass:"fullHeight d-none d-lg-block",attrs:{lg:"3"}},[r("MarkerBuilder",{on:{createMarker:e.addMarker}})],1)],1)],1)},s=[];t(7658);class l{constructor(){Object.defineProperty(this,"markers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.markers=[]}getMarkers(){return this.markers}addMarker(e){this.markers.push(e)}removeMarker(e){this.markers=this.markers.filter((r=>r.id!==e))}}var c=t(3029);class u{constructor(e,r,t,o,a,n,i){Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"color",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"fontColor",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"x",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"y",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"radius",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.id=null!==i&&void 0!==i?i:(0,c.Z)(),this.name=e,this.color=r,this.fontColor=t,this.x=o,this.y=a,this.radius=n}setName(e){this.name=e}setColor(e){this.color=e}moveMarkerTo(e,r){this.x=e,this.y=r}moveMarkerToSmooth(e,r){const t=e-this.x,o=r-this.y,a=t/100,n=o/100;let i=0;const s=setInterval((()=>{100===i?clearInterval(s):(this.x+=a,this.y+=n,i+=1)}),1)}toString(){return JSON.stringify({id:this.id,name:this.name,color:this.color,fontColor:this.fontColor,x:this.x,y:this.y,radius:this.radius})}}var m=function(){var e=this,r=e._self._c;e._self._setupProxy;return r("g",{ref:"marker",staticClass:"entity-marker",style:e.markerStyles,on:{mousedown:e.pickUp,mousemove:e.move,mouseup:e.putDown,contextmenu:function(r){return e.remove.apply(null,arguments)}}},[r("circle",{staticClass:"border-circle",attrs:{fill:"black",cx:e.marker.x,cy:e.marker.y,r:e.marker.radius+2}}),r("circle",{attrs:{fill:e.marker.color,cx:e.marker.x,cy:e.marker.y,r:e.marker.radius}}),r("text",{staticClass:"marker-name",style:"font-size: "+e.marker.radius/2,attrs:{x:e.marker.x,y:e.marker.y,fill:e.marker.fontColor,"text-anchor":"middle",dy:".3em"}},[e._v(" "+e._s(e.marker.name)+" ")])])},f=[],d=function(e,r,t,o){function a(e){return e instanceof t?e:new t((function(r){r(e)}))}return new(t||(t=Promise))((function(t,n){function i(e){try{l(o.next(e))}catch(r){n(r)}}function s(e){try{l(o["throw"](e))}catch(r){n(r)}}function l(e){e.done?t(e.value):a(e.value).then(i,s)}l((o=o.apply(e,r||[])).next())}))},p=o["default"].extend({name:"EntityMarker",props:{marker:u,screenCTM:SVGMatrix,mouseLocation:Object},data(){return{dragging:!1,lastPosition:{x:0,y:0}}},methods:{pickUp(e){return d(this,void 0,void 0,(function*(){e.preventDefault(),2!==e.button&&(this.dragging=!0,this.lastPosition={x:e.x,y:e.y})}))},move(){if(!this.dragging)return;const e=(this.mouseLocation.x-this.screenCTM.e)/this.screenCTM.a,r=(this.mouseLocation.y-this.screenCTM.f)/this.screenCTM.d;this.marker.moveMarkerTo(e,r)},putDown(e){return d(this,void 0,void 0,(function*(){this.dragging=!1,this.lastPosition={x:e.x,y:e.y},this.$emit("markerMoved",{id:this.marker.id,x:this.marker.x,y:this.marker.y})}))},remove(e){e.preventDefault(),this.$emit("removeMarker",this.marker.id)}},computed:{markerStyles(){const e=this.dragging?"grabbing":"grab";return{"--hover-cursor":e}}}}),h=p,k=t(1001),b=(0,k.Z)(h,m,f,!1,null,"014bafb9",null),v=b.exports,g=function(){var e=this,r=e._self._c;e._self._setupProxy;return r("b-container",{staticClass:"marker-builder",attrs:{fluid:""}},[r("b-row",{staticStyle:{"margin-bottom":"1rem"}},[r("b-col",[r("h3",[e._v("Add New Marker")])])],1),r("b-row",[r("b-col",[r("b-form",{on:{submit:e.createMarker}},[r("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-name-group",label:"Label","label-for":"marker-label"}},[r("b-form-input",{attrs:{id:"marker-label",type:"text"},model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}})],1),r("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-color-group",label:"Marker Color","label-for":"marker-color"}},[r("b-form-input",{attrs:{id:"marker-color",type:"color"},model:{value:e.form.color,callback:function(r){e.$set(e.form,"color",r)},expression:"form.color"}})],1),r("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-font-color-group",label:"Font Color","label-for":"marker-color"}},[r("b-form-input",{attrs:{id:"marker-font-color",type:"color"},model:{value:e.form.fontColor,callback:function(r){e.$set(e.form,"fontColor",r)},expression:"form.fontColor"}})],1),r("b-form-group",{attrs:{id:"input-name-group",label:"Size","label-for":"marker-size"}},[r("b-form-input",{attrs:{id:"marker-size",type:"range",min:"20",max:"150"},model:{value:e.form.size,callback:function(r){e.$set(e.form,"size",r)},expression:"form.size"}})],1)],1)],1)],1),r("b-row",{staticStyle:{"text-align":"center"}},[r("b-col",[r("svg",{attrs:{width:"100%",height:"100%",viewBox:"0 0 300 300"}},[r("g",{staticClass:"entity-marker"},[r("circle",{staticClass:"border-circle",attrs:{fill:"black",cx:150,cy:150,r:+e.form.size+2}}),r("circle",{attrs:{fill:e.form.color,cx:150,cy:150,r:+e.form.size}}),r("text",{staticClass:"marker-name",style:"font-size: "+ +e.form.size/2,attrs:{x:150,y:150,fill:e.form.fontColor,"text-anchor":"middle",dy:".3em"}},[e._v(" "+e._s(e.form.name)+" ")])])])])],1),r("b-row",{staticStyle:{"text-align":"center"}},[r("b-col",[r("b-button",{attrs:{variant:"success"},on:{click:e.createMarker}},[e._v("Add Marker")])],1)],1)],1)},y=[],x=o["default"].extend({name:"MarkerBuilder",data(){return{form:{name:"",color:"#00BFFF",fontColor:"#000",size:"50"}}},methods:{createMarker(e){e.preventDefault(),this.$emit("createMarker",this.form),this.form.name=""}}}),M=x,C=(0,k.Z)(M,g,y,!1,null,null,null),w=C.exports,O=t(7851);const _=`https://${window.location.host}`,S=(0,O.io)(_);S.on("connect",(()=>{console.log("connected to server"),S.emit("getMarkers")})),S.on("disconnect",(()=>{console.log("disconnected from server")}));var P=S,T=o["default"].extend({name:"BattleMap",components:{EntityMarker:v,MarkerBuilder:w},mounted(){this.map=new l,P.on("markerError",(e=>{this.$bvToast.toast(e,{title:"Marker Error",variant:"warning"})})),P.on("addMarker",(e=>{console.log("received marker",JSON.parse(e));const r=JSON.parse(e),t=new u(r.name,r.color,r.fontColor,r.x,r.y,r.radius,r.id);this.map.addMarker(t)})),P.on("markerMoved",(e=>{const r=JSON.parse(e),t=this.map.markers.find((e=>e.id===r.id));t&&t.moveMarkerToSmooth(r.x,r.y)})),P.on("removeMarker",(e=>{this.map.removeMarker(e)}))},data(){return{map:new l,currentLocation:{x:0,y:0}}},methods:{addMarker(e){const{name:r,color:t,fontColor:o,size:a}=e,n=new u(r,t,o,500,500,+a);this.map.addMarker(n),P.emit("addMarker",n.toString())},onMousemove(e){e.preventDefault(),this.currentLocation={x:e.clientX,y:e.clientY}},markerMoved(e){P.emit("moveMarker",JSON.stringify(e))},removeMarker(e){this.map.removeMarker(e),P.emit("removeMarker",e)}},computed:{markers(){return this.map.getMarkers()},screenCTM(){const e=this.$refs.map;return e.getScreenCTM()}}}),j=T,$=(0,k.Z)(j,i,s,!1,null,"19cc5910",null),z=$.exports,B=o["default"].extend({name:"App",components:{BattleMap:z}}),L=B,N=(0,k.Z)(L,a,n,!1,null,null,null),D=N.exports,E=t(3702),F=t(9425),J=t(7581);t(7024);o["default"].use(E.XG7),o["default"].use(F.A7),o["default"].use(J.m$),o["default"].config.productionTip=!1,P.connect(),new o["default"]({render:e=>e(D)}).$mount("#app")}},r={};function t(o){var a=r[o];if(void 0!==a)return a.exports;var n=r[o]={exports:{}};return e[o].call(n.exports,n,n.exports,t),n.exports}t.m=e,function(){var e=[];t.O=function(r,o,a,n){if(!o){var i=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],n=e[u][2];for(var s=!0,l=0;l<o.length;l++)(!1&n||i>=n)&&Object.keys(t.O).every((function(e){return t.O[e](o[l])}))?o.splice(l--,1):(s=!1,n<i&&(i=n));if(s){e.splice(u--,1);var c=a();void 0!==c&&(r=c)}}return r}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[o,a,n]}}(),function(){t.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(r,{a:r}),r}}(),function(){t.d=function(e,r){for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};t.O.j=function(r){return 0===e[r]};var r=function(r,o){var a,n,i=o[0],s=o[1],l=o[2],c=0;if(i.some((function(r){return 0!==e[r]}))){for(a in s)t.o(s,a)&&(t.m[a]=s[a]);if(l)var u=l(t)}for(r&&r(o);c<i.length;c++)n=i[c],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(u)},o=self["webpackChunkui"]=self["webpackChunkui"]||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(6913)}));o=t.O(o)})();
//# sourceMappingURL=app.34f54133.js.map