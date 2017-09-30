/**
 * Created by cg on 2017/9/5.
 */
import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const {Sider, Content } = Layout;
import Header from './header';
import Footer from './bottom';
import './index.less';
export default class Container extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline', // 水平垂直展现
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: this.state.collapsed ? 'inline' : 'vertical',
    });
  };
  clear = () => {
    this.setState({
      current: 'index',
    });
  };
  render() {

    return (
      <Layout className="containAll">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="wt-logo-box"><i className="wt-logo" /><span>微图CMS</span></div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode={this.state.mode}>
            <Menu.Item key="1">
              <Link to={'/nlp'}><Icon type="exception" /><span className="nav-text">情感分析校对</span></Link>
            </Menu.Item>
            {/*<Menu.Item key="2">*/}
            {/*<Link to={'/login'}><Icon type="mobile" /><span className="nav-text">登录页面</span></Link>*/}
            {/*</Menu.Item>*/}
          </Menu>
        </Sider>
        <Layout>
          <Header toggle={this.toggle} collapsed={this.state.collapsed} clear={this.clear} />
          <Content style={{ margin: '24px 16px 0 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}