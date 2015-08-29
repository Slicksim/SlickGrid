(function ($) {
    function FontAwesome($container) {
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

            var icon_prefix = "<span class='ui-icon-container'><span class='fa fa-lg fa-border ";
            var icon_suffix = "' /></span>";

            $(icon_prefix + "fa-lightbulb-o" + icon_suffix)
                .click(function () {
                    $(".slick-pager-settings-expanded").toggle()
                })
                .appendTo($settings);

            $(icon_prefix + "fa-step-backward" + icon_suffix)
                .click(firstEvent.notify)
                .appendTo($nav);

            $(icon_prefix + "fa-backward" + icon_suffix)
                .click(prevEvent.notify)
                .appendTo($nav);

            $(icon_prefix + "fa-forward" + icon_suffix)
                .click(nextEvent.notify)
                .appendTo($nav);

            $(icon_prefix + "fa-step-forward" + icon_suffix)
                .click(lastEvent.notify)
                .appendTo($nav);

            $container.find(".fa")
                .hover(function () {
                    $(this).toggleClass("bold");
                });

            $container.children().wrapAll("<div class='slick-pager' />");
        }

        function updatePager(pagingInfo, state) {
            
            $container.find(".slick-pager-nav span").removeClass("ui-state-disabled");
            if (!state.canGotoFirst) {
                $container.find(".fa-step-backward").addClass("ui-state-disabled");
            }
            if (!state.canGotoLast) {
                $container.find(".fa-step-forward").addClass("ui-state-disabled");
            }
            if (!state.canGotoNext) {
                $container.find(".fa-forward").addClass("ui-state-disabled");
            }
            if (!state.canGotoPrev) {
                $container.find(".fa-backward").addClass("ui-state-disabled");
            }

            if (pagingInfo.pageSize == 0) {
                var totalRowsCount = dataView.getItems().length;
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

    $.extend(true, window, { Slick: { Controls: { Rendering: { Pager: { FontAwesome: FontAwesome } } } } });
})(jQuery);