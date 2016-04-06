import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';

interface S {
  isSelected: boolean
  isMessage: boolean
}

export default class IndexPage extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
      isMessage: false
    }
  }

  onSelectClick(e) {
    this.setState({
      isSelected: true,
      isMessage: false
    })
  }

  onMessageClick(e) {
    this.setState({
      isSelected: true,
      isMessage: true
    })
  }

  render() {
    let tableEl = null
    let btnEl = null
    let messageEl = null
    if (!this.state.isSelected) {
      tableEl = (
        <table width="100%">
          <tbody>
            <tr className="m2jf_th">
              <td className="center"><div>姓名</div></td>
              <td className="center"><div>金额</div></td>
              <td className="center"><div>缴纳情况</div></td>
              <td className="center"><div className="m2jf_td2">缴纳方式</div></td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">
                <Link to={links.YW_JILU} href="javascript:;">马东江</Link>
              </td>
              <td className="center">20.5</td>
              <td className="center"><span className="cor_red">未缴</span></td>
              <td className="center">
              </td></tr>
            <tr className="m2jf_tr">
              <td className="center">刘　雪</td>
              <td className="center">20.5</td>
              <td className="center"><span className="cor_red">未缴</span></td>
              <td className="m2jf_cut center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">马东江</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">刘　雪</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">马东江</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">刘　雪</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">马东江</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">刘　雪</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">马东江</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
            <tr className="m2jf_tr">
              <td className="center">刘　雪</td>
              <td className="center">20.5</td>
              <td className="center">已缴</td>
              <td className="center">现金</td>
            </tr>
          </tbody>
        </table>
      )
      btnEl = <a onClick={this.onSelectClick.bind(this)} href="javascript:;" className="mBm_btn1">选择未缴纳人员</a>
    } else {
      tableEl = (
        <table width="100%">
          <tr className="m2jf_th">
            <td width="9%" className="center"><div className="m2jf_td1">　</div></td>
            <td width="21%" className="center"><div>姓名</div></td>
            <td width="21%" className="center"><div>金额</div></td>
            <td width="25%" className="center"><div>缴纳情况</div></td>
            <td width="24%" className="center"><div className="m2jf_td2">缴纳方式</div></td>
          </tr>
          <tr className="m2jf_tr m2jf_CutTr">
            <td className="center"><input name="" type="checkbox" value="" /></td>
            <td className="center">马东江</td>
            <td className="center">20.5</td>
            <td className="center"><span className="cor_red">未缴</span></td>
            <td className="center"></td>
          </tr>
          <tr className="m2jf_tr m2jf_CutTr">
            <td className="center"><input type="checkbox" checked /></td>
            <td className="center">刘　雪</td>
            <td className="center">20.5</td>
            <td className="center"><span className="cor_red">未缴</span></td>
            <td className="center"></td>
          </tr>
          <tr className="m2jf_tr">
            <td className="center"></td>
            <td className="center">马东江</td>
            <td className="center">20.5</td>
            <td className="center">已缴</td>
            <td className="center">线上</td>
          </tr>
          <tr className="m2jf_tr">
            <td className="center"></td>
            <td className="center">刘　雪</td>
            <td className="center">20.5</td>
            <td className="center">已缴</td>
            <td className="center">线上</td>
          </tr>
          <tr className="m2jf_tr">
            <td className="center"></td>
            <td className="center">马东江</td>
            <td className="center">20.5</td>
            <td className="center">已缴</td>
            <td className="center">线上</td>
          </tr>
          <tr className="m2jf_tr">
            <td className="center"></td>
            <td className="center">刘　雪</td>
            <td className="center">20.5</td>
            <td className="center">已缴</td>
            <td className="center">线上</td>
          </tr>
          <tr className="m2jf_tr">
            <td className="center"></td>
            <td className="center">马东江</td>
            <td className="center">20.5</td>
            <td className="center">已缴</td>
            <td className="center">线上</td>
          </tr>
          <tr className="m2jf_tr">
            <td className="center"></td>
            <td className="center">刘　雪</td>
            <td className="center">20.5</td>
            <td className="center">已缴</td>
            <td className="center">线上</td>
          </tr>
        </table>
      )
      btnEl = <a onClick={this.onMessageClick.bind(this)} href="javascript:;" className="mBm_btn1">通知未缴纳人员</a>
      if (this.state.isMessage) {
        messageEl = (
          <div>
                <div className="mLayerBg" />
                <div className="mMsg">
                    <strong>提示</strong>
                    <p>将以短信的形式下发已选人员的手机</p>
                    <div className="mMsgBm">
                        <a onClick={() => {
                          this.setState({
                            isSelected: false,
                            isMessage: false,
                          })
                        }} href="javascript:;" className="mMsg_chanle">取消</a>
                        <a onClick={() => {
                          this.setState({
                            isSelected: false,
                            isMessage: false,
                          })
                        }} href="javascript:;" className="mMsg_ok">确定</a>
                    </div>
                </div>
            </div>

        )
      }
    }

    return (
      <div>
        <div className="mTop">
          <Link to={links.YW_DANGFEI} className="mTop_back"></Link>
          党费
          <a href="busPartyPayListCopy.html" className="mTop_btn">缴费记录</a>
        </div>
        <div className="m2jf_t1">本次党费缴纳情况（截至时间12月12日）</div>
        <div className="m2jf_tab">
          {tableEl}
        </div>
        {btnEl}
        {messageEl}
      </div>
    )
  }
}
