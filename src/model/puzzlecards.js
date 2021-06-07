import {getCardInfo} from "@/api/cardinfo";
import { message } from 'antd';

const delay = (millisecond) => {
    return new Promise(resolve => {
        setTimeout(resolve, millisecond)
    })
}

export default {
    namespace: 'puzzlecards',
    state: {
        data: [],
        counter: 0,
    },
    effects:{
        *queryInitCards(_,sagaEffects){
            const {call, put} = sagaEffects;
            try {
                const puzzle = yield call(getCardInfo);
                yield put({type: 'addNewCard',payload: puzzle.data});
                yield call(delay, 3000);
            } catch (e) {
                message.error('数据获取失败');
            }

        }
    },
    reducers: {
        addNewCard(state, { payload: newCard}) {
            const nextCounter = state.counter += 1;
            const newCardWithId = {...newCard, id: nextCounter};
            const nextData = state.data.concat(newCardWithId);
            return {
                data: nextData,
                counter: nextCounter
            }
        }
    }

};