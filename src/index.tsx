import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as utils from './lib/utils'
import configureStore from './store/configureStore';
import App from './containers/app'
import * as links from './constants/links'
import IndexPage from './components/index/indexPage'
import NotFoundPage from './components/notFoundPage';
import LoginPage from './containers/login/loginPage'

import UserIndexPage from './components/users/indexPage'
import UserBasicPage from './containers/users/userBasicPage'
import UserDAXXPage from './containers/users/userDAXXPage'
import UserJBXXPage from './containers/users/userJBXXPage'
import UserXXZLPage from './containers/users/userXXZLPage'
import UserXGTXPage from './containers/users/userXGTXPage'
import UserSXHBPage from './containers/users/userSXHBPage'
import UserZBDHJYPage from './containers/users/userZBDHJYPage'
import UserDJXXPage from './containers/users/userDJXXPage'
import UserFZLLPage from './containers/users/userFZLLPage'
import UserGZJLPage from './containers/users/userGZJLPage'
import UserJYJLPage from './containers/users/userJYJLPage'
import UserZHUANCHUPage from './containers/users/userZHUANCHUPage'
import UserXGMMPage from './containers/users/userXGMMPage'

import PartyMembersIndexPage from './containers/partymembers/indexPage'
import PartyMembersDYPage from './containers/partymembers/partyMembersDYPage'
import PartyMembersLDPage from './containers/partymembers/partyMembersLDPage'
import PartyMembersZZPage from './containers/partymembers/partyMembersZZPage'
import PartyMembersLSPage from './containers/partymembers/partyMembersLSPage'

import OrgsIndexPage from './containers/orgs/indexPage'
import OrgsGLPage from './containers/orgs/orgsGLPage'
import OrgsJGPage from './containers/orgs/orgsJGPage'
import OrgsHJPage from './containers/orgs/orgsHJPage'
import OrgsLDPage from './containers/orgs/orgsLDPage'
import OrgsDTPage from './containers/orgs/orgsDTPage'
import OrgsSZPage from './containers/orgs/orgsSZPage'

import MembersIndexPage from './containers/members/indexPage'
import MembersSQPage from './containers/members/membersSQPage'
import MembersAddPage from './containers/members/membersAddPage'
import MembersEditPage from './containers/members/membersEditPage'
import MembersJJPage from './containers/members/membersJJPage'
import MembersFZPage from './containers/members/membersFZPage'
import MembersYBPage from './containers/members/membersYBPage'

import MeetingsPage from './containers/meetings/meetingsPage'

import ActivitiesIndexPage from './containers/activities/indexPage'

import DwgzIndexPage from './containers/dwgz/indexPage'
import DwgzKHPage from './containers/dwgz/dwgzKHPage'

import AnalysisIndexPage from './containers/analysis/indexPage'
import AnalysisGZPage from './containers/analysis/analysisGZPage'
import AnalysisDYPage from './containers/analysis/analysisDYPage'
import AnalysisZZPage from './containers/analysis/analysisZZPage'
import AnalysisSQPage from './containers/analysis/analysisSQPage'

import ContentsPage from './containers/contents/indexPage'

const store = configureStore();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={links.LOGIN} component={LoginPage}/>
      <Route path={links.INDEX} component={App}>
        <IndexRoute component={IndexPage} />

        <Route path={links.USERS} component={UserIndexPage}>
          <Route path={links.USERS_BASIC_} component={UserBasicPage}/>
          <Route path={links.USERS_DAXX_} component={UserDAXXPage} />
          <Route path={links.USERS_JBXX_} component={UserJBXXPage} />
          <Route path={links.USERS_XXZL_} component={UserXXZLPage} />
          <Route path={links.USERS_XGTX_} component={UserXGTXPage} />
          <Route path={links.USERS_SXHB_} component={UserSXHBPage} />
          <Route path={links.USERS_ZBDHJY_} component={UserZBDHJYPage} />
          <Route path={links.USERS_DJXX_} component={UserDJXXPage} />
          <Route path={links.USERS_FZLL_} component={UserFZLLPage} />
          <Route path={links.USERS_GZJL_} component={UserGZJLPage} />
          <Route path={links.USERS_JYJL_} component={UserJYJLPage} />
          <Route path={links.USERS_ZHUANCHU_} component={UserZHUANCHUPage} />
          <Route path={links.USERS_XGMM_} component={UserXGMMPage} />
        </Route>

        <Route path={links.PARTY_MEMBERS} component={PartyMembersIndexPage}>
          <Route path={links.PARTY_MEMBERS_DY} component={PartyMembersDYPage}/>
          <Route path={links.PARTY_MEMBERS_YB} component={MembersYBPage}/>
          <Route path={links.PARTY_MEMBERS_LD} component={PartyMembersLDPage}/>
          <Route path={links.PARTY_MEMBERS_ZZ} component={PartyMembersZZPage}/>
          <Route path={links.PARTY_MEMBERS_ADD} component={MembersAddPage}/>
          <Route path={links.PARTY_MEMBERS_LS} component={PartyMembersLSPage}/>
        </Route>

        <Route path={links.ORGS} component={OrgsIndexPage}>
          <Route path={links.ORGS_JG} component={OrgsJGPage}/>
          <Route path={links.ORGS_GL} component={OrgsGLPage}/>
          <Route path={links.ORGS_HJ} component={OrgsHJPage}/>
          <Route path={links.ORGS_LD} component={OrgsLDPage}/>
          <Route path={links.ORGS_DT} component={OrgsDTPage}/>
          <Route path={links.ORGS_SZ} component={OrgsSZPage}/>
        </Route>

        <Route path={links.MEMBERS} component={MembersIndexPage}>
          <Route path={links.MEMBERS_SQ} component={MembersSQPage}/>
          <Route path={links.MEMBERS_ADD} component={MembersAddPage}/>
          <Route path={links.MEMBERS_EDIT_} component={MembersEditPage}/>
          <Route path={links.MEMBERS_JJ} component={MembersJJPage}/>
          <Route path={links.MEMBERS_FZ} component={MembersFZPage}/>
          <Route path={links.MEMBERS_YB} component={MembersYBPage}/>
        </Route>

        <Route path={links.MEETINGS} component={MeetingsPage}/>

        <Route path={links.ACTIVITIES} component={ActivitiesIndexPage} />

        <Route path={links.DWGZ} component={DwgzIndexPage}>
          <Route path={links.DWGZ_KH} component={DwgzKHPage}/>
        </Route>

        <Route path={links.ANALYSIS} component={AnalysisIndexPage}>
          <Route path={links.ANALYSIS_GZ} component={AnalysisGZPage}/>
          <Route path={links.ANALYSIS_DY} component={AnalysisDYPage}/>
          <Route path={links.ANALYSIS_ZZ} component={AnalysisZZPage}/>
          <Route path={links.ANALYSIS_SQ} component={AnalysisSQPage}/>
        </Route>

        <Route path={links.CONTENTS_} component={ContentsPage} />

        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
