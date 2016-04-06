import * as React from 'react'

export default class InnerLoading extends React.Component<{}, {}> {
  render() {
    return (
      <div className='g3w-inner-loading'>
        <span className="g3w-loading"><i /><i /><i /></span>
      </div>
    )
  }
}
