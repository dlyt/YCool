import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
  StatusBar
} from 'react-native';

import Util from '../util'
// import Directory from './directory'

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      hide: true,
    };
  }

  _pressButton() {
    // this.props.navigator.popToTop();
  }

  _showDirectory() {
    this.props.navigator.push({
      component: Directory,

    });
  }

  render() {
    if(this.state.hide){
      return (<View />)
    } else {
      return (
        <View style={styles.container} >

          <Animated.View style={{transform: [{
                 translateY: this.state.offset.interpolate({
                 inputRange: [0, 1],
                 outputRange: [-70,0]
                }),
              }]
            }}>

            <TouchableOpacity
            style={styles.alertTop}
            onPress={ () => { console.log(this) } }
            >
              <Image style={styles.backImg} source={require('../imgs/back.png')} />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
          style={{height: Util.size.height - 140}}
          onPress={this.iknow.bind(this)}
          >

          </TouchableOpacity>
          <Animated.View style={[styles.alertFoot , {transform: [{
                translateY: this.state.offset.interpolate({
                 inputRange: [0, 1],
                 outputRange: [70, 0]
                }),
              }]
            }]}>
            <TouchableOpacity onPress={this._showDirectory.bind(this)}>
              <Image style={styles.directoryImg} source={require('../imgs/directory.png')} />
              <Text style={styles.directoryText}>
                目录
              </Text>
            </TouchableOpacity>
          </Animated.View>


        </View>
      );
    }
  }
  // <Animated.View style={[{transform: [{
  //       translateY: this.state.offset.interpolate({
  //        inputRange: [0, 1],
  //        outputRange: [(Util.size.height + 70), Util.size.height]
  //       }),
  //     }]
  //   }]}>
  //   <View style={styles.alertFoot}>
  //     <Image style={styles.backImg} source={require('../imgs/back.png')} />
  //   </View>
  // </Animated.View>

  //显示动画
  in() {
    Animated.parallel([

      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 1,
        }
      )
    ]).start();
  }

  //隐藏动画
  out(){
    Animated.parallel([
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 0,
        }
      )
    ]).start((finished) => this.setState({hide: true}));
  }

  //取消
  iknow(event) {
    // StatusBar.setHidden(true);
    if(!this.state.hide){
      this.out();
    }
  }

  show() {
    // StatusBar.setHidden(false);
    if(this.state.hide){
      this.setState({hide: false}, this.in);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    width:Util.size.width,
    height:Util.size.height,
  },
  alertTop: {
    height: 70,
    backgroundColor: '#3B3A38',
    flexDirection: 'row'
  },
  alertMiddle: {
    height: Util.size.height - 140,
  },
  alertFoot: {
    height: 70,
    backgroundColor: '#3B3A38',
  },
  backImg: {
    marginTop: 30,
    marginLeft: 10,
  },
  directoryImg: {
    marginLeft: 10,
    marginTop: 10,
  },
  directoryText: {
    marginLeft: 12,
    color: '#9D9C9B'
  }
});
