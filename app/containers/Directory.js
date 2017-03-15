import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  NavigatorIOS,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';

import Util from '../util'

class Directory extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      order: -1
    }
  }

  componentWillMount() {
    this.props.getDirectory(this.props.navigationParams.id)
  }

  directoryList() {
    return Object.keys(this.props.directory).map(key => this.props.directory[key])
  }

  goReader(id) {
    this.props.getChapterDetail(id)
    this.props.navigateBack({id: id})
  }

  changeOrder() {
    if (this.state.order === 1) {
      this.setState({
        order: -1
      })
    }
    else {
      this.setState({
        order: 1
      })
    }
    this.props.getDirectory(this.props.navigationParams.id, this.state.order)
  }
  // <ScrollView style={styles.scrollSection}
  //   showsVerticalScrollIndicator={false}>
  //   {this.directoryList().map((item, index) => {
  //       return (
  //
  //       )
  //   })}
  // </ScrollView>

  renderRow(item) {
    console.log(item);
    return(
      <TouchableOpacity
        key={item._id}
        style={[styles.item, styles.row]}
        onPress={ () => {this.goReader(item._id)}  }>
          <View style={{justifyContent: 'center',marginLeft: 10}}>
            <Text style={{color: '#B9B9B9',}}>
              {item.number + 1}.
            </Text>
          </View>
          <View style={{justifyContent: 'center',marginLeft: 10}}>
            <Text style={{color: '#282C34',}}>
              {item.title}
            </Text>
          </View>
     </TouchableOpacity>
    )
  }

  renderList(lists) {
    return(
      <ListView
           enableEmptySections
           style={styles.scrollSection}
           dataSource={this.state.dataSource.cloneWithRows(lists)}
           renderRow={this.renderRow.bind(this)} />
    )
  }

  render(){
    const lists = this.directoryList()
    return(
      <View style={styles.scene}>
        <View style={styles.nav}>
          <View style={[styles.button]}>
            <TouchableOpacity
              onPress={ () => { this.props.navigateBack({key: 'Reader'}) } }
              style={styles.button}>
              <Image
                source={require('../imgs/back.png')}
                style={styles.leftButton} />
            </TouchableOpacity>
          </View>
          <View style={[styles.title]}>
            <Text style={styles.titleText}>{this.props.navigationParams.name}</Text>
          </View>
          <View style={[styles.button]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {this.changeOrder()}}>
              {this.state.order === -1 ? <Image style={styles.rightImg}
                source={require(`../imgs/up.png`)} /> : <Image style={styles.rightImg}
                  source={require(`../imgs/down.png`)} />}
            </TouchableOpacity>
          </View>
        </View>
        {this.renderList(lists)}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  nav: {
    backgroundColor: '#DD3F42',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    height: 66,
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 25,
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
  },
  leftButton: {
    marginTop: 25,
    marginRight: 5,
  },
  item: {
    height: 60,
    borderBottomWidth: Util.pixel,
    borderColor: '#A5A5A5',
  },
  row:{
    flexDirection: 'row',
  },
  rightImg: {
    marginTop: 20
  }
})


function mapStateToProps(state) {
  return {
    directory: state.directory,
    navigationParams: state.navigationParams,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
