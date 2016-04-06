// https://github.com/michael/github

import * as models from './models'
import * as http from './http'
import User from './client/user'
import Users from './client/users'
import Apps from './client/apps'
import Private from './client/private'
import Search from './client/search'
import Orgs from './client/orgs'
import MeetingTypes from './client/meetingTypes'
import Meetings from './client/meetings'
import Culturists from './client/culturists'
import Introducers from './client/introducers'
import Records from './client/records'
import Histories from './client/histories'
import LearnRecords from './client/learnRecords'
import FlowUsers from './client/flowUsers'
import OrgTransfers from './client/orgTransfers'
import OrgLeaders from './client/orgLeaders'
import OrgAdmins from './client/orgAdmins'
import Positions from './client/positions'
import ElectionHistories from './client/electionHistories'
import OrgActivitys from './client/orgActivities'
import UserWorks from './client/userWorks'
import UserEduations from './client/userEducations'
import TestMetrics from './client/testMetrics'
import TestSolutions from './client/testSolutions'
import TestSolutionMetrics from './client/testSolutionMetrics'
import TestDefaultTasks from './client/testDefaultTasks'
import TestTasks from './client/testTasks'
import TestExams from './client/testExams'
import TestExamResults from './client/testExamResults'
import Analysis from './client/analysis'

export class API {
  request: http.WebRequest
  user: User
  users: Users
  apps: Apps
  search: Search
  _private: Private
  orgs: Orgs
  meetingTypes: MeetingTypes
  meetings: Meetings
  culturists: Culturists
  introducers: Introducers
  records: Records
  histories: Histories
  learnRecoreds: LearnRecords
  flowUsers: FlowUsers
  orgTransfers: OrgTransfers
  orgLeaders: OrgLeaders
  orgAdmins: OrgAdmins
  positions: Positions
  electionHistories: ElectionHistories
  orgActivities: OrgActivitys
  userWorks: UserWorks
  userEducations: UserEduations
  testMetrics: TestMetrics
  testSolutions: TestSolutions
  testSolutionMetrics: TestSolutionMetrics
  testDefaultTasks: TestDefaultTasks
  testTasks: TestTasks
  testExams: TestExams
  testExamResults: TestExamResults
  analysis: Analysis

  constructor(public options: models.Options) {
    this.request = new http.WebRequest()

    var apiRequest = new http.APIRequest(options)
    this.user = new User(apiRequest)
    this.users = new Users(apiRequest)
    this.apps = new Apps(apiRequest)
    this.search = new Search(apiRequest)
    this._private = new Private(apiRequest)
    this.orgs = new Orgs(apiRequest)
    this.meetingTypes = new MeetingTypes(apiRequest)
    this.meetings = new Meetings(apiRequest)
    this.culturists = new Culturists(apiRequest)
    this.introducers = new Introducers(apiRequest)
    this.records = new Records(apiRequest)
    this.learnRecoreds = new LearnRecords(apiRequest)
    this.flowUsers = new FlowUsers(apiRequest)
    this.orgTransfers = new OrgTransfers(apiRequest)
    this.orgLeaders = new OrgLeaders(apiRequest)
    this.orgAdmins = new OrgAdmins(apiRequest)
    this.positions = new Positions(apiRequest)
    this.electionHistories = new ElectionHistories(apiRequest)
    this.orgActivities = new OrgActivitys(apiRequest)
    this.histories = new Histories(apiRequest)
    this.userWorks = new UserWorks(apiRequest)
    this.userEducations = new UserEduations(apiRequest)
    this.testMetrics = new TestMetrics(apiRequest)
    this.testSolutions = new TestSolutions(apiRequest)
    this.testSolutionMetrics = new TestSolutionMetrics(apiRequest)
    this.testDefaultTasks = new TestDefaultTasks(apiRequest)
    this.testTasks = new TestTasks(apiRequest)
    this.testExams = new TestExams(apiRequest)
    this.testExamResults = new TestExamResults(apiRequest)
    this.analysis = new Analysis(apiRequest)
  }
}
