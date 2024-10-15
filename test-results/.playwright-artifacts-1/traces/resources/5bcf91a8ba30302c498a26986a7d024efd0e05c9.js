/*
    this is a javascript utility class that contains useful javascript functions that we tend to repeat
 */

/*
   This will iterate through an array of jquery objects and add the disabled class to it.
 */

function disableFields(fields){
    if(fields){
        fields = fields.filter(':not(#manufacturer-dropdown)')
        fields.filter(':not(#branch-dropdown)').each(function(){
            $(this).attr("readonly",true)
            $(this).attr("disabled",true)
        })
    }
}

/*

 */

function hideObjects(objects){
    if(objects){
        objects.each(function(){
            $(this).hide()
        })
    }
}

function createEscapedJsonString(object){
    var escapeJsonCharacters = function (str) {
        return str
            .replace(/[\\]/g, '\\\\')
            .replace(/[\"]/g, '\\\"')
            .replace(/[\/]/g, '\\/')
            .replace(/[\b]/g, '\\b')
            .replace(/[\f]/g, '\\f')
            .replace(/[\n]/g, '\\n')
            .replace(/[\r]/g, '\\r')
            .replace(/[\t]/g, '\\t');
    };
    Object.keys(object).map(function(key, index){
        var val = object[key];
        if(typeof(val) === 'string')
        {
            val = encodeURIComponent(escapeJsonCharacters(val))
        }
        object[key] = val
    });

    return JSON.stringify(object)
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;
    
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};