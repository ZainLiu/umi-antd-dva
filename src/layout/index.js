import {Component} from 'react'
import { Layout,Menu,Icon } from 'antd'
import { Link } from 'umi'

const  {Header, Footer, Sider, Content} = Layout
const SubMenu = Menu.SubMenu

class BasicLayout extends Component {
    render() {
        return (
            <Layout>
                <Sider width={256} style={{minHeight: '100vh',color: 'white'}}>
                    <div style={{height: '32px',background: 'rgba(255,255,255,.2)',margin: '16px', textAlign:'center'}}>菜单栏</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="pie-chart"/>
                            <span>菜单列表</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}>
                            <Menu.ItemGroup key="g1">
                                <Menu.Item key="l1"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
                                <Menu.Item key="l2"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
                                <Menu.Item key="l3"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="AndroidFilled" /><span>list</span></span>}>
                            <Menu.ItemGroup key="g2">
                                <Menu.Item key="m1"><Link to="/list">列表练习页</Link></Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff',textAlign:'center',padding:0}}>Header</Header>
                    <Content style={{margin:'24px 16px 0'}}>
                        <div style={{padding: 24,background:'#fff',minHeight:360}}>
                            {this.props.children}
                        </div>

                    </Content>
                    <Footer style={{textAlign:'center'}}>LZY Design ©2021 Created by LZY</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default BasicLayout