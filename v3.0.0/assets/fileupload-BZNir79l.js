import{n as e,r as t}from"./button-DPZqy_L-.js";import{t as n}from"./classnames-CRHlWn3X.js";import{t as r}from"./ripple-BKY8_Uo_.js";import{t as i}from"./basecomponent-Cu3JVELC.js";import{t as a}from"./baseicon-EJQrvtGF.js";import{t as o}from"./times-BWNKb6_-.js";import{t as s}from"./plus-CeI2xl8G.js";import c from"./message-BzH2sr8x.js";import{At as l,Ct as u,Kt as d,Lt as f,Nt as p,Ot as m,S as h,St as g,Tt as _,Ut as v,Wt as y,_t as b,bt as x,ft as S,i as C,jt as w,k as ee,kt as T,mt as E,vt as D,yt as O}from"./index-p8nSFfLN.js";var k={name:`UploadIcon`,extends:a};function A(e){return ne(e)||te(e)||M(e)||j()}function j(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function M(e,t){if(e){if(typeof e==`string`)return N(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(e,t):void 0}}function te(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function ne(e){if(Array.isArray(e))return N(e)}function N(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function re(e,t,n,r,i,a){return m(),x(`svg`,_({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),A(t[0]||=[b(`path`,{"fill-rule":`evenodd`,"clip-rule":`evenodd`,d:`M6.58942 9.82197C6.70165 9.93405 6.85328 9.99793 7.012 10C7.17071 9.99793 7.32234 9.93405 7.43458 9.82197C7.54681 9.7099 7.61079 9.55849 7.61286 9.4V2.04798L9.79204 4.22402C9.84752 4.28011 9.91365 4.32457 9.98657 4.35479C10.0595 4.38502 10.1377 4.40039 10.2167 4.40002C10.2956 4.40039 10.3738 4.38502 10.4467 4.35479C10.5197 4.32457 10.5858 4.28011 10.6413 4.22402C10.7538 4.11152 10.817 3.95902 10.817 3.80002C10.817 3.64102 10.7538 3.48852 10.6413 3.37602L7.45127 0.190618C7.44656 0.185584 7.44176 0.180622 7.43687 0.175736C7.32419 0.063214 7.17136 0 7.012 0C6.85264 0 6.69981 0.063214 6.58712 0.175736C6.58181 0.181045 6.5766 0.186443 6.5715 0.191927L3.38282 3.37602C3.27669 3.48976 3.2189 3.6402 3.22165 3.79564C3.2244 3.95108 3.28746 4.09939 3.39755 4.20932C3.50764 4.31925 3.65616 4.38222 3.81182 4.38496C3.96749 4.3877 4.11814 4.33001 4.23204 4.22402L6.41113 2.04807V9.4C6.41321 9.55849 6.47718 9.7099 6.58942 9.82197ZM11.9952 14H2.02883C1.751 13.9887 1.47813 13.9228 1.22584 13.8061C0.973545 13.6894 0.746779 13.5241 0.558517 13.3197C0.370254 13.1154 0.22419 12.876 0.128681 12.6152C0.0331723 12.3545 -0.00990605 12.0775 0.0019109 11.8V9.40005C0.0019109 9.24092 0.065216 9.08831 0.1779 8.97579C0.290584 8.86326 0.443416 8.80005 0.602775 8.80005C0.762134 8.80005 0.914966 8.86326 1.02765 8.97579C1.14033 9.08831 1.20364 9.24092 1.20364 9.40005V11.8C1.18295 12.0376 1.25463 12.274 1.40379 12.4602C1.55296 12.6463 1.76817 12.7681 2.00479 12.8H11.9952C12.2318 12.7681 12.447 12.6463 12.5962 12.4602C12.7453 12.274 12.817 12.0376 12.7963 11.8V9.40005C12.7963 9.24092 12.8596 9.08831 12.9723 8.97579C13.085 8.86326 13.2378 8.80005 13.3972 8.80005C13.5565 8.80005 13.7094 8.86326 13.8221 8.97579C13.9347 9.08831 13.998 9.24092 13.998 9.40005V11.8C14.022 12.3563 13.8251 12.8996 13.45 13.3116C13.0749 13.7236 12.552 13.971 11.9952 14Z`,fill:`currentColor`},null,-1)]),16)}k.render=re;var P=C.extend({name:`progressbar`,style:`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`,classes:{root:function(e){var t=e.instance;return[`p-progressbar p-component`,{"p-progressbar-determinate":t.determinate,"p-progressbar-indeterminate":t.indeterminate}]},value:`p-progressbar-value`,label:`p-progressbar-label`}}),F={name:`ProgressBar`,extends:{name:`BaseProgressBar`,extends:i,props:{value:{type:Number,default:null},mode:{type:String,default:`determinate`},showValue:{type:Boolean,default:!0}},style:P,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+`%`,display:`flex`}},indeterminate:function(){return this.mode===`indeterminate`},determinate:function(){return this.mode===`determinate`},dataP:function(){return n({determinate:this.determinate,indeterminate:this.indeterminate})}}},I=[`aria-valuenow`,`data-p`],L=[`data-p`],R=[`data-p`],z=[`data-p`];function B(e,t,n,r,i,a){return m(),x(`div`,_({role:`progressbar`,class:e.cx(`root`),"aria-valuemin":`0`,"aria-valuenow":e.value,"aria-valuemax":`100`,"data-p":a.dataP},e.ptmi(`root`)),[a.determinate?(m(),x(`div`,_({key:0,class:e.cx(`value`),style:a.progressStyle,"data-p":a.dataP},e.ptm(`value`)),[e.value!=null&&e.value!==0&&e.showValue?(m(),x(`div`,_({key:0,class:e.cx(`label`),"data-p":a.dataP},e.ptm(`label`)),[l(e.$slots,`default`,{},function(){return[g(d(e.value+`%`),1)]})],16,R)):O(``,!0)],16,L)):a.indeterminate?(m(),x(`div`,_({key:1,class:e.cx(`value`),"data-p":a.dataP},e.ptm(`value`)),null,16,z)):O(``,!0)],16,I)}F.render=B;var V=C.extend({name:`fileupload`,style:`
    .p-fileupload input[type='file'] {
        display: none;
    }

    .p-fileupload-advanced {
        border: 1px solid dt('fileupload.border.color');
        border-radius: dt('fileupload.border.radius');
        background: dt('fileupload.background');
        color: dt('fileupload.color');
    }

    .p-fileupload-header {
        display: flex;
        align-items: center;
        padding: dt('fileupload.header.padding');
        background: dt('fileupload.header.background');
        color: dt('fileupload.header.color');
        border-style: solid;
        border-width: dt('fileupload.header.border.width');
        border-color: dt('fileupload.header.border.color');
        border-radius: dt('fileupload.header.border.radius');
        gap: dt('fileupload.header.gap');
    }

    .p-fileupload-content {
        border: 1px solid transparent;
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.content.gap');
        transition: border-color dt('fileupload.transition.duration');
        padding: dt('fileupload.content.padding');
    }

    .p-fileupload-content .p-progressbar {
        width: 100%;
        height: dt('fileupload.progressbar.height');
    }

    .p-fileupload-file-list {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.filelist.gap');
    }

    .p-fileupload-file {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: dt('fileupload.file.padding');
        border-block-end: 1px solid dt('fileupload.file.border.color');
        gap: dt('fileupload.file.gap');
    }

    .p-fileupload-file:last-child {
        border-block-end: 0;
    }

    .p-fileupload-file-info {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.file.info.gap');
    }

    .p-fileupload-file-thumbnail {
        flex-shrink: 0;
    }

    .p-fileupload-file-actions {
        margin-inline-start: auto;
    }

    .p-fileupload-highlight {
        border: 1px dashed dt('fileupload.content.highlight.border.color');
    }

    .p-fileupload-basic .p-message {
        margin-block-end: dt('fileupload.basic.gap');
    }

    .p-fileupload-basic-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: dt('fileupload.basic.gap');
    }
`,classes:{root:function(e){return[`p-fileupload p-fileupload-${e.props.mode} p-component`]},header:`p-fileupload-header`,pcChooseButton:`p-fileupload-choose-button`,pcUploadButton:`p-fileupload-upload-button`,pcCancelButton:`p-fileupload-cancel-button`,content:`p-fileupload-content`,fileList:`p-fileupload-file-list`,file:`p-fileupload-file`,fileThumbnail:`p-fileupload-file-thumbnail`,fileInfo:`p-fileupload-file-info`,fileName:`p-fileupload-file-name`,fileSize:`p-fileupload-file-size`,pcFileBadge:`p-fileupload-file-badge`,fileActions:`p-fileupload-file-actions`,pcFileRemoveButton:`p-fileupload-file-remove-button`,basicContent:`p-fileupload-basic-content`}}),H={name:`BaseFileUpload`,extends:i,props:{name:{type:String,default:null},url:{type:String,default:null},mode:{type:String,default:`advanced`},multiple:{type:Boolean,default:!1},accept:{type:String,default:null},disabled:{type:Boolean,default:!1},auto:{type:Boolean,default:!1},maxFileSize:{type:Number,default:null},invalidFileSizeMessage:{type:String,default:`{0}: Invalid file size, file size should be smaller than {1}.`},invalidFileTypeMessage:{type:String,default:`{0}: Invalid file type, allowed file types: {1}.`},fileLimit:{type:Number,default:null},invalidFileLimitMessage:{type:String,default:`Maximum number of files exceeded, limit is {0} at most.`},withCredentials:{type:Boolean,default:!1},previewWidth:{type:Number,default:50},chooseLabel:{type:String,default:null},uploadLabel:{type:String,default:null},cancelLabel:{type:String,default:null},customUpload:{type:Boolean,default:!1},showUploadButton:{type:Boolean,default:!0},showCancelButton:{type:Boolean,default:!0},chooseIcon:{type:String,default:void 0},uploadIcon:{type:String,default:void 0},cancelIcon:{type:String,default:void 0},style:null,class:null,chooseButtonProps:{type:null,default:null},uploadButtonProps:{type:Object,default:function(){return{severity:`secondary`}}},cancelButtonProps:{type:Object,default:function(){return{severity:`secondary`}}}},style:V,provide:function(){return{$pcFileUpload:this,$parentInstance:this}}},U={name:`FileContent`,hostName:`FileUpload`,extends:i,emits:[`remove`],props:{files:{type:Array,default:function(){return[]}},badgeSeverity:{type:String,default:`warn`},badgeValue:{type:String,default:null},previewWidth:{type:Number,default:50},templates:{type:null,default:null}},methods:{formatSize:function(e){var t=1024,n=3,r=this.$primevue.config.locale?.fileSizeTypes||[`B`,`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`];if(e===0)return`0 ${r[0]}`;var i=Math.floor(Math.log(e)/Math.log(t));return`${parseFloat((e/t**+i).toFixed(n))} ${r[i]}`}},components:{Button:e,Badge:t,TimesIcon:o}},W=[`alt`,`src`,`width`];function G(e,t,n,r,i,a){var o=w(`Badge`),s=w(`TimesIcon`),c=w(`Button`);return m(!0),x(E,null,T(n.files,function(t,r){return m(),x(`div`,_({key:t.name+t.type+t.size,class:e.cx(`file`)},{ref_for:!0},e.ptm(`file`)),[b(`img`,_({role:`presentation`,class:e.cx(`fileThumbnail`),alt:t.name,src:t.objectURL,width:n.previewWidth},{ref_for:!0},e.ptm(`fileThumbnail`)),null,16,W),b(`div`,_({class:e.cx(`fileInfo`)},{ref_for:!0},e.ptm(`fileInfo`)),[b(`div`,_({class:e.cx(`fileName`)},{ref_for:!0},e.ptm(`fileName`)),d(t.name),17),b(`span`,_({class:e.cx(`fileSize`)},{ref_for:!0},e.ptm(`fileSize`)),d(a.formatSize(t.size)),17)],16),u(o,{value:n.badgeValue,class:v(e.cx(`pcFileBadge`)),severity:n.badgeSeverity,unstyled:e.unstyled,pt:e.ptm(`pcFileBadge`)},null,8,[`value`,`class`,`severity`,`unstyled`,`pt`]),b(`div`,_({class:e.cx(`fileActions`)},{ref_for:!0},e.ptm(`fileActions`)),[u(c,{onClick:function(t){return e.$emit(`remove`,r)},text:``,rounded:``,severity:`danger`,class:v(e.cx(`pcFileRemoveButton`)),unstyled:e.unstyled,pt:e.ptm(`pcFileRemoveButton`)},{icon:f(function(i){return[n.templates.fileremoveicon?(m(),D(p(n.templates.fileremoveicon),{key:0,class:v(i.class),file:t,index:r},null,8,[`class`,`file`,`index`])):(m(),D(s,_({key:1,class:i.class,"aria-hidden":`true`},{ref_for:!0},e.ptm(`pcFileRemoveButton`).icon),null,16,[`class`]))]}),_:2},1032,[`onClick`,`class`,`unstyled`,`pt`])],16)],16)}),128)}U.render=G;function K(e){return Y(e)||J(e)||Z(e)||q()}function q(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function J(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Y(e){if(Array.isArray(e))return Q(e)}function X(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=Z(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function Z(e,t){if(e){if(typeof e==`string`)return Q(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}function Q(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var $={name:`FileUpload`,extends:H,inheritAttrs:!1,emits:[`select`,`uploader`,`before-upload`,`progress`,`upload`,`error`,`before-send`,`clear`,`remove`,`remove-uploaded-file`],duplicateIEEvent:!1,data:function(){return{uploadedFileCount:0,files:[],messages:[],focused:!1,progress:null,uploadedFiles:[]}},methods:{upload:function(){this.hasFiles&&this.uploader()},onBasicUploaderClick:function(e){e.button===0&&this.$refs.fileInput.click()},onFileSelect:function(e){if(e.type!==`drop`&&this.isIE11()&&this.duplicateIEEvent){this.duplicateIEEvent=!1;return}this.isBasic&&this.hasFiles&&(this.files=[]),this.messages=[],this.files=this.files||[];var t=X(e.dataTransfer?e.dataTransfer.files:e.target.files),n;try{for(t.s();!(n=t.n()).done;){var r=n.value;!this.isFileSelected(r)&&!this.isFileLimitExceeded()&&this.validate(r)&&(this.isImage(r)&&(r.objectURL=window.URL.createObjectURL(r)),this.files.push(r))}}catch(e){t.e(e)}finally{t.f()}this.$emit(`select`,{originalEvent:e,files:this.files}),this.fileLimit&&this.checkFileLimit(),this.auto&&this.hasFiles&&!this.isFileLimitExceeded()&&this.uploader(),e.type!==`drop`&&this.isIE11()?this.clearIEInput():this.clearInputElement()},choose:function(){this.$refs.fileInput.click()},uploader:function(){var e=this;if(this.customUpload)this.fileLimit&&(this.uploadedFileCount+=this.files.length),this.$emit(`uploader`,{files:this.files});else{var t=new XMLHttpRequest,n=new FormData;this.$emit(`before-upload`,{xhr:t,formData:n});var r=X(this.files),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;n.append(this.name,a,a.name)}}catch(e){r.e(e)}finally{r.f()}t.upload.addEventListener(`progress`,function(t){t.lengthComputable&&(e.progress=Math.round(t.loaded*100/t.total)),e.$emit(`progress`,{originalEvent:t,progress:e.progress})}),t.onreadystatechange=function(){if(t.readyState===4){if(e.progress=0,t.status>=200&&t.status<300){var n;e.fileLimit&&(e.uploadedFileCount+=e.files.length),e.$emit(`upload`,{xhr:t,files:e.files}),(n=e.uploadedFiles).push.apply(n,K(e.files))}else e.$emit(`error`,{xhr:t,files:e.files});e.clear()}},this.url&&(t.open(`POST`,this.url,!0),this.$emit(`before-send`,{xhr:t,formData:n}),t.withCredentials=this.withCredentials,t.send(n))}},clear:function(){this.files=[],this.messages=null,this.$emit(`clear`),this.isAdvanced&&this.clearInputElement()},onFocus:function(){this.focused=!0},onBlur:function(){this.focused=!1},isFileSelected:function(e){if(this.files&&this.files.length){var t=X(this.files),n;try{for(t.s();!(n=t.n()).done;){var r=n.value;if(r.name+r.type+r.size===e.name+e.type+e.size)return!0}}catch(e){t.e(e)}finally{t.f()}}return!1},isIE11:function(){return!!window.MSInputMethodContext&&!!document.documentMode},validate:function(e){return this.accept&&!this.isFileTypeValid(e)?(this.messages.push(this.invalidFileTypeMessage.replace(`{0}`,e.name).replace(`{1}`,this.accept)),!1):this.maxFileSize&&e.size>this.maxFileSize?(this.messages.push(this.invalidFileSizeMessage.replace(`{0}`,e.name).replace(`{1}`,this.formatSize(this.maxFileSize))),!1):!0},isFileTypeValid:function(e){var t=X(this.accept.split(`,`).map(function(e){return e.trim()})),n;try{for(t.s();!(n=t.n()).done;){var r=n.value;if(this.isWildcard(r)?this.getTypeClass(e.type)===this.getTypeClass(r):e.type==r||this.getFileExtension(e).toLowerCase()===r.toLowerCase())return!0}}catch(e){t.e(e)}finally{t.f()}return!1},getTypeClass:function(e){return e.substring(0,e.indexOf(`/`))},isWildcard:function(e){return e.indexOf(`*`)!==-1},getFileExtension:function(e){return`.`+e.name.split(`.`).pop()},isImage:function(e){return/^image\//.test(e.type)},onDragEnter:function(e){!this.disabled&&(!this.hasFiles||this.multiple)&&(e.stopPropagation(),e.preventDefault())},onDragOver:function(e){!this.disabled&&(!this.hasFiles||this.multiple)&&(!this.isUnstyled&&ee(this.$refs.content,`p-fileupload-highlight`),this.$refs.content&&this.$refs.content.setAttribute(`data-p-highlight`,!0),e.stopPropagation(),e.preventDefault())},onDragLeave:function(){this.disabled||(!this.isUnstyled&&h(this.$refs.content,`p-fileupload-highlight`),this.$refs.content&&this.$refs.content.setAttribute(`data-p-highlight`,!1))},onDrop:function(e){if(!this.disabled){!this.isUnstyled&&h(this.$refs.content,`p-fileupload-highlight`),this.$refs.content&&this.$refs.content.setAttribute(`data-p-highlight`,!1),e.stopPropagation(),e.preventDefault();var t=e.dataTransfer?e.dataTransfer.files:e.target.files;(this.multiple||t&&t.length===1)&&this.onFileSelect(e)}},remove:function(e){this.clearInputElement();var t=this.files.splice(e,1)[0];this.files=K(this.files),this.$emit(`remove`,{file:t,files:this.files})},removeUploadedFile:function(e){var t=this.uploadedFiles.splice(e,1)[0];this.uploadedFiles=K(this.uploadedFiles),this.$emit(`remove-uploaded-file`,{file:t,files:this.uploadedFiles})},clearInputElement:function(){this.$refs.fileInput.value=``},clearIEInput:function(){this.$refs.fileInput&&(this.duplicateIEEvent=!0,this.$refs.fileInput.value=``)},formatSize:function(e){var t=1024,n=3,r=this.$primevue.config.locale?.fileSizeTypes||[`B`,`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`];if(e===0)return`0 ${r[0]}`;var i=Math.floor(Math.log(e)/Math.log(t));return`${parseFloat((e/t**+i).toFixed(n))} ${r[i]}`},isFileLimitExceeded:function(){return this.fileLimit&&this.fileLimit<=this.files.length+this.uploadedFileCount&&this.focused&&(this.focused=!1),this.fileLimit&&this.fileLimit<this.files.length+this.uploadedFileCount},checkFileLimit:function(){this.isFileLimitExceeded()&&this.messages.push(this.invalidFileLimitMessage.replace(`{0}`,this.fileLimit.toString()))},onMessageClose:function(){this.messages=null}},computed:{isAdvanced:function(){return this.mode===`advanced`},isBasic:function(){return this.mode===`basic`},chooseButtonClass:function(){return[this.cx(`pcChooseButton`),this.class]},basicFileChosenLabel:function(){if(this.auto)return this.chooseButtonLabel;if(this.hasFiles){var e;return this.files&&this.files.length===1?this.files[0].name:(e=this.$primevue.config.locale)==null||(e=e.fileChosenMessage)==null?void 0:e.replace(`{0}`,this.files.length)}return this.$primevue.config.locale?.noFileChosenMessage||``},hasFiles:function(){return this.files&&this.files.length>0},hasUploadedFiles:function(){return this.uploadedFiles&&this.uploadedFiles.length>0},chooseDisabled:function(){return this.disabled||this.fileLimit&&this.fileLimit<=this.files.length+this.uploadedFileCount},uploadDisabled:function(){return this.disabled||!this.hasFiles||this.fileLimit&&this.fileLimit<this.files.length},cancelDisabled:function(){return this.disabled||!this.hasFiles},chooseButtonLabel:function(){return this.chooseLabel||this.$primevue.config.locale.choose},uploadButtonLabel:function(){return this.uploadLabel||this.$primevue.config.locale.upload},cancelButtonLabel:function(){return this.cancelLabel||this.$primevue.config.locale.cancel},completedLabel:function(){return this.$primevue.config.locale.completed},pendingLabel:function(){return this.$primevue.config.locale.pending}},components:{Button:e,ProgressBar:F,Message:c,FileContent:U,PlusIcon:s,UploadIcon:k,TimesIcon:o},directives:{ripple:r}},ie=[`multiple`,`accept`,`disabled`],ae=[`accept`,`disabled`,`multiple`];function oe(e,t,n,r,i,a){var o=w(`Button`),s=w(`ProgressBar`),c=w(`Message`),h=w(`FileContent`);return a.isAdvanced?(m(),x(`div`,_({key:0,class:e.cx(`root`)},e.ptmi(`root`)),[b(`input`,_({ref:`fileInput`,type:`file`,onChange:t[0]||=function(){return a.onFileSelect&&a.onFileSelect.apply(a,arguments)},multiple:e.multiple,accept:e.accept,disabled:a.chooseDisabled},e.ptm(`input`)),null,16,ie),b(`div`,_({class:e.cx(`header`)},e.ptm(`header`)),[l(e.$slots,`header`,{files:i.files,uploadedFiles:i.uploadedFiles,chooseCallback:a.choose,uploadCallback:a.uploader,clearCallback:a.clear},function(){return[u(o,_({label:a.chooseButtonLabel,class:a.chooseButtonClass,style:e.style,disabled:e.disabled,unstyled:e.unstyled,onClick:a.choose,onKeydown:S(a.choose,[`enter`]),onFocus:a.onFocus,onBlur:a.onBlur},e.chooseButtonProps,{pt:e.ptm(`pcChooseButton`)}),{icon:f(function(t){return[l(e.$slots,`chooseicon`,{},function(){return[(m(),D(p(e.chooseIcon?`span`:`PlusIcon`),_({class:[t.class,e.chooseIcon],"aria-hidden":`true`},e.ptm(`pcChooseButton`).icon),null,16,[`class`]))]})]}),_:3},16,[`label`,`class`,`style`,`disabled`,`unstyled`,`onClick`,`onKeydown`,`onFocus`,`onBlur`,`pt`]),e.showUploadButton?(m(),D(o,_({key:0,class:e.cx(`pcUploadButton`),label:a.uploadButtonLabel,onClick:a.uploader,disabled:a.uploadDisabled,unstyled:e.unstyled},e.uploadButtonProps,{pt:e.ptm(`pcUploadButton`)}),{icon:f(function(t){return[l(e.$slots,`uploadicon`,{},function(){return[(m(),D(p(e.uploadIcon?`span`:`UploadIcon`),_({class:[t.class,e.uploadIcon],"aria-hidden":`true`},e.ptm(`pcUploadButton`).icon,{"data-pc-section":`uploadbuttonicon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`label`,`onClick`,`disabled`,`unstyled`,`pt`])):O(``,!0),e.showCancelButton?(m(),D(o,_({key:1,class:e.cx(`pcCancelButton`),label:a.cancelButtonLabel,onClick:a.clear,disabled:a.cancelDisabled,unstyled:e.unstyled},e.cancelButtonProps,{pt:e.ptm(`pcCancelButton`)}),{icon:f(function(t){return[l(e.$slots,`cancelicon`,{},function(){return[(m(),D(p(e.cancelIcon?`span`:`TimesIcon`),_({class:[t.class,e.cancelIcon],"aria-hidden":`true`},e.ptm(`pcCancelButton`).icon,{"data-pc-section":`cancelbuttonicon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`label`,`onClick`,`disabled`,`unstyled`,`pt`])):O(``,!0)]})],16),b(`div`,_({ref:`content`,class:e.cx(`content`),onDragenter:t[1]||=function(){return a.onDragEnter&&a.onDragEnter.apply(a,arguments)},onDragover:t[2]||=function(){return a.onDragOver&&a.onDragOver.apply(a,arguments)},onDragleave:t[3]||=function(){return a.onDragLeave&&a.onDragLeave.apply(a,arguments)},onDrop:t[4]||=function(){return a.onDrop&&a.onDrop.apply(a,arguments)}},e.ptm(`content`),{"data-p-highlight":!1}),[l(e.$slots,`content`,{files:i.files,uploadedFiles:i.uploadedFiles,removeUploadedFileCallback:a.removeUploadedFile,removeFileCallback:a.remove,progress:i.progress,messages:i.messages},function(){return[a.hasFiles?(m(),D(s,{key:0,value:i.progress,showValue:!1,unstyled:e.unstyled,pt:e.ptm(`pcProgressbar`)},null,8,[`value`,`unstyled`,`pt`])):O(``,!0),(m(!0),x(E,null,T(i.messages,function(t){return m(),D(c,{key:t,severity:`error`,onClose:a.onMessageClose,unstyled:e.unstyled,pt:e.ptm(`pcMessage`)},{default:f(function(){return[g(d(t),1)]}),_:2},1032,[`onClose`,`unstyled`,`pt`])}),128)),a.hasFiles?(m(),x(`div`,{key:1,class:v(e.cx(`fileList`))},[u(h,{files:i.files,onRemove:a.remove,badgeValue:a.pendingLabel,previewWidth:e.previewWidth,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,[`files`,`onRemove`,`badgeValue`,`previewWidth`,`templates`,`unstyled`,`pt`])],2)):O(``,!0),a.hasUploadedFiles?(m(),x(`div`,{key:2,class:v(e.cx(`fileList`))},[u(h,{files:i.uploadedFiles,onRemove:a.removeUploadedFile,badgeValue:a.completedLabel,badgeSeverity:`success`,previewWidth:e.previewWidth,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,[`files`,`onRemove`,`badgeValue`,`previewWidth`,`templates`,`unstyled`,`pt`])],2)):O(``,!0)]}),e.$slots.empty&&!a.hasFiles&&!a.hasUploadedFiles?(m(),x(`div`,y(_({key:0},e.ptm(`empty`))),[l(e.$slots,`empty`)],16)):O(``,!0)],16)],16)):a.isBasic?(m(),x(`div`,_({key:1,class:e.cx(`root`)},e.ptmi(`root`)),[(m(!0),x(E,null,T(i.messages,function(t){return m(),D(c,{key:t,severity:`error`,onClose:a.onMessageClose,unstyled:e.unstyled,pt:e.ptm(`pcMessage`)},{default:f(function(){return[g(d(t),1)]}),_:2},1032,[`onClose`,`unstyled`,`pt`])}),128)),b(`div`,_({class:e.cx(`basicContent`)},e.ptm(`basicContent`)),[u(o,_({label:a.chooseButtonLabel,class:a.chooseButtonClass,style:e.style,disabled:e.disabled,unstyled:e.unstyled,onMouseup:a.onBasicUploaderClick,onKeydown:S(a.choose,[`enter`]),onFocus:a.onFocus,onBlur:a.onBlur},e.chooseButtonProps,{pt:e.ptm(`pcChooseButton`)}),{icon:f(function(t){return[l(e.$slots,`chooseicon`,{},function(){return[(m(),D(p(e.chooseIcon?`span`:`PlusIcon`),_({class:[t.class,e.chooseIcon],"aria-hidden":`true`},e.ptm(`pcChooseButton`).icon),null,16,[`class`]))]})]}),_:3},16,[`label`,`class`,`style`,`disabled`,`unstyled`,`onMouseup`,`onKeydown`,`onFocus`,`onBlur`,`pt`]),e.auto?O(``,!0):l(e.$slots,`filelabel`,{key:0,class:v(e.cx(`filelabel`)),files:i.files},function(){return[b(`span`,{class:v(e.cx(`filelabel`))},d(a.basicFileChosenLabel),3)]}),b(`input`,_({ref:`fileInput`,type:`file`,accept:e.accept,disabled:e.disabled,multiple:e.multiple,onChange:t[5]||=function(){return a.onFileSelect&&a.onFileSelect.apply(a,arguments)},onFocus:t[6]||=function(){return a.onFocus&&a.onFocus.apply(a,arguments)},onBlur:t[7]||=function(){return a.onBlur&&a.onBlur.apply(a,arguments)}},e.ptm(`input`)),null,16,ae)],16)],16)):O(``,!0)}$.render=oe;export{$ as default};