import $ from 'jquery'
import _ from 'lodash'

window.$ = $
window._ = _

$.fn.dataTable.ext.errMode = 'none';
$.extend(true, $.fn.dataTable.defaults, {
    responsive: true,
    columnDefs: [
        { orderable: false, targets: 0 }
    ],
})