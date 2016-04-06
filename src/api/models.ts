export class App {
  id: string
  owner: string
  name: string
  from: string
  path: string
  private: boolean
  createdAt: string
  updatedAt: string
  starCount: number
  cloneCount: number
  origin: string
  host: string
  description: string
  tags: string
  thumbSmall: string
  thumbLarge: string

  localPath: string
  cloudPath: string

  constructor() { }
}

export class File {
  constructor(public isDir: boolean, public path: string, public name: string, public size: number){}
}

export class Config {
  title: string
  keywords: string
  description: string
  faviconUrl: string
  uploadsDir: string
  source: string
  destination: string
  layout: string

  constructor() { }
}

export class Site {
  constructor(
    public name: string,
    public path: string,
    public url: string,
    public posts: Array<Post>,
    public pageSummaries: Array<PageSummary>,
    public pages: Array<Page>,
    public sections: { [index: string]: Section },
    public layouts: { [index: string]: Layout }
  ) { }
}

export class Post {
  name: string
  path: string
  url: string

  constructor() { }
}

export class PageSummary {
  name: string
  path: string
  url: string
  children: Array<PageSummary>

  constructor() { }
}

export class Page {
  name: string
  path: string
  url: string
  layout: string
  content: string

  title: string
  keywords: string
  description: string
  sections: Array<string>

  children: Array<Page>

  constructor() {
    this.children = []
  }
}

export class Section {
  path: string
  html: string
  css: string
  js: string

  constructor() { }
}

export class Layout {
  path: string
  layout: string
  content: string
  finalContent: string

  constructor() { }
}

export class Token {
  owner: string
  scopes: string
  accessToken: string
  createdAt: string

  constructor() { }
}

export class User {
  id: string
  username: string
  email: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
  starred: number
  locale: string
  company: string
  location: string
  url: string
  billingPlanId: string
  billingCustomerId: string
  billingCardId: string

  userName: string //登录名
  passwordSalt: string // 加密密钥
  passwordHash: string // 密码结果
  displayName: string // 姓名
  nationality: string // 民族
  sex: string // 性别
  birthDay: Date // 出生年月
  idCardNumber: string // 身份证号
  degree: string // 学位
  education: string // 学历
  graduateSchool: string // 毕业院校
  tel: string // 联系电话
  mobile: string // 手机号
  nativePlace: string // 籍贯
  placeBirth: string // 出生地
  registeredResidence: string // 户口所在地
  homeAddress: string // 家庭住址
  maritalStatus:string // 婚姻状况
  workingHours: Date // 工作时间
  workOrganization: string // 工作单位
  technicalPositions: string // 技术职务
  administrativeDuties: string // 行政职务
  postcode: string // 邮编
  remarks: string // 备注
  orgID: number // 所在支部ID
  orgName: string // 机构名称
  userType: string // 用户类型（申请人、积极分子、发展对象、预备党员、党员、历史党员）
  partyDate: Date // 入党时间
  partyMemberState: string // 党员状态 （开除党籍、死亡）
  probationaryState: string // 预备期状态（如期转为正式党员，延长预备期转正，延长预备期，被取消预备党员资格）
  applyPartyDate: Date // 申请入党时间
  toActivistDate: Date // 转为积极分子时间
  toDevelopmentObDate: Date // 转为发展对象时间
  probationaryPeriodOfEndDate: Date // 预备期截止时间
  disqualificationDate: Date // 取消预备党员资格时间
  toFullmembersDate: Date // 转为正式党员时间
  expulsionFromThePartyDate: Date // 开除党籍时间
  deadDate: Date // 死亡时间
  thoughtReportCount: number  // 思想汇报次数
  manageOrgCount: number //管理组织机构数量
  addDate: Date // 添加时间
  addUser: string // 添加人
  lastEditDate: Date // 最后修改时间
  lastEditUser: string // 最后修改人

  constructor() { }
}

