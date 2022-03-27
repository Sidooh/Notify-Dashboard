import {Toast, Tooltip} from "bootstrap";

/* -------------------------------------------------------------------------- */

/*                                   Tooltip                                  */

/* -------------------------------------------------------------------------- */


export const tooltipInit = function tooltipInit() {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl, {
            trigger: 'hover'
        });
    });
};

/* -------------------------------------------------------------------------- */

/*                           Icon copy to clipboard                           */

/* -------------------------------------------------------------------------- */


export const iconCopiedInit = function iconCopiedInit() {
    let iconList = document.getElementById('icon-list');
    let iconCopiedToast = document.getElementById('icon-copied-toast');
    let iconCopiedToastInstance = new Toast(iconCopiedToast!);

    if (iconList) {
        iconList.addEventListener('click', function (e) {
            let el: any = e.target;

            if (el.tagName === 'INPUT') {
                el.select();
                el.setSelectionRange(0, 99999);
                document.execCommand('copy');
                iconCopiedToast!.querySelector('.toast-body')!.innerHTML = "<span class=\"fw-black\">Copied:</span> <code>".concat(el.value, "</code>");
                iconCopiedToastInstance.show();
            }
        });
    }
};