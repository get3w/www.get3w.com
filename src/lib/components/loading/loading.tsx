import * as React from 'react'
import * as utils from '../../utils'
//import '../../../less/components/loading.less'

export default class Loading extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div id="g3w-loading" className='g3w-loading'>
          <div className='loading-animation'>
            <div className='loading-text'>载入中...</div>
          </div>
          <div className='loading-mask'></div>
        </div>
        <div id="g3w-windows-mask" className='g3w-windows-mask'></div>
      </div>
    )
  }
}