export class Message {
  id: number // 自增长
  receiverUserName: string //接收者 username
  senderUserName: string // 发送者 username
  msgType:string // 消息类型
  content:string // 消息内容
  isRead: boolean // 是否阅读过
  remarks: string // 备注
  actionUrl: string // 消息处理URL
  addDate: Date // 添加时间

  constructor() { }
}

export class UserEducation { // 教育经历
  id: number // ID
  userName: string // 用户
  degree: string // 学历
  school: string // 学校
  startTime: Date // 入学时间
  endTime: Date // 毕业时间

  constructor() { }
}

export class UserWork { // 工作经历
  id: number // ID
  userName: string // 用户
  company: string // 公司
  department: string // 部门
  position: string // 职位
  startTime: Date // 开始时间
  endTime: Date // 结束时间

  constructor() { }
}

export class FlowUser{ // 流动党员
  id: number
  name: string  // 流动党员姓名 但此字段不关联Member或User表
  sex: string // 性别
  idCardNumber: string // 身份证号
  birthDay: Date // 出生年月
  nationality: string // 民族
  degree: string // 学位
  education: string // 学历
  orgID: number // 流动到某个支部ID
  orgName: string // 登记党支部名称
  linkman: string // 党支部联系人
  contact: string // 联系人联系方式
  positionName: string  // 党内职位
  partyDate: Date // 入党时间
  comeFrom: string // 流出地 跨省、省内跨市、市内跨县
  flowDate: Date // 流入时间
  mobile: string //手机号
  isCurrent: boolean // 正常、历史（曾流入党员）
  addDate: Date // 添加时间
  addUser: string // 添加人

  constructor() { }
}

export class Culturist{ // 培养人 积极分子需要分配培养人
  id: number // ID
  userName: string // 被培养用户
  culturistUserName: string // 培养人
  culturistDisplayName: string // 培养人姓名
  isCurrent: boolean // 是否是当前培养人，如果不是，则表示是历史培养人
  startTime: Date // 开始时间
  endTime: Date // 结束时间
  addDate: Date // 记录添加时间

  constructor() { }
}

export class Introducer{ // 介绍人 发展对象需要分配介绍人
  id: number // ID
  userName: string // 被介绍用户
  introducerUserName: string // 介绍人
  introducerDisplayName: string // 介绍人姓名
  isCurrent: boolean // 是否是当前介绍人，如果不是，则表示是历史介绍人
  startTime: Date // 开始时间
  endTime: Date // 结束时间
  addDate: Date // 记录添加时间

  constructor() { }
}

export class LearnRecord{ // 党课学习记录
  id: number // ID
  userName: string // 用户
  orgID: number //  username 当时所处的组织机构ID
  startTime: Date // 开始时间
  endTime: Date // 结束时间
  graduationDate: Date // 结业时间
  place: string // 学习地点
  lectureName: string // 课程名称
  classHour: number // 课时
  attachmentPaths: string // 附件路径（/upload/files/aa.docx）
  remarks: string // 备注
  addUserName: string // 本记录的操作人，即adduserName给userName添加了学习记录
  addDate: Date // 学习记录添加时间

  constructor() { }
}

export class Record { // 档案记录
  id: number // ID
  userName: string // 用户
  displayName: string // 用户
  orgID: number //  username 当时所处的组织机构ID
  orgName: string // 组织机构名称
  period: string // 阶段（申请人阶段、积极分子阶段、发展对象阶段、预备党员阶段、党员阶段）
  summary: string // 记录描述
  attachmentPaths: string // 附件路径（/upload/files/aa.docx）
  meetingID: number // 关联会议ID
  meetingName: string // 关联会议标题
  type1: string // 档案记录分类1 当有些记录需要单独调用出来时可以使用此字段（比如想找出某党员转为发展对象时所关联的会议）
  type2: string // 档案记录分类2 同type1
  happenDate: Date // 记录发生时间
  remarks: string // 备注
  addUserName: string // 本记录的操作人，即adduserName 把 userName 进行了summary操作
  addDate: Date // 记录添加时间

  constructor() { }
}

