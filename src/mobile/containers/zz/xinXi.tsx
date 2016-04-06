import * as React from 'react'
import { Link, hashHistory } from 'react-router';
import * as links from '../../constants/links';
import SubNav from '../../components/zz/subNav'
import * as models from '../../../api/models'
import { MainType } from './indexPage'

interface P {
  orgRoot: models.Org
  org: models.Org
  onMainChange: (mainType: string, org: models.Org) => void
}

export default class Page extends React.Component<P, {}> {
  render() {
    return (
      <div>
        <div className="mTop">
          <Link to={links.INDEX} className="mTop_back"></Link>
          组织
          <a onClick={this.props.onMainChange.bind(this, MainType.QIEHUAN, this.props.orgRoot)} href="javascript:;" className="mTop_btn">切换组织</a>
        </div>
        <div className="m2topMes">当前组织：{this.props.org.orgName}</div>
        <SubNav mainType={MainType.XINXI} onMainChange={this.props.onMainChange} org={this.props.org} />
        <div className="mMes_t mMes_t2">两会授权发布:政府工作报告</div>
        <div className="mMes_txt">
          <p>（四）加快发展现代农业，促进农民持续增收。继续毫不放松抓好“三农”工作，完善强农惠农富农政策，深化农村改革，拓展农民就业增收渠道，着力提高农业质量、效益和竞争力。</p>
          <p>　　加快农业结构调整。粮食连续增产，为稳定物价、改善民生提供了有力保障，但也面临库存大幅增加、市场价格下跌等问题。要完善农产品价格形成机制，引导农民适应市场需求调整种养结构，适当调减玉米种植面积。按照“市场定价、价补分离”原则，积极稳妥推进玉米收储制度改革，保障农民合理收益。要多措并举消化粮食库存，大力支持农产品精深加工，发展畜牧业，延伸农业产业链条；制定新一轮退耕还林还草方案，今年退耕还林还草1500万亩以上，这件事一举多得，务必抓好。积极发展多种形式农业适度规模经营，完善对家庭农场、专业大户、农民合作社等新型经营主体的扶持政策，培养新型职业农民，鼓励农户依法自愿有偿流转承包地，开展土地股份合作、联合或土地托管。深化农村集体产权、农垦、集体林权、国有林场</p>
        </div>
      </div>
    )
  }
}
