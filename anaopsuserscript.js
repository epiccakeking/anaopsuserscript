// ==UserScript==
// @name         AoPS Commands
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://artofproblemsolving.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
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
            alert("Not implemented yet :(")
        }else{
            alert(cp[0]+"is not a command")
        }
    }
})();