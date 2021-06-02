import request from "../utils/request";

export function queryList() {
    return request('/dev/api/cards');
}

export function deleteOne(id) {
    return request(`/api/cards/${id}`,{
        headers:{
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function getStatistic(id) {
    return request(`/api/cards/${id}/statistic`);
}