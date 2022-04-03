import React from 'react';
import CountUp from 'react-countup';
import {IMAGES} from '../../../constants';

type SmsBalancesType = {
    credits: { africastalking: number, websms: number },
    default_sms_provider: string,
}

const SmsBalances = ({credits, default_sms_provider}: SmsBalancesType) => {
    return (
        <div className="card h-md-100">
            <div className="bg-holder bg-card"
                 style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_3})`}}/>
            <div className="card-body position-relative">
                <div className="row h-100 justify-content-between g-0">
                    <div className="col-12">
                        <h6 className="mt-1">SMS Credits</h6>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <CountUp end={credits?.websms} className={'fs-2'}/>
                                        <span className="ms-1 text-400"
                                              title={`${credits?.websms} * 0.3 ≈ KSH${(credits?.websms * .3).toFixed(2)}`}>
                                            <span className="fas fa-info-circle fs-9" data-fa-transform="shrink-1"/>
                                        </span>
                                    </div>
                                    <div className="d-flex flex-between-center mb-1">
                                        <div className="d-flex align-items-center fs--2">
                                            <span className={`dot bg-${default_sms_provider === 'websms'
                                                ? 'primary' : '300'}`}/>
                                            <span className="fw-semi-bold">WEBSMS</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 ps-1">
                                    <div>
                                        <CountUp end={credits?.africastalking} className={'fs-2'}/>
                                        <span className="ms-1 text-400"
                                              title={`${credits?.africastalking} * 0.8 ≈ KSH${(credits?.africastalking * .8).toFixed(2)}`}>
                                            <span className="fas fa-info-circle fs-9" data-fa-transform="shrink-1"/>
                                        </span>
                                    </div>
                                    <div className="d-flex flex-between-center mb-1">
                                        <div className="d-flex align-items-center fs--2">
                                                        <span
                                                            className={`dot bg-${default_sms_provider === 'africastalking'
                                                                ? 'primary' : '300'}`}/>
                                            <span className="fw-semi-bold">AFRICASTALKING</span>
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

export default SmsBalances;