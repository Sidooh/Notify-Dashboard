import React from 'react';
import MUIDataTable from 'mui-datatables';
import {ThemeProvider} from '@mui/material';
import {FilterList, GetApp, Print, Search, ViewColumn} from '@mui/icons-material';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['"Varela Round"', 'cursive',].join(','),
    },
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    fontSize: '1rem'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '.375rem',
                    backgroundColor: 'var(--falcon-card-bg)',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '0 .25rem',
                },
                head: {
                    backgroundColor: 'rgba(var(--falcon-200-rgb), 1) !important',
                },
                body: {
                    color: 'var(--falcon-body-color)',
                },
            }
        },
    }
});


type DataTableType = {
    data: any[],
    columns: any[]
};

const DataTable = ({data, columns}: DataTableType) => {
    const components = {
        NewIcon: () => <GetApp fontSize={'small'}/>,
        icons: {
            SearchIcon: () => <Search fontSize={'small'}/>,
            DownloadIcon: () => <GetApp fontSize={'small'}/>,
            PrintIcon: () => <Print fontSize={'small'}/>,
            ViewColumnIcon: () => <ViewColumn fontSize={'small'}/>,
            FilterIcon: () => <FilterList fontSize={'small'} style={{padding: 0}}/>,
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={'d-flex align-items-center justify-content-end mb-2'}>
                <button className="btn btn-falcon-default btn-sm" type="button">
                    <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"/>
                    <span className="d-none d-sm-inline-block ms-1">New</span>
                </button>
            </div>
            <MUIDataTable
                title={<h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">SMS Notifications </h5>}
                data={data}
                columns={columns}
                options={{filter: true, filterType: 'dropdown', rowsPerPage: 10}}
                components={components}/>
        </ThemeProvider>
    );
};

export default DataTable;