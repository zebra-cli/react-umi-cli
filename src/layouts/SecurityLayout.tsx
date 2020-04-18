import React from 'react'
import { connect } from 'dva'
import { ConnectState, ConnectProps } from '@/models/connect'
import { CurrentUser } from '@/models/user'
import PageLoading from '@/components/PageLoading'

interface SecurityLayoutProps extends ConnectProps {
  loading: boolean
  currentUser: CurrentUser
}

interface SecurityLayoutState {
  isReady: boolean
}

class SecurityLayout extends React.Component<
  SecurityLayoutProps,
  SecurityLayoutState
> {
  state: SecurityLayoutState = {
    isReady: false
  }

  componentDidMount() {
    this.setState({
      isReady: true
    })
    const { dispatch } = this.props
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent'
      })
    }
  }

  render() {
    const { isReady } = this.state
    const { children, loading, currentUser = {} } = this.props
    const { info = {} } = currentUser
    const isLogin = info && info.id
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />
    }
    return children
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user
}))(SecurityLayout)
