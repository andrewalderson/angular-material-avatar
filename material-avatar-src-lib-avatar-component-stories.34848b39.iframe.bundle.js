(self.webpackChunkangular_material_avatar=self.webpackChunkangular_material_avatar||[]).push([[962],{"./node_modules/@storybook/angular/dist/client/argsToTemplate.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=void 0,exports.argsToTemplate=function argsToTemplate(args,options={}){const includeSet=options.include?new Set(options.include):null,excludeSet=options.exclude?new Set(options.exclude):null;return Object.entries(args).filter((([key])=>void 0!==args[key])).filter((([key])=>includeSet?includeSet.has(key):!excludeSet||!excludeSet.has(key))).map((([key,value])=>"function"==typeof value?`(${key})="${key}($event)"`:`[${key}]="${key}"`)).join(" ")}},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-api.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}});var argsToTemplate_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/argsToTemplate.js");Object.defineProperty(exports,"argsToTemplate",{enumerable:!0,get:function(){return argsToTemplate_1.argsToTemplate}})},"./node_modules/@storybook/angular/dist/client/public-api.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.raw=exports.forceReRender=exports.configure=exports.storiesOf=void 0;const preview_api_1=__webpack_require__("@storybook/preview-api"),render_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"),decorateStory_1=__importDefault(__webpack_require__("./node_modules/@storybook/angular/dist/client/decorateStory.js"));__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);const api=(0,preview_api_1.start)(render_1.renderToCanvas,{decorateStory:decorateStory_1.default,render:render_1.render});exports.storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:"angular"});exports.configure=(...args)=>api.configure("angular",...args),exports.forceReRender=api.forceReRender,exports.raw=api.clientApi.raw},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./packages/material/avatar/src/lib/avatar.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithCustomFallback:()=>WithCustomFallback,WithIconFallback:()=>WithIconFallback,WithImage:()=>WithImage,WithInitialsFallback:()=>WithInitialsFallback,__namedExportsOrder:()=>__namedExportsOrder,default:()=>lib_avatar_component_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),avatar_component_stories=__webpack_require__("./packages/material/avatar/src/lib/avatar.component.stories.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICBoZWlnaHQ6IDgwJTsKICAgICAgICB3aWR0aDogODAlOwogICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7CiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsKICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50OwogICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICAgICAgfQogICAg!./packages/material/avatar/src/lib/avatar.component.stories.ts"),avatar_component_stories_default=__webpack_require__.n(avatar_component_stories),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),client=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js"),avatar_icon_fallback_component=__webpack_require__("./packages/material/avatar/src/lib/avatar-icon-fallback.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgfQogICAg!./packages/material/avatar/src/lib/avatar-icon-fallback.component.ts"),avatar_icon_fallback_component_default=__webpack_require__.n(avatar_icon_fallback_component),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let MatxAvatarIconFallbackComponent=class MatxAvatarIconFallbackComponent{};MatxAvatarIconFallbackComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"matx-avatar-icon-fallback",standalone:!0,imports:[common.CommonModule],template:"<ng-content />",encapsulation:core.ViewEncapsulation.ShadowDom,changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[avatar_icon_fallback_component_default()]})],MatxAvatarIconFallbackComponent);var avatar_componentngResource=__webpack_require__("./packages/material/avatar/src/lib/avatar.component.scss?ngResource"),avatar_componentngResource_default=__webpack_require__.n(avatar_componentngResource);function coerceElement(elementOrRef){return elementOrRef instanceof core.ElementRef?elementOrRef.nativeElement:elementOrRef}let MatxAvatarFallbackDirective=class MatxAvatarFallbackDirective{};MatxAvatarFallbackDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[matxAvatarFallback]",standalone:!0})],MatxAvatarFallbackDirective);let MatxAvatarComponent=class MatxAvatarComponent{get themeClass(){return this.color?`mat-${this.color}`:"mat-unthemed"}#customColors;#useImage;constructor(_elementRef,ariaHidden){this._elementRef=_elementRef,this.useImage=(0,core.computed)((()=>!0===this.#useImage())),this.#customColors=null,this.#useImage=(0,core.signal)(!1),ariaHidden||coerceElement(this._elementRef).setAttribute("aria-hidden","true")}ngOnChanges(changes){const color=changes.color;color&&(color.currentValue?this._removeCustomColors():this.#customColors&&this._setCustomAvatarColors(this.#customColors))}_setUseImage(value){this.#useImage.set(value)}_setCustomAvatarColors(colors){if(this.#customColors=colors,!this.color){const style=coerceElement(this._elementRef).style;style.setProperty("--matx-avatar-color",colors.foreground),style.setProperty("--matx-avatar-background-color",colors.background),style.setProperty("--matx-avatar-border-color",colors.border??colors.foreground)}}_removeCustomColors(reset=!1){const style=coerceElement(this._elementRef).style;style.removeProperty("--matx-avatar-color"),style.removeProperty("--matx-avatar-background-color"),style.removeProperty("--matx-avatar-border-color"),reset&&(this.#customColors=null)}static#_=this.ctorParameters=()=>[{type:core.ElementRef},{type:String,decorators:[{type:core.Attribute,args:["aria-hidden"]}]}];static#_2=this.propDecorators={themeClass:[{type:core.HostBinding,args:["class"]}],color:[{type:core.Input}]}};MatxAvatarComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"matx-avatar",standalone:!0,imports:[common.CommonModule],template:'@if (useImage()) {\n  <ng-content select="img[matxAvatarImage]" />\n} @else {\n  <ng-content\n    select="[matxAvatarFallback], matx-avatar-icon-fallback, matx-avatar-initials-fallback"\n  />\n}\n',encapsulation:core.ViewEncapsulation.ShadowDom,changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[avatar_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[core.ElementRef,String])],MatxAvatarComponent);let MatxAvatarImageDirective=class MatxAvatarImageDirective{constructor(){this.#avatar=(0,core.inject)(MatxAvatarComponent),this.#element=(0,core.inject)(core.ElementRef).nativeElement,this.#renderer=(0,core.inject)(core.Renderer2),this.style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;"}#avatar;#element;#renderer;ngOnInit(){(0,core.isDevMode)()&&function assertEmptyWidthAndHeight(dir){if(dir.width||dir.height)throw new Error("the attributes `height` and/or `width` are present and should not be. The image directive will handle setting its dimensions")}(this)}ngAfterViewInit(){this.#avatar._setUseImage(!0)}ngOnChanges(changes){changes.src&&(this.#listenForImageEvents(),this.#updateSrcAndSrcSet())}#setHostAttribute(name,value){this.#renderer.setAttribute(this.#element,name,value)}#updateSrcAndSrcSet(){this.#setHostAttribute("src",this.src),this.srcset&&this.#setHostAttribute("srcset",this.srcset)}#listenForImageEvents(){const unlistenLoadFn=this.#renderer.listen(this.#element,"load",(()=>{this.#avatar._setUseImage(!0),unlistenLoadFn(),unlistenErrorFn()})),unlistenErrorFn=this.#renderer.listen(this.#element,"error",(()=>{this.#avatar._setUseImage(!1),unlistenLoadFn(),unlistenErrorFn()}))}static#_=this.propDecorators={style:[{type:core.HostBinding,args:["style"]}],src:[{type:core.Input,args:[{required:!0,transform:core["ɵunwrapSafeValue"]}]}],srcset:[{type:core.Input}],width:[{type:core.Input}],height:[{type:core.Input}]}};MatxAvatarImageDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"img[matxAvatarImage]",standalone:!0})],MatxAvatarImageDirective);var avatar_initials_fallback_component=__webpack_require__("./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tbWF0eC1hdmF0YXItZm9udC1zaXplKTsKICAgICAgICBmb250LXdlaWdodDogdmFyKC0tbWF0eC1hdmF0YXItZm9udC13ZWlnaHQpOwogICAgICB9CiAgICA%3D!./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts"),avatar_initials_fallback_component_default=__webpack_require__.n(avatar_initials_fallback_component);const COLOR_TABLE=["#D32F2F","#C2185B","#7B1FA2","#512DA8","#303F9F","#1976D2","#0288D1","#0097A7","#00796B","#388E3C","#689F38","#AFB42B","#FBC02D","#FFA000","#F57C00","#E64A19","#5D4037","#616161","#455A64"];const MATX_AVATAR_INITIALS_INITIALS_FUNCTION=new core.InjectionToken("matxAvatarInitialsInitialsFunction",{providedIn:"root",factory:function MATX_AVATAR_INITIALS_INITIALS_FUNCTION_FACTORY(){return name=>{if(!name)return"";const parts=name.split(" ");let initials=parts[0].charAt(0);return parts.length>1&&(initials+=parts[parts.length-1].charAt(0)),initials}}}),MATX_AVATAR_INITIALS_COLORS_FUNCTION=new core.InjectionToken("matxAvatarInitialsColorsFunction",{providedIn:"root",factory:function MATX_AVATAR_INITIALS_COLORS_FUNCTION_FACTORY(){return name=>{if(!name)return{background:"transparent",foreground:"#ffffff"};let hashCode=0;for(let i=name.length-1;i>=0;i--){const ch=name.charCodeAt(i),shift=i%8;hashCode^=(ch<<shift)+(ch>>8-shift)}return{background:COLOR_TABLE[hashCode%COLOR_TABLE.length],foreground:"#ffffff"}}}});let MatxAvatarInitialsFallbackComponent=class MatxAvatarInitialsFallbackComponent{constructor(){this.#avatar=(0,core.inject)(MatxAvatarComponent),this.#initialsFn=(0,core.inject)(MATX_AVATAR_INITIALS_INITIALS_FUNCTION),this.#colorsFn=(0,core.inject)(MATX_AVATAR_INITIALS_COLORS_FUNCTION),this.initials=(0,core.signal)("")}#avatar;#initialsFn;#colorsFn;ngOnChanges(changes){const initialsName=changes.initialsName,colorsName=changes.colorsName;initialsName&&this.#setInitials(this.initialsName),(colorsName||initialsName)&&this.#setAvatarColors(this.colorsName||this.initialsName)}ngOnDestroy(){this.#avatar._removeCustomColors(!0)}#setInitials(name){if((0,core.isDevMode)()&&!this.#initialsFn)throw new Error("An initials function must be provided");this.initials.set(this.#initialsFn(name))}#setAvatarColors(name){if((0,core.isDevMode)()&&!this.#colorsFn)throw new Error("A colors function must be provided");this.#avatar._setCustomAvatarColors(this.#colorsFn(name))}static#_=this.propDecorators={colorsName:[{type:core.Input}],initialsName:[{type:core.Input,args:[{required:!0}]}]}};MatxAvatarInitialsFallbackComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"matx-avatar-initials-fallback",standalone:!0,imports:[common.CommonModule],template:"<span>{{ initials() }}</span> ",encapsulation:core.ViewEncapsulation.ShadowDom,changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[avatar_initials_fallback_component_default()]})],MatxAvatarInitialsFallbackComponent);const calculateStyles=args=>{let style="";return args.borderWidth&&(style+=`--matx-avatar-border-width: ${args.borderWidth}px`),style?`style="${style}"`:""};let MatxAvatarCustomIconComponent=class MatxAvatarCustomIconComponent{};MatxAvatarCustomIconComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"matx-avatar-custom-fallback[matxAvatarFallback]",standalone:!0,template:' <svg\n    xmlns="http://www.w3.org/2000/svg"\n    viewBox="0 0 448 512"\n    height="100%"\n    width="100%"\n    fill="currentColor"\n  >\n    <path\n      d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.7 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"\n    />\n  </svg>',encapsulation:core.ViewEncapsulation.ShadowDom,styles:[avatar_component_stories_default()]})],MatxAvatarCustomIconComponent);const lib_avatar_component_stories={title:"Components/Avatar",component:MatxAvatarComponent,decorators:[(0,client.moduleMetadata)({imports:[MatxAvatarCustomIconComponent,MatxAvatarFallbackDirective,MatxAvatarImageDirective,MatxAvatarInitialsFallbackComponent,MatxAvatarIconFallbackComponent]})],parameters:{layout:"centered",viewport:{disable:!0}},argTypes:{color:{name:"color (Material Theme Palette)",description:"Sets the background, border and font colors where used",control:{type:"select",labels:{undefined:"None",primary:"Primary",accent:"Accent",warn:"warn"}},options:[void 0,"primary","accent","warn"]},borderWidth:{name:"--matx-avatar-border-width",control:{type:"number",min:0},table:{category:"CSS",defaultValue:0,type:{summary:"number"}}},content:{table:{disable:!0}},initialsName:{description:"The string (usually full name) to extract initials from",if:{arg:"initialsName",exists:!0}},colorsName:{description:"The string (usually username) to create avatar color from - falls back to initialsName if undefined",if:{arg:"colorsName",exists:!0}},src:{description:"The url of the image to display (should be a square image)",control:{type:"file",accept:"image/*"},if:{arg:"src",exists:!0}}},args:{color:void 0,borderWidth:0,content:""},render:args=>({props:args,template:`<matx-avatar ${calculateStyles(args)} \n    ${args.color?'[color]="color"':""}>${args.content}</matx-avatar>`})},WithImage={args:{src:"160.jpg",content:'<img matxAvatarImage [src]="src"/>'}},WithIconFallback={args:{content:'<matx-avatar-icon-fallback>\n    <svg\n    xmlns="http://www.w3.org/2000/svg"\n    role="img"\n    viewBox="0 0 128 128"\n    fill="currentColor"\n    width="100%"\n    height="100%"\n  >\n    <path\n      d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"\n    />\n    <path\n      d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"\n    />\n  </svg>\n  </matx-avatar-icon-fallback>'}},WithCustomFallback={args:{content:"<matx-avatar-custom-fallback matxAvatarFallback/>"}},WithInitialsFallback={args:{initialsName:"William Wallace",colorsName:"william.wallace@outlook.com",content:'<matx-avatar-initials-fallback [initialsName]="initialsName" [colorsName]="colorsName"/>'}};WithImage.parameters={...WithImage.parameters,docs:{...WithImage.parameters?.docs,source:{originalSource:"{\n  args: {\n    src: '160.jpg',\n    content: '<img matxAvatarImage [src]=\"src\"/>'\n  }\n}",...WithImage.parameters?.docs?.source}}},WithIconFallback.parameters={...WithIconFallback.parameters,docs:{...WithIconFallback.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: `<matx-avatar-icon-fallback>\n    <svg\n    xmlns="http://www.w3.org/2000/svg"\n    role="img"\n    viewBox="0 0 128 128"\n    fill="currentColor"\n    width="100%"\n    height="100%"\n  >\n    <path\n      d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"\n    />\n    <path\n      d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"\n    />\n  </svg>\n  </matx-avatar-icon-fallback>`\n  }\n}',...WithIconFallback.parameters?.docs?.source}}},WithCustomFallback.parameters={...WithCustomFallback.parameters,docs:{...WithCustomFallback.parameters?.docs,source:{originalSource:"{\n  args: {\n    content: '<matx-avatar-custom-fallback matxAvatarFallback/>'\n  }\n}",...WithCustomFallback.parameters?.docs?.source}}},WithInitialsFallback.parameters={...WithInitialsFallback.parameters,docs:{...WithInitialsFallback.parameters?.docs,source:{originalSource:"{\n  args: {\n    initialsName: 'William Wallace',\n    colorsName: 'william.wallace@outlook.com',\n    content: '<matx-avatar-initials-fallback [initialsName]=\"initialsName\" [colorsName]=\"colorsName\"/>'\n  }\n}",...WithInitialsFallback.parameters?.docs?.source}}};const __namedExportsOrder=["WithImage","WithIconFallback","WithCustomFallback","WithInitialsFallback"]},"./packages/material/avatar/src/lib/avatar-icon-fallback.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgfQogICAg!./packages/material/avatar/src/lib/avatar-icon-fallback.component.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n      :host {\n        display: block;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n      }\n    ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/material/avatar/src/lib/avatar.component.stories.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICBoZWlnaHQ6IDgwJTsKICAgICAgICB3aWR0aDogODAlOwogICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7CiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDsKICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50OwogICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICAgICAgfQogICAg!./packages/material/avatar/src/lib/avatar.component.stories.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n      :host {\n        display: block;\n        height: 80%;\n        width: 80%;\n        overflow: hidden;\n        border-width: 1px;\n        border-style: solid;\n        border-color: transparent;\n        border-radius: 50%;\n      }\n    ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tbWF0eC1hdmF0YXItZm9udC1zaXplKTsKICAgICAgICBmb250LXdlaWdodDogdmFyKC0tbWF0eC1hdmF0YXItZm9udC13ZWlnaHQpOwogICAgICB9CiAgICA%3D!./packages/material/avatar/src/lib/avatar-initials-fallback.component.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n      :host {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        height: 100%;\n        width: 100%;\n        font-size: var(--matx-avatar-font-size);\n        font-weight: var(--matx-avatar-font-weight);\n      }\n    ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/material/avatar/src/lib/avatar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  contain: strict;\n  overflow: hidden;\n  box-sizing: border-box;\n  container-type: size;\n  width: var(--matx-avatar-size, 100%);\n  height: var(--matx-avatar-size, 100%);\n  border-radius: var(--matx-avatar-border-radius, 50%);\n  border-width: var(--matx-avatar-border-width, 0);\n  border-style: var(--matx-avatar-border-style, solid);\n  border-color: var(--matx-avatar-border-color);\n  background-color: var(--matx-avatar-background-color);\n  color: var(--matx-avatar-color);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);