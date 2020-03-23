import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type Gateway = {
    host_name: string;
    last_seen: string;
    host_ip: string;
    geolocation: string;
    smart_location: string;
    online: boolean;
}

type GatewayState = {
    gateways: {
        [host_name: string]: Gateway
    }
};

const initialState: GatewayState = {
    gateways: {}
};

const gatewaySlice = createSlice({
    name: "gateway",
    initialState,
    reducers: {
        onGatewaysReceived(state, action: PayloadAction<Gateway[]>) {
            state.gateways = action.payload.reduce((acc: {[host_name: string]: Gateway}, current) => {
                acc[current.host_name] = current;
                return acc;
            }, {});
        }
    }
});

export default gatewaySlice.reducer;

export const {onGatewaysReceived} = gatewaySlice.actions;


