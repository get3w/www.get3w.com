import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import * as utils from '../lib/utils'
import configureStore from '../store/configureStore';
import App from './containers/app'
import * as links from './constants/links'
import IndexPage from './containers/index/indexPage'
import NotFoundPage from '../components/notFoundPage';
import LoginPage from './containers/login/loginPage'

import ContentPage from './containers/content/indexPage'

import YWIndexPage from './containers/yw/indexPage'
import YWDangFeiPage from './containers/yw/dangFeiPage'
import YWJiaoNaPage from './containers/yw/jiaoNaPage'
import YWJiLuListPage from './containers/yw/jiLuListPage'
import YWJiLuPage from './containers/yw/jiLuPage'

import ZZIndexPage from './containers/zz/indexPage'

import UserBasicPage from './containers/user/basicPage'
import UserMessagePage from './containers/user/messagePage'
import UserDangFeiPage from './containers/user/dangFeiPage'
import UserJiaoNaPage from './containers/user/jiaoNaPage'
import UserJiLuPage from './containers/user/jiLuPage'
import UserAddCardPage from './containers/user/addCardPage'
import UserAddCardDetailPage from './containers/user/addCardDetailPage'
import UserRolePage from './containers/user/rolePage'
import UserChangePasswordPage from './containers/user/changePasswordPage'

import SETTINGSIndexPage from './containers/settings/indexPage'
import SETTINGSTongZhiPage from './containers/settings/tongZhiPage'
import SETTINGSFeedbackPage from './containers/settings/feedbackPage'
import SETTINGSAboutPage from './containers/settings/aboutPage'

const store = configureStore();
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path={links.LOGIN} component={LoginPage}/>
      <Route path={links.INDEX} component={App}>
        <IndexRoute component={IndexPage} />

        <Route path={links.CONTENT_} component={ContentPage} />

        <Route path={links.YW} component={YWIndexPage}>
          <Route path={links.YW_DANGFEI} component={YWDangFeiPage}/>
          <Route path={links.YW_JIAONA} component={YWJiaoNaPage}/>
          <Route path={links.YW_JILU_LIST} component={YWJiLuListPage}/>
          <Route path={links.YW_JILU} component={YWJiLuPage}/>
        </Route>

        <Route path={links.ZZ} component={ZZIndexPage} />

        <Route path={links.USER_BASIC} component={UserBasicPage} />
        <Route path={links.USER_MESSAGE} component={UserMessagePage} />
        <Route path={links.USER_DANGFEI} component={UserDangFeiPage} />
        <Route path={links.USER_JIAONA} component={UserJiaoNaPage} />
        <Route path={links.USER_JILU} component={UserJiLuPage} />
        <Route path={links.USER_ADD_CARD} component={UserAddCardPage} />
        <Route path={links.USER_ADD_CARD_DETAIL} component={UserAddCardDetailPage} />
        <Route path={links.USER_ROLE} component={UserRolePage} />
        <Route path={links.USER_CHANGEPASSWORD} component={UserChangePasswordPage} />

        <Route path={links.SETTINGS} component={SETTINGSIndexPage}>
          <Route path={links.SETTINGS_TONGZHI} component={SETTINGSTongZhiPage}/>
          <Route path={links.SETTINGS_FEEDBACK} component={SETTINGSFeedbackPage}/>
          <Route path={links.SETTINGS_ABOUT} component={SETTINGSAboutPage}/>
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
