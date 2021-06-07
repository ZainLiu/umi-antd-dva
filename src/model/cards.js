import * as cardsService from '../service/cards';
import {addNewCard, getCardInfo} from "@/api/cardinfo";

export default {
    namespace: 'cards',
    state: {
        cardsList: [],
        statistic:{},
    },
    effects: {
        *queryList({_},{call,put}){
            const rsp = yield call(getCardInfo);
            console.log('queryList');
            console.log(rsp.data);
            yield put({type:'saveList',payload: {cardsList: rsp.data}})
        },
        *deleteOne({payload},{call,put}){
            const rsp = yield call(cardsService.deleteOne, payload);
            console.log('deleteOne');
            console.log(rsp)
            return rsp
        },
        *addOne({payload},{call, put}){
            const rsp = yield call(addNewCard, payload)
            yield put({type: 'queryList'});
            return rsp
        },
        *getStatistic({payload},{call,put}){
            const rsp = yield call(cardsService.getStatistic, payload);
            yield put({
                type: 'saveStatistic',
                payload:{
                    id: payload,
                    data: rsp.result,
                },
            });
            return rsp
        }
    },
    reducers: {
        saveList(state, {payload: {cardsList}}){
            return {
                ...state,
                cardsList,
            }
        },
        saveStatistic(state, {payload:{id,data}}){
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    [id]: data
                }
            }
        }
    }
}