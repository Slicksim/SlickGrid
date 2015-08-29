(function ($) {
    function SlickGridPager(dataView, grid, renderer) {
        var $status;

        function init() {
            dataView.onPagingInfoChanged.subscribe(function (e, pagingInfo) {
                updatePager(pagingInfo);
            });

            renderer.constructPagerUI();
            updatePager(dataView.getPagingInfo());
            renderer.onPageSize.subscribe(setPageSize);
            renderer.onPrev.subscribe(gotoPrev);
            renderer.onFirst.subscribe(gotoFirst);
            renderer.onNext.subscribe(gotoNext);
            renderer.onLast.subscribe(gotoLast);
        }

        function getNavState() {
            var cannotLeaveEditMode = !Slick.GlobalEditorLock.commitCurrentEdit();
            var pagingInfo = dataView.getPagingInfo();
            var lastPage = pagingInfo.totalPages - 1;

            return {
                canGotoFirst: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum > 0,
                canGotoLast: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum != lastPage,
                canGotoPrev: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum > 0,
                canGotoNext: !cannotLeaveEditMode && pagingInfo.pageSize != 0 && pagingInfo.pageNum < lastPage,
                pagingInfo: pagingInfo
            }
        }

        function setPageSize(e, pageSize) {
            dataView.setRefreshHints({
                isFilterUnchanged: true
            });
            if (pageSize != undefined) {
                if (pageSize == -1) {
                    var vp = grid.getViewport();
                    dataView.setPagingOptions({ pageSize: vp.bottom - vp.top });
                } else {
                    dataView.setPagingOptions({ pageSize: pageSize });
                }
            }            
        }

        function gotoFirst() {
            if (getNavState().canGotoFirst) {
                dataView.setPagingOptions({ pageNum: 0 });
            }
        }

        function gotoLast() {
            var state = getNavState();
            if (state.canGotoLast) {
                dataView.setPagingOptions({ pageNum: state.pagingInfo.totalPages - 1 });
            }
        }

        function gotoPrev() {
            var state = getNavState();
            if (state.canGotoPrev) {
                dataView.setPagingOptions({ pageNum: state.pagingInfo.pageNum - 1 });
            }
        }

        function gotoNext() {
            var state = getNavState();
            if (state.canGotoNext) {
                dataView.setPagingOptions({ pageNum: state.pagingInfo.pageNum + 1 });
            }
        }        


        function updatePager(pagingInfo) {
            var state = getNavState();
            renderer.updatePager(pagingInfo, state)
        }

        init();
    }

    // Slick.Controls.Pager
    $.extend(true, window, { Slick: { Controls: { Pager: SlickGridPager } } });
})(jQuery);
