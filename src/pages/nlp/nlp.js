/**
 * Created by cg on 2017/9/5.
 */
/**
 * Created by cg on 2017/9/1.
 */
import React, {Component} from 'react';
import axios from 'axios'
import {Button, Row, Col, Card, Input, Select, Radio, Pagination, message} from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;
let selData;
class NlpTable extends React.Component {
  state = {
    stateIndex: '',
    radioValue: ''
  };

  componentDidMount() {
    this.start(10, 1);
    this.seleInit();
  }

  start = (size, page, selParams) => {
    this.setState({
      radioValue: ''
    });
    let pageParams = {
      pageSize: size,
      pageNum: page
    };
    let params = selParams ? Object.assign(selParams, pageParams) : pageParams;
    axios.post(
      'http://192.168.0.48:8080/emotion/validation',
      params
    ).then(res => {
      if (res.data.code === 'success') {
        this.setState({
          data: [...res.data.result.list.map((v) => {
            return v;
          })],
          total: res.data.result.total,
          current: page
        });
      } else {
        this.info(res.data.messager);
      }
    });
  };

  seleInit() {
    axios.get('http://192.168.0.48:8080/emotion/validation').then(res => {
      if (res.data.code === 'success') {
        let dIdArr = Object.keys(res.data.result);
        selData = res.data.result;
        let commentArr = res.data.result[dIdArr[0]].comments;
        this.setState({
          selName: dIdArr,
          selComment: commentArr,
          nameIndex: dIdArr[0],
          commentIndex: commentArr[0].commentRemote
        });
      }
    });
  }

  handleSelNameChange = (value) => {
    this.setState({
      nameIndex: value,
      selComment: selData[value].comments,
      commentIndex: selData[value].comments[0].commentRemote
    });
  };
  handleQuery = () => {
    let selComment = this.refs.selCommentBar.props.value;
    let selDsId = this.refs.selNameBar.props.value;
    let selState = this.refs.selStateBar.props.value || null;
    let selParams = {
      dataSourceId: selDsId,
      commentRemote: selComment,
      validateResult: selState
    };
    this.start(10, 1, selParams)
  };
  pageChange = (current) => {
    this.start(10, current, null);
  };
  handleSelStateChange = (value) => {
    this.setState({
      stateIndex: value
    })
  };
  handleSelCommentChange = (value) => {
    this.setState({
      commentIndex: value
    })
  };
  onChange = (e) => {
    let dId = e.target.id;
    axios.post(`http://192.168.0.48:8080/emotion/validation/${dId}`, {emotion: e.target.emotion}).then(res => {
      if (res.data.code === 'success') {
        this.info('操作成功!')
      } else {
        this.info('操作失败!')
      }
    }).catch(() => {
      this.info('操作失败')
    });
    this.setState({
      radioValue: e.target.value
    })
  }
  info = (msg) => {
    message.info(msg);
  };
  stateFiler = (v) => {
    switch (v) {
      case 'NotVerified':
      case 'Conflict':
      case 'Verifing':
        return false;
        break;
      case 'Verified':
        return true;
        break;
      default:
        return false;
        break
    }
  };

  render() {
    const content = this.state.data && this.state.data.map((v, k) => {
        return (
          <tr key={k}>
            <td className="col-name">{v.datasourceName}</td>
            <td className="col-sentence-long" title={v.commentLong}>{v.commentLong}</td>
            <td className="col-sentence-short" title={v.commentShort}>{v.commentShort}</td>
            <td className="col-system">{v.emotion === 'Positive' ? '正面' : '负面'}</td>
            <td className="col-men"
                style={{color: v.validateResult === 'Conflict' ? 'red' : 'rgba(0, 0, 0, 0.65)'}}
            >
              {v.finalEmotion === 'Positive' ? '正面' : v.finalEmotion === 'Nagtive' ? '正面' : '暂未判定'}
            </td>
            <td className="col-modify">
              <RadioGroup onChange={this.onChange}
                          disabled={this.stateFiler(v.validateResult)}
                          value={this.state.radioValue}
              >
                <Radio emotion={'Positive'} value={`1_${v.id}`} id={v.id}>正面</Radio>
                <Radio emotion={'Negative'} value={`2_${v.id}`} id={v.id}>负面</Radio>
              </RadioGroup>
            </td>
          </tr>)
      });
    let selName = this.state.nameIndex;
    let selComment = this.state.commentIndex;
    let selNameOptions = this.state.selName ? this.state.selName.map((v, k) =>
        (<Option value={v} key={k}>{selData[v].datasourceName}</Option>)
      ) : null;
    let selCommentOptions = this.state.selComment ? this.state.selComment.map((v, k) =>
        (<Option value={v.commentRemote} key={k}>{v.commentName}</Option>)
      ) : null;
    console.log(this.state.data);
    return (
      <div className="gutter-example">
        <Row gutter={16}>
          <Col md={5}>
            数据：
            <Select value={selName}
                    style={{width: '60%'}}
                    onChange={this.handleSelNameChange}
                    ref="selNameBar"
            >
              {selNameOptions || ''}
            </Select>
          </Col>
          <Col md={5}>
            评论列：
            <Select value={selComment}
                    style={{width: '70%'}}
                    onChange={this.handleSelCommentChange}
                    ref="selCommentBar"
            >
              {selCommentOptions || ''}
            </Select>
          </Col>
          <Col md={5}>
            校验情况：
            <Select value={this.state.stateIndex}
                    style={{width: '70%'}}
                    onChange={this.handleSelStateChange}
                    ref="selStateBar"
            >
              <Option value="">全部</Option>
              <Option value="NotVerified">未判定</Option>
              <Option value="Verifing">一人判定</Option>
              <Option value="Verified">全部判定</Option>
            </Select>
          </Col>
          <Col md={2} offset={2}>
            <Button onClick={this.handleQuery}>查询</Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="情感正负面" bordered={false}>
                <div className="tabletop">
                  <table className="content-table" width='100%'>
                    <thead>
                    <tr>
                      <th className="col-name">数据名</th>
                      <th className="col-sentence-long">长句</th>
                      <th className="col-sentence-short">短句</th>
                      <th className="col-system">系统判定</th>
                      <th className="col-men">人为判定</th>
                      <th className="col-modify">校正</th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div className="table-scroll">
                  <table className="content-table" width='100%'>
                    <tbody id="table-box">
                    {content ? content.length ? content : '暂无数据' : null}
                    </tbody>
                  </table>
                </div>
                <div style={{paddingTop: 15, textAlign: 'center'}}>
                  <Pagination
                    defaultCurrent={1}
                    current={this.state.current}
                    total={this.state.total}
                    pageSize={10}
                    onChange={this.pageChange}
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default  class Nlp extends Component {
  render() {
    return (
      <div>
        <NlpTable/>
      </div>
    )
  }
}