export class History { // 发展履历
  id: number // ID
  userName: string // 用户
  displayName: string //用户姓名
  orgID: number //  username 当时所处的组织机构ID
  orgName: string // 组织机构名称
  summary: string // 记录描述
  meetingID: number // 关联会议ID
  meetingName: string // 关联会议标题
  happenDate: Date // 记录发生时间
  addUserName: string // 本记录的操作人，即adduserName 把 userName 进行了summary操作
  addDate: Date // 记录添加时间

  constructor() { }
}

export class Org {
  id: number // 组织机构ID
  areaIDs: string // 组织机构所属区域（集团不属于任何区域）
  orgName: string // 组织机构名称
  orgFullName: string // 组织机构全称
  code: string // 党组织编码 系统自动生成，可按照级别编码，唯一标识
  orgType: string // 组织类型（选择：集团党组、地方党组、直属党委、地方党委、党总支、党支部）
  createDate: Date // 建立时间
  tel: string // 联系电话
  fax: string //传真
  address: string //通讯地址
  isCancel: boolean //组织是否被取消
  cancelDate: Date // 组织取消时间
  cancelRemark: string // 取消组织备注
  parentID: number // 上级组织ID
  parentsPath: string // 所有上级组织ID
  parentsCount:number　// 所有上级组织数量
  childrenCount:number　// 所有下级组织数量
  isLastNode: boolean //是否是最后一级组织（是否有下级组织）
  taxis: number // 排序
  summary: string // 组织介绍
  countOfUser: number // 组织成员（不包括所有下级组织）
  orgAdminUserNames: string // 本组织管理员（如果有多个，以逗号隔开） 作废
  addUser: string // 添加人
  addDate: Date // 添加时间
  lastEditUser: string // 最后修改人
  lastEditDate: Date //最后修改时间

  constructor() { }
}

export class OrgTypeFilter { // 组织类型
  id: number // ID
  orgType: string // 组织类型名称
  nextOrgTypes: string // 下级允许出现的组织类型
}

export class Position { // 组织党内职务
  id: number // ID
  orgType: string // 组织类型名称
  title: string // 职务名称
}

export class OrgAdmin { // 组织机构管理员
  id: number // ID
  orgID: number //  机构ID
  userName: string // 管理员用户名
  displayName: string // 管理员用户名
  adminType: string // 管理员类型

  constructor() { }
}

export class OrgLeader { // 组织机构领导成员
  id: number // ID
  orgID: number //  机构ID
  orgName: string // 机构名称
  userName: string // 领导成员用户名
  displayName: string // 领导成员姓名
  positionID: number // 党内职位ID 关联customize_Position
  positionTitle: string // 职位名称
  isCurrent: boolean // 是否现任领导成员 否则是往届领导
  taxis: number // 排序 本届领导成员之间的顺序
  periodNum: number // 届数 即是第几届领导
  addUserName: string // 添加人
  addDate: Date // 添加时间
  // not exists
  avatarUrl: string

  constructor() { }
}

export class ElectionHistory { // 换届选举
  id: number // ID
  orgID: number //  机构ID
  orgName: string // 组织名称
  periodNum: number // 届数 即是第几届选举
  serviceLife: number // 任期年限
  happenDate: Date // 换届时间
  mustAttendNum: number // 应到人数
  attendNum: number // 实到人数
  title: string // 换届标题
  content: string // 选举情况
  meetingID: number // 关联会议ID
  meetingName: string // 关联会议标题
  electionForms: string // 选举形式
  addUserName: string // 添加人
  addDate: Date // 添加时间

  constructor() { }
}

export class OrgActivity { // 组织动态
  id: number // ID
  orgID: number //  addUserName
  orgName: string
  title: string // 动态标题
  content: string // 动态内容
  isTop: boolean // 是否置顶
  addUserName: string // 添加人
  addDate: Date // 动态发布时间

  constructor() {
    this.addDate = new Date()
  }
}

