function compare(str1, str2) {
    var retVal;

    for (var i = 0; i < str1.length; i++) {
        if (str2.length <= i) {
            retVal = 1;
            break;
        } else if (str1.charAt(i) < str2.charAt(i)) {
            retVal = -1;
            break;
        } else if (str1.charAt(i) > str2.charAt(i)) {
            retVal = 1;
            break;
        }
    }

    if (i == str1.length)
        retVal = 0;

    return retVal;
}

function findAnchorPosition(img) {
    var offsetParent = img.offsetParent;
    var top = img.offsetTop;
    var left = img.offsetLeft;
    try {
        for (; ;) {
            top = top + offsetParent.offsetTop;
            left = left + offsetParent.offsetLeft;
            offsetParent = offsetParent.offsetParent;
        }
    } catch(e) {
    }

    return new Array(top, left);
}

function init() {
    try {
        if (jsonrpc == null)
            jsonrpc = new JSONRpcClient(jsonurl);
    } catch(e) {
        alert(e);
    }
}

function toggleDropDowns(show){
    var i; var j;
    for (i=0;i<document.forms.length;i++) {
        if (document.forms[i].name != "Cal")
            for (j=0;j<document.forms[i].elements.length;j++) {
                if (document.forms[i].elements[j].tagName == "SELECT") {
                    document.forms[i].elements[j].style.visibility=show;
                }
            }
    }
}

/*var n;
var p;
var p1;
function ValidatePhone(){
p=p1.value
if(p.length==3){
	//d10=p.indexOf('(')
	pp=p;
	d4=p.indexOf('(')
	d5=p.indexOf(')')
	if(d4==-1){
		pp="("+pp;
	}
	if(d5==-1){
		pp=pp+") ";
	}
	//pp="("+pp+")";
	p1.value="";
	p1.value=pp;
}
if(p.length>3){
	d1=p.indexOf('(')
	d2=p.indexOf(')')
	if (d2==-1){
		l30=p.length;
		p30=p.substring(0,5);
		//alert(p30);
		p30=p30+") "
		p31=p.substring(5,l30);
		pp=p30+p31;
		//alert(p31);
		p1.value="";
		p1.value=pp;
	}
	}
if(p.length>5){
	p11=p.substring(d1+1,d2);
	if(p11.length>3){
	p12=p11;
	l12=p12.length;
	l15=p.length
	//l12=l12-3
	p13=p11.substring(0,3);
	p14=p11.substring(3,l12);
	p15=p.substring(d2+1,l15);
	p1.value="";
	pp="("+p13+") "+p14+p15;
	p1.value=pp;
	//obj1.value="";
	//obj1.value=pp;
	}
	l16=p.length;
	p16=p.substring(d2+1,l16);
	l17=p16.length;
	if(l17>3&&p16.indexOf('-')==-1){
		p17=p.substring(d2+1,d2+5);
		p18=p.substring(d2+5,l16);
		p19=p.substring(0,d2+1);
		//alert(p19);
	pp=p19+p17+"-"+p18;
	p1.value="";
	p1.value=pp;
	//obj1.value="";
	//obj1.value=pp;
	}
}
//}
setTimeout(ValidatePhone,100)
}
function getIt(m){
n=m.name;
//p1=document.forms[0].elements[n]
p1=m
ValidatePhone()
}*/

