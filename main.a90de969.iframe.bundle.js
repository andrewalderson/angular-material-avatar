(self.webpackChunkangular_material_avatar=self.webpackChunkangular_material_avatar||[]).push([[179],{"./packages/material/avatar/src/lib/avatar.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithCustomFallback:()=>WithCustomFallback,WithDefaultFallback:()=>WithDefaultFallback,WithImage:()=>WithImage,WithInitialsFallback:()=>WithInitialsFallback,default:()=>lib_avatar_component_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),avatar_component_stories=__webpack_require__("./packages/material/avatar/src/lib/avatar.component.stories.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICBoZWlnaHQ6IDgwJTsKICAgICAgICB3aWR0aDogODAlOwogICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7CiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsKICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50OwogICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICAgICAgfQogICAg!./packages/material/avatar/src/lib/avatar.component.stories.ts"),avatar_component_stories_default=__webpack_require__.n(avatar_component_stories),core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs"),client=__webpack_require__("./node_modules/@storybook/angular/dist/ts3.9/client/index.js"),classPrivateFieldInitSpec=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/classPrivateFieldInitSpec.js"),classPrivateFieldGet=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js"),classPrivateFieldSet=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js"),BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js");var _class,_changeDetectorRef,_elementRef2,_useFallback,_customColors,_destroyed,avatar_componentngResource=__webpack_require__("./packages/material/avatar/src/lib/avatar.component.scss?ngResource"),avatar_componentngResource_default=__webpack_require__.n(avatar_componentngResource),coercion=__webpack_require__("./node_modules/@angular/cdk/fesm2020/coercion.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2020/common.mjs"),fesm2020_core=__webpack_require__("./node_modules/@angular/material/fesm2020/core.mjs"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),takeUntil=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");let MatxAvatarFallbackDirective=class MatxAvatarFallbackDirective{};MatxAvatarFallbackDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[matxAvatarFallback]",standalone:!0})],MatxAvatarFallbackDirective);const _MatxAvatarMixin=(0,fesm2020_core.pj)(class{constructor(_elementRef){this._elementRef=_elementRef}});let MatxAvatarComponent=(_changeDetectorRef=new WeakMap,_elementRef2=new WeakMap,_useFallback=new WeakMap,_customColors=new WeakMap,_destroyed=new WeakMap,(_class=class MatxAvatarComponent extends _MatxAvatarMixin{get unthemedClass(){return!this.color}get useFallback(){return(0,classPrivateFieldGet.Z)(this,_useFallback)}constructor(elementRef){super(elementRef),(0,classPrivateFieldInitSpec.Z)(this,_changeDetectorRef,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_elementRef2,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_useFallback,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_customColors,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_destroyed,{writable:!0,value:void 0}),(0,classPrivateFieldSet.Z)(this,_changeDetectorRef,(0,core.inject)(core.ChangeDetectorRef)),(0,classPrivateFieldSet.Z)(this,_elementRef2,(0,core.inject)(core.ElementRef)),(0,classPrivateFieldSet.Z)(this,_useFallback,!0),(0,classPrivateFieldSet.Z)(this,_customColors,null),(0,classPrivateFieldSet.Z)(this,_destroyed,new Subject.x)}ngOnChanges(changes){const color=changes.color;color&&(color.currentValue?this._removeCustomColors():(0,classPrivateFieldGet.Z)(this,_customColors)&&this._setCustomAvatarColors((0,classPrivateFieldGet.Z)(this,_customColors)))}ngOnDestroy(){(0,classPrivateFieldGet.Z)(this,_destroyed).next(),(0,classPrivateFieldGet.Z)(this,_destroyed).complete()}_registerImage(image){image.ready.pipe((0,takeUntil.R)((0,classPrivateFieldGet.Z)(this,_destroyed))).subscribe((ready=>{(0,classPrivateFieldSet.Z)(this,_useFallback,!ready),(0,classPrivateFieldGet.Z)(this,_changeDetectorRef).markForCheck()}))}_setCustomAvatarColors(colors){if((0,classPrivateFieldSet.Z)(this,_customColors,colors),!this.color){const style=(0,coercion.fI)((0,classPrivateFieldGet.Z)(this,_elementRef2)).style;style.setProperty("--matx-avatar-color",colors.foreground),style.setProperty("--matx-avatar-background-color",colors.background),style.setProperty("--matx-avatar-border-color",colors.border??colors.foreground)}}_removeCustomColors(reset=!1){const style=(0,coercion.fI)((0,classPrivateFieldGet.Z)(this,_elementRef2)).style;style.removeProperty("--matx-avatar-color"),style.removeProperty("--matx-avatar-background-color"),style.removeProperty("--matx-avatar-border-color"),reset&&(0,classPrivateFieldSet.Z)(this,_customColors,null)}}).ctorParameters=()=>[{type:core.ElementRef}],_class.propDecorators={unthemedClass:[{type:core.HostBinding,args:["class.mat-unthemed"]}],_customFallback:[{type:core.ContentChild,args:[MatxAvatarFallbackDirective]}]},_class);var avatar_image_directive_class,_avatar,_ready;MatxAvatarComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"matx-avatar",standalone:!0,imports:[common.ez],template:'<ng-container *ngIf="!useFallback else fallback">\n    <ng-content select="img[matxAvatarImage]" />\n</ng-container>\n<ng-template #fallback>\n    <svg xmlns="http://www.w3.org/2000/svg" *ngIf="!_customFallback" role="img" viewBox="0 0 128 128"\n        fill="currentColor" width="100%" height="100%" data-testid="default-fallback">\n        <path\n            d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />\n        <path\n            d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />\n    </svg>\n    <ng-content select="[matxAvatarFallback]" />\n</ng-template>',encapsulation:core.ViewEncapsulation.ShadowDom,changeDetection:core.ChangeDetectionStrategy.OnPush,inputs:["color"],styles:[avatar_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[core.ElementRef])],MatxAvatarComponent);let MatxAvatarImageDirective=(_avatar=new WeakMap,_ready=new WeakMap,(avatar_image_directive_class=class MatxAvatarImageDirective{constructor(){(0,classPrivateFieldInitSpec.Z)(this,_avatar,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_ready,{writable:!0,value:void 0}),(0,classPrivateFieldSet.Z)(this,_avatar,(0,core.inject)(MatxAvatarComponent)),(0,classPrivateFieldSet.Z)(this,_ready,new BehaviorSubject.X(!1)),this.ready=(0,classPrivateFieldGet.Z)(this,_ready).asObservable().pipe((0,distinctUntilChanged.x)())}loadHandler(){(0,classPrivateFieldGet.Z)(this,_ready).next(!0)}errorHandler(){(0,classPrivateFieldGet.Z)(this,_ready).next(!1)}ngOnInit(){(0,classPrivateFieldGet.Z)(this,_avatar)._registerImage(this)}ngOnDestroy(){(0,classPrivateFieldGet.Z)(this,_ready).next(!1),(0,classPrivateFieldGet.Z)(this,_ready).complete()}}).propDecorators={loadHandler:[{type:core.HostListener,args:["load"]}],errorHandler:[{type:core.HostListener,args:["error"]}]},avatar_image_directive_class);MatxAvatarImageDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"img[matxAvatarImage]",standalone:!0})],MatxAvatarImageDirective);var avatar_initials_fallback_component_class,avatar_initials_fallback_component_avatar,avatar_initials_fallback_component_changeDetectorRef,_initialsFn,_colorsFn,_initials,_setInitials,_setAvatarColors,classPrivateMethodInitSpec=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/classPrivateMethodInitSpec.js"),classPrivateMethodGet=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/classPrivateMethodGet.js"),avatar_initials_fallback_component=__webpack_require__("./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tbWF0eC1hdmF0YXItZm9udC1zaXplKTsKICAgICAgICBmb250LXdlaWdodDogdmFyKC0tbWF0eC1hdmF0YXItZm9udC13ZWlnaHQpOwogICAgICB9CiAgICA%3D!./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts"),avatar_initials_fallback_component_default=__webpack_require__.n(avatar_initials_fallback_component);const COLOR_TABLE=["#D32F2F","#C2185B","#7B1FA2","#512DA8","#303F9F","#1976D2","#0288D1","#0097A7","#00796B","#388E3C","#689F38","#AFB42B","#FBC02D","#FFA000","#F57C00","#E64A19","#5D4037","#616161","#455A64"];const MATX_AVATAR_INITIALS_INITIALS_FUNCTION=new core.InjectionToken("matxAvatarInitialsInitialsFunction",{providedIn:"root",factory:function MATX_AVATAR_INITIALS_INITIALS_FUNCTION_FACTORY(){return name=>{if(!name)return"";const parts=name.split(" ");let initials=parts[0].charAt(0);return parts.length>1&&(initials+=parts[parts.length-1].charAt(0)),initials}}}),MATX_AVATAR_INITIALS_COLORS_FUNCTION=new core.InjectionToken("matxAvatarInitialsColorsFunction",{providedIn:"root",factory:function MATX_AVATAR_INITIALS_COLORS_FUNCTION_FACTORY(){return name=>{if(!name)return{background:"transparent",foreground:"#ffffff"};let hashCode=0;for(let i=name.length-1;i>=0;i--){const ch=name.charCodeAt(i),shift=i%8;hashCode^=(ch<<shift)+(ch>>8-shift)}return{background:COLOR_TABLE[hashCode%COLOR_TABLE.length],foreground:"#ffffff"}}}});let MatxAvatarInitialsFallbackComponent=(avatar_initials_fallback_component_avatar=new WeakMap,avatar_initials_fallback_component_changeDetectorRef=new WeakMap,_initialsFn=new WeakMap,_colorsFn=new WeakMap,_initials=new WeakMap,_setInitials=new WeakSet,_setAvatarColors=new WeakSet,(avatar_initials_fallback_component_class=class MatxAvatarInitialsFallbackComponent{constructor(){(0,classPrivateMethodInitSpec.Z)(this,_setAvatarColors),(0,classPrivateMethodInitSpec.Z)(this,_setInitials),(0,classPrivateFieldInitSpec.Z)(this,avatar_initials_fallback_component_avatar,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,avatar_initials_fallback_component_changeDetectorRef,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_initialsFn,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_colorsFn,{writable:!0,value:void 0}),(0,classPrivateFieldInitSpec.Z)(this,_initials,{writable:!0,value:void 0}),(0,classPrivateFieldSet.Z)(this,avatar_initials_fallback_component_avatar,(0,core.inject)(MatxAvatarComponent)),(0,classPrivateFieldSet.Z)(this,avatar_initials_fallback_component_changeDetectorRef,(0,core.inject)(core.ChangeDetectorRef)),(0,classPrivateFieldSet.Z)(this,_initialsFn,(0,core.inject)(MATX_AVATAR_INITIALS_INITIALS_FUNCTION)),(0,classPrivateFieldSet.Z)(this,_colorsFn,(0,core.inject)(MATX_AVATAR_INITIALS_COLORS_FUNCTION))}get initials(){return(0,classPrivateFieldGet.Z)(this,_initials)}ngOnChanges(changes){const initialsName=changes.initialsName,colorsName=changes.colorsName;initialsName&&(0,classPrivateMethodGet.Z)(this,_setInitials,_setInitials2).call(this,this.initialsName),(colorsName||initialsName)&&(0,classPrivateMethodGet.Z)(this,_setAvatarColors,_setAvatarColors2).call(this,this.colorsName||this.initialsName)}ngOnDestroy(){(0,classPrivateFieldGet.Z)(this,avatar_initials_fallback_component_avatar)._removeCustomColors(!0)}}).propDecorators={colorsName:[{type:core.Input}],initialsName:[{type:core.Input}]},avatar_initials_fallback_component_class);function _setInitials2(name){if((0,core.isDevMode)()&&!(0,classPrivateFieldGet.Z)(this,_initialsFn))throw new Error("An initials function must be provided");(0,classPrivateFieldSet.Z)(this,_initials,(0,classPrivateFieldGet.Z)(this,_initialsFn).call(this,name)),(0,classPrivateFieldGet.Z)(this,avatar_initials_fallback_component_changeDetectorRef).markForCheck()}function _setAvatarColors2(name){if((0,core.isDevMode)()&&!(0,classPrivateFieldGet.Z)(this,_colorsFn))throw new Error("A colors function must be provided");(0,classPrivateFieldGet.Z)(this,avatar_initials_fallback_component_avatar)._setCustomAvatarColors((0,classPrivateFieldGet.Z)(this,_colorsFn).call(this,name))}MatxAvatarInitialsFallbackComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"matx-avatar-initials-fallback[matxAvatarFallback]",standalone:!0,imports:[common.ez],template:'<span data-testid="initials-text">{{ initials }}</span> ',encapsulation:core.ViewEncapsulation.ShadowDom,changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[avatar_initials_fallback_component_default()]})],MatxAvatarInitialsFallbackComponent);let MatxAvatarCustomIconComponent=class MatxAvatarCustomIconComponent{};MatxAvatarCustomIconComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"matx-avatar-custom-fallback[matxAvatarFallback]",standalone:!0,template:' <svg\n    xmlns="http://www.w3.org/2000/svg"\n    viewBox="0 0 448 512"\n    height="100%"\n    width="100%"\n    fill="currentColor"\n  >\n    <path\n      d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.7 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"\n    />\n  </svg>',encapsulation:core.ViewEncapsulation.ShadowDom,styles:[avatar_component_stories_default()]})],MatxAvatarCustomIconComponent);const lib_avatar_component_stories={title:"Components/Avatar",component:MatxAvatarComponent,decorators:[(0,client.moduleMetadata)({imports:[MatxAvatarCustomIconComponent,MatxAvatarFallbackDirective,MatxAvatarImageDirective,MatxAvatarInitialsFallbackComponent]})],parameters:{layout:"centered"},argTypes:{useThemeColor:{control:"boolean",if:{arg:"useThemeColor",exists:!0}},color:{control:"radio",options:["primary","accent","warn"],if:{arg:"useThemeColor"}},content:{table:{disable:!0}}}},calculateStyles=args=>{let style="";return args.borderWidth&&(style+=`--matx-avatar-border-width: ${args.borderWidth}px`),style},ensureColorInputReset=args=>({...args,color:args.useThemeColor?args.color:null}),Template=args=>({props:ensureColorInputReset(args),template:`<matx-avatar style="${calculateStyles(args)}" [color]="color">${args.content||""}</matx-avatar>`}),WithDefaultFallback=Template.bind(void 0);WithDefaultFallback.args={useThemeColor:!1,color:"primary",borderWidth:0};const WithCustomFallback=Template.bind(void 0);WithCustomFallback.args={useThemeColor:!1,color:"primary",borderWidth:0,content:"<matx-avatar-custom-fallback matxAvatarFallback/>"};const WithInitialsFallback=Template.bind(void 0);WithInitialsFallback.args={initialsName:"William Wallace",colorsName:"william.wallace@outlook.com",useThemeColor:!1,color:"primary",borderWidth:0,content:'<matx-avatar-initials-fallback matxAvatarFallback [initialsName]="initialsName" [colorsName]="colorsName"/>'};const WithImage=Template.bind(void 0);WithImage.args={src:"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg",content:'<img matxAvatarImage [src]="src"/>',borderWidth:0}},"./testing/storybook-host/.storybook/preview.ts":()=>{},"./storybook-init-framework-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/@storybook/angular/dist/ts3.9/client/index.js")},"./testing/storybook-host/.storybook/preview.ts-generated-config-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js"),__webpack_require__("./node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptors.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-properties.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var _home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@storybook/client-api/dist/esm/ClientApi.js"),_home_runner_work_angular_material_avatar_angular_material_avatar_testing_storybook_host_storybook_preview_ts__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./testing/storybook-host/.storybook/preview.ts");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(_home_runner_work_angular_material_avatar_angular_material_avatar_testing_storybook_host_storybook_preview_ts__WEBPACK_IMPORTED_MODULE_9__).forEach((function(key){var value=_home_runner_work_angular_material_avatar_angular_material_avatar_testing_storybook_host_storybook_preview_ts__WEBPACK_IMPORTED_MODULE_9__[key];switch(key){case"args":return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.uc)(value);case"argTypes":return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.v9)(value);case"decorators":return value.forEach((function(decorator){return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.$9)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.HZ)(loader,!1)}));case"parameters":return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.h1)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.My)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__._C)(enhancer)}));case"render":return(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.$P)(value);case"globals":case"globalTypes":var v={};return v[key]=value,(0,_home_runner_work_angular_material_avatar_angular_material_avatar_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_10__.h1)(v,!1);case"__namedExportsOrder":case"decorateStory":case"renderToDOM":return null;default:return console.log(key+" was not supported :( !")}}))},"./packages/material/avatar/src/lib/avatar.component.stories.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICBoZWlnaHQ6IDgwJTsKICAgICAgICB3aWR0aDogODAlOwogICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7CiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsKICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50OwogICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICAgICAgfQogICAg!./packages/material/avatar/src/lib/avatar.component.stories.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n      :host {\n        display: block;\n        height: 80%;\n        width: 80%;\n        overflow: hidden;\n        border-width: 1px;\n        border-style: solid;\n        border-color: transparent;\n        border-radius: 50%;\n      }\n    ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tbWF0eC1hdmF0YXItZm9udC1zaXplKTsKICAgICAgICBmb250LXdlaWdodDogdmFyKC0tbWF0eC1hdmF0YXItZm9udC13ZWlnaHQpOwogICAgICB9CiAgICA%3D!./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n      :host {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        height: 100%;\n        width: 100%;\n        font-size: var(--matx-avatar-font-size);\n        font-weight: var(--matx-avatar-font-weight);\n      }\n    ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/material/avatar/src/lib/avatar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  contain: strict;\n  overflow: hidden;\n  box-sizing: border-box;\n  container-type: size;\n  width: var(--matx-avatar-size, 100%);\n  height: var(--matx-avatar-size, 100%);\n  border-radius: var(--matx-avatar-border-radius, 50%);\n  border-width: var(--matx-avatar-border-width, 0);\n  border-style: var(--matx-avatar-border-style, solid);\n  border-color: var(--matx-avatar-border-color);\n  background-color: var(--matx-avatar-background-color);\n  color: var(--matx-avatar-color);\n}\n\nimg[matxAvatarImage] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./testing/storybook-host/.storybook/styles.scss?ngGlobalStyle":()=>{},"./packages sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx%7Cmdx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./material/avatar/src/lib/avatar.component.stories.ts":"./packages/material/avatar/src/lib/avatar.component.stories.ts"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./packages sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx%7Cmdx))$"},"?4f7e":()=>{},"./generated-stories-entry.cjs":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module=__webpack_require__.nmd(module),(0,__webpack_require__("./node_modules/@storybook/angular/dist/ts3.9/client/index.js").configure)([__webpack_require__("./packages sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx%7Cmdx))$")],module,!1)}},__webpack_require__=>{var __webpack_exec__=moduleId=>__webpack_require__(__webpack_require__.s=moduleId);__webpack_require__.O(0,[697],(()=>(__webpack_exec__("./node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_exec__("./node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_exec__("./storybook-init-framework-entry.js"),__webpack_exec__("./node_modules/@storybook/angular/dist/ts3.9/client/docs/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/angular/dist/ts3.9/client/preview/config.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-docs/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js"),__webpack_exec__("./testing/storybook-host/.storybook/preview.ts-generated-config-entry.js"),__webpack_exec__("./generated-stories-entry.cjs"),__webpack_exec__("./testing/storybook-host/.storybook/styles.scss?ngGlobalStyle"))));__webpack_require__.O()}]);