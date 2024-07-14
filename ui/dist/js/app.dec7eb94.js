(function(){"use strict";var e={4272:function(e,t,r){var i=r(6369),a=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{attrs:{id:"app"}},[e.gameJoined?t("span",{staticClass:"back-button",on:{click:e.goBack}},[t("b-icon-arrow-left"),e._v(" Back")],1):e._e(),e.gameJoined?t("BattleMap",{attrs:{gameId:e.gameId,playerId:e.playerId},on:{setSocket:e.setSocket}}):t("JoinGame",{on:{joinedGame:e.joinedGame}})],1)},s=[],o=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("b-container",{staticClass:"battle-map",attrs:{fluid:""}},[t("b-row",{staticClass:"fullHeight"},[t("b-col",{staticClass:"fullHeight",staticStyle:{"padding-left":"0","padding-right":"1px"},attrs:{id:"battleMapCol"}},[t("div",{staticClass:"game-id-text"},[t("span",[e._v("Player Name: "+e._s(e.playerId))]),t("span",[e._v("Game ID: "+e._s(e.gameId))])]),t("div",{staticClass:"results-area"},e._l(e.diceResults,(function(e){return t("DiceResult",{key:e.id,attrs:{roll:e.roll}})})),1),t("svg",{ref:"map",staticClass:"battle-map-svg",attrs:{width:"100%",height:"100%",viewBox:"0 0 1000 1000"},on:{mousemove:e.onMousemove,mouseup:e.putDownMarker}},[t("defs",[t("pattern",{attrs:{id:"grid",width:"80",height:"80",patternUnits:"userSpaceOnUse"}},[t("path",{attrs:{d:"M 80 0 L 0 0 0 80",fill:"none",stroke:"gray","stroke-width":"1"}})])]),t("rect",{attrs:{x:"-2000",y:"-2000",width:"4000",height:"4000",fill:"url(#grid)"}}),e._l(e.markers,(function(r,i){return t("EntityMarker",{key:`${r.name}-${i}`,attrs:{marker:r,dragging:e.isDragging},on:{editMarker:e.editMarker,pickUp:e.pickUpMarker}})}))],2),t("div",{ref:"trashArea",style:e.trashAreaStyle,attrs:{id:"trashArea"},on:{mousemove:e.onMousemove,mouseup:e.putDownMarker}},[t("b-icon-trash",{staticStyle:{"margin-right":"1rem"}}),t("span",[e._v("Drag Here to Delete")])],1)]),t("b-col",{ref:"rightCol",staticClass:"fullHeight d-none d-lg-block",attrs:{lg:"3"}},[t("span",{staticClass:"tab-selector",class:{selected:e.isSelectedTab(e.tabs.BUILDER)},style:e.tabSelectorStyle,on:{click:function(t){e.selectedTab=e.tabs.BUILDER}}},[t("b-icon-hammer")],1),t("span",{staticClass:"tab-selector lower-2",class:{selected:e.isSelectedTab(e.tabs.DICE)},style:e.tabSelectorStyle,on:{click:function(t){e.selectedTab=e.tabs.DICE}}},[t("b-icon-dice-6")],1),t("span",{staticClass:"tab-selector lower-3",class:{selected:e.isSelectedTab(e.tabs.LOG)},style:e.tabSelectorStyle,on:{click:function(t){e.selectedTab=e.tabs.LOG}}},[t("b-icon-clock-history")],1),t("span",{staticClass:"tab-selector lower",class:{selected:e.isSelectedTab(e.tabs.LAYERS)},style:e.tabSelectorStyle,on:{click:function(t){e.selectedTab=e.tabs.LAYERS}}},[t("b-icon-layers-fill")],1),t("keep-alive",[e.selectedTab===e.tabs.BUILDER?t("MarkerBuilder",{attrs:{marker:e.editingMarker},on:{createMarker:e.addMarker,updateMarker:e.updateMarker,cancelEdit:e.cancelEditMarker,removeMarker:e.removeMarker}}):e._e(),e.selectedTab===e.tabs.DICE?t("DiceRoller",{on:{diceRoll:e.emitDiceRoll}}):e._e(),e.selectedTab===e.tabs.LOG?t("RollLog",{attrs:{rolls:e.rollsLog}}):e._e(),e.selectedTab===e.tabs.LAYERS?t("LayerManager",{attrs:{markers:e.markers},on:{updateMarkerLayers:e.updateMarkerLayers}}):e._e()],1)],1)],1)],1)},n=[];r(7658);class l{constructor(){Object.defineProperty(this,"markers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.markers=[]}getMarkers(){return this.markers.sort(((e,t)=>e.layer-t.layer))}addMarker(e){this.markers.push(e)}removeMarker(e){this.markers=this.markers.filter((t=>t.id!==e))}getNextLayer(){return this.markers.length}}var c=r(3029);class d{constructor(e,t,r,i,a,s,o="",n=0,l,d){Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"color",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"fontColor",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"x",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"y",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"radius",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"condition",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"height",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"layer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"blinkingInterval",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.id=null!==d&&void 0!==d?d:(0,c.Z)(),this.name=e,this.color=t,this.fontColor=r,this.x=i,this.y=a,this.radius=s,this.condition=o,this.height=n,this.layer=l}setName(e){this.name=e}setColor(e){this.color=e}setFontColor(e){this.fontColor=e}setRadius(e){this.radius=e}setCondition(e){this.condition=e}setHeight(e){this.height=e}setLayer(e){this.layer=e}moveMarkerTo(e,t){this.x=e,this.y=t}moveMarkerToSmooth(e,t){const r=e-this.x,i=t-this.y,a=r/100,s=i/100;let o=0;const n=setInterval((()=>{100===o?clearInterval(n):(this.x+=a,this.y+=s,o+=1)}),1)}toString(){return JSON.stringify({id:this.id,name:this.name,color:this.color,fontColor:this.fontColor,x:this.x,y:this.y,radius:this.radius,condition:this.condition,height:this.height,layer:this.layer})}toSvgString(){return`\n        <svg class="marker-layer-svg" width="100%" height="100%" viewBox="0 0 200 200">\n            <g class="entity-marker">\n                    <circle\n                        class="border-circle"\n                        fill="black"\n                        cx="100"\n                        cy="100"\n                        r="90"\n                    ></circle>\n                    <circle\n                        fill="${this.color}"\n                        cx="100"\n                        cy="100"\n                        r="88"\n                    ></circle>\n                </g>\n            </svg>\n        `}}var u=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("g",{ref:"marker",staticClass:"entity-marker",style:e.markerStyles,on:{mousedown:e.pickUp,contextmenu:function(t){return e.edit.apply(null,arguments)}}},[e.marker.condition.length>0?t("circle",{staticClass:"circle",attrs:{cx:e.marker.x,cy:e.marker.y,r:e.marker.radius+4,fill:"none",stroke:"red","stroke-width":"5px","stroke-dasharray":"1",opacity:"0.7"}}):e._e(),t("circle",{staticClass:"border-circle",attrs:{fill:"black",cx:e.marker.x,cy:e.marker.y,r:e.marker.radius}}),t("circle",{attrs:{fill:e.marker.color,cx:e.marker.x,cy:e.marker.y,r:e.marker.radius-2}}),t("text",{staticClass:"marker-name",style:"font-size: "+e.marker.radius/2,attrs:{x:e.marker.x,y:e.marker.y,fill:e.marker.fontColor,"text-anchor":"middle",dy:".3em"}},[e._v(" "+e._s(e.marker.name)+" ")]),t("text",{staticClass:"condition-text",style:"font-size: 12px;",attrs:{x:e.marker.x,y:e.marker.y+e.marker.radius+16,fill:"#000","text-anchor":"middle"}},[e._v(" "+e._s(e.marker.condition)+" ")]),t("text",{staticClass:"height-text",style:`font-size: ${e.marker.radius/3}px;`,attrs:{x:e.marker.x,y:e.marker.y+e.marker.radius/1.5,"text-anchor":"middle",fill:e.marker.fontColor}},[e._v(" "+e._s(e.markerHeight)+" ")])])},m=[],h=function(e,t,r,i){function a(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,s){function o(e){try{l(i.next(e))}catch(t){s(t)}}function n(e){try{l(i["throw"](e))}catch(t){s(t)}}function l(e){e.done?r(e.value):a(e.value).then(o,n)}l((i=i.apply(e,t||[])).next())}))},f=i["default"].extend({name:"EntityMarker",props:{marker:d,dragging:Boolean},methods:{pickUp(e){return h(this,void 0,void 0,(function*(){e.preventDefault(),2!==e.button&&this.$emit("pickUp",{marker:this.marker,ref:this.$refs.marker})}))},edit(e){e.preventDefault(),this.$emit("editMarker",this.marker)}},computed:{markerStyles(){const e=this.dragging?"grabbing":"grab",t=this.marker.height>0?"drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))":"drop-shadow(0)";return{"--hover-cursor":e,"--marker-shadow":t}},borderColor(){return this.marker.condition.length>0?"red":"black"},markerHeight(){return+this.marker.height>0?`${this.marker.height}ft`:""}}}),p=f,g=r(1001),k=(0,g.Z)(p,u,m,!1,null,"684fe650",null),b=k.exports,v=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("b-container",{staticClass:"marker-builder",attrs:{fluid:""}},[e.marker?t("h3",{staticClass:"title"},[e._v("Edit Marker")]):t("h3",{staticClass:"title"},[e._v("Add New Marker")]),t("b-form",{staticClass:"marker-form",on:{submit:e.submit}},[t("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-name-group",label:"Label","label-for":"marker-label"}},[t("b-form-input",{attrs:{id:"marker-label",type:"text"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),t("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-color-group",label:"Marker Color","label-for":"marker-color"}},[t("b-form-input",{attrs:{id:"marker-color",type:"color"},model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),t("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-font-color-group",label:"Font Color","label-for":"marker-font-color"}},[t("b-form-input",{attrs:{id:"marker-font-color",type:"color"},model:{value:e.form.fontColor,callback:function(t){e.$set(e.form,"fontColor",t)},expression:"form.fontColor"}})],1),t("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-name-group",label:"Size","label-for":"marker-size"}},[t("b-form-select",{staticStyle:{width:"100%","text-align":"center",padding:"0.5rem 0rem"},attrs:{id:"marker-size",options:e.sizeOptions},model:{value:e.form.size,callback:function(t){e.$set(e.form,"size",t)},expression:"form.size"}})],1),t("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-condition-group",label:"Condition","label-for":"marker-condition"}},[t("b-form-input",{attrs:{id:"marker-condition"},model:{value:e.form.condition,callback:function(t){e.$set(e.form,"condition",t)},expression:"form.condition"}})],1),t("b-form-group",{staticClass:"marker-form-group",attrs:{id:"input-height-group",label:"Flying Height","label-for":"marker-height"}},[t("b-form-input",{attrs:{id:"marker-height",type:"number",min:"0"},model:{value:e.form.height,callback:function(t){e.$set(e.form,"height",t)},expression:"form.height"}})],1)],1),t("svg",{staticClass:"layer-marker-svg",attrs:{width:"100%",height:"100%",viewBox:"0 0 400 400"}},[t("g",{staticClass:"entity-marker"},[e.form.condition.length>0?t("circle",{staticClass:"circle",attrs:{cx:200,cy:200,r:+e.form.size+4,fill:"none",stroke:"red","stroke-width":"5px","stroke-dasharray":"1",opacity:"0.7"}}):e._e(),t("circle",{staticClass:"border-circle",attrs:{fill:"black",cx:200,cy:200,r:+e.form.size}}),t("circle",{attrs:{fill:e.form.color,cx:200,cy:200,r:+e.form.size-2}}),t("text",{staticClass:"marker-name",style:`font-size: ${+e.form.size/2}px`,attrs:{x:200,y:200,fill:e.form.fontColor,"text-anchor":"middle",dy:".3em"}},[e._v(" "+e._s(e.form.name)+" ")]),t("text",{staticClass:"condition-text",style:"font-size: 12px;",attrs:{x:200,y:200+e.form.size+16,"text-anchor":"middle",fill:"#000"}},[e._v(" "+e._s(e.form.condition)+" ")]),t("text",{staticClass:"height-text",style:`font-size: ${e.form.size/3}px;`,attrs:{x:200,y:200+e.form.size/1.2,"text-anchor":"middle",fill:e.form.fontColor}},[e._v(" "+e._s(e.formHeight)+" ")])])]),e.marker?e._e():t("div",{staticClass:"marker-builder-button"},[t("b-button",{attrs:{variant:"success"},on:{click:e.createMarker}},[e._v("Add Marker")])],1),e.marker?t("div",{staticClass:"marker-builder-button"},[t("span",[t("b-button",{attrs:{variant:"success"},on:{click:e.updateMarker}},[e._v(" Update Marker ")])],1),t("span",[t("b-button",{staticClass:"cancel-button",attrs:{variant:"secondary"},on:{click:e.deselectMarker}},[e._v(" Cancel ")])],1)]):e._e()],1)},y=[],C=i["default"].extend({name:"MarkerBuilder",props:{marker:d},mounted(){this.marker&&(this.form.name=this.marker.name,this.form.color=this.marker.color,this.form.fontColor=this.marker.fontColor,this.form.size=this.marker.radius,this.form.condition=this.marker.condition,this.form.height=this.marker.height)},data(){return{form:{name:"",color:"#00BFFF",fontColor:"#000",size:40,condition:"",height:0},formDefaults:{name:"",color:"#00BFFF",fontColor:"#000",size:40,condition:"",height:0},sizeOptions:[{text:"Tiny",value:20},{text:"Small/Medium",value:40},{text:"Large",value:80},{text:"Huge",value:120},{text:"Gargantuan",value:160}]}},methods:{submit(e){e.preventDefault(),console.log("submitted"),this.marker?this.updateMarker():this.createMarker()},createMarker(){this.$emit("createMarker",this.form),this.form.name="",this.form.condition="",this.form.height=0},updateMarker(){this.marker.setName(this.form.name),this.marker.setColor(this.form.color),this.marker.setFontColor(this.form.fontColor),this.marker.setRadius(+this.form.size),this.marker.setCondition(this.form.condition),this.marker.setHeight(this.form.height),this.$emit("updateMarker"),this.form=Object.assign({},this.formDefaults)},removeMarker(){this.marker&&(this.$emit("removeMarker",this.marker.id),this.form=Object.assign({},this.formDefaults))},deselectMarker(){this.$emit("cancelEdit"),this.form=Object.assign({},this.formDefaults)}},computed:{formHeight(){return+this.form.height>0?`${this.form.height}ft`:""}},watch:{marker:function(e){e&&(this.form.name=e.name,this.form.color=e.color,this.form.fontColor=e.fontColor,this.form.size=e.radius,this.form.condition=e.condition,this.form.height=e.height)}}}),x=C,M=(0,g.Z)(x,v,y,!1,null,null,null),D=M.exports,_=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"dice-roller"},[t("h3",{staticClass:"title"},[e._v("Roll Dice")]),t("div",{staticClass:"dice-selector"},[t("DiceD20",{staticClass:"dice",attrs:{size:e.diceSize},on:{click:function(t){return e.handleClick(t,e.DICE.d20)}}}),t("DiceD12",{staticClass:"dice",attrs:{size:e.diceSize},on:{click:function(t){return e.handleClick(t,e.DICE.d12)}}}),t("DiceD10",{staticClass:"dice",attrs:{size:e.diceSize},on:{click:function(t){return e.handleClick(t,e.DICE.d10)}}}),t("DiceD8",{staticClass:"dice",attrs:{size:e.diceSize},on:{click:function(t){return e.handleClick(t,e.DICE.d8)}}}),t("DiceD6",{staticClass:"dice",attrs:{size:e.diceSize},on:{click:function(t){return e.handleClick(t,e.DICE.d6)}}}),t("DiceD4",{staticClass:"dice",attrs:{size:e.diceSize},on:{click:function(t){return e.handleClick(t,e.DICE.d4)}}}),t("b-form-input",{staticClass:"dice-amounts amount-d20",attrs:{type:"number",min:"0"},model:{value:e.diceAmounts[e.DICE.d20],callback:function(t){e.$set(e.diceAmounts,e.DICE.d20,t)},expression:"diceAmounts[DICE.d20]"}}),t("b-form-input",{staticClass:"dice-amounts amount-d12",attrs:{type:"number",min:"0"},model:{value:e.diceAmounts[e.DICE.d12],callback:function(t){e.$set(e.diceAmounts,e.DICE.d12,t)},expression:"diceAmounts[DICE.d12]"}}),t("b-form-input",{staticClass:"dice-amounts amount-d10",attrs:{type:"number",min:"0"},model:{value:e.diceAmounts[e.DICE.d10],callback:function(t){e.$set(e.diceAmounts,e.DICE.d10,t)},expression:"diceAmounts[DICE.d10]"}}),t("b-form-input",{staticClass:"dice-amounts amount-d8",attrs:{type:"number",min:"0"},model:{value:e.diceAmounts[e.DICE.d8],callback:function(t){e.$set(e.diceAmounts,e.DICE.d8,t)},expression:"diceAmounts[DICE.d8]"}}),t("b-form-input",{staticClass:"dice-amounts amount-d6",attrs:{type:"number",min:"0"},model:{value:e.diceAmounts[e.DICE.d6],callback:function(t){e.$set(e.diceAmounts,e.DICE.d6,t)},expression:"diceAmounts[DICE.d6]"}}),t("b-form-input",{staticClass:"dice-amounts amount-d4",attrs:{type:"number",min:"0"},model:{value:e.diceAmounts[e.DICE.d4],callback:function(t){e.$set(e.diceAmounts,e.DICE.d4,t)},expression:"diceAmounts[DICE.d4]"}})],1),t("div",{staticClass:"modifier"},[t("div",{staticClass:"modifier-title"},[e._v("Modifier:")]),t("b-input-group",[t("b-form-input",{staticClass:"modifier-input",attrs:{type:"number"},model:{value:e.modifier,callback:function(t){e.modifier=t},expression:"modifier"}})],1)],1),t("div",{staticClass:"advantage"},[t("b-form-radio-group",{attrs:{options:e.advantageOptions,name:"advantage-options","button-variant":"outline-primary",buttons:""},model:{value:e.selectedAdvantageOption,callback:function(t){e.selectedAdvantageOption=t},expression:"selectedAdvantageOption"}}),t("span",{staticClass:"helper-text"},[e._v(e._s(e.advantageHelperText))])],1),t("div",{staticClass:"roll-button"},[t("b-button",{attrs:{disabled:e.disableRoll,variant:"success"},on:{click:e.rollDice}},[e._v("Roll")])],1),t("div",{staticClass:"reset-buttons",staticStyle:{"margin-top":"2rem",display:"flex","justify-content":"space-around"}},[t("b-button",{attrs:{size:"sm",variant:"outline-primary"},on:{click:e.clearDice}},[e._v(" Clear Dice ")]),t("b-button",{attrs:{size:"sm",variant:"outline-primary"},on:{click:e.clearModifier}},[e._v(" Clear Modifier ")]),t("b-button",{attrs:{size:"sm",variant:"outline-danger"},on:{click:e.clearAll}},[e._v(" Clear All ")])],1)])},I=[],S=r(7335),w=r(7374),O=r(6073),R=r(5880),$=r(5190),T=r(4321),E=i["default"].extend({name:"DiceRoller",components:{DiceD20:S.Z,DiceD12:w.Z,DiceD10:O.Z,DiceD8:R.Z,DiceD6:$.Z,DiceD4:T.Z},data(){return{DICE:{d20:20,d12:12,d10:10,d8:8,d6:6,d4:4},diceAmounts:{20:0,12:0,10:0,8:0,6:0,4:0},modifier:0,diceSize:40,selectedAdvantageOption:"normal",advantageOptions:[{text:"Normal",value:"normal"},{text:"Advantage",value:"advantage"},{text:"Disadvantage",value:"disadvantage"}]}},methods:{handleClick(e,t){e.preventDefault(),this.diceAmounts[t]=+this.diceAmounts[t]+1},getRandomInt(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e)+e)},rollDice(){let e={};for(let t in this.diceAmounts){Object.keys(e).includes(t)||(e[t]=[]);for(let r=0;r<this.diceAmounts[t];r++){const r=this.getRandomInt(1,+t+1);e[t].push(r)}}this.$emit("diceRoll",JSON.stringify({dice:e,modifier:this.modifier,advantage:this.selectedAdvantageOption,playerId:"++defaultPlayerId++"}))},clearDice(){const e=Object.keys(this.diceAmounts);e.forEach((e=>{const t=+e;this.diceAmounts[t]=0}))},clearModifier(){this.modifier=0},clearAll(){this.clearDice(),this.clearModifier()}},computed:{disableRoll(){const e=Object.values(this.diceAmounts).flat();for(let t=0;t<e.length;t++)if(e[t]>0)return!1;return!0},advantageHelperText(){const e={normal:"All d20s rolled will be included in the total",advantage:"Only the highest d20 will be included in the total",disadvantage:"Only the lowest d20 will be included in the total"};return e[this.selectedAdvantageOption]}}}),L=E,A=(0,g.Z)(L,_,I,!1,null,"4aeaa38e",null),j=A.exports,z=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("b-alert",{staticClass:"dice-result",attrs:{show:"",variant:"dark",fade:""}},[t("div",{staticClass:"roll-metadata"},[t("span",{staticClass:"roll-player"},[e._v(e._s(e.playerId))]),e.time?t("span",{staticClass:"roll-time"},[e._v("("+e._s(e.time)+")")]):e._e()]),t("div",{staticClass:"dice-section"},[e._l(e.diceSections.twenties,(function(r,i){return t("IndividualDie",{key:`${r.dieType}-${i}`,attrs:{dieType:r.dieType,value:r.value,ignore:r.ignore,index:0,static:e.static},on:{done:e.rollDone}})})),e._l(e.diceSections.others,(function(r,i){return t("IndividualDie",{key:`${r.dieType}-${i}`,attrs:{dieType:r.dieType,value:r.value,ignore:r.ignore,index:e.diceSections.twenties.length+i,static:e.static},on:{done:e.rollDone}})}))],2),t("Transition",{attrs:{name:"fade"}},[e.rollingDone||e.static?t("div",{staticClass:"roll-value"},[t("span",{staticClass:"components"},[e._v(" "+e._s(e.rollComponents)+" ")]),t("span",{staticClass:"total-value"},[e._v(" "+e._s(e.roll.value()+e.roll.modifier))])]):e._e()])],1)},P=[],B=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(r[i[a]]=e[i[a]])}return r};class N{constructor(e){Object.defineProperty(this,"dice",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"modifier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"advantage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"playerId",{enumerable:!0,configurable:!0,writable:!0,value:void 0});const t=JSON.parse(e);this.dice=t.dice,this.modifier=t.modifier,this.advantage=t.advantage,this.playerId=t.playerId}toDiceArray(){const e=[20,12,10,8,6,4],t=[];for(const r of e){const e=this.dice[r];for(const i of e){let a=!1;20===r&&("advantage"===this.advantage?a=i<Math.max(...e):"disadvantage"===this.advantage&&(a=i>Math.min(...e))),t.push({dieType:r,value:i,ignore:a})}}return t}numDice(){return Object.values(this.dice).flat().length}value(){const e=this.numDice();if(0===e)return 0;if(!this.dice[20]||0===this.dice[20].length)return Object.values(this.dice).flat().reduce(((e,t)=>e+t));if("advantage"===this.advantage&&this.dice[20].length>0){const e=20,t=this.dice,r=e,i=t[r],a=B(t,["symbol"===typeof r?r:r+""]),s=Math.max(...i),o=Object.values(a).flat();if(0===o.length)return s;const n=o.reduce(((e,t)=>e+t));return s+n}if("disadvantage"===this.advantage&&this.dice[20].length>0){const e=20,t=this.dice,r=e,i=t[r],a=B(t,["symbol"===typeof r?r:r+""]),s=Math.min(...i),o=Object.values(a).flat();if(0===o.length)return s;const n=o.reduce(((e,t)=>e+t));return s+n}return Object.values(this.dice).flat().reduce(((e,t)=>e+t))}}var G=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("span",{staticClass:"die-span"},[e.rolling?e._e():t("span",{staticClass:"individual-die",class:{crit:e.crit,fail:e.fail,ignore:e.ignore}},[t("b-icon",{attrs:{icon:e.dieIcon}}),t("span",{staticClass:"die-value"},[e._v(e._s(e.value))])],1),e.rolling?t("span",[t("div",{staticClass:"individual-die spinning"},[t("b-icon",{attrs:{icon:e.dieIcon}})],1)]):e._e()])},H=[],J=i["default"].extend({name:"IndividualDie",props:{dieType:{type:Number,required:!0},value:{type:Number,required:!0},ignore:{type:Boolean,required:!0},index:{type:Number,required:!0},static:Boolean},data(){return{icons:{20:"hexagon-fill",12:"pentagon-fill",10:"diamond-fill",8:"diamond-fill",6:"square-fill",4:"triangle-fill"},rolling:!0,rollTimeMs:1e3}},created(){this.static&&(this.rolling=!1)},mounted(){setTimeout((()=>{this.rolling=!1,this.$emit("done")}),this.rollTimeMs+300*this.index)},computed:{dieIcon(){return this.icons[this.dieType]},crit(){return 20===this.dieType&&20===this.value},fail(){return 20===this.dieType&&1===this.value}}}),U=J,Z=(0,g.Z)(U,G,H,!1,null,"3aefa33e",null),F=Z.exports,q=(0,i.defineComponent)({name:"DiceResult",components:{IndividualDie:F},props:{roll:{type:N,required:!0},show:Boolean,static:Boolean,time:String},data(){return{rollsCompleted:0}},methods:{rollDone(){this.rollsCompleted+=1}},computed:{playerId(){return this.roll.playerId},dice(){return this.roll.toDiceArray()},diceSections(){const e=this.dice.filter((e=>20===e.dieType)),t=this.dice.filter((e=>20!==e.dieType));return{twenties:e,others:t}},rollingDone(){return this.rollsCompleted===this.roll.numDice()},rollComponents(){const e=this.roll.value(),t=this.roll.modifier,r=t<0?"-":"+";return`${e} ${r} ${Math.abs(t)} =`}}}),Y=q,X=(0,g.Z)(Y,z,P,!1,null,"80418782",null),V=X.exports,K=r(7851);const Q=`https://${window.location.host}`,W=(e,t)=>{const r=encodeURIComponent(e),i=encodeURIComponent(t),a=(0,K.io)(`${Q}?gameId=${r}&playerId=${i}`,{withCredentials:!0});return a.on("connect",(()=>{console.log(`%cGame Connected: ${e}`,"color: #66ff00"),a.emit("getMarkers"),a.emit("getNormalRolls")})),a.on("disconnect",(()=>{console.log(`%cGame Disconnected: ${e}`,"color: #dc3545")})),a};var ee=W,te=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"roll-log"},[t("h3",{staticClass:"title"},[e._v("Roll History")]),t("div",{staticClass:"rolls"},e._l(e.rolls,(function(r,i){return t("DiceResult",{key:`${r.timestamp}-${i}`,attrs:{roll:r.rollResult,static:!0,time:e.time(r.timestamp)}})})),1)])},re=[],ie=(0,i.defineComponent)({name:"RollLog",components:{DiceResult:V},props:["rolls"],methods:{time(e){return new Date(e).toLocaleString()}}}),ae=ie,se=(0,g.Z)(ae,te,re,!1,null,"a30ade2e",null),oe=se.exports,ne=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"layer-manager"},[t("h3",{staticClass:"title"},[e._v("Manage Layers")]),t("div",{staticClass:"layers"},[t("draggable",{on:{update:e.dropLayer},model:{value:e.markerLayers,callback:function(t){e.markerLayers=t},expression:"markerLayers"}},e._l(e.markerLayers,(function(r){return t("div",{key:r.id,staticClass:"marker-layer"},[t("div",{staticClass:"marker-layer-area"},[t("div",{domProps:{innerHTML:e._s(r.toSvgString())}}),t("div",{staticClass:"marker-layer-name"},[e._v(" "+e._s(e.truncateMarkerName(r.name))+" ")])])])})),0)],1)])},le=[],ce=r(6983),de=r.n(ce),ue=(0,i.defineComponent)({name:"LayerManager",components:{draggable:de()},props:{markers:{type:Array,required:!0}},created(){this.markerLayers=this.markers.slice().reverse()},data(){return{markerLayers:[]}},methods:{truncateMarkerName(e){return e.length>14?e.slice(0,14)+"...":e},dropLayer(){for(let e=0;e<this.markerLayers.length;e++){const t=this.markerLayers[e];t.layer!==this.markerLayers.length-e&&t.setLayer(this.markerLayers.length-e)}this.$emit("updateMarkerLayers")}},watch:{markers:function(e){this.markerLayers=e.slice().reverse()}}}),me=ue,he=(0,g.Z)(me,ne,le,!1,null,"94be9a2a",null),fe=he.exports;let pe;var ge=i["default"].extend({name:"BattleMap",props:{gameId:String,playerId:String},components:{EntityMarker:b,MarkerBuilder:D,DiceRoller:j,DiceResult:V,RollLog:oe,LayerManager:fe},mounted(){this.map=new l,this.pageResized=!this.pageResized,pe=ee(this.gameId,this.playerId),this.$emit("setSocket",pe),pe.connect(),pe.on(`${this.gameIdSafe}::markerError`,(e=>{this.$bvToast.toast(e,{title:"Marker Error",variant:"warning"})})),pe.on(`${this.gameIdSafe}::addNormalRollToLog`,(e=>{const t=e.split("::timestamp::"),r=+t.slice(-1)[0],i=t[0];this.rollsLog.unshift({timestamp:r,rollResult:new N(i)})})),pe.on(`${this.gameIdSafe}::normalRoll`,(e=>{this.displayRoll(e)})),pe.on(`${this.gameIdSafe}::addMarker`,(e=>{const t=JSON.parse(e),r=new d(t.name,t.color,t.fontColor,t.x,t.y,t.radius,t.condition,t.height,t.layer,t.id);this.map.addMarker(r)})),pe.on(`${this.gameIdSafe}::markerMoved`,(e=>{const t=JSON.parse(e),r=this.map.markers.find((e=>e.id===t.id));r&&r.moveMarkerToSmooth(t.x,t.y)})),pe.on(`${this.gameIdSafe}::removeMarker`,(e=>{this.map.removeMarker(e)})),pe.on(`${this.gameIdSafe}::updateMarkerTraits`,(e=>{const t=JSON.parse(e),r=this.map.markers.find((e=>e.id===t.id));r&&(r.setName(t.name),r.setColor(t.color),r.setFontColor(t.fontColor),r.setRadius(t.radius),r.setCondition(t.condition),r.setHeight(t.height),r.setLayer(t.layer))})),window.addEventListener("resize",(()=>{this.pageResized=!this.pageResized}))},data(){return{map:new l,selectedMarker:void 0,selectedMarkerRef:void 0,editingMarker:void 0,isDragging:!1,currentLocation:{x:0,y:0},pageResized:!1,tabs:{BUILDER:"builder",DICE:"dice",LOG:"log",LAYERS:"layers"},selectedTab:"builder",diceResults:[],rollsLog:[]}},methods:{emitDiceRoll(e){pe.emit("normalRoll",e)},displayRoll(e){const t={roll:new N(e),id:(0,c.Z)()};this.diceResults.push(t);const r=300*t.roll.numDice()+5e3;setTimeout((()=>{this.diceResults=this.diceResults.filter((e=>e.id!==t.id))}),r)},isSelectedTab(e){return this.selectedTab===e},addMarker(e){const{name:t,color:r,fontColor:i,size:a,condition:s,height:o}=e,n=this.map.getNextLayer(),l=new d(t,r,i,500,500,+a,s,o,n);this.map.addMarker(l),pe.emit("addMarker",l.toString())},onMousemove(e){if(e.preventDefault(),this.selectedMarker&&this.isDragging&&this.screenCTM){const t=(e.clientX-this.screenCTM.e)/this.screenCTM.a,r=(e.clientY-this.screenCTM.f)/this.screenCTM.d;this.selectedMarker.moveMarkerTo(t,r)}this.currentLocation={x:e.clientX,y:e.clientY}},markerMoved(e){pe.emit("moveMarker",JSON.stringify(e))},removeMarker(e){this.map.removeMarker(e),this.editingMarker=void 0,pe.emit("removeMarker",e)},pickUpMarker(e){this.selectedMarker=e.marker,this.selectedMarkerRef=e.ref,this.isDragging=!0},putDownMarker(){if(this.selectedMarker&&this.isDragging){if(this.isDragging=!1,this.selectedMarkerTrashHover)return void this.removeMarker(this.selectedMarker.id);const e={id:this.selectedMarker.id,x:this.selectedMarker.x,y:this.selectedMarker.y};pe.emit("moveMarker",JSON.stringify(e))}},editMarker(e){this.editingMarker=e,this.selectedTab=this.tabs.BUILDER},updateMarker(){if(!this.editingMarker)return;const e=JSON.stringify(this.editingMarker);this.editingMarker=void 0,pe.emit("updateMarkerTraits",e)},updateMarkerLayers(){for(let e=0;e<this.markers.length;e++){const t=JSON.stringify(this.markers[e]);pe.emit("updateMarkerTraits",t)}},cancelEditMarker(){this.editingMarker=void 0}},computed:{gameIdSafe(){return encodeURIComponent(this.gameId)},markers(){return this.map.getMarkers()},screenCTM(){this.pageResized;const e=this.$refs.map;return e.getScreenCTM()},selectedMarkerTrashHover(){if(this.currentLocation.x,this.currentLocation.y,!this.selectedMarkerRef)return!1;const e=this.$refs.trashArea,t=this.selectedMarkerRef.getBoundingClientRect(),r=e.getBoundingClientRect();return!(t.right<r.left||t.left>r.right||t.bottom<r.top||t.top>r.bottom)},trashAreaStyle(){const e=this.isDragging?"0":"-10%",t=this.selectedMarkerTrashHover?"var(--bs-danger)":"#000";return{"--trash-bottom":e,"--trash-bg-color":t}},tabSelectorStyle(){if(this.pageResized,!this.$refs.rightCol)return;const e=this.$refs.rightCol,t=e.getBoundingClientRect().left-40,r=e.getBoundingClientRect().top+5;return{"--tab-top":`${r}px`,"--tab-left":`${t}px`}}}}),ke=ge,be=(0,g.Z)(ke,o,n,!1,null,"9ad58358",null),ve=be.exports,ye=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("b-container",{staticClass:"join-game",attrs:{fluid:""}},[t("div",{staticClass:"join-title"},[e._v("Theater of the Mind Reference")]),t("div",{staticClass:"join-input"},[t("b-form-group",{attrs:{label:"Game ID","label-for":"game-id"}},[t("b-form-input",{attrs:{id:"game-id",placeholder:"my-fun-little-game"},on:{keyup:e.submitIfEnter},model:{value:e.gameId,callback:function(t){e.gameId=t},expression:"gameId"}})],1),t("b-form-group",{attrs:{label:"Player Name","label-for":"player-name"}},[t("b-form-input",{attrs:{id:"player-name",placeholder:"Vincent Adultman"},on:{keyup:e.submitIfEnter},model:{value:e.playerId,callback:function(t){e.playerId=t},expression:"playerId"}})],1)],1),t("div",{staticClass:"join-button"},[t("b-button",{attrs:{variant:"success",disabled:0===e.playerId.length||0===e.gameId.length},on:{click:e.joinGame}},[e._v(" Join Game ")])],1)])},Ce=[],xe=r(4161);const Me="/api",De=xe.Z.create({baseURL:Me});var _e=De,Ie=function(e,t,r,i){function a(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,s){function o(e){try{l(i.next(e))}catch(t){s(t)}}function n(e){try{l(i["throw"](e))}catch(t){s(t)}}function l(e){e.done?r(e.value):a(e.value).then(o,n)}l((i=i.apply(e,t||[])).next())}))},Se=i["default"].extend({name:"JoinGame",data(){return{gameId:"",playerId:""}},methods:{joinGame(){return Ie(this,void 0,void 0,(function*(){try{yield _e.post(`/join/${encodeURIComponent(this.gameId)}`,{playerId:this.playerId}),this.$emit("joinedGame",this.gameId,this.playerId)}catch(e){console.error("Error joining game: ",e)}}))},submitIfEnter(e){0!==this.gameId.length&&0!==this.playerId.length&&"Enter"===e.key&&this.joinGame()}},computed:{}}),we=Se,Oe=(0,g.Z)(we,ye,Ce,!1,null,"688d3a0b",null),Re=Oe.exports,$e=i["default"].extend({name:"App",components:{BattleMap:ve,JoinGame:Re},data(){return{gameJoined:!1,gameId:"",playerId:"",socket:void 0}},methods:{joinedGame(e,t){this.gameId=e,this.playerId=t,this.gameJoined=!0},setSocket(e){this.socket=e},disconnectSocket(){this.socket&&this.socket.disconnect()},goBack(){this.gameJoined=!1,this.disconnectSocket()}}}),Te=$e,Ee=(0,g.Z)(Te,a,s,!1,null,null,null),Le=Ee.exports,Ae=r(3702),je=r(9425),ze=r(7581);r(7024);i["default"].use(Ae.XG7),i["default"].use(je.A7),i["default"].use(ze.m$),i["default"].config.productionTip=!1,new i["default"]({render:e=>e(Le)}).$mount("#app")}},t={};function r(i){var a=t[i];if(void 0!==a)return a.exports;var s=t[i]={exports:{}};return e[i].call(s.exports,s,s.exports,r),s.exports}r.m=e,function(){var e=[];r.O=function(t,i,a,s){if(!i){var o=1/0;for(d=0;d<e.length;d++){i=e[d][0],a=e[d][1],s=e[d][2];for(var n=!0,l=0;l<i.length;l++)(!1&s||o>=s)&&Object.keys(r.O).every((function(e){return r.O[e](i[l])}))?i.splice(l--,1):(n=!1,s<o&&(o=s));if(n){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[i,a,s]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,i){var a,s,o=i[0],n=i[1],l=i[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(a in n)r.o(n,a)&&(r.m[a]=n[a]);if(l)var d=l(r)}for(t&&t(i);c<o.length;c++)s=o[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(d)},i=self["webpackChunkui"]=self["webpackChunkui"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=r.O(void 0,[998],(function(){return r(4272)}));i=r.O(i)})();
//# sourceMappingURL=app.dec7eb94.js.map