import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  PixelRatio,
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { appStyle } from '../styles'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  getImg({type}) {
    var that = this
    this.props.searchImg()

    setTimeout(function () {
      that.setState({
        show: true
      })
    }, 1000);


    setTimeout(function () {
      that.setState({
        show: false
      })
    }, 4000);

  }

  isEmpty(obj) {
    for (var name in obj)
    {
        return false;
    }
    return true;
  }

  showImg() {
    let url = this.props.searchedImg
    if (this.isEmpty(url)) {
        url = "http://i.meizitu.net/2016/03/15a16.jpg"
    }

    return(
      <Image style={{flex: 1,marginTop: -40}} source={{uri: url}} resizeMode="contain" />
    )
  }

  render() {
    return (
      <View style={styles.scene}>
        <View style={styles.nav}>
          <View style={[styles.title]}>
            <Text style={styles.titleText}>未完待续</Text>
          </View>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  scrollSection: {
    flex: 1,

  },
  nav: {
    backgroundColor: '#DD3F42',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99
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
  button: {
    height: 50,
    width: 200,
    backgroundColor: '#DD3F42',
    marginLeft: 80,
    marginTop: 30,
    borderRadius: 5,
  },
  text:{
    textAlign: 'center',
    marginTop: 15,
    color: '#ffffff',
    fontSize: 18
  },
});

function mapStateToProps(state) {
  return {
    searchedImg: state.searchedImg
  };
}

export default connect(mapStateToProps)(About);
