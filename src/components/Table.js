import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import TableToolbar from './TableToolbar';
import {Help} from '../utils/Helpers';
import moment from 'moment';
import DestinationChips from './DestinationChips';
import {renderToString} from 'react-dom/server';

const Table = ({data, columns, options}) => {
    const [el, setEl] = useState(null);
    const [dataTable, setDataTable] = useState(null);

    data = data?.map(item => {
        let date;
        if (Help.isToday(moment(item.created_at))) {
            date = "Today";
        } else if (Help.isYesterday(moment(item.created_at))) {
            date = "Yesterday";
        } else {
            date = moment(item.created_at).format("D.M.y");
        }

        return [
            item.provider,
            item,
            item.content,
            date,
            item.id,
        ];
    });

    useEffect(() => {
        if (data) {
            if ($.fn.DataTable.isDataTable($(el))) {
                dataTable.draw();
            } else {
                setTimeout(() => {
                    const dataTable = $(el).on('error.dt', function (e, settings, techNote, message) {
                        console.error('An error has been reported by DataTables: ', message);
                    }).DataTable({
                        data,
                        columns,
                        columnDefs: [{
                            targets: 1,
                            render: (data, type, row, meta) => {
                                return renderToString(<DestinationChips notification={data}/>);
                            }
                        }]
                    });

                    setDataTable(dataTable);
                }, 500);
            }
        }
    }, [columns, data, dataTable, el]);

    return (
        <div className="card" id="recentPurchaseTable">
            <TableToolbar title={'Recent Notifications'} actionsId={'table-notification-actions'} toolbarIcons={[
                <button className="btn btn-falcon-default btn-sm" type="button">
                    <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"/>
                    <span className="d-none d-sm-inline-block ms-1">New</span>
                </button>
            ]}/>
            <div className="card-body px-0 pt-0">
                <div className="table-responsive scrollbar">
                    <table className="table table-sm fs--1 mb-0 overflow-hidden" ref={el => setEl(el)}/>
                </div>
            </div>
        </div>
    );
};

export default Table;
