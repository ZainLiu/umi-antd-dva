import {Table, Button, Form, Modal, Input, Menu, Dropdown} from "antd";
import React from "react";
import {connect} from "dva";
import SampleChart from "../../component/SampleChart";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
const FormItem = Form.Item



class List extends React.Component{
    state = {
        visible: false,
        statisticVisible: false,
        id: null,
        editvisible: false
    };
    menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onSelect={this.showEdit}>
                    编辑
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onSelect={this.showEdit}>
                    删除
                </a>
            </Menu.Item>
        </Menu>
    );
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
                    <Dropdown overlay={this.menu} placement="bottomLeft">
                        <Button>操作</Button>
                    </Dropdown>
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
    showEdit = () => {
        this.setState({editvisible: true})
    }
    handleok = () => {
        const {dispatch,form: {validateFields}} = this.props;
        validateFields((err, values) => {
            if (!err){
                dispatch({
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
    handleEditCancel = () => {
        this.setState({editvisible: false})
    }
    handleEditOk = () => {
        console.log("OK")
    }
    handleStatisticCancel = () =>{
        this.setState({
            statisticVisible:false,
        });
    }
    render() {
        const {visible, statisticVisible,id, editvisible} = this.state;
        const {cardsList,cardsLoading,form:{getFieldDecorator},statistic} = this.props;
        return (
            <div>
                <Table columns={this.colums} dataSource={cardsList} loading={cardsLoading} rowKey='id'/>
                <Button icon={<SearchOutlined />} onClick={this.showModel}>新建</Button>
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
                <Modal
                    title="编辑记录"
                    visible={editvisible}
                    onOk={this.handleEditOk}
                    onCancel={this.handleEditCancel}
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
        cardsList: state.cards.cardsList,
        cardsLoading: state.loading.effects['cards/queryList'],
        statistic: state.cards.statistic
    }
}
export default connect(mapStateToProps)(Form.create()(List));