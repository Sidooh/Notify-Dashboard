import React from 'react';

type TableToolbarType = {
    title: string;
    actionsId: string;
    toolbarIcons: JSX.Element[]
}

const TableToolbar = ({title, actionsId, toolbarIcons}: TableToolbarType) => {
    return (
        <div className="card-header">
            <div className="row flex-between-center">
                <div className="col-6 col-sm-auto d-flex align-items-center pe-0">
                    <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">{title}</h5>
                </div>
                <div className="col-6 col-sm-auto ms-auto text-end ps-0">
                    <div className="d-none" id={actionsId}>
                        <div className="d-flex">
                            <select className="form-select form-select-sm" aria-label="Bulk actions">
                                <option>Bulk actions</option>
                                <option value="Refund">Refund</option>
                                <option value="Delete">Delete</option>
                                <option value="Archive">Archive</option>
                            </select>
                            <button className="btn btn-falcon-default btn-sm ms-2" type="button">Apply</button>
                        </div>
                    </div>
                    <div id="table-purchases-replace-element">
                        {
                            toolbarIcons.map((icon, i) => <span key={i}>{icon}</span>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableToolbar;