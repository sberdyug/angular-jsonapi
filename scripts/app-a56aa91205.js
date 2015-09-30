!function(){"use strict";angular.module("angularJsonapiExample",["ui.router","angular-jsonapi","angular-jsonapi-local","angular-jsonapi-rest","jsonFormatter","ngClipboard","promise-button","RecursionHelper"]).config(["ngClipProvider",function(e){e.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf")}]).config(["$stateProvider","$urlRouterProvider",function(e,t){var n="[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}";e.state("frame",{url:"",templateUrl:"app/frame/frame.html",controller:"FrameCtrl","abstract":!0}).state("frame.hello",{url:"",templateUrl:"app/frame/hello.html"}).state("frame.request",{url:"/{type}",template:"<ui-view></ui-view>",controller:"RequestCtrl","abstract":!0,resolve:{factory:["$jsonapi","$stateParams",function(e,t){return e.getResource(t.type)}]}}).state("frame.request.all",{url:"",templateUrl:"app/request/all.html",controller:"RequestAllCtrl",resolve:{collection:["factory",function(e){return e.all()}]}}).state("frame.request.get",{url:"/{id:"+n+"}",templateUrl:"app/request/get.html",controller:"RequestGetCtrl",resolve:{object:["factory","$stateParams",function(e,t){return e.get(t.id)}]}}),t.otherwise("/robots")}])}(),function(){"use strict";function e(e){var t=e.replace(/^\s*/,"");return t=t.replace(/^[a-z]|[^\s][A-Z]/g,function(e,t){return 0===t?e.toUpperCase():e.substr(0,1)+" "+e.substr(1).toUpperCase()})}function t(){return function(t){return e(t)}}angular.module("angularJsonapiExample").constant("toTitleCase",e).filter("toTitleCase",t)}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/components/test-form/test-form.html",scope:{object:"="},controller:["$scope","$interval",function(e,t){angular.forEach(e.object.form.data,function(t,n){e.$watch("object.form.data."+n,function(t,i){t!==i&&e.object.form.validateField(n)})}),e.isArray=angular.isArray,t(function(){e.updateDiff=(Date.now()-e.object.updatedAt)/1e3},100)}]}}angular.module("angularJsonapiExample").directive("testForm",e)}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/components/test-form/test-form-new.html",scope:{object:"="},controller:["$scope","$interval",function(e,t){}]}}angular.module("angularJsonapiExample").directive("testFormNew",e)}(),function(){"use strict";function e(){function e(e){e.schema.polymorphic===!0?e.contentUrl="app/components/search/search-polymorphic.html":e.contentUrl="app/components/search/search.html"}function t(e,t,n){function i(e){return 0===Object.keys(e).length}function o(t){function n(){e.loading=!1,e.input=""}function i(t){e.loading=!1,e.error=!0,e.errorText=t[0].statusText}e.loading=!0,e.object.link(e.key,t).then(n,i),e.show=!1}function a(){e.error=!1,e.show=!0}function s(){e.show=!1}function r(t){e.input=t}function l(i){n(function(){e.collection=t.getResource(i).all().data})}e.schema=e.object.schema.relationships[e.key],e.schema.polymorphic?(e.collections={},angular.forEach(t.allResources(),function(t,n){e.collections[n]=t.cache.index()})):(e.model=e.schema.model,e.collection=t.getResource(e.model).cache.index()),e.show=!1,e.isEmpty=i,e.addLink=o,e.showResults=a,e.hideResults=s,e.setInput=r,e.getIndex=l}return t.$inject=["$scope","$jsonapi","$timeout"],{restrict:"E",template:'<div ng-include="contentUrl"></div>',controller:t,link:e,scope:{object:"=",key:"="}}}angular.module("angularJsonapiExample").directive("angularJsonapiSearch",e)}(),function(){"use strict";function e(e){var t=e.listResources();return function(e,n,i,o){if(void 0!==e){if(!n)return o===!0?[]:angular.isArray(i)?e.filter(function(e){return-1===i.indexOf(e)}):e;var a,s=[],r=n.split(" ");if(o===!1)a=n,angular.forEach(e,function(e){-1===i.indexOf(e)&&e.toString().toLowerCase().indexOf(a.toLowerCase())>-1&&s.push(e)});else if(r.length>1)a=r.splice(1).join(" "),angular.forEach(e,function(e){-1===i.indexOf(e)&&e.toString().toLowerCase().indexOf(a.toLowerCase())>-1&&s.push(e)});else if(t.indexOf(r[0])>-1)return angular.isArray(i)?e.filter(function(e){return-1===i.indexOf(e)}):e.filter(function(e){return i!==e});return s}}}angular.module("angularJsonapiExample").filter("angularJsonapiSearchObject",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(){return function(e,t){if(!t)return e;var n={},i=t.split(" ");return angular.forEach(e,function(e,t){t.indexOf(i[0])>-1&&(n[t]=e)}),n}}angular.module("angularJsonapiExample").filter("angularJsonapiSearchCollection",e)}(),function(){"use strict";angular.module("promise-button",[])}(),function(){"use strict";function e(e,t){function n(n,i){var o=i.loadingClass||"loading",a=i.errorClass||"negative",s=i.successClass||"positive",r=e(i.ngClick,null,!0);return function(e,n){function i(l){function c(e){return n.removeClass(o),n.addClass(s),n.on("click",i),e}function u(e){return n.removeClass(o),n.addClass(a),n.on("click",i),e}l.preventDefault(),l.stopImmediatePropagation(),n.off("click");var d=function(){n.addClass(o),n.removeClass(a),n.removeClass(s),t.resolve(r(e,{$event:l})).then(c,u)};e.$apply(d)}n.on("click",i)}}return{restrict:"A",priority:-1,compile:n}}angular.module("promise-button").directive("promiseButton",e),e.$inject=["$parse","$q"]}(),function(){"use strict";function e(e){function t(e,t){function n(n){n===!0?(e.updateDiff=(Date.now()-e.object.updatedAt)/1e3,i=t(function(){e.updateDiff=(Date.now()-e.object.updatedAt)/1e3},100)):n===!1&&t.cancel(i)}var i;e.showMore=!1,e.isArray=angular.isArray,e.$watch("showMore",n),e.$on("close",function(){e.showMore=!1}),e.equals=angular.equals}return t.$inject=["$scope","$interval"],{restrict:"E",templateUrl:"app/components/object/object.html",scope:{object:"=data",unlink:"&",nested:"="},require:"^angularJsonapiObject",compile:e.compile,controller:t}}angular.module("angularJsonapiExample").directive("angularJsonapiObject",e),e.$inject=["RecursionHelper"]}(),function(){"use strict";function e(e,t){function n(e){function t(e){return void 0===e||null===e||angular.isArray(e)&&0===e.length}e.isArray=angular.isArray,e.emptyRelationship=t,e.form=void 0!==e.object.parent}return n.$inject=["$scope"],{restrict:"E",templateUrl:"app/components/object/object-relationships.html",scope:{object:"=data"},compile:e.compile,controller:n}}angular.module("angularJsonapiExample").directive("angularJsonapiObjectRelationships",e),e.$inject=["RecursionHelper","AngularJsonAPIModelForm"]}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/components/error-message/error-message.html",scope:{errors:"=data"}}}angular.module("angularJsonapiExample").directive("errorMessage",e)}(),function(){"use strict";function e(){function e(e){e.isObject=angular.isObject,e.isString=angular.isString}return e.$inject=["$scope"],{restrict:"E",templateUrl:"app/components/error-message/error-list.html",scope:{errors:"=data"},controller:e}}angular.module("angularJsonapiExample").directive("errorList",e)}(),function(){"use strict";function e(e,t){return{restrict:"E",templateUrl:"app/components/collection/collection.html",scope:{collection:"=data"},compile:e.compile,controller:["$scope","$interval",function(e,n){function i(){e.$broadcast("close")}function o(){t.clearCache()}function a(){e.newObjects.push(e.collection.factory.initialize())}n(function(){e.updateDiff=(Date.now()-e.collection.updatedAt)/1e3},100),e.newObjects=[],e.close=i,e.clear=o,e.add=a}]}}angular.module("angularJsonapiExample").directive("angularJsonapiCollection",e),e.$inject=["RecursionHelper","$jsonapi"]}(),function(){"use strict";function e(){function e(e){}return e.$inject=["$scope"],{restrict:"A",controller:e,templateUrl:"app/components/attribute-field/attribute-field.html",scope:{object:"=",key:"="}}}angular.module("promise-button").directive("attributeField",e)}(),function(){"use strict";function e(e){return e.getResource("spaceships")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"spaceships",id:"uuid4",attributes:{name:{presence:!0,length:{maximum:20,minimum:3}},durability:{presence:!0,numericality:{onlyInteger:!0}},quality:{presence:!0,numericality:{onlyInteger:!0}}},relationships:{pilot:{included:!0,type:"hasOne",reflection:"spaceships",polymorphic:!0},spaceshipModel:{included:!0,type:"hasOne"},location:{included:!0,type:"hasOne",reflection:"entity"}},functions:{toString:function(){return this.data.attributes.name?this.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/spaceships"),l=i.create([s,r]);e.addResource(a,l)}]).factory("Spaceships",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("spaceshipModels")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"spaceshipModels",id:"uuid4",attributes:{name:{presence:!0,length:{maximum:20,minimum:3}},code:{presence:!0,length:{maximum:20,minimum:3}},speed:{presence:!0,numericality:{onlyInteger:!0}},cargo:{presence:!0,numericality:{onlyInteger:!0}},type:{presence:!0,length:{maximum:20,minimum:3}}},relationships:{spaceships:{included:!0,type:"hasMany"}},functions:{toString:function(){return this.data.attributes.name?this.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/spaceshipModels"),l=i.create([s,r]);e.addResource(a,l)}]).factory("SpaceshipModels",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("robots")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"robots",id:"uuid4",attributes:{nameFirst:{presence:!0,length:{maximum:20,minimum:3}},nameLast:{presence:!0,length:{maximum:20,minimum:3}},creationDate:{datetime:!0},pictureUrl:{presence:!0}},relationships:{location:{included:!0,type:"hasOne",reflection:"entity"},robotModel:{included:!0,type:"hasOne"},job:{included:!0,type:"hasOne"},laserGuns:{included:!0,type:"hasMany",reflection:"owner"},powerArmors:{included:!0,type:"hasMany",reflection:"owner"},spaceships:{included:!0,type:"hasMany",reflection:"pilot"}},include:{get:["location.planet"]},functions:{toString:function(){return this.data.attributes.nameFirst||this.data.attributes.nameLast?this.data.attributes.nameFirst+this.data.attributes.nameLast:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/robots"),l=i.create([s,r]);e.addResource(a,l)}]).factory("Robots",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("robotModels")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"robotModels",id:"uuid4",attributes:{name:{presence:!0,length:{maximum:20,minimum:3}},code:{presence:!0,length:{maximum:20,minimum:3}}},relationships:{robots:{included:!0,type:"hasMany"}},functions:{toString:function(){return this.data.attributes.name?this.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/robotModels"),l=i.create([s,r]);e.addResource(a,l)}]).factory("RobotModels",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("powerArmors")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"powerArmors",id:"uuid4",attributes:{name:{presence:!0,length:{maximum:20,minimum:3}},durability:{presence:!0,numericality:{onlyInteger:!0}},quality:{presence:!0,numericality:{onlyInteger:!0}},armor:{presence:!0,numericality:{onlyInteger:!0}},type:{presence:!0,length:{maximum:20,minimum:3}},rarity:{presence:!0,length:{maximum:20,minimum:3}}},relationships:{owner:{included:!0,type:"hasOne",polymorphic:!0}},functions:{toString:function(){return this.data.attributes.name?this.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/powerArmors"),l=i.create([s,r]);e.addResource(a,l)}]).factory("PowerArmors",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("planets")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"planets",id:"uuid4",attributes:{name:{presence:!0,length:{maximum:20,minimum:3}},cordsX:{presence:!0,numericality:{onlyInteger:!0}},cordsY:{presence:!0,numericality:{onlyInteger:!0}},cordsZ:{presence:!0,numericality:{onlyInteger:!0}},size:{presence:!0,numericality:{onlyInteger:!0}}},relationships:{locations:{included:!0,type:"hasMany"}},functions:{toString:function(){return this.data.attributes.name?this.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/planets"),l=i.create([s,r]);e.addResource(a,l)}]).factory("Planets",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("locations")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"locations",id:"uuid4",attributes:{cordsX:{presence:!0,numericality:{onlyInteger:!0}},cordsY:{presence:!0,numericality:{onlyInteger:!0}}},relationships:{planet:{included:!0,type:"hasOne"},entity:{included:!0,type:"hasOne",polymorphic:!0,reflection:"location"}},functions:{toString:function(){return this.relationships.planet&&this.relationships.planet.data.attributes.name?this.relationships.planet.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/locations"),l=i.create([s,r]);e.addResource(a,l)}]).factory("Locations",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("laserGuns")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"laserGuns",id:"uuid4",attributes:{name:{presence:!0,length:{maximum:20,minimum:3}},durability:{presence:!0,numericality:{onlyInteger:!0}},quality:{presence:!0,numericality:{onlyInteger:!0}},power:{presence:!0,numericality:{onlyInteger:!0}},type:{presence:!0,length:{maximum:20,minimum:3}},rarity:{presence:!0,length:{maximum:20,minimum:3}}},relationships:{owner:{included:!0,type:"hasOne",polymorphic:!0}},functions:{toString:function(){return this.data.attributes.name?this.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/laserGuns"),l=i.create([s,r]);e.addResource(a,l)}]).factory("Jobs",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(e){return e.getResource("jobs")}angular.module("angularJsonapiExample").run(["$jsonapi","AngularJsonAPISynchronizationLocal","AngularJsonAPISynchronizationRest","AngularJsonAPISynchronizerSimple","apiURL",function(e,t,n,i,o){var a={type:"jobs",id:"uuid4",attributes:{name:{presence:!0,length:{maximum:20,minimum:3}},salary:{presence:!0,numericality:{onlyInteger:!0}}},relationships:{robots:{included:!0,type:"hasMany"}},functions:{toString:function(){return this.data.attributes.name?this.data.attributes.name:this.data.id}}},s=t.create("LocalStore synchronization","AngularJsonAPI"),r=n.create("Rest synchronization",o+"/jobs"),l=i.create([s,r]);e.addResource(a,l)}]).factory("Jobs",e),e.$inject=["$jsonapi"]}(),function(){"use strict";function e(){function e(e,t){e.names=t.listResources()}return e.$inject=["$scope","$jsonapi"],{restrict:"E",templateUrl:"app/sidebar/sidebar.html",controller:e,replace:!0}}angular.module("angularJsonapiExample").directive("sidebar",e)}(),function(){"use strict";function e(){}angular.module("angularJsonapiExample").controller("RequestCtrl",e)}(),function(){"use strict";function e(e,t){e.object=t}angular.module("angularJsonapiExample").controller("RequestGetCtrl",e),e.$inject=["$scope","object"]}(),function(){"use strict";function e(e,t){e.collection=t}angular.module("angularJsonapiExample").controller("RequestAllCtrl",e),e.$inject=["$scope","collection"]}(),function(){"use strict";function e(e,t){t.names=e.listResources()}angular.module("angularJsonapiExample").controller("FrameCtrl",e),e.$inject=["$jsonapi","$scope"]}(),function(){"use strict";function e(e,t){function n(t,n){var i=e.$on("angularJsonAPI:"+n+":"+t,function(e,t,n,i){});s.push(i)}function i(){angular.forEach(s,function(e){e()})}var o=["resource:init","resource:clearCache","resource:initialize","object:add","object:update","object:refresh","object:remove","object:link","object:linkReflection","object:unlink","object:include","object:unlinkReflection","collection:fetch"],a=t.listResources(),s=[];angular.forEach(o,function(e){angular.forEach(a,function(t){n(e,t)})}),e.$on("$destroy",i)}angular.module("angularJsonapiExample").run(e),e.$inject=["$rootScope","$jsonapi"]}(),function(){"use strict";angular.module("angularJsonapiExample").constant("_",_).constant("apiURL","http://jsonapi-robot-wars.herokuapp.com")}(),function(){"use strict";var e=angular.module("angularJsonapiExample");$.each($.site.settings.modules,function(t,n){var i=$.fn[n],o="ui"+n.charAt(0).toUpperCase()+n.substring(1);e.directive(o,["$timeout","_","$rootScope",function(e,t,o){return{restrict:"A",seModule:{name:n,fn:i},scope:{options:"&",arguments:"=",ngModel:"="},link:function(i,a){i.options||(i.options={}),i.options.directive=i,i.options.onChange=function(t){e(function(){i.ngModel=t})},e(function(){var e=$(a)[n](t.clone(i.options));void 0!==i.arguments&&$(a)[n].apply(e,i.arguments)},300),o.$on("semantic-ui:reload",function(){e(function(){var e=$(a)[n](t.clone(i.options));void 0!==i.arguments&&$(a)[n].apply(e,i.arguments)},300)})}}}])})}(),angular.module("angularJsonapiExample").run(["$templateCache",function(e){e.put("app/footer/footer.html",""),e.put("app/frame/frame.html",'<header class="ui container"><div class="ui secondary pointing menu"><a class="toc item"><i class="sidebar icon"></i></a> <a ng-repeat="name in names" class="item" ui-sref="frame.request.all({type: name})" ui-sref-active="active">{{name}}</a><div class="right item"><a href="mailto:jakubrohleder@gmail.com?subject=Angular JsonAPI"><i class="mail outline icon"></i> Any questions? Contact me!</a></div></div><div class="ui divider hidden"></div></header><main ui-view="" class="ui container"></main><footer></footer>'),e.put("app/frame/hello.html",'<div class="center aligned column"><h1 class="ui icon header">Angular-jsonapi showcase</h1><p>Go to one of the models in the menu and check out how this package works.</p><p>If you want to use it yourself check <a href="https://github.com/jakubrohleder/angular-jsonapi">github readme</a> and <a href="https://github.com/jakubrohleder/angular-jsonapi/tree/master/demo/app">source code</a> of this demo.</p></div>'),e.put("app/request/all.html",'<h2>All</h2><angular-jsonapi-collection data="collection"></angular-jsonapi-collection>'),e.put("app/request/get.html","<h2>Get</h2><p>{{object.toString()}}</p>"),e.put("app/sidebar/sidebar.html",'<div ui-sidebar="" class="ui vertical inverted sidebar menu left" arguments="[\'attach events\', \'.toc.item\']"><a class="item logo" ui-sref="frame.hello" ui-sref-active="active">Angular JSON API demo</a> <a ng-repeat="name in names" class="item" ui-sref="frame.request.all({type: name})" ui-sref-active="active">{{name}}</a></div>'),e.put("app/components/attribute-field/attribute-field.html",'<div class="field" ng-class="{ error: object.errors.validation.hasErrors(key), success: !object.errors.validation.hasErrors(key) && object.form.data.attributes[key] !== object.data.attributes[key] }"><label>{{key | toTitleCase}}</label> <input type="text" name="{{key}}" ng-model="object.form.data.attributes[key]" ng-model-options="{ updateOn: \'default blur\', debounce: { \'default\': 500, \'blur\': 0 } }" ng-change="object.form.validate(key)"><div class="ui error message" ng-show="object.errors.validation.hasErrors(key)"><ul class="list"><li ng-repeat="error in object.errors.validation.errors[key]">{{error.message}}</li></ul></div></div>'),e.put("app/components/collection/collection.html",'<h3 class="h3">{{collection.type}}</h3><small>Loading {{collection.loadingCount}}:{{collection.loading}}</small><div class="row"><div class="ui mini icon input"><input type="text" placeholder="Object ID" ng-model="getInput"> <i class="search icon"></i></div><button promise-button="" class="ui button mini primary" ng-click="collection.get(getInput)">Get</button> <button promise-button="" class="ui button mini green" ng-click="collection.refresh()">Refresh</button> <button class="ui button mini yellow" ng-click="add()">Add</button><div class="ui red basic mini right floated button" ng-hide="collection.synchronized">Synchronizing...</div><div class="ui basic mini right floated button" ng-show="collection.synchronized" ng-class="{ green: updateDiff <= 30, yellow: updateDiff > 30 && updateDiff < 240, red: updateDiff >= 240 }">Synchronized {{updateDiff}} s. ago</div></div><div class="ui divider"></div><error-message ng-show="collection.hasErrors()" data="collection.errors"></error-message><div ng-show="collection.error" class="ui divider hidden"></div><div class="collection" ng-show="filteredObjects.length > 0"><h3>New objects</h3><angular-jsonapi-object nested="false" data="object" ng-repeat="object in filteredObjects = (newObjects | filter: {saved: false})"></angular-jsonapi-object></div><div class="collection"><h3>All objects</h3><div ng-show="collection.pristine && collection.loading" class="ui large active text loader">Loading collection for the first time</div><div ng-show="collection.pristine && !collection.loading" class="ui large active text loader">Collection not synchronized, refresh it to fetch data</div><angular-jsonapi-object nested="false" data="object" ng-repeat="object in collection.data"></angular-jsonapi-object><div class="ui basic segment fixed bottom"><div class="ui black button" ng-click="close()">Close all models</div><div class="ui grey button" ng-click="clear()">Clear cache</div></div></div>'),e.put("app/components/error-message/error-list.html",'<div class="ui list"><div class="item" ng-repeat="errorManager in errors track by errorManager.name" ng-show="errorManager.hasErrors()"><i class="thumbs outline down icon"></i><div class="content"><div class="header">{{errorManager.name}}</div><div class="description">{{errorManager.description}}</div><div class="list"><div class="item" ng-repeat="(key, errors) in errorManager.errors" ng-show="errorManager.hasErrors(key)"><div class="content"><div class="header">{{key}}</div><div class="list"><div class="item" ng-repeat="error in errors"><i class="warning icon"></i><div class="content"><div class="description">{{error.message}}</div></div></div></div></div></div></div></div></div></div>'),e.put("app/components/error-message/error-message.html",'<div class="ui error message"><div class="header">There were some errors:</div><div class="ui divider"></div><error-list data="errors"></error-list></div>'),e.put("app/components/object/object-relationships.html",'<div class="ui padded segment" ng-repeat="(relationshipName, relationshipCollection) in object.relationships" ng-class="{red: form}"><div class="ui stackable grid"><div class="four wide column" style="padding-left:0"><h4 style="margin-bottom: 0;" clip-copy="object.data.id">{{object.schema.relationships[relationshipName].model}}</h4><small ng-show="object.schema.relationships[relationshipName].polymorphic">polymorphic</small></div><div class="twelve wide column"><button class="ui mini green left floated button" ng-hide="object.schema.relationships[relationshipName].polymorphic" ng-click="expression">Create new {{object.schema.relationships[relationshipName].model}}</button><angular-jsonapi-search object="object" key="relationshipName" class="ui left floated"></angular-jsonapi-search><button class="ui mini primary right floated button" ng-hide="object.schema.relationships[relationshipName].polymorphic" ui-sref="frame.request.all({type: object.schema.relationships[relationshipName].model})">Go to {{object.schema.relationships[relationshipName].model}}</button></div></div><div class="ui divider hidden"></div><div ng-show="object.new === true && form === false"><strong>Relationship data locked for new object</strong><div>This object is new, you can only add relationships to its form.</div></div><div ng-show="object.new === false && relationshipCollection === undefined"><strong>Relationship data undefined</strong><div>The relationship data hasn\'t been fetched yet, refresh the model to fetch it.</div></div><div ng-show="object.new === false &&relationshipCollection === null"><strong>Has one relationship null</strong><div>Set something as relationship object.</div></div><div ng-show="(object.new === false || (object.parent.new === true && form === true)) && isArray(relationshipCollection) && relationshipCollection.length === 0"><strong>Has many relationship empty</strong><div>Add something to the relationship array.</div></div><angular-jsonapi-object data="relationshipObject" nested="true" unlink="object.unlink(relationshipName, relationshipObject)" ng-if="relationshipCollection !== undefined && isArray(relationshipCollection)" ng-repeat="relationshipObject in relationshipCollection"></angular-jsonapi-object><angular-jsonapi-object data="relationshipCollection" nested="true" unlink="object.unlink(relationshipName, relationshipCollection)" ng-if="relationshipCollection !== undefined && !isArray(relationshipCollection) && relationshipCollection !== null"></angular-jsonapi-object></div>'),e.put("app/components/object/object.html",'<div class="ui padded segment"><div class="ui stackable grid"><div class="four wide column" style="padding: 0;"><small>Loading {{object.loadingCount}}:{{object.loading}} Saving {{object.savingCount}}:{{object.saving}}</small><h4 style="margin-bottom: 0; margin-top: 0;" clip-copy="object.data.id">{{object.toString()}}</h4><small>{{object.data.type}}:{{object.data.id}}</small></div><div class="twelve wide column"><button class="ui mini button" ng-init="showMore = $parent.$first && !nested" ng-click="showMore = !showMore" ng-class="{yellow: showMore, olive: !showMore, disabled: object.removed}">Show more</button> <button ng-class="{disabled: object.removed}" class="ui primary mini button" clip-copy="object.data.id">Copy ID</button> <button promise-button="" ng-class="{disabled: object.removed}" class="ui green mini button" ng-click="object.refresh()">Refresh</button> <button promise-button="" ng-class="{disabled: object.removed}" class="ui orange mini button" ng-show="nested" ng-click="unlink()">Unlink</button> <button promise-button="" ng-class="{disabled: object.removed}" class="ui red mini button" ng-click="object.remove()" ng-hide="object.removed">Remove</button> <button promise-button="" ng-class="{red: !object.stable, green: object.stable}" class="ui mini basic button">Stable</button> <button promise-button="" ng-class="{red: !object.new, green: object.new}" class="ui mini basic button">New</button><div class="ui red basic mini right floated button" ng-hide="object.synchronized">Not synchronized</div><div class="ui basic green mini right floated button" ng-if="!showMore" ng-show="object.synchronized">Synchronized</div><div class="ui basic mini right floated button" ng-if="showMore" ng-show="object.synchronized" ng-class="{ green: updateDiff <= 30, yellow: updateDiff > 30 && updateDiff < 240, red: updateDiff >= 240 }">Synchronized {{updateDiff}} s. ago</div></div></div><div ng-if="showMore"><div class="ui divider hidden"></div><div ng-show="object.hasErrors()"><error-message data="object.errors"></error-message><div class="ui divider hidden"></div></div><div class="ui stackable grid"><div class="eight wide column"><div class="ui segment"><h4>Data</h4><div class="ui basic mini button" style="position: absolute; top: 10px; right: 10px;" ng-class="{purple: !showFormRelationships}" ng-click="showFormRelationships = !showFormRelationships">Show relationships</div><div class="ui list"><div class="item" ng-repeat="(attributeName, attributeValue) in object.data.attributes"><div class="content"><div class="header">{{attributeValue}}</div><div class="description">{{attributeName | toTitleCase}}</div></div></div><div class="item"><div class="content"><div class="header">Relationships</div><div class="description"><json-formatter json="object.data.relationships" open="0"></json-formatter></div></div></div></div></div></div><div class="eight wide column"><div class="ui segment" ng-class="{loading: !object.synchronized && !object.new}"><h4>Form</h4><div class="ui basic mini button" style="position: absolute; top: 10px; right: 10px;" ng-class="{purple: showFormRelationships}" ng-click="showFormRelationships = !showFormRelationships">Show relationships</div><form class="ui small form" ng-class="{error: object.error}"><div attribute-field="" key="attributeKey" object="object" ng-repeat="(attributeKey, attributeValue) in object.form.data.attributes"></div><div class="ui divider hidden"></div><button promise-button="" ng-class="{disabled: object.removed}" class="ui blue mini button" ng-click="object.save()">Save</button> <button promise-button="" ng-class="{disabled: object.removed}" class="ui red mini button" ng-click="object.reset()">Reset</button></form></div></div></div><div class="ui divider hidden"></div><angular-jsonapi-object-relationships ng-hide="showFormRelationships" data="object"></angular-jsonapi-object-relationships><angular-jsonapi-object-relationships ng-show="showFormRelationships" data="object.form"></angular-jsonapi-object-relationships></div></div><div ng-show="showMore" class="ui divider hidden"></div>'),e.put("app/components/search/search-polymorphic.html",'<div class="ui category search focus"><div class="ui mini left icon input" ng-class="{loading: loading, error: error, \'right action\': show}"><input ng-focus="showResults()" ng-model="input" placeholder="Add {{object.schema.relationships[key].model}}" autocomplete="off" ng-disabled="loading"> <i class="plus icon"></i> <button class="ui red mini icon button" ng-show="show" ng-focus="hideResults()"><i class="remove icon"></i></button></div><div class="ui left pointing red basic label" ng-show="error">{{errorText}}</div><div class="results" ng-show="show"><div class="category" ng-repeat="(name, collection) in filteredCollections = (collections | angularJsonapiSearchCollection : input)"><div class="name" ng-click="setInput(\'\')">{{name}}</div><a class="result" ng-repeat="object in filteredCollection = (collection | angularJsonapiSearchObject : input : object.relationships[key] : true)" ng-click="addLink(object)"><div class="content"><div class="title">{{object.toString()}}</div><div class="description">{{object.data.id}}</div></div></a> <a class="result" ng-show="filteredCollection.length === 0" ng-click="setInput(name)"><div class="content"><div class="title">{{collection.length}} objects</div><div class="description">Type full name of model to unroll or typeahead with new word</div></div></a></div><div class="message empty" ng-show="isEmpty(filteredCollections)"><div class="header">No Results</div><div class="description">Your search returned no results</div></div></div></div>'),
e.put("app/components/search/search.html",'<div class="ui category search focus"><div class="ui mini left icon input" ng-class="{loading: loading, error: error, \'right action\': show}"><input ng-focus="showResults()" ng-model="input" placeholder="Add {{object.schema.relationships[key].model}}" autocomplete="off" ng-disabled="loading || object.relationships[key] === undefined || object.saved === false"> <i class="plus icon"></i> <button class="ui red mini icon button" ng-show="show" ng-focus="hideResults()"><i class="remove icon"></i></button></div><div class="ui left pointing red basic label" ng-show="error">{{errorText}}</div><div class="results" ng-show="show"><div class="category"><div class="name" ng-click="setInput(\'\')">{{model}}</div><a class="result" ng-repeat="object in filteredCollection = (collection | angularJsonapiSearchObject : input : object.relationships[key] : false)" ng-click="addLink(object)"><div class="content"><div class="title">{{object.toString()}}</div><div class="description">{{object.data.id}}</div></div></a> <a class="result" ng-show="filteredCollection.length === 0" ng-click="setInput(model)"><div class="content"><div class="title">{{collection.length}} objects</div><div class="description">Type full name of model to unroll or typeahead with new word</div></div></a> <a class="result" ng-show="filteredCollection === undefined" ng-click="getIndex(model)"><div class="content"><div class="title">Not synchronized</div><div class="description">These collection hasn\'t been synchronized yet by ALL request, click to do it.</div></div></a></div></div></div>'),e.put("app/components/test-form/test-form-new.html",'<div><h3>New</h3><form name="form"><div ng-repeat="(attribute, value) in object.form.data.attributes" class="form-group"><input ng-model-options="{ debounce: 100 }" type="text" class="form-control" id="{{attribute}}" ng-model="object.form.data.attributes[attribute]" placeholder="{{attribute}}"> <span id="helpBlock" ng-repeat="error in object.form.errors.validation[attribute]" class="help-block">{{error}}</span></div><button ng-click="object.form.save()" class="btn btn-primary">Add</button></form></div>'),e.put("app/components/test-form/test-form.html",'<div><br><small clip-copy="object.data.id">Id: {{object.data.id}}</small> <button class="btn btn-default btn-xs" clip-copy="object.data.id">Copy ID</button><br><small>Updated {{updateDiff}} seconds from now</small><hr><div ng-init="collapsedEdit=true" ng-click="collapsedEdit=!collapsedEdit"><span class="h3" style="margin-right:15px;">Edit</span> <span ng-show="collapsedEdit" class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span ng-hide="collapsedEdit" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></div><form collapse="collapsedEdit"><br><div ng-repeat="(attribute, value) in object.form.data.attributes" class="form-group"><input ng-model-options="{ debounce: 100 }" type="text" class="form-control" id="{{attribute}}" ng-model="object.form.data.attributes[attribute]" placeholder="{{attribute}}"> <span id="helpBlock" ng-repeat="error in object.form.errors.validation[attribute]" class="help-block">{{error}}</span></div><button ng-click="object.form.save()" class="btn btn-primary">Update</button> <button ng-click="object.remove()" class="btn btn-danger">Remove</button> <button ng-click="object.refresh()" class="btn btn-default">Refresh</button></form><hr><div ng-init="collapsedLinks=false" ng-click="collapsedLinks=!collapsedLinks"><span class="h3" style="margin-right:15px;">Links</span> <span ng-show="collapsedLinks" class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span ng-hide="collapsedLinks" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></div><div collapse="collapsedLinks"><div ng-repeat="(link, value) in object.relationships"><div ng-if="isArray(value)"><h4>{{link}} hasMany</h4><div class="row" ng-repeat="value in value"><div class="col-md-12"><p clip-copy="value.data.id" class="pull-left">{{value.toString()}}</p><button clip-copy="value.data.id" class="btn btn-default btn-xs">copy id</button> <button ng-click="object.removeLink(link, value)" class="btn btn-danger btn-xs pull-right">Remove</button></div></div></div><div ng-if="!isArray(value)"><h4>{{link}} hasOne</h4><div ng-if="value" class="row"><div class="col-md-12"><p clip-copy="value.data.id" class="pull-left">{{value.toString()}}</p><button clip-copy="value.data.id" class="btn btn-default btn-xs">copy id</button> <button ng-click="object.removeLink(link, value)" class="btn btn-danger btn-xs pull-right">Remove</button></div></div></div><form class="form-inline"><div class="form-group"><input type="text" class="form-control input-sm" ng-model="uuids[link]" placeholder="uuid4"></div><button class="btn btn-primary btn-sm pull-right" ng-click="object.addLinkById(link, object.schema.relationships[link].model, uuids[link])" type="button">Add</button></form></div></div><hr><h3>Json</h3><json-formatter json="object" open="0"></json-formatter><hr></div>')}]);
//# sourceMappingURL=../maps/scripts/app-a56aa91205.js.map