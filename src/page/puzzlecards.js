import {Component} from "react";
import { Card ,Button,Table } from "antd";
import { connect } from "dva";

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList
    }
}
// const  mapDispatchToProps = (dispatch) => {
//     return {
//         onClickAdd: (newCard) => {
//             const action = {
//                 type: `${namespace}/addNewCard`,
//                 payload: newCard,
//             };
//             dispatch(action);
//         }
//     }
// }

const  mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type:`${namespace}/queryInitCards`,
            })
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzlecardsPage extends Component{
    colums = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>,
        },
    ];
    componentDidMount() {
        this.props.onDidMount();
    }

    render() {
        const { cardsList, cardsLoading } = this.props;

        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
            </div>
        );
    }
};