var n;
var p;
var p1;
function ValidatePhone() {
    p = p1.value
    if (p.length == 3) {
        //d10=p.indexOf('(')
        pp = p;
        d4 = p.indexOf('(')
        d5 = p.indexOf(')')
        if (d4 == -1) {
            pp = "(" + pp;
            if (d5 == -1) {
                pp = pp + ") ";
            }
        }
        //pp="("+pp+")";
        p1.value = "";
        p1.value = pp;
    }
    if (p.length > 3) {
        d1 = p.indexOf('(')
        d2 = p.indexOf(')')
        if (d2 == -1) {
            l30 = p.length;
            p30 = p.substring(0, 5);
            //alert(p30);
            p30 = p30 + ") "
            p31 = p.substring(5, l30);
            pp = p30 + p31;
            //alert(p31);
            p1.value = "";
            p1.value = pp;
        }
    }
    if (p.length > 5) {
        p11 = p.substring(d1 + 1, d2);
        if (p11.length > 3) {
            p12 = p11;
            l12 = p12.length;
            l15 = p.length
            //l12=l12-3
            p13 = p11.substring(0, 3);
            p14 = p11.substring(3, l12);
            p15 = p.substring(d2 + 1, l15);
            p1.value = "";
            pp = "(" + p13 + ") " + p14 + p15;
            p1.value = pp;
            //obj1.value="";
            //obj1.value=pp;
        }
        l16 = p.length;
        p16 = p.substring(d2 + 1, l16);
        l17 = p16.length;
        if (l17 > 3 && p16.indexOf('-') == -1) {
            p17 = p.substring(d2 + 1, d2 + 5);
            p18 = p.substring(d2 + 5, l16);
            p19 = p.substring(0, d2 + 1);
            //alert(p19);
            pp = p19 + p17 + "-" + p18;
            p1.value = "";
            p1.value = pp;
            //obj1.value="";
            //obj1.value=pp;
        }
    }
    //}
    setTimeout(ValidatePhone, 100)
}
function getIt(m) {
    n = m.name;
    //p1=document.forms[0].elements[n]
    p1 = m
    ValidatePhone()
}

function formatPhone(m) {
    var re = /\D/;
    // test for this format: (xxx)xxx-xxxx
    var re2 = /^\({1}\d{3}\)\ \d{3}-\d{4}/;
    // test for this format: xxx-xxx-xxxx
    //var re2 = /^\d{3}-\d{3}-\d{4}/;

//    var num = eval(nums[i] + '.value');
    var num = m.value;

    var newNum;
    if (num != "" && re2.test(num) != true) {
        if (num != "") {
            while (re.test(num)) {
                num = num.replace(re, "");
            }
        }

        if (num.length != 10) {
            alert('Please enter a 10 digit phone number');
            eval(m).select();
//            m.focus();
        }
        else {
            // for format (xxx)xxx-xxxx
            newNum = '(' + num.substring(0, 3) + ')' + ' '+num.substring(3, 6) + '-' + num.substring(6, 10);
            // for format xxx-xxx-xxxx
            // newNum = num.substring(0,3) + '-' + num.substring(3,6) + '-' + num.substring(6,10);
            m.value = newNum;
        }
    }
}

//this function currently only checks format, but not the actual value,
//we should upgrade it some time
function fixDate(date) {
    var d = date.value;
    alert(d);
    while (d.indexOf('-') >= 0) {
        d = d.replace('-', '/');
    }

    var dateIndex = d.indexOf('/') + 1;
    var yearIndex = d.lastIndexOf('/') + 1;

    if ((dateIndex - 1 != yearIndex - 1) && (d.substring(dateIndex).indexOf('/') + dateIndex == yearIndex - 1)) {
        var month = d.substring(0, dateIndex - 1);
        var day = d.substring(dateIndex, yearIndex - 1);
        var year = d.substring(yearIndex);

        if (month.length == 1) {
            month = '0' + month;
        }
        if (day.length == 1) {
            day = '0' + day;
        }
        if (year.length == 2) {
            year = '20' + year;
        } else if (year.length != 4) {
            alert('Invalid Start Date.  Please use MM/DD/YYYY format.');
        }
        date.value = month + '/' + day + '/' + year;
    } else if (date.value.length > 0) {
        alert('Invalid Start Date.  Please use MM/DD/YYYY format.');
    }
}

function round(val, dec){
    var zeros = '';
    for(i=dec;i>0;i--){
        zeros += '0';
    }
    return eval('Math.round(' + val + ' * 1' + zeros + ') / 1' + zeros);
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function twoDecimalFormat(val)
{
    val = String(val);
    if (val.indexOf('.') < 0) {
        val += '.00';
    }
    if (val.indexOf('.') == (val.length - 2)) {
        val += '0';
    }
    return val;
}
