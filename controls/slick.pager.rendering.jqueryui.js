(function ($) {
    function jQueryUi($container) {

        var prevEvent = new Slick.Event();
        var firstEvent = new Slick.Event();
        var nextEvent = new Slick.Event();
        var lastEvent = new Slick.Event();
        var pageSizeEvent = new Slick.Event();

        function constructPagerUI() {
            $container.empty();

            var $nav = $("<span class='slick-pager-nav' />").appendTo($container);
            var $settings = $("<span class='slick-pager-settings' />").appendTo($container);
            $status = $("<span class='slick-pager-status' />").appendTo($container);

            $settings
                .append("<span class='slick-pager-settings-expanded' style='display:none'>Show: <a data=0>All</a><a data='-1'>Auto</a><a data=25>25</a><a data=50>50</a><a data=100>100</a></span>");

            $settings.find("a[data]").click(function (e) {
                var pagesize = $(e.target).attr("data");
                pageSizeEvent.notify(parseInt(pagesize))
            });

            var icon_prefix = "<span class='ui-state-default ui-corner-all ui-icon-container'><span class='ui-icon ";
            var icon_suffix = "' /></span>";

            $(icon_prefix + "ui-icon-lightbulb" + icon_suffix)
                .click(function () {
                    $(".slick-pager-settings-expanded").toggle()
                })
                .appendTo($settings);

            $(icon_prefix + "ui-icon-seek-first" + icon_suffix)
                .click(firstEvent.notify)
                .appendTo($nav);

            $(icon_prefix + "ui-icon-seek-prev" + icon_suffix)
                .click(prevEvent.notify)
                .appendTo($nav);

            $(icon_prefix + "ui-icon-seek-next" + icon_suffix)
                .click(nextEvent.notify)
                .appendTo($nav);

            $(icon_prefix + "ui-icon-seek-end" + icon_suffix)
                .click(lastEvent.notify)
                .appendTo($nav);

            $container.find(".ui-icon-container")
                .hover(function () {
                    $(this).toggleClass("ui-state-hover");
                });

            $container.children().wrapAll("<div class='slick-pager' />");
        }

        function updatePager(pagingInfo, state, totalRowsCount) {
            
            $container.find(".slick-pager-nav span").removeClass("ui-state-disabled");
            if (!state.canGotoFirst) {
                $container.find(".ui-icon-seek-first").addClass("ui-state-disabled");
            }
            if (!state.canGotoLast) {
                $container.find(".ui-icon-seek-end").addClass("ui-state-disabled");
            }
            if (!state.canGotoNext) {
                $container.find(".ui-icon-seek-next").addClass("ui-state-disabled");
            }
            if (!state.canGotoPrev) {
                $container.find(".ui-icon-seek-prev").addClass("ui-state-disabled");
            }

            if (pagingInfo.pageSize == 0) {
                var visibleRowsCount = pagingInfo.totalRows;
                if (visibleRowsCount < totalRowsCount) {
                    $status.text("Showing " + visibleRowsCount + " of " + totalRowsCount + " rows");
                } else {
                    $status.text("Showing all " + totalRowsCount + " rows");
                }
                $status.text("Showing all " + pagingInfo.totalRows + " rows");
            } else {
                $status.text("Showing page " + (pagingInfo.pageNum + 1) + " of " + pagingInfo.totalPages);
            }
        }


        return {
            "onNext": nextEvent,
            "onLast": lastEvent,
            "onPrev": prevEvent,
            "onFirst": firstEvent,
            "onPageSize": pageSizeEvent,
            "updatePager": updatePager,
            "constructPagerUI" : constructPagerUI
        };
    }
    $.extend(true, window, { Slick: { Controls: { Rendering: { Pager: { jQueryUi: jQueryUi } } } } });
})(jQuery);