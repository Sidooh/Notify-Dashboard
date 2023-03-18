import { memo } from 'react';
import CountUp from 'react-countup';
import { IMAGES } from 'constants/images';
import CardBgCorner from "../../../components/CardBgCorner";
import Tooltip from "@mui/material/Tooltip";

type SmsBalancesType = {
    credits: { wavesms: number, africastalking: number, websms: number },
    default_sms_provider: string,
}

const SmsBalances = ({ credits, default_sms_provider }: SmsBalancesType) => {
    return (
        <div className="card">
            <CardBgCorner/>
            <div className="card-body position-relative">
                <div className="row h-100 justify-content-between g-0">
                    <div className="col-12">
                        <h5 className="mt-1">SMS Credits</h5>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-4">
                                    <div className={'position-relative'}>
                                        <CountUp end={credits?.wavesms} className={'fs-1'}/>
                                        <Tooltip
                                            title={`${credits?.wavesms} * 0.2 ≈ KSH${(credits?.wavesms * .2).toFixed(2)}`}>
                                            <span className="fas fa-info-circle fs-7 text-400 position-absolute"
                                                  data-fa-transform="shrink-1"/>
                                        </Tooltip>
                                    </div>
                                    <div className="d-flex flex-between-center mb-1">
                                        <div className="d-flex align-items-center fs--2">
                                            <span className={`dot bg-${default_sms_provider === 'WAVESMS'
                                                ? 'primary' : '300'}`}/>
                                            <span className="fw-semi-bold">WAVE</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className={'position-relative'}>
                                        <CountUp end={credits?.websms} className={'fs-1'}/>
                                        <Tooltip
                                            title={`${credits?.websms} * 0.3 ≈ KSH${(credits?.websms * .3).toFixed(2)}`}>
                                            <span className="fas fa-info-circle fs-7 text-400 position-absolute"
                                                  data-fa-transform="shrink-1"/>
                                        </Tooltip>
                                    </div>
                                    <div className="d-flex flex-between-center mb-1">
                                        <div className="d-flex align-items-center fs--2">
                                            <span className={`dot bg-${default_sms_provider === 'WEBSMS'
                                                ? 'primary' : '300'}`}/>
                                            <span className="fw-semi-bold">WEB</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 ps-1">
                                    <div className={'position-relative'}>
                                        <CountUp end={credits?.africastalking} className={'fs-1'}/>
                                        <Tooltip
                                            title={`${credits?.africastalking} * 0.8 ≈ KSH${(credits?.africastalking * .8).toFixed(2)}`}>
                                            <span className="fas fa-info-circle fs-7 text-400 position-absolute"
                                                  data-fa-transform="shrink-1"/>
                                        </Tooltip>
                                    </div>
                                    <div className="d-flex flex-between-center mb-1">
                                        <div className="d-flex align-items-center fs--2">
                                            <span className={`dot bg-${default_sms_provider === 'AFRICASTALKING'
                                                ? 'primary' : '300'}`}/>
                                            <span className="fw-semi-bold">AT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(SmsBalances);