(function(e){function t(t){for(var n,o,i=t[0],c=t[1],u=t[2],d=0,p=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(p.length)p.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,i=1;i<r.length;i++){var c=r[i];0!==a[c]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={app:0},s=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("85ec"),a=r.n(n);a.a},"2b3f":function(e,t,r){"use strict";var n=r("8976"),a=r.n(n);a.a},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("b-container",{staticClass:"h-100 d-flex flex-column px-0",attrs:{fluid:""}},[r("Header"),r("router-view")],1)],1)},s=[],o=r("8c4f"),i=(r("99af"),r("4160"),r("b64b"),r("d3b7"),r("159b"),r("96cf"),r("1da1")),c=r("d4ec"),u=r("bee2"),l=r("ade3"),d=function(){function e(){if(Object(c["a"])(this,e),Object(l["a"])(this,"modelBaseUrl",void 0),Object(l["a"])(this,"modelRequest",void 0),this._buildUrl=this._buildUrl.bind(this),this._buildUrlWithParams=this._buildUrlWithParams.bind(this),void 0===this.getModelRequest)throw new TypeError("getModelRequest must be implemented in the derived class");this.modelRequest=this.getModelRequest(),this.modelBaseUrl=this._buildUrl()}return Object(u["a"])(e,[{key:"_buildUrl",value:function(){return"/api".concat(this.modelRequest)}},{key:"_buildUrlWithParams",value:function(e,t){var r=this.modelBaseUrl+(t?"/":"");return e&&(r+="?",Object.keys(e).forEach((function(t){r+="".concat(t,"=").concat(e[t],"&")}))),r}},{key:"doRequest",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r,n,a){var s,o,i,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=this._buildUrlWithParams(a,"POST"===r),t.next=3,fetch(s,{method:r||"GET",body:n?JSON.stringify(n):void 0,headers:{"Content-Type":"application/json",Authorization:e.authToken?"Token ".concat(e.authToken):void 0}});case 3:if(o=t.sent,!o.ok){t.next=16;break}if(204===o.status){t.next=11;break}return t.next=8,o.json();case 8:t.t0=t.sent,t.next=12;break;case 11:t.t0={status:"deleted"};case 12:return i=t.t0,t.abrupt("return",i);case 16:return t.next=18,o.json();case 18:throw c=t.sent,console.log(c),c;case 21:case"end":return t.stop()}}),t,this)})));function r(e,r,n){return t.apply(this,arguments)}return r}()},{key:"get",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.doRequest("GET",null,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"post",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.doRequest("POST",t,r);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"put",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.doRequest("PUT",t,r);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"delete",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.doRequest("DELETE",t,r));case 1:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getModelRequest",value:function(){throw new Error("This method must be implemented!")}}],[{key:"setAuthToken",value:function(t){e.authToken=t.token,e.currentUserId=t.user._id,localStorage.setItem("authToken",e.authToken),localStorage.setItem("currentUserId",e.currentUserId)}},{key:"clearAuthToken",value:function(){delete e.authToken,delete e.currentUserId,localStorage.removeItem("authToken"),localStorage.removeItem("currentUserId")}},{key:"loadAuthToken",value:function(){e.authToken=localStorage.getItem("authToken"),e.currentUserId=localStorage.getItem("currentUserId")}}]),e}();Object(l["a"])(d,"authToken",void 0),Object(l["a"])(d,"currentUserId",void 0),d.loadAuthToken();var p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"w-25 my-auto mx-auto"},[r("label",[e._v(" E-mail: ")]),r("b-input",{staticClass:"mb-2",attrs:{type:"email",placeholder:"Электронная почта"},model:{value:e.loginEmail,callback:function(t){e.loginEmail=t},expression:"loginEmail"}}),r("label",[e._v(" Пароль: ")]),r("b-input",{staticClass:"mb-2",attrs:{type:"password",placeholder:"Пароль"},model:{value:e.loginPassword,callback:function(t){e.loginPassword=t},expression:"loginPassword"}}),r("div",{staticClass:"d-flex"},[r("b-button",{attrs:{variant:"primary"},on:{click:e.login}},[e._v(" Log In ")]),r("a",{staticClass:"ml-2",attrs:{href:"/signup"}},[e._v(" Sign Up ")])],1)],1)},m=[],h=(r("b0c0"),r("257e")),f=r("262e"),v=r("2caf"),g=function(e){Object(f["a"])(r,e);var t=Object(v["a"])(r);function r(e){var n;return Object(c["a"])(this,r),n=t.call(this),n.id=e,n.getAllUsers=n.getAllUsers.bind(Object(h["a"])(n)),n.getUserById=n.getUserById.bind(Object(h["a"])(n)),n.signupUser=n.signupUser.bind(Object(h["a"])(n)),n.loginUser=n.loginUser.bind(Object(h["a"])(n)),n.modelRequest=n.getModelRequest(),n.modelBaseUrl=n._buildUrl(),n}return Object(u["a"])(r,[{key:"getModelRequest",value:function(){var e="/users";return this.id&&(e="/users/".concat(this.id)),e}},{key:"getAllUsers",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.get();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getAllDoctors",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.modelBaseUrl,this.modelBaseUrl+="/doctors",e.next=4,this.get();case 4:return r=e.sent,this.modelBaseUrl=t,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getUserById",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.get();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"signupUser",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,r,n,a){var s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=this.modelBaseUrl,this.modelBaseUrl+="/signup",e.next=4,this.post({username:t,email:r,name:n,password:a});case 4:return o=e.sent,this.modelBaseUrl=s,e.abrupt("return",o);case 7:case"end":return e.stop()}}),e,this)})));function t(t,r,n,a){return e.apply(this,arguments)}return t}()},{key:"loginUser",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=this.modelBaseUrl,this.modelBaseUrl+="/login",e.next=4,this.post({email:t,password:r});case 4:return a=e.sent,this.modelBaseUrl=n,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()}]),r}(d),b={name:"LoginPage",data:function(){return{loginEmail:"",loginPassword:"",username:"",email:"",name:"",password:""}},methods:{login:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new g,t.prev=1,t.next=4,r.loginUser(e.loginEmail,e.loginPassword);case 4:n=t.sent,console.log(n),g.setAuthToken(n),e.$router.history.push("/appointments"),t.next=18;break;case 10:t.prev=10,t.t0=t["catch"](1),console.log("im here"+t.t0),a="",t.t0.message&&(a=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){a+=e.msg+""})),console.log(a),window.alert("Ошибка:"+a);case 18:case"end":return t.stop()}}),t,null,[[1,10]])})))()},signup:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a,s,o,i,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new g,t.prev=1,n=e.username,a=e.email,s=e.name,o=e.password,t.next=5,r.signupUser(n,a,s,o);case 5:i=t.sent,console.log(i),g.setAuthToken(i),e.$router.history.push("/appointments"),t.next=20;break;case 11:t.prev=11,t.t0=t["catch"](1),console.log("im here"+t.t0),event.preventDefault(),c="",t.t0.message&&(c=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){c+=e+""})),console.log(c),window.alert("Ошибка:"+c);case 20:case"end":return t.stop()}}),t,null,[[1,11]])})))()}}},w=b,y=r("2877"),k=Object(y["a"])(w,p,m,!1,null,"2c355dc2",null),x=k.exports,_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"w-25 my-auto mx-auto"},[r("label",[e._v(" Фамилия Имя Отчество: ")]),r("b-input",{staticClass:"mb-2",attrs:{type:"text",placeholder:"ФИО"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),r("label",[e._v(" Имя пользователя: ")]),r("b-input",{staticClass:"mb-2",attrs:{type:"text",placeholder:"Имя пользователя"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),r("label",[e._v(" E-mail: ")]),r("b-input",{staticClass:"mb-2",attrs:{type:"email",placeholder:"Электронная почта"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("label",[e._v(" Пароль: ")]),r("b-input",{staticClass:"mb-2",attrs:{type:"password",placeholder:"Пароль"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("div",{staticClass:"d-flex"},[r("b-button",{attrs:{variant:"primary"},on:{click:e.signup}},[e._v(" Sign Up ")])],1)],1)},O=[],D={name:"LoginPage",data:function(){return{username:"",email:"",name:"",password:""}},methods:{signup:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new g,t.prev=1,t.next=4,r.signupUser(e.username,e.email,e.name,e.password);case 4:n=t.sent,console.log(n),g.setAuthToken(n),e.$router.history.push("/appointments"),t.next=19;break;case 10:t.prev=10,t.t0=t["catch"](1),console.log("im here"+t.t0),a="",t.t0.message&&(a=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){a+=e.msg+""})),console.log(a),window.alert("Ошибка:"+a),event.preventDefault();case 19:case"end":return t.stop()}}),t,null,[[1,10]])})))()}}},T=D,j=Object(y["a"])(T,_,O,!1,null,"77fb1193",null),R=j.exports,U=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.user?r("div",{staticClass:"d-flex"},[r("Profile",{attrs:{user:e.user}}),r("OwnAppointments",{attrs:{refreshTrigger:e.refreshTrigger,isDoctor:!!e.user.doctor}})],1):e._e(),e.user?r("div",[e.user.doctor?e._e():r("CalendarAppointments",{on:{"refresh-own-appointments":e.refreshOwnAppointments}}),e.user.doctor?r("DoctorSchedule",{attrs:{doctorId:e.user.doctor._id,doctorProfile:e.user.doctor}}):e._e()],1):e._e()])},A=[],C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.user?r("div",{staticClass:"p-4"},[r("h3",[e._v(e._s(e.user.name))]),r("p",[r("strong",[e._v("Логин пользователя:")]),e._v(" "+e._s(e.user.username))]),r("p",[r("strong",[e._v("E-mail:")]),e._v(" "+e._s(e.user.email))]),r("p",[r("strong",[e._v("ИК Медицинской Карты:")]),e._v(" "+e._s(e.user._id))]),r("p",[r("strong",[e._v("Дата регистрации:")]),e._v(" "+e._s(e.user.createdAt.getUTCDate()+"."+(e.user.createdAt.getUTCMonth()+1)+".20"+(e.user.createdAt.getYear()-100)+" "+e.user.createdAt.getUTCHours()+":"+e.user.createdAt.getUTCMinutes()+"0"))])]):e._e()},I=[],P={name:"Profile",props:{user:Object}},E=P,S=Object(y["a"])(E,C,I,!1,null,null,null),B=S.exports,q=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"p-4"},[r("table",{staticClass:"table own-appoints-max-height"},[r("thead",[r("tr",[r("th",[e._v(" # ")]),r("th",[e._v(" "+e._s(e.isDoctor?"Имя клиента":"Имя врача")+" ")]),r("th",[e._v(" "+e._s(e.isDoctor?"ИД клиента":"Специальность врача")+" ")]),r("th",[e._v(" Дата записи ")]),e.isDoctor?r("th",[e._v(" Удалить ")]):e._e()])]),r("tbody",e._l(e.appointments,(function(t,n){return r("tr",{key:t._id},[r("td",[e._v(" "+e._s(n+1)+" ")]),r("td",[e._v(" "+e._s(e.isDoctor?t.clientProfile.name:t.doctorUser.name)+" ")]),r("td",[e._v(" "+e._s(e.isDoctor?t.clientProfile._id:t.doctorProfile.speciality)+" ")]),r("td",[e._v(" "+e._s(t.date.getUTCDate()+"."+(t.date.getUTCMonth()+1)+".20"+(t.date.getYear()-100)+" "+t.date.getUTCHours()+":"+t.date.getUTCMinutes()+"0")+" ")]),e.isDoctor?r("td",{staticClass:"cursor-hover",on:{click:function(r){return e.deleteAppointment(t._id)}}},[e._v(" X ")]):e._e()])})),0)]),e.appointments.length?e._e():r("b-alert",{attrs:{show:""}},[e._v(" Запланированные посещения врача отсутствуют ")])],1)},M=[],$=(r("c740"),r("d81d"),r("a434"),r("5530")),H=function(e){Object(f["a"])(r,e);var t=Object(v["a"])(r);function r(e){var n;return Object(c["a"])(this,r),n=t.call(this),n.id=e,n.getAllAppointments=n.getAllAppointments.bind(Object(h["a"])(n)),n.getAppointmentById=n.getAppointmentById.bind(Object(h["a"])(n)),n.createAppointment=n.createAppointment.bind(Object(h["a"])(n)),n.updateAppointment=n.updateAppointment.bind(Object(h["a"])(n)),n.deleteAppointment=n.deleteAppointment.bind(Object(h["a"])(n)),n.searchAppointments=n.searchAppointments.bind(Object(h["a"])(n)),n.modelRequest=n.getModelRequest(),n.modelBaseUrl=n._buildUrl(),n}return Object(u["a"])(r,[{key:"getModelRequest",value:function(){var e="/appointments";return this.id&&(e="/appointments/".concat(this.id)),e}},{key:"getAllAppointments",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.get();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getAppointmentById",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.get();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"searchAppointments",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.modelBaseUrl,this.modelBaseUrl+="/search",e.next=4,this.get(t);case 4:return n=e.sent,this.modelBaseUrl=r,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"createAppointment",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,r,n,a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.post({client:t,doctor:r,time:n,date:a});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t,r,n,a){return e.apply(this,arguments)}return t}()},{key:"updateAppointment",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,r,n,a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.id){e.next=2;break}throw new Error("No id for appointment specified");case 2:return e.next=4,this.post({client:t,doctor:r,time:n,date:a});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e,this)})));function t(t,r,n,a){return e.apply(this,arguments)}return t}()},{key:"deleteAppointment",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.id){e.next=2;break}throw new Error("No id for appointment specified");case 2:return e.next=4,this.delete();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),r}(d),W={name:"OwnAppointments",props:{refreshTrigger:Boolean,isDoctor:Boolean},data:function(){return{appointments:[]}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.loadOwnAppointments();case 2:case"end":return t.stop()}}),t)})))()},watch:{refreshTrigger:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadOwnAppointments();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},methods:{loadOwnAppointments:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new H,n={fromDate:new Date(Date.now()).toISOString()},e.isDoctor?n.doctor=g.currentUserId:n.client=g.currentUserId,t.prev=3,t.next=6,r.searchAppointments(n);case 6:a=t.sent,e.appointments=a.appointments.map((function(e){var t=Object($["a"])({},e);return t.date=new Date(e.date),t})),t.next=18;break;case 10:t.prev=10,t.t0=t["catch"](3),console.log("im here"+t.t0),s="",t.t0.message&&(s=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){s+=e.msg+""})),console.log(s),window.alert("Ошибка:"+s);case 18:case"end":return t.stop()}}),t,null,[[3,10]])})))()},deleteAppointment:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a,s,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=new H(e),a=t.appointments.findIndex((function(t){return t._id=e})),t.appointments.splice(a,1),console.log(t.appointments),r.prev=4,r.next=7,n.deleteAppointment();case 7:return s=r.sent,console.log(s),r.next=11,t.loadOwnAppointments();case 11:r.next=21;break;case 13:r.prev=13,r.t0=r["catch"](4),console.log("im here"+r.t0),o="",r.t0.message&&(o=r.t0.message),r.t0.errors&&r.t0.errors.forEach((function(e){o+=e.msg+""})),console.log(o),window.alert("Ошибка:"+o);case 21:case"end":return r.stop()}}),r,null,[[4,13]])})))()}}},N=W,F=(r("2b3f"),Object(y["a"])(N,q,M,!1,null,"edc53856",null)),L=F.exports,J=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.times.length?r("table",{staticClass:"table table-striped table-hover"},[r("thead",{staticClass:"thead-dark"},[r("tr",e._l(Object.keys(e.doctorProfile.dayTimes),(function(t){return r("th",{key:t.toString(),attrs:{scope:"col"}},[e._v(" "+e._s(t.toUpperCase())+" ")])})),0)]),r("tbody",e._l(Object.keys(e.doctorProfile.dayTimes),(function(t){return r("td",{key:t},[r("table",{staticClass:"table table-hover"},[r("tbody",[e._l(e.dayTimes[t],(function(n,a){return r("tr",{key:n,staticClass:"w-100 table-row-pointer",attrs:{scope:"row"}},[r("td",[e._v(e._s(e.formattedTimes[n].hours)+":"+e._s(e.formattedTimes[n].minutes))]),r("td",{staticClass:"cursor-pointer",on:{click:function(r){return e.deleteDayTime(t,a)}}},[e._v(" X ")])])})),r("tr",{staticClass:"w-100"},[r("b-form-select",{staticClass:"mt-3",attrs:{options:e.timesOptions[t]},model:{value:e.selectedTimes[t],callback:function(r){e.$set(e.selectedTimes,t,r)},expression:"selectedTimes[day]"}}),r("b-button",{staticClass:"mt-1",attrs:{variant:"success"},on:{click:function(r){return e.addDayTime(t)}}},[e._v(" + Time ")])],1)],2)])])})),0)]):e._e()])},Y=[],G=(r("4de4"),r("7db0"),r("ac1f"),r("1276"),function(e){Object(f["a"])(r,e);var t=Object(v["a"])(r);function r(e){var n;return Object(c["a"])(this,r),n=t.call(this),n.id=e,n.getllTimes=n.getAllTimes.bind(Object(h["a"])(n)),n.modelRequest=n.getModelRequest(),n.modelBaseUrl=n._buildUrl(),n}return Object(u["a"])(r,[{key:"getModelRequest",value:function(){var e="/times";return this.id&&(e="/times/".concat(this.id)),e}},{key:"getAllTimes",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.get();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),r}(d)),X=function(e){Object(f["a"])(r,e);var t=Object(v["a"])(r);function r(e){var n;return Object(c["a"])(this,r),n=t.call(this),n.id=e,n.updateDoctorProfile=n.updateDoctorProfile.bind(Object(h["a"])(n)),n.modelRequest=n.getModelRequest(),n.modelBaseUrl=n._buildUrl(),n}return Object(u["a"])(r,[{key:"getModelRequest",value:function(){var e="/doctors";return this.id&&(e="/doctors/".concat(this.id)),e}},{key:"updateDoctorProfile",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.put(t);case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}]),r}(d),z={name:"DoctorSchedule",props:{doctorId:String,doctorProfile:Object},data:function(){return{dayTimes:{monday:[],tuesday:[],wednesday:[],thursday:[],friday:[]},times:[],selectedTimes:{monday:null,tuesday:null,wednesday:null,thursday:null,friday:null}}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=new G,t.next=4,r.getAllTimes();case 4:n=t.sent,e.times=n.times,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},mounted:function(){var e=Object.assign({},this.doctorProfile.dayTimes);this.dayTimes=e},computed:{formattedTimes:function(){var e={};return this.times.forEach((function(t){var r={hours:t.time.split(":")[0],minutes:t.time.split(":")[1]};e[t._id]=r})),e},timesOptions:function(){var e=this,t={};return Object.keys(this.dayTimes).forEach((function(r){var n=e.times.filter((function(t){var n=e.dayTimes[r].find((function(e){return t._id===e}));return!n})),a=n.map((function(e){return{text:e.time,value:e._id}}));t[r]=a})),t}},methods:{deleteDayTime:function(e,t){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,r.dayTimes[e].splice(t,1),a=new X(r.doctorId),n.next=5,a.updateDoctorProfile({dayTimes:r.dayTimes});case 5:s=n.sent,console.log(s),n.next=17;break;case 9:n.prev=9,n.t0=n["catch"](0),console.log("im here"+n.t0),o="",n.t0.message&&(o=n.t0.message),n.t0.errors&&n.t0.errors.forEach((function(e){o+=e.msg+""})),console.log(o),window.alert("Ошибка:"+o);case 17:case"end":return n.stop()}}),n,null,[[0,9]])})))()},addDayTime:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,t.dayTimes[e].push(t.selectedTimes[e]),n=new X(t.doctorId),r.next=5,n.updateDoctorProfile({dayTimes:t.dayTimes});case 5:a=r.sent,console.log(a),r.next=17;break;case 9:r.prev=9,r.t0=r["catch"](0),console.log("im here"+r.t0),s="",r.t0.message&&(s=r.t0.message),r.t0.errors&&r.t0.errors.forEach((function(e){s+=e.msg+""})),console.log(s),window.alert("Ошибка:"+s);case 17:case"end":return r.stop()}}),r,null,[[0,9]])})))()}}},K=z,Q=Object(y["a"])(K,J,Y,!1,null,null,null),V=Q.exports,Z=function(){var e=this,t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("b-button",{staticClass:"col-2",on:{click:t.loadNextWeekDatesAndAppointments}},[t._v(" Следующая неделя ")]),n("b-form-select",{staticClass:"col-2 ml-5",attrs:{options:t.doctorsOptions},on:{change:t.refreshData},model:{value:t.selectedDoctor,callback:function(e){t.selectedDoctor=e},expression:"selectedDoctor"}}),n("div",{staticClass:"col-3 d-flex ml-2"},[n("b-input",{attrs:{id:"selectedDateInput",disabled:""},model:{value:t.selectedDateText,callback:function(e){t.selectedDateText=e},expression:"selectedDateText"}})],1),n("b-button",{attrs:{variant:"primary",disabled:!t.selectedDate||!t.selectedDoctor},on:{click:t.submitAppointment}},[t._v(" + Записаться на приём ")])],1),t.times.length?n("AppointmentsTable",{staticClass:"mt-2 row",attrs:{fromDate:t.fromDate,toDate:t.toDate,times:t.times,appointments:t.appointments,doctorProfile:t.selectedDoctorProfile},on:{"select-date":function(t){e.selectedDate=t}}}):t._e()],1)},ee=[],te=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("table",{staticClass:"table table-striped table-hover"},[r("thead",{staticClass:"thead-dark"},[Object.keys(e.tableHeaderDays).length?r("tr",[r("th",{attrs:{scope:"col"}},[e._v(" Понедельник "+e._s(e.tableHeaderDays["monday"])+" ")]),r("th",{attrs:{scope:"col"}},[e._v(" Вторник "+e._s(e.tableHeaderDays["tuesday"])+" ")]),r("th",{attrs:{scope:"col"}},[e._v(" Среда "+e._s(e.tableHeaderDays["wednesday"])+" ")]),r("th",{attrs:{scope:"col"}},[e._v(" Четверг "+e._s(e.tableHeaderDays["thursday"])+" ")]),r("th",{attrs:{scope:"col"}},[e._v(" Пятница "+e._s(e.tableHeaderDays["friday"])+" ")])]):e._e()]),r("tbody",e._l(Object.keys(e.filteredDayTimes),(function(t){return r("td",{key:t},[r("table",{staticClass:"table table-hover"},[r("tbody",e._l(e.filteredDayTimes[t],(function(t){return r("tr",{key:t.toISOString(),staticClass:"w-100 table-row-pointer",attrs:{scope:"row"},on:{click:function(r){return e.$emit("select-date",t)}}},[e._v(" "+e._s(t.getUTCHours())+":"+e._s(t.getUTCMinutes())+"0 ")])})),0)])])})),0)])])},re=[],ne=(r("4fad"),r("3835")),ae=["monday","tuesday","wednesday","thursday","friday"],se={name:"AppointmentsTable",props:{times:Array,appointments:Array,fromDate:Date,toDate:Date,doctorProfile:Object},data:function(){return{dayTimes:{monday:[],tuesday:[],wednesday:[],thursday:[],friday:[]}}},mounted:function(){this.formatDayTimes()},watch:{doctorProfile:function(){this.formatDayTimes()},fromDate:function(){this.formatDayTimes()},toDate:function(){this.formatDayTimes()}},computed:{filteredDayTimes:function(){for(var e=this,t=Object.assign({},this.dayTimes),r=0,n=Object.keys(t);r<n.length;r++){var a=n[r];t[a]=t[a].filter((function(t){return!e.appointments.find((function(e){var r=new Date(e.date);console.log(r.toISOString());var n=new Date(t.toISOString());console.log(n.toISOString());var a=r.getTime()===n.getTime();return a}))}))}return t},tableHeaderDays:function(){var e={};if(this.dayTimes.monday.length>0)for(var t=0,r=Object.entries(this.dayTimes);t<r.length;t++){var n=Object(ne["a"])(r[t],2),a=n[0],s=n[1],o=new Date(s[0].toISOString());e[a]="".concat(o.getDate(),"/").concat(o.getMonth()+1)}return e}},methods:{formatDayTimes:function(){var e=this,t=function(e){var t=new Date;return t.setDate(e.getDate()+1),t.setUTCHours(0,0,0,0),t},r={};r[ae[0]]=this.fromDate;for(var n=1;n<ae.length;n++)r[ae[n]]=t(r[ae[n-1]]);for(var a={},s=function(){var t=Object(ne["a"])(i[o],2),r=t[0],n=t[1],s=e.times;e.doctorProfile&&(s=e.times.filter((function(t){return e.doctorProfile.dayTimes[r].find((function(e){return t._id===e}))}))),a[r]=s.map((function(e){var t=e.time.split(":"),r=Object(ne["a"])(t,2),a=r[0],s=r[1];a=parseInt(a,10),s=parseInt(s,10);var o=new Date(n);return o.setUTCHours(a,s,0,0),o}))},o=0,i=Object.entries(r);o<i.length;o++)s();this.dayTimes=a}}},oe=se,ie=(r("8d91"),Object(y["a"])(oe,te,re,!1,null,"183fcaa5",null)),ce=ie.exports,ue={name:"CalendarAppointments",components:{AppointmentsTable:ce},data:function(){return{times:[],doctors:[],appointments:[],doctorsOptions:[],fromDate:null,toDate:null,selectedDoctor:null,selectedDate:null,weekDate:new Date}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.setFromToDates(e.weekDate),t.next=3,e.loadTimes();case 3:return t.next=5,e.loadDoctors();case 5:return t.next=7,e.loadAppointments();case 7:case"end":return t.stop()}}),t)})))()},computed:{selectedDateText:function(){return this.selectedDate?"".concat(this.selectedDate.getUTCDate(),".").concat(this.selectedDate.getUTCMonth()+1,".20").concat(this.selectedDate.getYear()-100," ").concat(this.selectedDate.getUTCHours(),":").concat(this.selectedDate.getUTCMinutes(),"0"):"Дата посещения не выбрана..."},selectedDoctorProfile:function(){var e=this,t=this.doctors.find((function(t){return t._id===e.selectedDoctor}));return t.doctor}},methods:{loadNextWeekDatesAndAppointments:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new Date,r.setDate(e.weekDate.getDate()+7),r.setUTCHours(0,0,0,0),e.weekDate=r,e.setFromToDates(r),t.next=7,e.loadAppointments();case 7:case"end":return t.stop()}}),t)})))()},setFromToDates:function(e){var t=e.getDay(),r=e.getDate()-t+(0===t?-6:1),n=new Date(e.setDate(r));n.setUTCHours(0,0,0,0),this.fromDate=n;var a=new Date;a.setDate(n.getDate()+4),a.setUTCHours(0,0,0,0),this.toDate=a},loadTimes:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new G,t.prev=1,t.next=4,r.getllTimes();case 4:n=t.sent,e.times=n.times,t.next=16;break;case 8:t.prev=8,t.t0=t["catch"](1),console.log("im here"+t.t0),a="",t.t0.message&&(a=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){a+=e.msg+""})),console.log(a),window.alert("Ошибка:"+a);case 16:case"end":return t.stop()}}),t,null,[[1,8]])})))()},loadDoctors:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new g,t.prev=1,t.next=4,r.getAllDoctors();case 4:n=t.sent,e.doctors=n.doctors,e.doctorsOptions=n.doctors.map((function(e){return{text:e.name,value:e._id}})),e.selectedDoctor=n.doctors[0]._id||null,t.next=18;break;case 10:t.prev=10,t.t0=t["catch"](1),console.log("im here"+t.t0),a="",t.t0.message&&(a=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){a+=e.msg+""})),console.log(a),window.alert("Ошибка:"+a);case 18:case"end":return t.stop()}}),t,null,[[1,10]])})))()},loadAppointments:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=new H,n={},e.fromDate&&(n.fromDate=e.fromDate.toISOString()),e.selectedDoctor&&(n.doctor=e.selectedDoctor),t.prev=4,t.next=7,r.searchAppointments(n);case 7:a=t.sent,e.appointments=a.appointments,t.next=19;break;case 11:t.prev=11,t.t0=t["catch"](4),console.log("im here"+t.t0),s="",t.t0.message&&(s=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){s+=e.msg+""})),console.log(s),window.alert("Ошибка:"+s);case 19:case"end":return t.stop()}}),t,null,[[4,11]])})))()},submitAppointment:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=e.times.find((function(t){var r=e.selectedDate.toISOString().split("T")[1],n=r.split(":")[0]+":"+r.split(":")[1];return t.time===n})),n=new H,t.next=5,n.createAppointment(g.currentUserId,e.selectedDoctor,r._id,e.selectedDate.toISOString());case 5:return a=t.sent,console.log(a),t.next=9,e.refreshData();case 9:e.$emit("refresh-own-appointments"),t.next=20;break;case 12:t.prev=12,t.t0=t["catch"](0),console.log("im here"+t.t0),s="",t.t0.message&&(s=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){s+=e.msg+""})),console.log(s),window.alert("Ошибка:"+s);case 20:case"end":return t.stop()}}),t,null,[[0,12]])})))()},refreshData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("im here"),e.setFromToDates(e.weekDate),t.next=4,e.loadAppointments();case 4:case"end":return t.stop()}}),t)})))()}}},le=ue,de=Object(y["a"])(le,Z,ee,!1,null,null,null),pe=de.exports,me={name:"AppointmentsPage",components:{Profile:B,OwnAppointments:L,CalendarAppointments:pe,DoctorSchedule:V},data:function(){return{user:null,refreshTrigger:!1}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.loadUserInfo();case 2:case"end":return t.stop()}}),t)})))()},methods:{loadUserInfo:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=new g(g.currentUserId),t.next=4,r.getUserById();case 4:n=t.sent,e.user=n.user,n.doctor&&(e.user.doctor=n.doctor),t.next=17;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log("im here"+t.t0),a="",t.t0.message&&(a=t.t0.message),t.t0.errors&&t.t0.errors.forEach((function(e){a+=e.msg+""})),console.log(a),window.alert("Ошибка:"+a);case 17:case"end":return t.stop()}}),t,null,[[0,9]])})))()},refreshOwnAppointments:function(){this.refreshTrigger=!this.refreshTrigger}}},he=me,fe=Object(y["a"])(he,U,A,!1,null,"4608e1d4",null),ve=fe.exports,ge=[{path:"/",redirect:function(){return d.currentUserId?{name:"appointments"}:{name:"login"}}},{path:"/appointments",component:ve,name:"appointments",meta:{public:!0}},{path:"/login",component:x,name:"login"},{path:"/signup",component:R,name:"signup"}],be=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-navbar",{attrs:{type:"dark",variant:"info"}},[r("b-navbar-brand",{attrs:{href:"#"}},[e._v("Харьковская городская поликлиника №3")]),r("b-navbar-nav",{staticClass:"ml-3"},[r("b-nav-item",{attrs:{href:"/appointments"}},[e._v("Записи посещений")])],1),r("b-navbar-nav",{staticClass:"ml-auto"},[r("b-nav-item",{staticClass:"ml-auto",attrs:{href:"/signup"}},[e._v("Регистрация")]),e.isUser?e._e():r("b-nav-item",{on:{click:e.logout}},[e._v("Выход из аккаунта")])],1)],1)},we=[],ye={name:"Header",computed:{isUser:function(){return console.log(this.$router.currentRoute.path),"/login"===this.$router.currentRoute.path}},methods:{logout:function(){d.clearAuthToken(),this.$router.history.push("/")}}},ke=ye,xe=Object(y["a"])(ke,be,we,!1,null,"4c86f3b5",null),_e=xe.exports,Oe=new o["a"]({routes:ge,mode:"history"}),De={name:"App",components:{Header:_e},router:Oe},Te=De,je=(r("034f"),Object(y["a"])(Te,a,s,!1,null,null,null)),Re=je.exports,Ue=r("5f5b");r("acc7");n["default"].use(Ue["a"]),n["default"].use(o["a"]),n["default"].config.productionTip=!1,new n["default"]({render:function(e){return e(Re)}}).$mount("#app")},"85ec":function(e,t,r){},8976:function(e,t,r){},"8d91":function(e,t,r){"use strict";var n=r("d2a9"),a=r.n(n);a.a},acc7:function(e,t,r){},d2a9:function(e,t,r){}});
//# sourceMappingURL=app.21b0f202.js.map