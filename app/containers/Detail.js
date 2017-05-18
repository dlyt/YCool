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
  TouchableHighlight,
  ListView
} from 'react-native';

import Util from '../util'
import DeviceInfo from 'react-native-device-info'

class Detail extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.searchNovelInfo(this.props.navigationParams.name, this.props.navigationParams.url)
  }

  orderNovel(id, join)  {
    if (!join) {
      this.props.orderNovel(id)
        .then(
          (res) => {
            this.props.getBookshelf()
            this.props.navigateReset([{key: 'ApplicationTabs'}], 0)
          },
          (err) => { console.log(err) }
        )
    }
  }

  getNovelInfo() {
    return this.props.searchedNovelInfo
  }

  render(){
    const novelInfo = this.getNovelInfo()
    return(
      <View style={styles.scene}>
        <View style={styles.nav}>
          <View style={[styles.button]}>
            <TouchableOpacity
              onPress={ () => { this.props.navigateBack({key: 'Reader'}) } }
              style={styles.button}>
              <Image style={styles.backImg}
                source={require('../imgs/back.png')}
                style={styles.leftButton} />
            </TouchableOpacity>
          </View>
          <View style={[styles.title]}>
            <Text style={styles.titleText}>作品详情</Text>
          </View>
          <View style={[styles.button]}>
          </View>
        </View>
        <View style={styles.detailSection}>
          <View style={styles.novelInfo}>
            <View style={styles.infoLeft}>
                <Image style={styles.img} source={{uri: novelInfo.img}} resizeMode="contain" />
            </View>
            <View style={styles.infoRight}>
              <Text style={styles.novelTitle}>
                {novelInfo.name}
              </Text>
              <Text style={styles.text}>
                作者：{novelInfo.author}
              </Text>
              <Text style={styles.text}>
                更新时间：{novelInfo.updateTime}
              </Text>
            </View>
          </View>
          <View style={styles.middle}>
            <TouchableHighlight style={styles.bigButton}
              onPress={ () => this.orderNovel(novelInfo._id,novelInfo.join)}>
              <Text style={styles.bigText}>
                {novelInfo.join ? '已加入书架' : '加入书架'}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.introduction}>
            <Text style={styles.introductionText}>
              {novelInfo.introduction}
            </Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  nav: {
    backgroundColor: '#A49B93',
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
  detailSection: {
    flex:  1,
  },
  novelInfo: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#7C6958',
  },
  middle: {
    flex: 0.1,
    borderBottomLeftRadius: 20,
    borderBottomWidth: Util.pixel,
    borderColor: '#A5A5A5',
  },
  bigButton: {
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 42,
    height: 40,
    width: 280,
    backgroundColor: '#DD3F42',
  },
  bigText: {
    fontSize: 18,
    color: '#FEFBFB',
    marginTop: 10,
    textAlign:'center',
  },
  introduction: {
    flex: 0.4
  },
  infoLeft: {
    flex: 0.3,

  },
  img: {
    marginTop: 20,
    marginLeft: 20,
    height: 110,
    width: 80,
    // backgroundColor: '#A49B93',
  },
  infoRight: {
    flex: 0.6,
  },
  novelTitle: {
    marginTop: 25,
    fontSize: 18,
    color: '#E5E3DF',
  },
  text: {
    marginTop: 15,
    color: '#E5E3DF',
  },
  introductionText: {
    marginTop: 10,
    marginLeft: 20
  }
})



function mapStateToProps(state) {
  return {
    searchedNovelInfo: state.searchedNovelInfo,
    navigationParams: state.navigationParams,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
