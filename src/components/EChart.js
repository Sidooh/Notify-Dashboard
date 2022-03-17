import React, {useEffect, useState} from 'react';
import {Help} from '../utils/Helpers';
import {bind, clear} from 'size-sensor';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';

const EChart = ({
                    options,
                    notMerge = false,
                    lazyUpdate = false,
                    showLoading, loadingOption = null,
                    onEvents, onChartReady,
                    theme, className, style
                }) => {
    const [htmlElement, setHtmlElement] = useState(null);
    const [isInitialResize, setIsInitialResize] = useState(true);

    /**
     * return the existing EChart object
     */
    const getEchartsInstance = () => echarts.getInstanceByDom(htmlElement);

    const initEchartsInstance = async () => {
        return new Promise((resolve) => {
            // create temporary EChart instance
            if(!(htmlElement instanceof HTMLElement)) return;

            echarts.init(htmlElement, theme, options);
            const echartsInstance = getEchartsInstance();

            echartsInstance.on('finished', () => {
                // get final width and height
                const width = htmlElement.clientWidth;
                const height = htmlElement.clientHeight;

                // dispose temporary EChart instance
                echarts.dispose(htmlElement);

                // recreate EChart instance
                // we use final width and height only if not originally provided as opts
                const opts = {
                    width,
                    height,
                    ...options,
                };
                resolve(echarts.init(htmlElement, theme, opts));
            });
        });
    };

    /**
     * render the echarts
     */
    const updateEChartsOption = () => {
        // 1. get or initial the echarts object
        const eChartInstance = getEchartsInstance();
        // 2. set the echarts option
        eChartInstance.setOption(options, notMerge, lazyUpdate);
        // 3. set loading mask
        if (showLoading) eChartInstance.showLoading(loadingOption);
        else eChartInstance.hideLoading();

        return eChartInstance;
    };

    // bind the events
    const bindEvents = (instance, events) => {
        function _bindEvent(eventName, fn) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && Help.isFunction(fn)) {
                // binding event
                instance.on(eventName, param => fn(param, instance));
            }
        }

        // loop and bind
        for (const eventName in events) {
            if (Object.prototype.hasOwnProperty.call(events, eventName)) {
                _bindEvent(eventName, events[eventName]);
            }
        }
    };

    /**
     * resize wrapper
     */
    const resize = () => {
        // 1. get the echarts object
        const echartsInstance = getEchartsInstance();

        // 2. call echarts instance resize if not the initial resize
        // resize should not happen on first render as it will cancel initial echarts animations
        if (isInitialResize) {
            try {
                echartsInstance.resize({
                    width: 'auto',
                    height: 'auto',
                });
            } catch (e) {
                console.warn(e);
            }
        }

        // 3. update variable for future calls
        setIsInitialResize(false);
    };

    const renderNewEcharts = async () => {
        // 1. init echarts instance
        await initEchartsInstance();

        // 2. update echarts instance
        const echartsInstance = updateEChartsOption();

        // 3. bind events
        bindEvents(echartsInstance, onEvents || {});

        // 4. on chart ready
        if (Help.isFunction(onChartReady)) onChartReady(echartsInstance);

        // 5. on resize
        if (htmlElement) bind(htmlElement, () => resize());
    };

    /**
     * dispose echarts and clear size-sensor
     */
    const dispose = () => {
        if (htmlElement) {
            try {
                clear(htmlElement);
            } catch (e) {
                console.warn(e);
            }

            // dispose echarts instance
            echarts.dispose(htmlElement);
        }
    };

    useEffect(() => {
        renderNewEcharts();

        return () => dispose();
    }, [renderNewEcharts]);

    const newStyle = {height: 300, ...style};

    return (
        <div
            ref={(e) => setHtmlElement(e)}
            style={newStyle}
            className={`echarts-for-react ${className}`}
        />
    );
};

EChart.propTypes = {
    options: PropTypes.object.isRequired
};

export default EChart;
