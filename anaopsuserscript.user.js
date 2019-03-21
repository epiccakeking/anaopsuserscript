// ==UserScript==
// @name         AoPS Commands
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  try to take over the world!
// @author       You
// @match        https://artofproblemsolving.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var theme=localStorage.getItem("theme")
    if (theme!=null){
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://raw.githubusercontent.com/epiccakeking/anaopsuserscript/master/themes/'+theme+'.css';
        link.media = 'all';
        head.appendChild(link);
    }
    function KeyPress(e) {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 49 && evtobj.ctrlKey) commandprompter();
    }

    document.onkeydown = KeyPress;
    function commandprompter(){
        var comm=prompt("COMMAND");
        var cp=comm.split(" ");
        if (cp[0]=="jump"){
            var x=window.location.href
            x=x.split("_")[0]
            if (!(x.substring(x.lastIndexOf("p")-1,x.lastIndexOf("p")+2)=="fpr")){
                x=x.substring(0,x.lastIndexOf("p"))
            }
            window.location.href=x+"n"+cp[1]
        }else if (cp[0]=="val"){
            localStorage.setItem(cp[1], cp[2]);
        }else if (cp[0]=="delval"){
            localStorage.removeItem(cp[1]);
        }else{
            alert(cp[0]+"is not a command")
        }
    }
})();
