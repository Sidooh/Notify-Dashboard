import React, {useState} from "react";
import {
    createTheme,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ThemeProvider,
    Typography
} from "@mui/material";
import {Close} from "@mui/icons-material";

const Modal = ({id, title, body, footer}) => {
    return (
        <div className={`modal fade`} id={id} tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document" style={{maxWidth: '500px'}}>
                <div className="modal-content position-relative">
                    <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
                        <button className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                                data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body p-0">
                        <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                            <h4 className="mb-1" id="modalExampleDemoLabel">{title}</h4>
                        </div>
                        <div className="p-4 pb-0">
                            {body}
                        </div>
                    </div>
                    <div className="modal-footer">
                        {footer}
                    </div>
                </div>
            </div>
        </div>


        // <ThemeProvider theme={theme}>
        //     <Dialog open={open} maxWidth={size ?? 'md'} className={'shadow-lg'}>
        //         <DialogTitle className={'d-flex justify-content-between align-items-center'}>
        //             <Typography variant={'h6'} component={'div'} className={'fw-bold'}>
        //                 {title}
        //             </Typography>
        //             <button color={'secondary'} onClick={() => setOpen(false)}><Close/></button>
        //         </DialogTitle>
        //         <DialogContent dividers className={'p-4 pb-0'}>
        //             {context && <DialogContentText>{context}</DialogContentText>}
        //
        //             {children}
        //         </DialogContent>
        //     </Dialog>
        // </ThemeProvider>
    );
};

export default Modal;