﻿(function(){function v(a){var b=a.startContainer.getAscendant(k,!0);b&&a.setStartAt(b,CKEDITOR.POSITION_AFTER_START);(b=a.endContainer.getAscendant(k,!0))&&a.setEndAt(b,CKEDITOR.POSITION_BEFORE_END)}function p(a){var b=a.getParent();if(a.is(q))return b;if(b&&b.is(q))return b.getParent()}function w(a){var b=a.getCommand("enter");b&&(b.on("exec",function(b){if(r(a)){var e=a.getSelection().getRanges()[0];e.collapsed&&(e.checkEndOfBlock()&&e.checkStartOfBlock())&&(a.execCommand("descriptionList"),b.cancel())}}),
a.on("beforeCommandExec",function(b){if("enter"==b.data.name&&r(a)){var e=a.getSelection().getRanges()[0];e.collapsed&&(e.checkEndOfBlock()&&!e.checkStartOfBlock())&&(b.data.toggleDescriptionListBlock=!0)}}),a.on("afterCommandExec",function(b){"enter"==b.data.name&&b.data.toggleDescriptionListBlock&&a.execCommand("descriptionTerm")}))}function n(a){var b=CKEDITOR.dom.walker.ignored(!0),f=new CKEDITOR.dom.range(a.getDocument());f.selectNodeContents(a);a=new CKEDITOR.dom.walker(f);a.evaluator=function(a){return a.type==
CKEDITOR.NODE_ELEMENT?a.is(CKEDITOR.dtd.$empty):b(a)};return!a.next()}function o(a){return function(b){return b.type==CKEDITOR.NODE_ELEMENT&&b.is(a)}}function x(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.is(k)}function r(a){a=a.elementPath();return a.block&&a.block.is(k)}function s(a){var b={dl:1};b[a]=1;return function(f,e){var d=e.contains(b,1);d?this.setState(d.is(a)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_DISABLED)}}var k={dt:1,dd:1},q={li:1,dt:1,dd:1};CKEDITOR.plugins.add("descriptionlist",
{lang:"en",icons:"descriptionlist,descriptionterm,descriptionvalue",hidpi:!0,init:function(a){if(!a.blockless){var b=a.lang.descriptionlist,f=CKEDITOR.plugins.descriptionList;a.addCommand("descriptionList",{allowedContent:"dl dt dd",contextSensitive:!0,exec:function(a){var b=a.getSelection(),c=b.getRanges()[0];this.state==CKEDITOR.TRISTATE_OFF?f.createListFromRange(a,c):f.removeListFromRange(a,c);b.selectRanges([c])},refresh:function(a,b){this.setState(b.contains("dl",1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)}});
a.addCommand("descriptionTerm",{contextSensitive:!0,exec:function(a){var b=a.getSelection(),c=b.getRanges()[0];f.toggleListElementsTo(a,c,this.state==CKEDITOR.TRISTATE_OFF?"dt":"dd");b.selectRanges([c])},refresh:s("dt")});a.addCommand("descriptionValue",{contextSensitive:!0,exec:function(a){var b=a.getSelection(),c=b.getRanges()[0];f.toggleListElementsTo(a,c,this.state==CKEDITOR.TRISTATE_OFF?"dd":"dt");b.selectRanges([c])},refresh:s("dd")});a.ui.addButton&&a.ui.addButton("DescriptionList",{label:b.descriptionList,
command:"descriptionList",toolbar:"list,100"});a.ui.addButton&&a.ui.addButton("DescriptionTerm",{label:b.descriptionTerm,command:"descriptionTerm",toolbar:"list,110"});a.ui.addButton&&a.ui.addButton("descriptionValue",{label:b.descriptionValue,command:"descriptionValue",toolbar:"list,120"});w(a)}}});CKEDITOR.plugins.descriptionList={createListFromRange:function(a,b){var f=b.createBookmark(),e=b.createIterator(),d=[],c=[],g=!0,h,i,l;if(i=(i=b.startPath().block.getPrevious(t))&&u(i)?i:null)g=(l=i.getLast(x))?
l.is("dd"):!1;for(;l=e.getNextParagraph();)d.push(l);i||(i=this.createListContainer(a,d[0]));1<d.length&&(h=d[d.length-1].getParent());e=i;l=0;for(var j=g,m;l<d.length;++l)if(m=d[l],(g=p(m))&&c.push(g),g=e,m.is(k))m.appendTo(g),j=m.is("dd");else{var o=m.getDocument().createElement(j?"dt":"dd");m.moveChildren(o);o.appendTo(g);m.remove();j=!j}for(;d=c.shift();)d.getParent()&&n(d)&&d.remove();h&&(h.is("li")&&n(h))&&h.remove();c=i;if((h=c.getNext(t))&&u(h))c.moveChildren(h,!0),c.remove();b.moveToBookmark(f)},
removeListFromRange:function(a,b){function f(){c.is(k)?c.renameNode("p"):l.push(c.getAscendant(k));c.insertBefore(h)}var e=b.createBookmark(),d=b.createIterator(),c,g=[];for(v(b);c=d.getNextParagraph();)c.getAscendant(k,!0)&&g.push(c);c=g.shift();var h=c.getAscendant("dl"),i=a.createRange(),d=[h],l=[],j;i.moveToPosition(c.getAscendant(k,!0),CKEDITOR.POSITION_BEFORE_START);h=i.splitElement(h);d.push(h);for(f();c=g.shift();)j=c.getAscendant("dl"),j.equals(h)||(d.push(j),i.moveToPosition(c.getAscendant(k,
!0),CKEDITOR.POSITION_BEFORE_START),h=i.splitElement(j),d.push(h)),f();for(;g=l.pop();)g.remove();for(;j=d.pop();)j.getParent&&n(j)&&j.remove();b.moveToBookmark(e)},createListContainer:function(a,b){var f=a.document.createElement("dl"),e=b.getParent(),d=p(b),c;d&&(c=a.createRange(),c.moveToPosition(b,CKEDITOR.POSITION_BEFORE_START),c=c.splitElement(d));f.insertBefore(d?c:b);b.remove();d&&(n(d)?d.remove():!b.is("li")&&n(e)&&e.remove());c&&(n(c)?c.remove():b.is("li")||(e=c.getFirst(o("li")))&&n(e)&&
e.remove());return f},toggleListElementsTo:function(a,b,f){var e=b.createBookmark(),d=a.createRange(),a=o("dt"==f?"dd":"dt"),c=[],g;d.setStartAt(b.startPath().contains(k),CKEDITOR.POSITION_BEFORE_START);d.setEndAt(b.endPath().contains(k),CKEDITOR.POSITION_AFTER_START);for(d=new CKEDITOR.dom.walker(d);g=d.next();)a(g)&&c.push(g);for(;g=c.pop();)g.renameNode(f);b.moveToBookmark(e)}};var t=CKEDITOR.dom.walker.ignored(!0),u=o("dl")})();