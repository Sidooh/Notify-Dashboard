import { Card, Col, Row } from "react-bootstrap";
import { useGetProvidersBalancesQuery } from "features/dashboard/dashboardApi";
import CountUp from 'react-countup';
import { ComponentLoader, SectionError } from "@nabcellent/sui-react";
import CardBgCorner from 'components/CardBgCorner';
import Tooltip from "@mui/material/Tooltip";

const ProviderBalances = () => {
    const { data, isError, error, isLoading, isSuccess } = useGetProvidersBalancesQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    const { wavesms_balance, websms_balance, wasiliana_balance } = data

    return (
        <Row className="g-3 h-100">
            <Col md={4} className={'mb-xxl-2'}>
                <Card className={'bg-line-chart-gradient'}>
                    <CardBgCorner corner={3}/>
                    <Card.Body className={'position-relative'}>
                        <h6 className="mb-md-0 mb-lg-2 text-light">Wasiliana Balance</h6>
                        <h4 className="m-0 fs-2 fw-normal text-white">
                            {wasiliana_balance ? <CountUp end={wasiliana_balance} separator=","/> : 'N/A'}
                        </h4>
                        <Tooltip className={'position-absolute top-0 end-0 m-3'}
                                 title={`${wasiliana_balance} * 0.2 ≈ KSH${(wasiliana_balance * .2).toFixed(2)}`}>
                            <span className="fas fa-info-circle fs-7 text-400 position-absolute"/>
                        </Tooltip>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4} className={'mb-xxl-2'}>
                <Card className={'bg-line-chart-gradient'}>
                    <CardBgCorner/>
                    <Card.Body className={'position-relative'}>
                        <h6 className="mb-md-0 mb-lg-2 text-light">WaveSMS Balance</h6>
                        <h4 className="m-0 fs-2 fw-normal text-white">
                            <CountUp end={wavesms_balance} separator="," decimals={2}/>
                        </h4>
                        <Tooltip className={'position-absolute top-0 end-0 m-3'}
                                 title={`${wavesms_balance} * 0.2 ≈ KSH${(wavesms_balance * .2).toFixed(2)}`}>
                            <span className="fas fa-info-circle fs-7 text-400 position-absolute"/>
                        </Tooltip>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4} className={'mb-xxl-2'}>
                <Card className={'bg-line-chart-gradient'}>
                    <CardBgCorner corner={2}/>
                    <Card.Body className={'position-relative'}>
                        <h6 className="mb-md-0 mb-lg-2 text-light">WebSMS Balance</h6>
                        <h4 className="m-0 fs-2 fw-normal text-white">
                            <CountUp end={websms_balance} separator=","/>
                        </h4>
                        <Tooltip className={'position-absolute top-0 end-0 m-3'}
                                 title={`${websms_balance} * 0.3 ≈ KSH${(websms_balance * .3).toFixed(2)}`}>
                            <span className="fas fa-info-circle fs-7 text-400 position-absolute"/>
                        </Tooltip>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default ProviderBalances;
