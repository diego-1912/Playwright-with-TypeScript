/**
 * Created by maggie.markey on 12/8/2015.
 */
/* This contains custom code for datepickers.
    To use:
    1) import
         <script src="../resource/kendoUI/kendo.all.min.js"></script>
         <link rel="stylesheet" href="//kendo.cdn.telerik.com/2015.3.1111/styles/kendo.common-material.min.css" />
         <link rel="stylesheet" href="//kendo.cdn.telerik.com/2015.3.1111/styles/kendo.material.min.css" />
         <link rel="stylesheet" href="../resource/kendoUI/kendo.bootstrap.min.css"/>
         <script src="../resource/kendoUI/custom/kendoDatePicker.js"></script>
    2) define var datePickers = "#id1, #id2, #id3" etc, for all datepickers on the page.
    3) onload, call initKendoDatepickers(datePickers);
 */

function initKendoDatePickers(datePickers, dateFormat, parseFormats) {
    // console.log(dateTemplate);
    if(!parseFormats){
        parseFormats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'MM-dd-yyyy']
    }
    /*if(!dateFormat){
        dateFormat = 'yyyy-MM-dd'
    }*/
    $(datePickers).kendoDatePicker({
        month: {content: dateTemplate},
        format: dateFormat,
        footer: dateFormat,
        open: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = true;
        },
        close: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = false;
        },
        parseFormats:parseFormats
    });
    $(datePickers).focus(function (e) {
        var obj = $(this).data('kendoDatePicker');
        if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
            obj.open();
        }
    });
    $(datePickers).attr('property', function () {
        return $(this).attr('id');
    });
    $(datePickers).attr('readonly', 'readonly');
// This does not work on IE as X delete is displayed
//    $(datePickers).on("keydown",
//        function(){
//            return false;
//        }
//    );
}

function renderDateRangePicker(datePickers, dateFormat, dateRangeMin, dateRangeMax) {
    $(datePickers).kendoDatePicker({
        format: dateFormat,
        footer: dateFormat,
        min: dateRangeMin>=dateRangeMax ? dateRangeMax:dateRangeMin,
        max: dateRangeMax,
        width: '100%',
        month: {
            empty: '<span class="k-state-disabled">#= data.value #</span>'
        },
        open: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = true;
        },
        close: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = false;
        }
    });
    $(datePickers).focus(function (e) {
        var obj = $(this).data('kendoDatePicker');
        if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
            obj.open();
        }
    });
    $(datePickers).attr('property', function () {
        return $(this).attr('id');
    });
    $(datePickers).attr('readonly', 'readonly');
}

function initKendoDatePickersDecade(datePickers, dateFormat,parseFormats) {
    // console.log(dateTemplate);
    if(!parseFormats){
        parseFormats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'MM-dd-yyyy']
    }
    $(datePickers).kendoDatePicker({
        month: {content: dateTemplate},
        format: dateFormat,
        start: "decade",
        footer: dateFormat,
        parseFormats:parseFormats,
        open: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = true;
        },
        close: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = false;
        }
    });
    $(datePickers).focus(function (e) {
        var obj = $(this).data('kendoDatePicker');
        if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
            obj.open();
        }
    });
    $(datePickers).attr('property', function () {
        return $(this).attr('id');
    });
    $(datePickers).attr('readonly', 'readonly');
}

function initKendoDatePickersCentury(datePickers, dateFormat,parseFormats) {
    // console.log(dateTemplate);
    if(!parseFormats){
        parseFormats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'MM-dd-yyyy']
    }
    $(datePickers).kendoDatePicker({
        month: {content: dateTemplate},
        format: dateFormat,
        start: "century",
        footer: dateFormat,
        open: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = true;
        },
        close: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = false;
        },
        parseFormats:parseFormats
    });
    $(datePickers).focus(function (e) {
        var obj = $(this).data('kendoDatePicker');
        if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
            obj.open();
        }
    });
    $(datePickers).attr('property', function () {
        return $(this).attr('id');
    });

    $(datePickers).attr('readonly', 'readonly');
}

function initKendoDateTimePickers(dateTimePickers, dateTimeFormat, timeFormat) {
    // console.log(dateTemplate);
    $(dateTimePickers).kendoDateTimePicker({
        month: {content: dateTemplate},
        format: dateTimeFormat,
        timeFormat: timeFormat,
        footer: dateTimeFormat,
        open: function (e) {
            $(dateTimePickers).data('kendoDateTimePicker').options.opened = true;
        },
        close: function (e) {
            $(dateTimePickers).data('kendoDateTimePicker').options.opened = false;
        }
    });
    $(dateTimePickers).focus(function (e) {
        var obj = $(this).data('kendoDateTimePicker');
        if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
            obj.open();
        }
    });
    $(dateTimePickers).attr('property', function () {
        return $(this).attr('id');
    });
    $(dateTimePickers).attr('readonly', 'readonly');
}