export class OrgTransfer{ // 组织关系转接
  id: number // ID
  userName: string // 用户
  displayName: string // 用户姓名
  summary: string // 申请描述
  transferType: string // 转接类型（内部调动、移动集团内部转接、离职转出）
  sourceOrgID: number // 原组织机构ID
  sourceOrgName: string // 原组织机构名称
  targetOrgName: string // 目标组织名称 手动填写
  targetOrgID: number // 目标组织ID 如果是内部调动或移动集团内部转接，则由党总支或党委选择相应目标组织ID,同时更新targetOrgName；如果是离职转出则此字段无效；
  applyState: string // 转接状态（提出申请、党支部审核通过、党总支审核通过、党委审核通过、转接完成）
  applyDate: Date // 申请转出时间
  partyDuesDate: Date // 党费缴至时间
  outDate: Date // 转出时间
  inDate: Date // 转入时间
  addDate: Date // 记录添加时间

  constructor() { }
}

export class MeetingType { //会议类型
  id: number // 会议类型ID
  orgID: number // 组织机构ID
  typeName: string // 会议类型名称
  parentID: number // 上级组织ID
  parentsPath: string // 所有上级组织ID
  parentsCount: number　// 所有上级组织数量
  childrenCount: number　// 所有下级组织数量
  isLastNode: boolean //是否是最后一级组织（是否有下级组织）
  taxis: number // 排序
  addUser: string // 添加人
  addDate: Date // 添加时间
  isSystem: boolean // 是否是系统会议类型

  constructor() { }
}

export class Meeting { //会议
  id: number // 会议ID
  orgID: number // 组织机构ID
  orgName: string // 组织名称
  meetingName: string // 会议名称 如果是党课则是主题
  meetingTopics: string // 会议议题
  meetingDate: Date // 会议时间
  parentMeetingTypeID: number // 父会议类型ID
  meetingTypeID: number // 会议类型ID
  meetingTypeName: string // 会议类型名称
  meetingCompere: string // 会议主持人 如果是党课则是主讲人姓名
  recorderPeople: string // 会议记录人员
  meetingPlace: string // 会议地点
  mustAttendNum: number // 应到人数
  mustAttend: string  // 列席人员（应到人员）
  notAttend: string  // 缺席人员（未到人员）
  attendNum: number // 实到人数
  attend: string  // 出席人员（已到参会人员）
  parentOrgAttend: string // 上级组织列席人员
  meetingContent: string // 会议内容
  isKeepSecret: boolean // 会议内容是否保密
  isArchive: boolean // 是否归档
  meetingResolution: string // 会议决议  如果是党课则是主讲人职务
  attachmentPath: string // 会议附件路径（可以有多个附件，以逗号隔开，附件名以原文件名+日期时间为重命名 /upload/files/aa201603151305.docx）
  addUser: string // 添加人
  addDate: Date // 添加时间
  lastEditUser: string // 最后修改人
  lastEditDate: Date //最后修改时间

  constructor() { }
}

export class TestMetric {  // 指标
  id: number // ID
  typeName: string // 指标分类ID
  content: string // 考核内容
  standard: string // 考核标准
  gist: string  // 考核依据
  defaultPoint: number // 默认分值
  addUser: string // 添加人
  addDate: Date // 添加时间
}

export class TestSolution { // 考核方案
  id: number // ID
  solutionName: string // 方案名称
  summary: string // 方案描述
  addUserName: string // 添加人
  addDisplayName: string // 添加人姓名
  addDate: Date // 添加时间
}

export class TestSolutionMetric { // 考核方案指标
  id: number // ID
  solutionID: number // 考核方案ID
  metricID: number // 考核指标ID
  point: number // 分值
  taxis: number // 排序
  // not exists
  typeName: string // 指标分类ID
  content: string // 考核内容
  standard: string // 考核标准
  gist: string  // 考核依据
  defaultPoint: number // 默认分值
  addUser: string // 添加人
  addDate: Date // 添加时间
}

