﻿(function(){function f(){var a=1,b=document.cookie.replace(/(?:(?:^|.*;\s*)disable_native_spell\s*\=\s*([^;]*).*$)|^.*$/,"$1");void 0!=typeof b&&"true"==b&&(a=2);CKEDITOR.on("instanceReady",function(){c(a)});return a}function c(a){for(var b=CKEDITOR.instances.id_content,e=["checkspell","scaytcheck"],d=0;d<e.length;d++){var c=b.getCommand(e[d]);a==CKEDITOR.TRISTATE_ON?c.disable():a==CKEDITOR.TRISTATE_OFF&&c.enable()}b.document.getBody().setAttribute("spellcheck",2!=a);document.cookie="disable_native_spell="+
(2==a?!0:!1)+";expires=Fri, 31 Dec 9999 23:59:59 GMT"}CKEDITOR.plugins.add("mdn-spell",{icons:"mdn-spell",init:function(a){var b=a.lang;a.addCommand("mdn-spell",{exec:function(){var a;a=1==this.state?2:1;c(a);this.toggleState()},state:f(),canUndo:!1});a.ui.addButton("MdnSpell",{label:b.native_spell_check,command:"mdn-spell",icon:"mdn-spell"})}})})();