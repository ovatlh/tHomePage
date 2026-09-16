import{t as e}from"./classnames-CRHlWn3X.js";import{t}from"./ripple-BKY8_Uo_.js";import{t as n}from"./basecomponent-Cu3JVELC.js";import{t as r}from"./minus-1IYledCt.js";import{t as i}from"./plus-CeI2xl8G.js";import{At as a,Ct as o,Kt as s,Lt as c,Mt as l,Nt as u,Ot as d,Rt as f,Tt as p,Ut as m,_t as h,bt as g,dt as _,i as v,lt as y,vt as b,yt as x}from"./index-p8nSFfLN.js";var S=v.extend({name:`fieldset`,style:`
    .p-fieldset {
        background: dt('fieldset.background');
        border: 1px solid dt('fieldset.border.color');
        border-radius: dt('fieldset.border.radius');
        color: dt('fieldset.color');
        padding: dt('fieldset.padding');
        margin: 0;
    }

    .p-fieldset-legend {
        background: dt('fieldset.legend.background');
        border-radius: dt('fieldset.legend.border.radius');
        border-width: dt('fieldset.legend.border.width');
        border-style: solid;
        border-color: dt('fieldset.legend.border.color');
        color: dt('fieldset.legend.color');
        padding: dt('fieldset.legend.padding');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend {
        padding: 0;
    }

    .p-fieldset-toggle-button {
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        display: flex;
        gap: dt('fieldset.legend.gap');
        align-items: center;
        justify-content: center;
        padding: dt('fieldset.legend.padding');
        background: transparent;
        border: 0 none;
        border-radius: dt('fieldset.legend.border.radius');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
        outline-color: transparent;
    }

    .p-fieldset-legend-label {
        font-weight: dt('fieldset.legend.font.weight');
    }

    .p-fieldset-toggle-button:focus-visible {
        box-shadow: dt('fieldset.legend.focus.ring.shadow');
        outline: dt('fieldset.legend.focus.ring.width') dt('fieldset.legend.focus.ring.style') dt('fieldset.legend.focus.ring.color');
        outline-offset: dt('fieldset.legend.focus.ring.offset');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover {
        color: dt('fieldset.legend.hover.color');
        background: dt('fieldset.legend.hover.background');
    }

    .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.color');
        transition: color dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.hover.color');
    }

    .p-fieldset-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-fieldset-content-wrapper {
        min-height: 0;
    }

    .p-fieldset-content {
        padding: dt('fieldset.content.padding');
    }
`,classes:{root:function(e){return[`p-fieldset p-component`,{"p-fieldset-toggleable":e.props.toggleable}]},legend:`p-fieldset-legend`,legendLabel:`p-fieldset-legend-label`,toggleButton:`p-fieldset-toggle-button`,toggleIcon:`p-fieldset-toggle-icon`,contentContainer:`p-fieldset-content-container`,contentWrapper:`p-fieldset-content-wrapper`,content:`p-fieldset-content`}}),C={name:`Fieldset`,extends:{name:`BaseFieldset`,extends:n,props:{legend:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:null,default:null}},style:S,provide:function(){return{$pcFieldset:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:collapsed`,`toggle`],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(e){this.d_collapsed=e}},methods:{toggle:function(e){this.d_collapsed=!this.d_collapsed,this.$emit(`update:collapsed`,this.d_collapsed),this.$emit(`toggle`,{originalEvent:e,value:this.d_collapsed})},onKeyDown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&(this.toggle(e),e.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.legend},dataP:function(){return e({toggleable:this.toggleable})}},directives:{ripple:t},components:{PlusIcon:i,MinusIcon:r}};function w(e){"@babel/helpers - typeof";return w=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},w(e)}function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?T(Object(n),!0).forEach(function(t){D(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function D(e,t,n){return(t=O(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(e){var t=k(e,`string`);return w(t)==`symbol`?t:t+``}function k(e,t){if(w(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(w(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var A=[`data-p`],j=[`data-p`],M=[`id`],N=[`id`,`aria-controls`,`aria-expanded`,`aria-label`],P=[`id`,`aria-labelledby`];function F(e,t,n,r,i,v){var S=l(`ripple`);return d(),g(`fieldset`,p({class:e.cx(`root`),"data-p":v.dataP},e.ptmi(`root`)),[h(`legend`,p({class:e.cx(`legend`),"data-p":v.dataP},e.ptm(`legend`)),[a(e.$slots,`legend`,{toggleCallback:v.toggle},function(){return[e.toggleable?x(``,!0):(d(),g(`span`,p({key:0,id:e.$id+`_header`,class:e.cx(`legendLabel`)},e.ptm(`legendLabel`)),s(e.legend),17,M)),e.toggleable?f((d(),g(`button`,p({key:1,id:e.$id+`_header`,type:`button`,"aria-controls":e.$id+`_content`,"aria-expanded":!i.d_collapsed,"aria-label":v.buttonAriaLabel,class:e.cx(`toggleButton`),onClick:t[0]||=function(){return v.toggle&&v.toggle.apply(v,arguments)},onKeydown:t[1]||=function(){return v.onKeyDown&&v.onKeyDown.apply(v,arguments)}},E(E({},e.toggleButtonProps),e.ptm(`toggleButton`))),[a(e.$slots,e.$slots.toggleicon?`toggleicon`:`togglericon`,{collapsed:i.d_collapsed,class:m(e.cx(`toggleIcon`))},function(){return[(d(),b(u(i.d_collapsed?`PlusIcon`:`MinusIcon`),p({class:e.cx(`toggleIcon`)},e.ptm(`toggleIcon`)),null,16,[`class`]))]}),h(`span`,p({class:e.cx(`legendLabel`)},e.ptm(`legendLabel`)),s(e.legend),17)],16,N)),[[S]]):x(``,!0)]})],16,j),o(y,p({name:`p-collapsible`},e.ptm(`transition`)),{default:c(function(){return[f(h(`div`,p({id:e.$id+`_content`,class:e.cx(`contentContainer`),role:`region`,"aria-labelledby":e.$id+`_header`},e.ptm(`contentContainer`)),[h(`div`,p({class:e.cx(`contentWrapper`)},e.ptm(`contentWrapper`)),[h(`div`,p({class:e.cx(`content`)},e.ptm(`content`)),[a(e.$slots,`default`)],16)],16)],16,P),[[_,!i.d_collapsed]])]}),_:3},16)],16,A)}C.render=F;export{C as default};