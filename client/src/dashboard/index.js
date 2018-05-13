import * as glamor from 'glamor'
import glamorous from 'glamorous'
import React from 'react'

import * as api from './api'
import Page from '../common/layout/page'
import StatusIndicator, { STATUS } from './components/status-indicator'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      devices: []
    }
  }
  componentDidMount() {
    api.onSystemStatusChange(this.handleSystemStatusChange)
  }

  componentWillUnmount() {
    api.unregisterSystemStatusChange(this.handleSystemStatusChange)
  }

  handleSystemStatusChange = ({devices}) => {
    this.setState({ devices })
  }
  openStatusDetails = device => () => {
    this.setState({ showDetails: true })
  }

  renderDevice = device => {
    return (
      <StatusIndicator
        name={device.name}
        status={device.status}
        key={device.name}
        onClick={this.openStatusDetails(device)} />
    )
  }
  render() {
    const overallStatus = this.state.devices.some(d => d.status !== STATUS.OK) ? STATUS.UNKNOWN : STATUS.OK
    return (
      <Page title="Dashboard" subtitle="Kaiden's House">
        <ContentContainer>
          <ContentInnerContainer zoomed={this.state.showDetails}>
            <StatusIndicatorsContainer>
              <StatusIndicator name="Home Status" status={overallStatus} />
            </StatusIndicatorsContainer>
            <StatusIndicatorsContainer>
              {this.state.devices.map(this.renderDevice)}
            </StatusIndicatorsContainer>
          </ContentInnerContainer>
        </ContentContainer>
      </Page>
    )
  }
}

const ContentContainer = glamorous.div({
  overflow: 'hidden'
})

const zoomedAnimation = glamor.css.keyframes({
  '99%': { transform: 'scale(1.2)', opacity: 0 },
  '100%': { transform: 'scale(0)' }
})

const ContentInnerContainer = glamorous.div(
  ({ zoomed }) => ({
    animation: zoomed ? `${zoomedAnimation} 0.3s forwards` : null,
  })
)

const StatusIndicatorsContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'center'
})