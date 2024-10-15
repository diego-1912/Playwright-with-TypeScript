//Password Strength Meter (append,show,hide,resize)JS follows
function pwdShow(elementId) {
    var eStyle = document.getElementById(elementId).style;
    eStyle.display = 'block';
}

function pwdHide(elementId, source) {
    var field =- document.getElementById(elementId);
    var eStyle = document.getElementById(elementId).style;
    eStyle.display = '';
    if(source && source.value.trim().length == 0){
        initPwdChk()
    }
}

function findElPos(obj) {
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {'curLeft':curleft,
            'curTop':curtop
        };
    }
}

function appendTo(appendToId, contentId) {
    var targetWidth = document.getElementById(appendToId).offsetWidth;
    var elPos = findElPos(document.getElementById(appendToId));
    var elScroll = getScrollXY();
    document.getElementById(contentId).style.top = (elPos.curTop - elScroll.Y + -32) + "px";
    document.getElementById(contentId).style.left = (elPos.curLeft - elScroll.X + targetWidth) + "px";
}

function showFeedback(appendToId, contentId) {
    if (document.getElementById(appendToId).getAttribute("id") == document.activeElement.id) {
        appendTo(appendToId, contentId);
        if (document.getElementById(appendToId).value.length > 0) {
            chkPass(document.getElementById(appendToId).value)
        }
        else{
            document.getElementById("scorebar").style.backgroundPosition="0";
        }
        pwdShow(contentId);
    }
}

function getScrollXY() {
    var scrOfX = 0, scrOfY = 0;
    if (typeof( window.pageYOffset ) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (document.body && ( document.body.scrollLeft || document.body.scrollTop )) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop )) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return { 'X':scrOfX, 'Y':scrOfY };
}


//Password Strength Meter JS follows

/*
 **    Created by: Jeff Todnem (http://www.todnem.com/)
 **    Created on: 2007-08-14
 **    Last modified: 2012-05-21 by Kurt V. Lee
 **
 **    License Information:
 **    -------------------------------------------------------------------------
 **    Copyright (C) 2007 Jeff Todnem
 **
 **    This program is free software; you can redistribute it and/or modify it
 **    under the terms of the GNU General Public License as published by the
 **    Free Software Foundation; either version 2 of the License, or (at your
 **    option) any later version.
 **
 **    This program is distributed in the hope that it will be useful, but
 **    WITHOUT ANY WARRANTY; without even the implied warranty of
 **    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 **    General Public License for more details.
 **
 **    You should have received a copy of the GNU General Public License along
 **    with this program; if not, write to the Free Software Foundation, Inc.,
 **    59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 **
 */

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        };
    }
}

function $$() {
    var arrElms = [];
    for (var i = 0; i < arguments.length; i++) {
        var elm = arguments[i];
        if (typeof(elm == "string")) {
            elm = document.getElementById(elm);
        }
        if (arguments.length == 1) {
            return elm;
        }
        arrElms.push(elm);
    }
    return arrElms;
}

String.prototype.strReverse = function () {
    var newstring = "";
    for (var s = 0; s < this.length; s++) {
        newstring = this.charAt(s) + newstring;
    }
    return newstring;
};

