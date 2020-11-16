import React, { Component, Link } from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import "./searchBar.css";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const {
            value,
            handleSearch,
            ...props
          } = this.props;

        return(
            <>
                <Search
                    placeholder="Nhập tên cửa hàng"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={value => handleSearch(value)}
                />
            </>
        );
    }
}

export default SearchBar;
