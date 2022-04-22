import { memo } from 'react';
import AdvanceTableWrapper from './AdvanceTableWrapper';
import AdvanceTable from 'components/common/datatable/AdvanceTable';
import AdvanceTableFooter from './AdvanceTableFooter';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import AdvanceTableSearchBox from 'components/common/datatable/AdvanceTableSearchBox';

type BulkActionType = {
    title: string
    selectedRowIds?: number[] | string[]
    table: boolean
    onCreateRow?: any
    bulkActions?: boolean
}

function BulkAction({title, onCreateRow, selectedRowIds = [], bulkActions}: BulkActionType) {
    return (
        <Row className="flex-between-center mb-3">
            <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                    {
                        Object.keys(selectedRowIds).length > 0
                            ? `You have selected ${Object.keys(selectedRowIds).length} rows`
                            : title
                    }
                </h5>
            </Col>
            {
                bulkActions && <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
                    {Object.keys(selectedRowIds).length > 0 ? (
                        <div className="d-flex">
                            <Form.Select size="sm" aria-label="Bulk actions">
                                <option>Bulk Actions</option>
                                <option value="refund">Refund</option>
                                <option value="delete">Delete</option>
                                <option value="archive">Archive</option>
                            </Form.Select>
                            <Button
                                type="button"
                                variant="falcon-default"
                                size="sm"
                                className="ms-2"
                            >
                                Apply
                            </Button>
                        </div>
                    ) : (
                        <div className={'d-flex align-items-center'}>
                            {
                                onCreateRow &&
                                <IconButton variant="falcon-default" size="sm" icon="plus" transform="shrink-3"
                                            className="me-2" onClick={onCreateRow}>
                                    <span className="d-none d-sm-inline-block ms-1">New</span>
                                </IconButton>
                            }
                            <IconButton variant="falcon-default" size="sm" icon="external-link-alt" transform="shrink-3">
                                <span className="d-none d-sm-inline-block ms-1">Export</span>
                            </IconButton>
                        </div>
                    )}
                </Col>}
        </Row>
    );
}

type DataTableType = {
    columns: any[]
    data: any[]
    title: string
    perPage?: number,
    tableClassName?: string
    bulkActions?: boolean
    onCreateRow?: any
}

const DataTable = ({
    columns,
    data,
    title = 'DataTable',
    perPage = 10,
    tableClassName,
    bulkActions = false,
    onCreateRow
}: DataTableType) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <AdvanceTableWrapper columns={columns} data={data} sortable pagination perPage={perPage}
                                     selection={bulkActions} selectionColumnWidth={30}>
                    <BulkAction table title={title} onCreateRow={onCreateRow} bulkActions={bulkActions}/>
                    <Row className="flex-end-center mb-3">
                        <Col xs="auto" sm={6} lg={4}><AdvanceTableSearchBox table/></Col>
                    </Row>
                    <AdvanceTable table
                                  headerClassName="bg-200 text-900 text-nowrap align-middle"
                                  rowClassName="align-middle"
                                  tableProps={{
                                      striped: true,
                                      className: `fs--1 mb-0 overflow-hidden ${tableClassName}`
                                  }}
                    />
                    <div className="mt-3">
                        <AdvanceTableFooter rowCount={data.length} table rowInfo navButtons rowsPerPageSelection/>
                    </div>
                </AdvanceTableWrapper>
            </Card.Body>
        </Card>
    );
};

export default memo(DataTable);
