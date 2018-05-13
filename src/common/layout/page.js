import glamorous from 'glamorous'
import React from 'react/cjs/react.development'
import { node, string } from 'prop-types'

import * as Heading from './heading'

export default class Page extends React.Component {
  static propTypes = {
    title: string.isRequired,
    subtitle: string,
    children: node.isRequired
  }

  render() {
    return (
      <PageContainer>
        <HeadingContainer>
          <Heading.Main>{this.props.title}</Heading.Main>
          {this.props.subtitle && <Heading.Sub>{this.props.subtitle}</Heading.Sub>}
        </HeadingContainer>
        {this.props.children}
      </PageContainer>
    )
  }
}

const PageContainer = glamorous.div({
  minHeight: '100%',
  boxSizing: 'border-box',
  padding: 24,
  background: '#272E31',
  color: 'white'
})

const HeadingContainer = glamorous.div({
  textAlign: 'center',
  marginBottom: 24
})
