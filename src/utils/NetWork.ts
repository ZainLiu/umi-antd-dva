import request from "@/utils/request";
import {message} from "antd";

interface RequestConfig {
    url: string;
    data?: any;
    errShow?: boolean;
}

interface ResponseConfig{
    result: string;
}

class NetWork{
    public static loginOrigin = '127.0.0.1:8080';
    public static async post<T = {}>({url,data,errShow=true}: RequestConfig){
        return request(url,{
            method: 'POST',
            data: data ?? {},
            timeout: 120000,
        }).then((res: ResponseConfig & T) => {
            const { result, ...other } = res;
            if (result && result.toLowerCase() === 'success') {
                return other;
            }
            if (errShow) {
                message.error(result);
            }
            return Promise.reject(res)
        });
    }
    public static async get<T = {}>({url,data,errShow=true}: RequestConfig){
        return request(url,{
            method: 'GET',
            data: data ?? {},
            timeout: 120000,
        }).then((res: ResponseConfig & T) => {
            const { result, ...other } = res;
            if (result && result.toLowerCase() === 'success') {
                return other;
            }
            if (errShow) {
                message.error(result);
            }
            return Promise.reject(res)
        });
    }
}
export default NetWork