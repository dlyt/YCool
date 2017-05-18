import About from '../About'
import Novel from '../Novel'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { View, TabBarIOS, TabBarItemIOS } from 'react-native'
import { AsyncStorage } from 'react-native'

class ApplicationTabs extends Component {

  constructor(props) {
    super(props)
    this.state = { index: 0 }
  }

  componentWillMount() {
   
  }

  onPress(index) {
    this.props.setTab(index);
  }

  renderScene(component) {
    return (
      <View style={ { flex: 1 } }>
        { React.createElement(component, this.props) }
      </View>
    )
  }

  render() {
    return (
      <TabBarIOS tintColor= '#DB4146' style={{flex: 1}} >
        <TabBarIOS.Item
          title= '书架'
          icon={require('../../imgs/tabbar1.png')}
          iconSize={25}
          onPress={() => { return this.onPress(0) } }
          selectedIconName="sfd"
          selected={this.props.tabs.index === 0}>
            { this.renderScene(Novel) }
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          iconSize={25}
          onPress={() => { return this.onPress(1) } }
          selectedIconName="more"
          selected={this.props.tabs.index === 1}>
            { this.renderScene(About) }
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.tabs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs)
