import {Table, Button, Form, Modal, Input} from "antd";
import React from "react";
import {connect} from "dva";
import SampleChart from "../../component/SampleChart";

const FormItem = Form.Item

class List extends React.Component{
    state = {
        visible: false,
        statisticVisible: false,
        id: null,
    };
    colums = [
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '描述',
            dataIndex: 'desc'
        },
        {
            title: '链接',
            dataIndex: 'url',
            render(value){
                return (
                    <a href={value}>{value}</a>
                )
            }
        },
        {
            title: '',
            dataIndex: 'statistic',
            render: (_,{id}) => {
                return (
                    <Button onClick={()=>{this.showStatistic(id)}}>图表</Button>
                )
            }
        }
    ];

    showStatistic = (id) => {
        this.props.dispatch({
            type: 'cards/getStatistic',
            payload:id,
        });
        this.setState({id,statisticVisible:true});
    };
    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        });
    };
    showModel = () => {
        this.setState({visible:true});
    };
    handleok = () => {
        const {dispath,form: {validateFields}} = this.props;
        validateFields((err, values) => {
            if (!err){
                dispath({
                    type: 'cards/addOne',
                    payload: values,
                });
                this.setState({visible: false});
            }
        })
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    };
    handleStatisticCancel = () =>{
        this.setState({
            statisticVisible:false,
        });
    }
    render() {
        const {visible, statisticVisible,id} = this.state;
        const {cardsList,cardsLoading,form:{getFieldDecorator},statistic} = this.props;
        return (
            <div>
                <Table columns={this.colums} dataSource={cardsList} loading={cardsLoading} rowKey='id'/>
                <Button onClick={this.showModel}>新建</Button>
                <Modal
                    title="新建记录"
                    visible={visible}
                    onOk={this.handleok}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem label="名称">
                            {getFieldDecorator('name',{
                                rules: [{required: true}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('desc')(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url',{
                                rules: [{type: 'url'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
                    <SampleChart data={statistic[id]}/>
                </Modal>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        cardList: state.cards.cardList,
        cardsLoading: state.loading.effects['cards/queryList'],
        statistic: state.cards.statistic
    }
}
export default connect(mapStateToProps)(Form.create()(List));