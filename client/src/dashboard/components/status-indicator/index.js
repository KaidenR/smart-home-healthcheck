import * as glamor from 'glamor'
import glamorous, { Span } from 'glamorous'
import { func, oneOf, string } from 'prop-types'
import React from 'react'

import CheckIcon from './icons/check.svg'
import ExclamationIcon from './icons/exclamation-mark.svg'
import FlameIcon from './icons/flame.svg'
import RightChevronIcon from './icons/chevron-right.svg'
import SyncIcon from './icons/sync.svg'

const rotateAnimation = glamor.css.keyframes({
  '0%': { transform: 'rotate(0)' },
  '100%': { transform: 'rotate(360deg)'  }
})
const flickerAnimation = glamor.css.keyframes({
  '0%': { transform: 'scale(1) rotate(0)', opacity: 0.9 },
  '7%': { transform: 'scale(1.05) rotate(2deg)', opacity: 1 },
  '18%': { transform: 'scale(0.95) rotate(3deg)', opacity: 0.75 },
  '23%': { transform: 'scale(0.9) rotate(-2deg)', opacity: 0.65 },
  '58%': { transform: 'scale(1) rotate(1deg)', opacity: 0.9 },
  '86%': { transform: 'scale(1.05) rotate(2deg)', opacity: 1 }
})

export const STATUS = {
  OK: 'OK',
  UNKNOWN: 'UNKNOWN',
  DOWN: 'DOWN',
  UPDATING: 'UPDATING'
}
const statusInfo = {
  [STATUS.OK]: {
    message: 'Up and running',
    color: '#9DDEAA',
    icon: CheckIcon
  },
  [STATUS.UNKNOWN]: {
    message: 'Experiencing some problems',
    color: '#FFDD8E',
    icon: ExclamationIcon
  },
  [STATUS.DOWN]: {
    message: 'Something is seriously wrong',
    color: '#f37676',
    icon: FlameIcon,
    animation: `${flickerAnimation}  2s linear infinite`
  },
  [STATUS.UPDATING]: {
    message: 'Updating',
    color: '#76c1f3',
    icon: SyncIcon,
    animation: `${rotateAnimation}  2s linear infinite`
  },
}

export default class StatusIndicator extends React.Component {
  static propTypes = {
    name: string.isRequired,
    status: oneOf(Object.values(STATUS)),
    onClick: func
  }

  constructor(props) {
    super(props)
    this.state = {
      status: props.status
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status !== this.state.status) {
      this.setState({ status: null }, () => {
        this.setState({ status: nextProps.status })
      })
    }
  }

  render() {
    const { name, onClick } = this.props
    const { status } = this.state

    if (!status)
      return <Container/>

    const { icon: Icon, message, color } = statusInfo[status]

    return (
      <Container onClick={onClick}>
        <IconContainer status={status}>
          <Icon width="100" height="100" fill={color} />
        </IconContainer>
        <Title>
          <Span marginRight="8px">{name}</Span>
          {onClick && <RightChevronIcon />}
        </Title>
        <StatusLabel status={status}>{message}</StatusLabel>
      </Container>
    )
  }
}

const Container = glamorous.div({
  display: 'flex',
  height: 200,
  minWidth: 230,
  margin: 50,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s'
}, ({ onClick }) => {
  return onClick && {
    cursor : 'pointer',
    ':hover': {
      transform: 'scale(1.05)'
    }
  }
})

const slideInAnimation = glamor.css.keyframes({
  '0%': { marginBottom: -50, opacity: 0 },
  '100%': { marginBottom: 0, opacity: '100%' }
})

const IconContainer = glamorous.div({
  display: 'flex',
}, ({ status }) => {
  const animation = statusInfo[status].animation
  return ({
    animation: `${slideInAnimation} 0.5s cubic-bezier(0.495, 0.100, 0.000, 1.625)${animation ? `, ${animation}` : ''}`
  })
})

const Title = glamorous.div({
  fontSize: 24,
  marginTop: 8,
  marginBottom: 4
})

const StatusLabel = glamorous.div('status-label', {
  fontSize: 14
}, ({ status }) => ({
  color: statusInfo[status].color
}))