import NetWork from "@/utils/NetWork";

export async function getCardInfo(params: any){
    return NetWork.get({
    url: '/api/cards',
        data: params
    })
}

export async function addNewCard(params: any) {
    return NetWork.post({
        url: '/api/cards',
        data: params
    })
}