export class TestDefaultTask { // 默认考核任务
  id: number // ID
  solutionID: number // 考核方案ID
  solutionName: string // 考核方案名称
  isEnd: boolean // 是否结束
  defaultStartTime: Date // 考核起始时间
  defaultEndTime: Date // 考核结束时间
  defaultNoticeTime: Date // 通知设置时间
  defaultTaxis: number // 排序
  // not exists
  orgIDs: string // 组织ID列表
  orgNames: string // 组织名称列表
}

export class TestTask { // 考核任务
  id: number // ID
  defaultTaskID: number // 考核任务ID
  orgID: number // 考核组织ID
  orgName: string // 考核组织名称
  solutionID: number // 考核方案ID
  solutionName: string // 考核方案名称
  isEnd: boolean // 是否结束
  startTime: Date // 考核起始时间
  endTime: Date // 考核结束时间
  noticeTime: Date // 通知设置时间
  taxis: number // 排序
  // not exists
  totalSelfPoint: number // 自评分
  totalUpPoint: number // 上级考核分
  orgIDs: string // 组织ID列表
  orgNames: string // 组织名称列表
}

export class TestExam { // 考核
  id: number // ID
  orgID: number // 考核组织ID
  orgName: string // 考核组织名称
  defaultTaskID: number // 默认考核任务ID
  taskID: number // 组织考核任务ID
  solutionID: number // 考核方案ID
  solutionName: string // 考核方案名称
  isSelfDone: boolean //是否自评
  isUpDone: boolean //是否考核
  // not exists
  totalSelfPoint: number // 自评分
  totalUpPoint: number // 上级考核分
  startTime: Date // 考核起始时间
  endTime: Date // 考核结束时间
}

export class TestExamResult { // 考核结果
  id: number // ID
  examID: number // 考核对象ID
  metricID: number // 考核指标ID
  selfPoint: number // 自评分
  upPoint: number // 上级考核分
  meetingIDs: string // 会议ID列表
  fileUrls: string // 上传材料Url列表
  // not exists
  typeName: string // 指标分类
  content: string // 考核内容
  standard: string // 考核标准
  gist: string  // 考核依据
  point: number // 分值
  taxis: number // 排序
}

export class WorkReport{ // 书记述职
  id: number // ID
  reporDate: Date // 述职时间 必填
  place: string // 述职地点  会议名称、述职人、、记录人、述职报告
  meetingID: number // 关联会议ID 必填
  meetingName: string // 关联会议名称 必填
  reportOrgID: number // 述职人所在机构ID
  reportUserName: string // 述职人 必填
  reportDisplayName: string // 述职人 必填
  content: string // 述职内容
  recorderPeople: string // 述职记录人员
  attachmentPath: string // 述职报告 可选择是否上传，可为电子版也可为附件上传版，支持在线预览
  addUser: string // 添加人
  addDate: Date // 添加时间
}

export class WorkTask { // 工作任务
  id: number // ID
  orgID: number // 发布任务的机构ID
  taskName: string // 任务名称
  content: string // 任务内容
  summary: string // 具体说明（如格式要求）
  endTime: Date // 文件提交截止时间
  isEnd: boolean // 任务是否结束
  addUser: string // 添加人
  addDate: Date // 发布时间
}

export class WorkTaskResult { // 工作任务完成结果
  id: number // ID
  taskID: number // 工作任务ID
  orgID: number // 任务接收者机构ID
  orgName: string // 任务接收者机构名称
  attachmentPath: string // 上传材料，可以多个，可以删除
  isOK: boolean // 任务是否通过 上级设置
  addUser: string // 添加人
  addDate: Date // 发布时间
}

export class Area { // 区域
  id: number // ID: string // 区域ID
  area: string // 区域名称
  father: string // 父ID
}

export class City { // 市
  id: number // ID
  cityID: string // 市ID
  city: string // 市名称
  father: string // 省ID
}

export class Province { // 省
  id: number // ID
  ProvinceID: string // 省ID
  Province: string // 省名称
}

export class Upload {
  userId: string
  uploadType: string
  url: string

