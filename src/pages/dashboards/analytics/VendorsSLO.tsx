import { useGetVendorsSLOQuery } from "features/analytics/analyticsApi";
import { Card, Col, Row } from "react-bootstrap";
import { ComponentLoader, LoadingButton, SectionError, Str, Tooltip } from "@nabcellent/sui-react";
import CardBgCorner from "components/CardBgCorner";
import CountUp from "react-countup";
import { FaPercentage, FaSync } from "react-icons/fa";
import { useState } from "react";

const VendorsSLO = () => {
    const [bypassCache, setBypassCache] = useState(false)

    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetVendorsSLOQuery(bypassCache)

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    return (
        <Col xs={12} className={'mb-3'}>
            <h5 className="text-primary text-center position-relative">
                    <span className="bg-200 px-3">
                        Vendors Success Rate
                        <Tooltip title="Refresh SLO" placement="start">
                            <LoadingButton loading={isFetching} className="btn btn-sm border-0 py-2"
                                           spinner-position="replace" onClick={() => {
                                if(!bypassCache) setBypassCache(true)

                                refetch()
                            }}>
                                <FaSync size={10}/>
                            </LoadingButton>
                        </Tooltip>
                    </span>
                <span
                    className="border position-absolute top-50 translate-middle-y w-100 start-0 z-index--1"></span>
            </h5>

            <Card>
                <CardBgCorner corner={5}/>
                <Card.Body className={'bg-dark'}>
                    <div className={'d-flex'}>
                        <h5 className={'text-light border-bottom pe-lg-5'}>YTD</h5>
                    </div>
                    <Row className={'g-2'}>
                        {Object.keys(data).map((vendor) => {
                            let color = 'success', slo = data[vendor as keyof typeof data]

                            if (slo < 70) color = 'danger'
                            else if (slo < 90) color = 'warning'

                            return (
                                <Col key={vendor} lg={4} className={`text-center`}>
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