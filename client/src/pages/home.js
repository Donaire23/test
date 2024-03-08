import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logoutUser } from '../actions/credentials';
import {
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  InboxOutlined,
  CalendarOutlined,
  OrderedListOutlined,
  BoxPlotOutlined,
  LogoutOutlined
} from '@ant-design/icons';
const { Sider, Content } = Layout;


const Home = () => {

  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //get the user id from cookies and we pass it to the api
  const id = Cookies.get("userId");
  
  //send the id to the backend so that we can get the credentials
  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  //get user name
  const userName = useSelector((state) => state.test.responseData?.name);

  //get userID to logout
  const userID = useSelector((state) => state.test.responseData?.ID);
  
  const handleLogout = () => {
    try {
      Cookies.remove('authToken');
      Cookies.remove('userId');
    } catch(error) {
      console.log(error)
    } finally {
      window.location.reload()
    }
   
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} style={{ background: '#F5F5F5', borderRight: '1px solid rgba(0,0,0,0.2)'  }}>
        <div className="logo" style={{ background: '#F5F5F5'}}  />
        <div>
          <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', alignItems: 'center', padding: '8px', cursor: 'pointer', color: 'black' }} onClick={toggleCollapsed}>
            {collapsed ? '☰' : '✖'}
          </div>
        </div>

        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" style={{ background: '#F5F5F5', color: '#000', border: 'none' }}>
          <Menu.Item key="0" icon={<UserOutlined />}>
            {userName} 
          </Menu.Item>
          <Menu.Item key="1" icon={<BellOutlined />}>
            Notification
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
          <Menu.Item key="3" icon={<InboxOutlined />}>
            Inbox
          </Menu.Item>
          <Menu.Item key="4" icon={<CalendarOutlined />}>
            Today
          </Menu.Item>
          <Menu.Item key="5" icon={<OrderedListOutlined />}>
           Upcoming
          </Menu.Item>
          <Menu.Item key="6" icon={<BoxPlotOutlined />}>
           Filters & Labels
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout" style={{background: 'white'}}>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: 'white' }}>
            Main content
          </div>
        </Content>
      </Layout>
    </Layout>

   // my content end


  );
};

export default Home;
