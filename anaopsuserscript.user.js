// ==UserScript==
// @name         AoPS Commands
// @namespace    https://github.com/epiccakeking/anaopsuserscript
// @version      2.3.1
// @downloadURL  https://github.com/epiccakeking/anaopsuserscript/raw/master/anaopsuserscript.user.js
// @description  try to take over the world!
// @author       happycupcake/epiccakeking
// @match        https://artofproblemsolving.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    function cthemeupdate(){
        localStorage.setItem("ctheme",encodeURI(document.getElementById("cthemepopup").value));
        updateTheme()
    }
    function updateTheme(){
        var head=document.getElementsByTagName('head')[0];
        var theme=localStorage.getItem("theme");
        var ctheme=localStorage.getItem("ctheme");
        if (theme!=null){
            if (document.getElementById("theme")==null){
                var elmnttheme=document.createElement('link');
                elmnttheme.id="theme"
                elmnttheme.rel='stylesheet';
                elmnttheme.type='text/css';
                elmnttheme.media='all';
                head.appendChild(elmnttheme);
            }
            document.getElementById("theme").href='https://epiccakeking.github.io/anaopsuserscript/themes/'+theme+'.css';
        }
        if (ctheme!=null){
            if (document.getElementById("ctheme")==null){
                var elmntctheme=document.createElement('style');
                elmntctheme.id="ctheme"
                head.appendChild(elmntctheme);
            }
            document.getElementById("ctheme").innerHTML=decodeURI(ctheme);
        }
    }
    updateTheme()
    function KeyPress(e) {
        var evtobj = window.event? event : e
        if (evtobj.keyCode == 49 && evtobj.ctrlKey) commandprompter();
    }

    document.onkeydown = KeyPress;
    document.addEventListener('DOMContentLoaded', function() {
        var commbtn=document.createElement('button');
        commbtn.innerHTML="CMND";
        commbtn.id="commline";
        commbtn.style="position: fixed !important; bottom: 0px !important; left: 0px !important; !important; overflow: hidden !important; color: black !important; background-color: white !important; z-index: 100000000000000 !important; resize: none !important;"
        commbtn.onclick=commandprompter;
        document.body.appendChild(commbtn);
    }, false);
    function commandprompter(){
        var comm=prompt("COMMAND");
        var cp=comm.split(" ");
        if (cp[0]=="theme"){
            cp.unshift("val")
        }
        if (cp[0]=="jump"){
            var x=window.location.href;
            x=x.split("_")[0];
            var n=Number(cp[1]);
            if (x.lastIndexOf("h")<10){
                alert("Not viewing a topic.")
            }else if (isNaN(n)){
                alert("Not a number")
            }else if (n<1){
                alert('Invalid value for jump.')
            }else{
                if (!(x.substring(x.lastIndexOf("p")-1,x.lastIndexOf("p")+2)=="fpr")){
                    x=x.substring(0,x.lastIndexOf("p"));
                }
                window.location.href=x+"n"+cp[1]
            }
        }else if (cp[0]=="val"){
            localStorage.setItem(cp[1], cp[2]);
            if (cp[1]=="theme" || cp[1]=="ctheme"){
                updateTheme()
            }
        }else if (cp[0]=="ctheme"){
            var cthemepopup=document.createElement('div');
            var cthemetextarea=document.createElement('textarea');
            cthemetextarea.id="cthemepopup";
            var cthemebutton=document.createElement('button');
            cthemebutton.type="button";
            cthemebutton.innerHTML="Update";
            cthemebutton.onclick=cthemeupdate
            cthemepopup.appendChild(cthemetextarea);
            cthemepopup.appendChild(cthemebutton);
            alert(cthemepopup)
        }else if (cp[0]=="delval"){
            localStorage.removeItem(cp[1]);
        }else{
            alert(cp[0]+" is not a command")
        }
    }
})();
