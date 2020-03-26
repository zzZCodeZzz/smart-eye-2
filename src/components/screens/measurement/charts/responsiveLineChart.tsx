import React, {FunctionComponent, useState} from 'react';
import {CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import {Button} from "@material-ui/core";
import moment from "moment";
import {DeviceDoseVisualisation} from "../../../../redux/device/radEyeDevicesSlice";

type ResponsiveLineChartState = {
    data: DeviceDoseVisualisation[];
    left: string;
    right: string;
    refAreaLeft: string;
    refAreaRight: string;
    top: string;
    bottom: string;
    top2: string;
    bottom2: string;
    animation: boolean,
}

const ResponsiveLineChart: FunctionComponent<{ data: any }> = ({data}) => {

    const [chartState, setChartState] = useState<ResponsiveLineChartState>({
        data,
        left: 'dataMin',
        right: 'dataMax',
        refAreaLeft: '',
        refAreaRight: '',
        top: 'dataMax+1',
        bottom: 'dataMin-1',
        top2: 'dataMax+20',
        bottom2: 'dataMin-20',
        animation: true
    });

    const getAxisYDomain = (from: string, to: string, ref: "time" | "dose" | "dose_rate", offset: any): string[] => {

        const fromIndex = data.findIndex((item: DeviceDoseVisualisation) => item.time === from);
        const toIndex = data.findIndex((item: DeviceDoseVisualisation)=> item.time === to);

        const refData = data.slice(fromIndex - 1, toIndex);

        let [bottom, top] = [refData[0]![ref], refData[0]![ref]];
        refData.forEach((d: any) => {
            if (d[ref] > top) top = d[ref];
            if (d[ref] < bottom) bottom = d[ref];
        });

        return [(bottom | 0) - offset, (top | 0) + offset];
    };

    const zoom = (): void => {
        const {refAreaLeft, refAreaRight, data} = chartState;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            setChartState(prevState => ({...prevState, refAreaLeft: "", refAreaRight: ""}));
            return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight) {
            setChartState(prevState => ({
                ...prevState,
                refAreaRight: prevState.refAreaLeft,
                refAreaLeft: prevState.refAreaRight
            }))
        }

        // yAxis domain
        const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'dose', 1);
        const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'dose_rate', 50);

        setChartState(prevState => ({
            ...prevState,
            refAreaLeft: '',
            refAreaRight: '',
            data: data.slice(),
            left: refAreaLeft,
            right: refAreaRight,
            bottom,
            top,
            bottom2,
            top2,
        }));
    };

    const zoomOut = (): void => {
        const {data} = chartState;
        setChartState(prevState => ({
            ...prevState,
            data: data.slice(),
            refAreaLeft: '',
            refAreaRight: '',
            left: 'dataMin',
            right: 'dataMax',
            top: 'dataMax+1',
            bottom: 'dataMin',
            top2: 'dataMax+50',
            bottom2: 'dataMin+50',
        }));
    };

    return (
        <div style={{width: '100%', height: "30rem", textAlign: "center"}}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                    onMouseDown={e => setChartState(prevState => ({...prevState, refAreaLeft: e?.activeLabel}))}
                    onMouseMove={e => chartState.refAreaLeft && setChartState(prevState => ({
                        ...prevState,
                        refAreaRight: e?.activeLabel
                    }))}
                    onMouseUp={zoom}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        allowDataOverflow
                        dataKey="time"
                        domain={[chartState.left, chartState.right]}
                        tickFormatter={item => moment(item).format("HH:mm:ss")}
                    />

                    <YAxis
                        allowDataOverflow
                        domain={[chartState.bottom, chartState.top]}
                        type="number"
                        yAxisId="1"
                    />
                    <YAxis
                        orientation="right"
                        allowDataOverflow
                        domain={[chartState.bottom2, chartState.top2]}
                        type="number"
                        yAxisId="2"
                    />
                    <Tooltip/>
                    <Line yAxisId="1" type="natural" dataKey="dose" stroke="#8884d8" animationDuration={300}/>
                    <Line yAxisId="2" type="natural" dataKey="dose_rate" stroke="#82ca9d" animationDuration={300}/>

                    {(chartState.refAreaLeft && chartState.refAreaRight)
                        ? (<ReferenceArea
                            yAxisId="1"
                            x1={chartState.refAreaLeft}
                            x2={chartState.refAreaRight}
                            strokeOpacity={0.3}/>)
                        : null}
                </LineChart>
            </ResponsiveContainer>
            <Button onClick={zoomOut}>Zoom Out</Button>
        </div>
    );
};

export default ResponsiveLineChart;
