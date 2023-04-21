import { useGetVendorsSLOQuery } from "features/analytics/analyticsApi";
import { Card, Col, Row } from "react-bootstrap";
import { ComponentLoader, LoadingButton, SectionError, Str, Tooltip } from "@nabcellent/sui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import CardBgCorner from "components/CardBgCorner";
import CountUp from "react-countup";
import { FaPercentage } from "react-icons/all";

const VendorsSLO = () => {
    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetVendorsSLOQuery()

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    return (
        <Col xs={12} className={'mb-3'}>
            <h5 className="text-primary text-center position-relative">
                    <span className="bg-200 px-3">
                        Vendors Success Rate
                        <Tooltip title="Refresh SLO" placement="left">
                            <LoadingButton loading={isFetching} className="btn btn-sm border-0 py-2"
                                           spinner-position="replace" onClick={() => refetch()}>
                                <FontAwesomeIcon icon={faSync}/>
                            </LoadingButton>
                        </Tooltip>
                    </span>
                <span
                    className="border position-absolute top-50 translate-middle-y w-100 start-0 z-index--1"></span>
            </h5>

            <Card>
                <CardBgCorner corner={5}/>
                <Card.Body>
                    <h5 className={'text-primary text-decoration-underline'}>YTD</h5>
                    <Row className={'g-2'}>
                        {Object.keys(data).map((vendor) => {
                            let color = 'success', slo = data[vendor as keyof typeof data]

                            if (slo < 70) color = 'danger'
                            else if (slo < 90) color = 'warning'

                            return (
                                <Col key={vendor} lg={4} className={`text-center border-bottom`}>
                                    <div className="py-3">
                                        <div className={`icon-circle icon-circle-${color} fw-bold`}>
                                            <CountUp end={data[vendor as keyof typeof data]} className="me-1 fs-2"/>
                                            <FaPercentage/>
                                        </div>
                                        <h6 className={`mb-1 fw-bold text-${color}`}>{Str.headline(vendor)}</h6>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default VendorsSLO;