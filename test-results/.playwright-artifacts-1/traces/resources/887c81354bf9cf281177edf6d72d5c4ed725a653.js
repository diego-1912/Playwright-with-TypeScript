function renderKendoUISearchGrid(gridOptions)
{
    var gridDataSource = new kendo.data.DataSource({
        type: "json",

        transport: {
            read: {
                url: gridOptions.dataURL,
                type: "POST"
            },
            parameterMap: function (options, type) {
                try {
                    var formValues = $("#" + gridOptions.formId).serializeArray();
                    //console.log(formValues);
                    var result = {
                        pageSize: options.pageSize,
                        page: options.page,
                        gridInit: true
                    };

                    if (options.sort && options.sort.length > 0) {
                        // We only sort by one column at a time
                        result['sort.field'] = options.sort[0].field;
                        result['sort.dir'] = options.sort[0].dir;
                    }
                    $(formValues).each(function() {
                        if (result[this.name] !== undefined){
                            var temp = result[this.name];
                            result[this.name] = temp + "," + this.value;
                        }
                        else
                        {
                            result[this.name] = this.value;
                        }
                    });
                    //console.log(result);
                    return result;

                } catch (e) {
                    alert("error:" + e);
                }
            }
        },
        schema: {
            model: {
                fields: generateFields(Object.keys(gridOptions.columns))
            },
            data: function(response)
            {
                var result = JSON.parse(response);
                return result.rows;
            },
            total: function(response)
            {
                var result = JSON.parse(response);
                if(result.total > 0)
                {
                    $("#searchOptions").collapse('hide');
                    $(".download-button").show();
                    $(".print-button").show();
                    $("#totalRecordCount").val(result.total);

                }
                else
                {
                    $("#searchOptions").collapse('show');
                    $(".download-button").hide();
                    $(".print-button").hide();
                    $("#totalRecordCount").val(0);
                }
                return result.total;
            }
        },
        pageSize: 50,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    $("#" + gridOptions.gridSelector).kendoGrid({
        scrollable: false,
        autoBind: false,
        dataSource: gridDataSource,
        filterable: false,
        sortable: true,
        pageable: {
            pageSizes: gridOptions.pageSizes,
            buttonCount: 5
        },
        columns: generateColumns(gridOptions.columns)
    });
    $(".k-pager-sizes select").data("kendoDropDownList").list.addClass(gridOptions.customPageSizeNumbersCss);
    if(gridOptions.displayTopPager == true)
    {
        copyNavigationToTopOnGrid("#" + gridOptions.gridSelector);
    }
}
function renderKendoUIHistoryGrid(gridOptions)
{
    var gridDataSource = new kendo.data.DataSource({
        type: "jsonp",
        transport: {
            read: {
                url: gridOptions.dataURL
            },
            parameterMap: function (options, type) {
                try {
                    var result = {
                        pageSize: options.pageSize,
                        skip: options.skip,
                        page: options.page,
                        take: options.take,
                        id: gridOptions.entityId,
                        gridInit: true
                    };

                    if (options.sort) {
                        for (var i = 0; i < options.sort.length; i++) {
                            result["sort[" + i + "].field"] = options.sort[i].field;
                            result["sort[" + i + "].dir"] = options.sort[i].dir;
                        }
                    }


                    if (options.filter != "" && options.filter != undefined) {
                        if ('filter' in options && options.filter.filters.length > 0) {
                            result["optionFilter"] = JSON.stringify(options.filter);
                        }
                    }

                    return result;

                } catch (e) {
                    alert("error:" + e);
                }
            }
        },
        schema: {
            model: {
                fields: generateFields(Object.keys(gridOptions.columns))
            },
            data: function(response)
            {
                var result = JSON.parse(response);
                return result.rows;
            },
            total: function(response)
            {
                var result = JSON.parse(response);
                return result.total;
            }
        },
        pageSize: 50,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    $("#" + gridOptions.gridSelector).kendoGrid({
        dataSource: gridDataSource,
        filterable: false,
        sortable: true,
        pageable: {
          pageSizes: gridOptions.pageSizes,
          buttonCount: 5
        },
        columns: generateColumns(gridOptions.columns)
    });
    $(".k-pager-sizes select").data("kendoDropDownList").list.addClass(gridOptions.customPageSizeNumbersCss);
    if(gridOptions.displayTopPager == true)
    {
        copyNavigationToTopOnGrid("#" + gridOptions.gridSelector);
    }
}

function copyNavigationToTopOnGrid(gridSelector) {
    var grid = $(gridSelector).data("kendoGrid"),
        pager = $(gridSelector + ' .k-pager-wrap'),
        id = pager.prop('id') + '_top',
        $grid = $(gridSelector);

    if (!grid.topPager) {
        // create top pager div
        topPager = $('<div/>', {
            'id': id,
            'class': 'k-pager-wrap pagerTop'
        }).insertBefore($grid);

        // copy options for bottom pager to top pager
        grid.topPager = new kendo.ui.Pager(topPager, $.extend({}, grid.options.pageable, { dataSource: grid.dataSource }));

        // cloning the pageable options will use the id from the bottom pager
        grid.options.pagerId = id;

        // DataSource change event is not fired, so call this manually
        grid.topPager.refresh();
    }
}

function generateColumns(columns)
{
    var columnsArray = [];
    for(var key in columns)
    {
        var column = {
            field: key,
            hidden: columns[key].hidden,
            width: columns[key].width,
            title: columns[key].title,
            sortable: columns[key].sortable,
            encoded: false,
            headerAttributes: { "class": columns[key].columnHeaderCss },
            attributes: columns[key].attributes,
            template: columns[key].template
        };
        columnsArray.push(column);
    }
    return columnsArray;
}

function generateFields(columnKeys)
{
    var fields = {};
    for(var i = 0; i < columnKeys.length; i++)
    {
        fields[columnKeys[i]] = {type: "string"};
    }
    return fields;
}