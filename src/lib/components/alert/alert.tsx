import * as React from 'react'
import * as models from '../../../api/models'

export default class Alert extends React.Component<{
  alert: models.Alert
}, {}> {
  render() {
    var alert = this.props.alert

    var pageEl = null
    if (alert.pageUrl && alert.pageText) {
      pageEl = <a href={alert.pageUrl} className='ct-ml-sm'>{alert.pageText}</a>
    }
    var className = 'ct-ma-sm ct-alert --' + models.EAlertTypeUtils.getValue(alert.alertType)
    return (
      <div className={className}>
        {alert.message}
        {pageEl}
      </div>
    )
  }
}
