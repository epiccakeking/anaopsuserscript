// ==UserScript==
// @name         AoPS Commands
// @namespace    http://tampermonkey.net/
// @version      2.1
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
    function updateTheme(){
        var theme=localStorage.getItem("theme")
        if (document.getElementById("theme")==null){
            if (theme!=null){
                var head=document.getElementsByTagName('head')[0];
                var link=document.createElement('link');
                link.id="theme"
                link.rel='stylesheet';
                link.type='text/css';
                link.href='https://epiccakeking.github.io/anaopsuserscript/themes/'+theme+'.css';
                link.media='all';
                head.appendChild(link);
            }
        }else{
            document.getElementById("theme").href='https://epiccakeking.github.io/anaopsuserscript/themes/'+theme+'.css';
        }
    }
    updateTheme()
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
            var n=Number(cp[1]);
            if (isNaN(n)){
                alert("Not a number")
            }else if (n<1){
				alert('Invalid value for jump.')
			}else{
				var x=window.location.href
				x=x.split("_")[0]
				if (!(x.substring(x.lastIndexOf("p")-1,x.lastIndexOf("p")+2)=="fpr")){
					x=x.substring(0,x.lastIndexOf("p"))
				}
				window.location.href=x+"n"+cp[1]
			}
        }else if (cp[0]=="val"){
            localStorage.setItem(cp[1], cp[2]);
            if (cp[1]="theme"){
                updateTheme()
            }
        }else if (cp[0]=="delval"){
            localStorage.removeItem(cp[1]);
        }else{
            alert(cp[0]+" is not a command")
        }
    }
})();
