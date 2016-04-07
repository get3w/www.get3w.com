import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Footer extends React.Component<{}, {}> {
  render() {
        return (
<footer className="footer">
    <div className="ct-container">
        <div className="ct-row">
            <div className="ct-md-3 ct-sm-12">
                <a href="/" className="footer-logo">
                  <img src="/assets/img/logo-grey.png" />
                </a>
            </div>
            <nav className="ct-md-2 ct-sm-6">
                <h4 className="footer-title">Explore</h4>
                <a href="/">Most Popular</a>
                <a href="/">Most Stars</a>
                <a href="/">Recently Added</a>
            </nav>
            <nav className="ct-md-2 ct-sm-6">
                <h4 className="footer-title">Social</h4>
                <a href="https://www.facebook.com/get3w/" target="_blank">Facebook</a>
                <a href="https://www.twitter.com/get3w/" target="_blank">Twitter</a>
                <a href="https://www.pinterest.com/get3w/" target="_blank">Pinterest</a>
                <a href="https://github.com/get3w/" target="_blank">Github</a>
            </nav>
            <nav className="ct-md-2 ct-sm-6">
                <h4 className="footer-title">Quick Links</h4>
                <a href="/">Contact</a>
                <a href="/">We're Hiring!</a>
            </nav>
            <nav className="ct-md-3 ct-sm-6">
                <h4 className="footer-title">About</h4>
                <p>
                  Get3W is a hackable site editor for the 21st century, with only one mission: Make website more simplified.
                </p>
            </nav>
        </div>
    </div>
    <div className="ct-container">
        <div className="footer-legal">
            © 2016 GET3W.COM
        </div>
    </div>
</footer>
            )
    }
}

export default Footer