function initKendoDatePickersDecadePartiallyDisabled(datePickers, dateFormat) {
    // console.log(dateTemplate);
//    if(!dateFormat){
//        dateFormat = 'yyyy-MM-dd'
//    }
    $(datePickers).kendoDatePicker({
        month: {content: dateTemplate},
        format: dateFormat,
        start: "decade",
        footer: dateFormat,
        open: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = true;
        },
        close: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = false;
        },
        change: function(e)
        {
            sessionStorage.setItem("previousDateEntries", "yes");
            sessionStorage.setItem(this.element.prop("id"), kendo.toString(this.value(), dateFormat));
        }
    });
    $(datePickers).focus(function (e) {
        if($(this).data('kendoDatePicker').options.originalValue == undefined) {
            $(this).data('kendoDatePicker').options.originalValue = $(this).val();
        }
        var obj = $(this).data('kendoDatePicker');
        if(obj.options.originalValue == "") {
            if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
                obj.open();
            }
        }
    });
    $(datePickers).attr('property', function () {
        return $(this).attr('id');
    });
    $(datePickers).attr('readonly', 'readonly');
//    $(datePickers).on("keydown",
//        function(){
//            return false;
//        }
//    );
}

function initKendoDatePickersDecadeEditable(datePickers, dateFormat, parseFormats) {
    // console.log(dateTemplate);
    if(!parseFormats){
        parseFormats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'MM-dd-yyyy']
    }

    $(datePickers).kendoDatePicker({
        month: {content: dateTemplate},
        format: dateFormat,
        start: "decade",
        footer: dateFormat,
        open: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = true;
        },
        close: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = false;
        },
        change: function(e)
        {
            sessionStorage.setItem("previousDateEntries", "yes");
            sessionStorage.setItem(this.element.prop("id"), kendo.toString(this.value(), dateFormat));
        },
        parseFormats:parseFormats
    });
    $(datePickers).focus(function (e) {
        if($(this).data('kendoDatePicker').options.originalValue == undefined) {
            $(this).data('kendoDatePicker').options.originalValue = $(this).val();
        }
        var obj = $(this).data('kendoDatePicker');
        if(obj.options.originalValue == "") {
            if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
                obj.open();
            }
        }
    });
    $(datePickers).attr('property', function () {
        return $(this).attr('id');
    });
}

function initKendoDatePickersWithStyle(datePickers, dateFormat, parseFormats, holidayDateArray) {
    if(!parseFormats){
        parseFormats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'MM-dd-yyyy']
    }

    var dateTemplateStyle = '# if (isToday(data.date)) { #' +
                            ' <span class="badge">#= data.value #</span> #' +
                            ' } else if(isWeekendOrHoliday(data.date, data.dates)) { #' +
                            ' <span class="k-other-month k-weekend">#= data.value #</span> #' +
                            ' } else { #' +
                            ' <span class="k-content">#= data.value #</span> #' +
                            ' } #';

    $(datePickers).kendoDatePicker({
        dates: holidayDateArray,
        month: {content: dateTemplateStyle},
        format: dateFormat,
        footer: dateFormat,
        open: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = true;
        },
        close: function (e) {
            $(datePickers).data('kendoDatePicker').options.opened = false;
        },
        parseFormats:parseFormats
    });
    $(datePickers).focus(function (e) {
        var obj = $(this).data('kendoDatePicker');
        if (typeof(obj.options.opened) == 'undefined' || !obj.options.opened) {
            obj.open();
        }
    });
    $(datePickers).attr('property', function () {
        return $(this).attr('id');
    });
    $(datePickers).attr('readonly', 'readonly');
}

function isToday(date) {
    var today = new Date();
    if (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()) {
        return true;
    }
    return false;
}

function isWeekendOrHoliday(date, dates) {
    var isWeekend = (date.getDay() === 6 || date.getDay() === 0);
    return compareDates(date, dates);

}
function compareDates(date, dates) {
    for (var i = 0; i < dates.length; i++) {
        if (dates[i].getDate() == date.getDate() &&
            dates[i].getMonth() == date.getMonth() &&
            dates[i].getYear() == date.getYear()) {
            return true
        }
    }
    return false;
}

var dateTemplate = '<span class="#= isToday(data.date) ? \'badge\' : \'\' #">#= data.value #</span>';