function chkPass(pwd) {
    var oScorebar = $$("scorebar");
    var oScore = $$("score");
    var oComplexity = $$("complexity");
    // Simultaneous variable declaration and value assignment aren't supported in IE apparently
    // so I'm forced to assign the same value individually per var to support a crappy browser *sigh*
    var nScore = 0, nLength = 0, nAlphaUC = 0, nAlphaLC = 0, nNumber = 0, nSymbol = 0, nMidChar = 0, nRequirements = 0, nAlphasOnly = 0, nNumbersOnly = 0, nUnqChar = 0, nRepChar = 0, nRepInc = 0, nConsecAlphaUC = 0, nConsecAlphaLC = 0, nConsecNumber = 0, nConsecSymbol = 0, nConsecCharType = 0, nSeqAlpha = 0, nSeqNumber = 0, nSeqSymbol = 0, nSeqChar = 0, nReqChar = 0, nMultConsecCharType = 0;
    var nMultRepChar = 0, nMultConsecSymbol = 0;
    var nMultMidChar = 0, nMultRequirements = 0, nMultConsecAlphaUC = 0, nMultConsecAlphaLC = 0, nMultConsecNumber = 0;
    var nReqCharType = 0, nMultAlphaUC = 0, nMultAlphaLC = 0, nMultSeqAlpha = 0, nMultSeqNumber = 0, nMultSeqSymbol = 0;
    var nMultLength = 0, nMultNumber = 0;
    var nMultSymbol = 0;

    var nTmpAlphaUC = "", nTmpAlphaLC = "", nTmpNumber = "", nTmpSymbol = "";
    var sAlphaUC = "0", sAlphaLC = "0", sNumber = "0", sSymbol = "0", sMidChar = "0", sRequirements = "0", sAlphasOnly = "0", sNumbersOnly = "0", sRepChar = "0", sConsecAlphaUC = "0", sConsecAlphaLC = "0", sConsecNumber = "0", sSeqAlpha = "0", sSeqNumber = "0", sSeqSymbol = "0";
    var sAlphas = "abcdefghijklmnopqrstuvwxyz";
    var sNumerics = "01234567890";
    var sSymbols = ")!@#$%^&*()";
    var sComplexity = "Does NOT Meet Requirements";
    var sStandards = "Below";
    var nMinPwdLen = 8;
    if (document.all) {
        var nd = 0;
    } else {
        var nd = 1;
    }
    if (pwd) {
        nScore = parseInt(pwd.length * nMultLength);
        nLength = pwd.length;
        var arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);
        var arrPwdLen = arrPwd.length;

        /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
        for (var a = 0; a < arrPwdLen; a++) {
            if (arrPwd[a].match(/[A-Z]/g)) {
                if (nTmpAlphaUC !== "") {
                    if ((nTmpAlphaUC + 1) == a) {
                        nConsecAlphaUC++;
                        nConsecCharType++;
                    }
                }
                nTmpAlphaUC = a;
                nAlphaUC++;
            }
            else if (arrPwd[a].match(/[a-z]/g)) {
                if (nTmpAlphaLC !== "") {
                    if ((nTmpAlphaLC + 1) == a) {
                        nConsecAlphaLC++;
                        nConsecCharType++;
                    }
                }
                nTmpAlphaLC = a;
                nAlphaLC++;
            }
            else if (arrPwd[a].match(/[0-9]/g)) {
                if (a > 0 && a < (arrPwdLen - 1)) {
                    nMidChar++;
                }
                if (nTmpNumber !== "") {
                    if ((nTmpNumber + 1) == a) {
                        nConsecNumber++;
                        nConsecCharType++;
                    }
                }
                nTmpNumber = a;
                nNumber++;
            }
            else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
                if (a > 0 && a < (arrPwdLen - 1)) {
                    nMidChar++;
                }
                if (nTmpSymbol !== "") {
                    if ((nTmpSymbol + 1) == a) {
                        nConsecSymbol++;
                        nConsecCharType++;
                    }
                }
                nTmpSymbol = a;
                nSymbol++;
            }
            /* Internal loop through password to check for repeat characters */
            var bCharExists = false;
            for (var b = 0; b < arrPwdLen; b++) {
                if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
                    bCharExists = true;
                    /*
                     Calculate increment deduction based on proximity to identical characters
                     Deduction is incremented each time a new match is discovered
                     Deduction amount is based on total password length divided by the
                     difference of distance between currently selected match
                     */
                    nRepInc += Math.abs(arrPwdLen / (b - a));
                }
            }
            if (bCharExists) {
                nRepChar++;
                nUnqChar = arrPwdLen - nRepChar;
                nRepInc = (nUnqChar) ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
            }
        }

        /* Check for sequential alpha string patterns (forward and reverse) */
        for (var s = 0; s < 23; s++) {
            var sFwd = sAlphas.substring(s, parseInt(s + 3));
            var sRev = sFwd.strReverse();
            if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqAlpha++;
                nSeqChar++;
            }
        }

        /* Check for sequential numeric string patterns (forward and reverse) */
        for (var s = 0; s < 8; s++) {
            var sFwd = sNumerics.substring(s, parseInt(s + 3));
            var sRev = sFwd.strReverse();
            if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqNumber++;
                nSeqChar++;
            }
        }

        /* Check for sequential symbol string patterns (forward and reverse) */
        for (var s = 0; s < 8; s++) {
            var sFwd = sSymbols.substring(s, parseInt(s + 3));
            var sRev = sFwd.strReverse();
            if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqSymbol++;
                nSeqChar++;
            }
        }

        /* Modify overall score value based on usage vs requirements */

        /* General point assignment */

        //WebOps simplified requirements: 1 Upper/Lower-case, 1 numeric, 8 char-minimum
        nScore = 0;
        var nAlphaULC = nAlphaUC + nAlphaLC;
        if (nAlphaULC > 0) {
            nScore = parseInt(nScore + (nAlphaULC * 10));
        }
        if (nNumber > 0) {
            nScore = parseInt(nScore + (nNumber * 10));
        }
        if (nNumber > 0 && nAlphaULC > 0) {
            nScore = parseInt(nScore + 20);
        }
        if (nScore >= 100) {
            if (nNumber > 0 && nAlphaULC > 0 && nSymbol == 0 && nLength >= 8) {
                //Do Nothing
            } else {
                nScore = 95
            }
        }


        /* Determine if suggested requirements have been met and set image indicators accordingly */

        /* Determine complexity based on overall score */
        /*
         if (nScore > 100) { nScore = 100; } else if (nScore < 0) { nScore = 0; }
         if (nScore >= 0 && nScore < 20) { sComplexity = "Very Weak"; }
         else if (nScore >= 20 && nScore < 40) { sComplexity = "Weak"; }
         else if (nScore >= 40 && nScore < 60) { sComplexity = "Good"; }
         else if (nScore >= 60 && nScore < 80) { sComplexity = "Strong"; }
         else if (nScore >= 80 && nScore <= 100) { sComplexity = "Very Strong"; }
         */
        if (nScore > 100) {
            nScore = 100;
        } else if (nScore < 0) {
            nScore = 0;
        }
        if (nScore >= 0 && nScore < 100) {
            sComplexity = "Does NOT Meet Requirements";
        }
        if (nScore >= 100) {
            sComplexity = "Meets Requirements";
        }

        /* Display updated score criteria to client */
        oScorebar.style.backgroundPosition = "-" + parseInt(nScore * 4) + "px";
        oScore.innerHTML = nScore + "%";
        oComplexity.innerHTML = sComplexity;
    }
    else {
        /* Display default score criteria to client */
        initPwdChk();
        oScore.innerHTML = nScore + "%";
        oComplexity.innerHTML = sComplexity;
    }
}

function initPwdChk(restart) {
    /* Reset all form values to their default */
    if($("scorebar").style) {
        $("scorebar").style.backgroundPosition = "0";
    }
}

addLoadEvent(function () {
    initPwdChk(1);
});