  constructor() { }
}
export interface Error {  status: number  message: string}export enum EAlertType {  SUCCESS,  INFO,  WARNING,  DANGER}export class EAlertTypeUtils {  static getValue(type: EAlertType): string {    if (type === EAlertType.SUCCESS) {      return "success"    } else if (type === EAlertType.INFO) {      return "info"    } else if (type === EAlertType.WARNING) {      return "warning"    } else if (type === EAlertType.DANGER) {      return "danger"    }    return ""  }}export class Alert {  constructor(public alertType: EAlertType, public message: string, public pageUrl?: string, public pageText?: string) { }}export enum ERestMethod {  GET,  POST,  PUT,  DELETE,  PATCH}export class ERestMethodUtils {  static getValue(method: ERestMethod): string {    if (method === ERestMethod.GET) {      return "GET"    } else if (method === ERestMethod.POST) {      return "POST"    } else if (method === ERestMethod.PUT) {      return "PUT"    } else if (method === ERestMethod.DELETE) {      return "DELETE"    } else if (method === ERestMethod.PATCH) {      return "PATCH"    }    return "POST"  }  static equals(methodStr: string, method: ERestMethod) {    return (ERestMethodUtils.getValue(method) === methodStr)  }  static errorCode(status: number): string {    switch (status) {      case Const.STATUS_BAD_REQUEST:        return 'Bad Request'      case Const.STATUS_UNAUTHORIZED:        return 'Unauthorized'      case Const.STATUS_PAYMENT_REQUIRED:        return 'Payment Required'      case Const.STATUS_FORBIDDEN:        return 'Forbidden'      case Const.STATUS_NOT_FOUND:        return 'Not Found'      case Const.STATUS_METHOD_NOT_ALLOWED:        return 'Method Not Allowed'      case Const.STATUS_NOT_ACCEPTABLE:        return 'Not Acceptable'      case Const.STATUS_PROXY_AUTHENTICATION_REQUIRED:        return 'Proxy Authentication Required'      case Const.STATUS_REQUEST_TIMEOUT:        return 'Request Timeout'      case Const.STATUS_CONFLICT:        return 'Conflict'      case Const.STATUS_GONE:        return 'Gone'      case Const.STATUS_LENGTH_REQUIRED:        return 'Length Required'      case Const.STATUS_INTERNAL_SERVER_ERROR:        return 'Internal Server Error'    }    return 'Unknown Error'  }}export interface Options {  api?: string;  token?: string;  username?: string;  password?: string;}export class Const {  static AUTH_STATE = "X-AUTH-STATE"  static ORG_STATE = "X-ORG-STATE"  static DATA_TYPE_TEXT: string = "Text"  static DATA_TYPE_TEXT_AREA: string = "TextArea"  static DATA_TYPE_PASSWORD: string = "Password"  static DATA_TYPE_EDITOR: string = "Editor"  static DATA_TYPE_SELECT: string = "Select"  static DATA_TYPE_CHECK_BOX: string = "CheckBox"  static DATA_TYPE_COLOR: string = "Color"  static PAYLOAD_STATUS_ADDED = "added"  static PAYLOAD_STATUS_MODIFIED = "modified"  static PAYLOAD_STATUS_REMOVED = "removed"  static PAYLOAD_TYPE_CONFIG = "config"  static PAYLOAD_TYPE_SITE = "site"  static PAYLOAD_TYPE_PAGE = "page"  static PAYLOAD_TYPE_SECTION = "section"  static STATUS_NOT_MODIFIED = 304  static STATUS_BAD_REQUEST = 400  static STATUS_UNAUTHORIZED = 401  static STATUS_PAYMENT_REQUIRED = 402  static STATUS_FORBIDDEN = 403  static STATUS_NOT_FOUND = 404  static STATUS_METHOD_NOT_ALLOWED = 405  static STATUS_NOT_ACCEPTABLE = 406  static STATUS_PROXY_AUTHENTICATION_REQUIRED = 407  static STATUS_REQUEST_TIMEOUT = 408  static STATUS_CONFLICT = 409  static STATUS_GONE = 410  static STATUS_LENGTH_REQUIRED = 411  static STATUS_INTERNAL_SERVER_ERROR = 500}