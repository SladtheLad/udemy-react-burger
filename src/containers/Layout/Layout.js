import React, { useState } from 'react'
import { connect } from 'react-redux'

import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
  const [sideDrawerVisibility, setDrawerVisibility] = useState(false)

  const sideDrawerClosedHandler = () => {
    setDrawerVisibility(false)
  }

  const sideDrawerToggleHandler = () => {
    setDrawerVisibility(!sideDrawerVisibility)
  }

  return (
    <React.Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerVisibility}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
