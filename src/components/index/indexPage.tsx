import * as React from 'react'
import * as utils from '../../lib/utils'
import {Loading} from '../../lib/components'

export default class IndexPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="features">
        <div className="mpc_lineBox">
          <div className="container">
            <div className="mpc_title">Change the way you edit website</div>
            <div className="mpc_subtitle ct-center">Edit your website directly with just click anything to edit and make changes instantly</div>
            <div className="mpc_box autoMaxImg mpc_ulPhone1 clearfix">
              <img className="pc" src="/assets/img/features/mpc_2.jpg" />
              <img className="phone" src="/assets/img/features/mpc_2m.jpg" />
            </div>
            <div className="mpc_row clearfix" style={{ display: "none" }}>
              <div className="col-xs-12 col-sm-12 col-md-6 mpc_rowBox">
                <div className="mpc_title mpc_titlea mpc_st1">Straightfrom your tools</div>
                <div className="mpc_subtitle mpc_subtitlea mpc_st2">Share your work directly form Sketch and Photoshop with just a simple keyboard shotcut</div>
                <div className="mpc_rIcon"><img src="/assets/img/features/mpc_icon1.jpg" /><img src="/assets/img/features/mpc_icon2.jpg" /><img src="/assets/img/features/mpc_icon3.jpg" /><img src="/assets/img/features/mpc_icon4.jpg" /><img src="/assets/img/features/mpc_icon5.jpg" /></div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 mpc_rowBox">
                <div className="mpc_rowBicon">
                  <img src="/assets/img/features/mpc_2icon1.jpg" />
                  <img src="/assets/img/features/mpc_2icon2.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mpc_lineBox">
          <div className="container">
            <div className="mpc_title">Create better website together</div>
            <div className="mpc_subtitle ct-center">It’s easy for teams to have collaboration about website and work transparently on Get3W, whether they sit in one office or around the world.</div>
            <div className="mpc_box autoMaxImg clearfix">
              <img className="pc" src="/assets/img/features/mpc_1.jpg" />
              <img className="phone" src="/assets/img/features/mpc_1m.jpg" />
            </div>
          </div>
        </div>

        <div className="mpc_lineBox">
          <div className="container">
            <div className="mpc_title">Improve website with suggest edits</div>
            <div className="mpc_subtitle ct-center">
              The visitors can suggest edits to your website without affecting the original content.
              The suggestions won't change the original content until you approves them.
            </div>
            <div className="mpc_box autoMaxImg clearfix">
              <div className="browser">
                <img className="browserbar" src="/assets/img/features/browserbar.png" alt="" data-pin-nopin="true" />
                <video className="responsive-video splash-video" autoPlay={true} loop={true} poster="assets/img/features/homepage-poster.png">
                  <source src="/assets/img/features/homepage.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        <div className="mpc_lineBox" style={{ display: "none" }}>
          <div className="container">
            <div className="mpc_ul mpc_ulPhone1 clearfix">
              <ul className="autoMaxImg">
                <li className="col-xs-12 col-sm-12 col-md-6"><img src="/assets/img/features/mImg1.jpg" /></li>
                <li className="col-xs-12 col-sm-12 col-md-6">
                  <div className="mpc_title mpc_titlea">Encourage teamwork</div>
                  <div className="mpc_subtitle mpc_subtitlea">a fast, simple, and collaborative process that lets you work with others</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mpc_lineBox" style={{ display: "none" }}>
          <div className="container">
            <div className="mpc_ul clearfix">
              <ul className="autoMaxImg">
                <li className="col-xs-12 col-sm-12 col-md-6">
                  <div className="mpc_title mpc_titlea mpc_phone_t1">Connect your messaging apps</div>
                  <div className="mpc_subtitle mpc_subtitlea">Make Wake part of your current communication channles by integrating Slack,HipChat or Flowdock</div>
                </li>
                <li className="col-xs-12 col-sm-12 col-md-6"><img src="/assets/img/features/mImg2.jpg" /></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mpc_lineBox" style={{ display: "none" }}>
          <div className="container">
            <div className="mpc_ul mpc_ula clearfix">
              <ul className="autoMaxImg">
                <li className="col-xs-12 col-sm-12 col-md-6"><img src="/assets/img/features/mImg3.jpg" /></li>
                <li className="col-xs-12 col-sm-12 col-md-6">
                  <div className="mpc_title mpc_titlea">All device support</div>
                  <div className="mpc_subtitle mpc_subtitlea">Let your websites viewable on phones and tablets as well as desktops</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mpc_lineBox">
          <div className="container">
            <div className="mpc_ul clearfix">
              <ul className="autoMaxImg">
                <li className="col-xs-12 col-sm-12 col-md-6">
                  <div className="mpc_title mpc_titlea mpc_phone_t1">Choose your favorite web hosting</div>
                  <div className="mpc_subtitle mpc_subtitlea">You can integrate the web hosting your team already uses with our powerful API.</div>
                </li>
                <li className="col-xs-12 col-sm-12 col-md-6"><img src="/assets/img/features/mImg2.jpg" /></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mpc_lineBox">
          <div className="container">
            <div className="mpc_title">More Features</div>
            <div className="mpc_subtitle ct-center">Let the entire company follow along and affter their expertise</div>
            <div className="mpc_bomList">
              <span><img src="/assets/img/features/mbm_icon1.jpg" /></span>
              <span><img src="/assets/img/features/mbm_icon2.jpg" /></span>
              <span><img src="/assets/img/features/mbm_icon3.jpg" /></span>
              <span><img src="/assets/img/features/mbm_icon4.jpg" /></span>
              <span><img src="/assets/img/features/mbm_icon5.jpg" /></span>
              <div>
                <a href="#" className="mpc_down">Download Windows Installer</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mpc_lineBox">
          <div className="container">
            <div className="pricing-card pricing-card-horizontal">
              <div className="pricing-card-cta">
                <a href="/join?source=button-home" className="btn btn-block btn-theme-green btn-jumbotron" rel="nofollow">Sign up for Get3W</a>
              </div>
              <div className="pricing-card-text display-heading-3 mb-0 text-thin">
                Public websites are always free. Private plans start at $7/month.
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
