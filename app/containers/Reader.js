import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Util from '../util';
import {
  Animated,
  Easing,
  View,
  Image,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PanResponder,
} from 'react-native'
import Dimensions from 'Dimensions'

const tabWidth = Dimensions.get('window').width;

class Reader extends Component {

  constructor(props) {
    super(props);
    this.state={
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      hide: true,
      uuid: this.props.navigationParams.id
    }
  }

  componentWillMount() {
    this.props.getChapterDetail(this.state.uuid)
  }

  componentDidMount() {
    // console.log(this.props.navigationParams.id);
  }

  goDerictory() {
    this.iknow()
    this.props.navigate({
      key: 'Directory',
      id: this.props.chapterContent.novel._id,
      name: this.props.chapterContent.novel.name,
    })
  }

  bookshelfLists() {
    return Object.keys(this.props.searchedBookshelves).map(key => this.props.searchedBookshelves[key])
  }


  handleScroll(e) {
    var scrollView = this.refs.scrollView
    if (e.nativeEvent.contentOffset.x < 0) {
        if (this.props.chapterContent.number === 0) {
          alert('已是第一页')
        }
        else {
          var width = e.nativeEvent.contentSize.width
          this.props.getLastChapterDetail(this.props.chapterContent._id)
          scrollView.scrollResponderScrollTo({x: width - 375, y: 0, animated: false})
        }
    }
    if (e.nativeEvent.contentOffset.x > e.nativeEvent.contentSize.width - 375) {
      this.props.getNextChatperDetail(this.props.chapterContent._id)
      scrollView.scrollResponderScrollTo({x: 0, y: 0, animated: false})
    }

  }

  renderContent(item, i, title) {
    return (<View style={{flexDirection: 'row'}} key={i}>
      <TouchableOpacity
      style={{height: Util.size.height,width: tabWidth}}
      activeOpacity={1}
      onPress={ () => this.show() }>
        <View style={styles.top}>
          <Text style={styles.chapterName}>
            {title}
          </Text>
        </View>
        <View style={styles.chapterContent}>
          {item ? item.map((value, index,chapterContent) => {
            return (
              <Text style={styles.ficContent} key={index}>
                {value}
              </Text>
            )
          }) : null }
        </View>
        <View style={styles.foot}>
          <Text style={[styles.footLeft, styles.chapterName]}>
            本章进度100%
          </Text>
          <Text style={[styles.footRight, styles.chapterName]}>
            228/1022
          </Text>
        </View>
      </TouchableOpacity>
      { this.state.hide ? null : this.showReaderOptions() }
     </View>)
  }

  goBack() {
    this.iknow()
    this.props.navigateBack({ key: 'ApplicationTabs'})
  }

  render() {
    let detail = this.props.chapterContent
    let content = this.nbsp2Space(detail.content)
    if (content) {
      var arr = this.handleContent(content)
    }
    return(
      <View style={styles.container} >
          <ScrollView
          ref='scrollView'
          scrollEventThrottle={16}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={(e)=>this.handleScroll(e)}
          pagingEnabled={true} >
              {arr ? arr.map( (item, i) => this.renderContent(item, i, detail.title)) : null}
          </ScrollView>
      </View>
    );
  }

  showReaderOptions(){
    return (
      <View style={styles.alertContainer} >
        <Animated.View style={{transform: [{
               translateY: this.state.offset.interpolate({
               inputRange: [0, 1],
               outputRange: [-70,0]
              }),
            }]
          }}>

          <TouchableOpacity
          style={styles.alertTop}
          onPress={ () => { this.goBack() } }
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
          <TouchableOpacity
             onPress={ () => { this.goDerictory() } }>
              <Image style={styles.directoryImg} source={require('../imgs/directory.png')} />
              <Text style={styles.directoryText}>
                目录
              </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

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
  iknow() {
    if(!this.state.hide){
      this.out();
    }
  }

  show() {
    if(this.state.hide){
      this.setState({hide: false}, this.in);
    }
  }

  nbsp2Space(str) {
   if (!str) {
     return null
   }
   return str.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '        ')
  }

  handleContent(content) {
    const length = content.length
    var array = []
    let x = 0,y,m = 0
    while (x < length) {
      let _array = []
      for (let i = 0; i <= 16; i++) {
        let str_spa = content.substring(x, x + 1)
        let str_sto = content.substring(x, x + 18)
        const re = /^\s+$/
        if (str_sto.indexOf('”') != -1) {
          y = x + str_sto.indexOf('”') + 1
          _array[i] = content.substring(x, y)
          x = y
          continue
        }
        else if (str_sto.indexOf('。') != -1 ) {
          y = x + str_sto.indexOf('。') + 1
          if (re.exec(content.substring(y, y + 1))) {
            y = x + str_sto.indexOf('。') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          else {
            if (str_sto.indexOf('！') != -1) {
              y = x + str_sto.indexOf('！') + 1
              _array[i] = content.substring(x, y)
              x = y
              continue
            }
            else {
              y = x + 18
              _array[i] = content.substring(x, y)
              x = y
              continue
            }
          }
        }
        else if (str_sto.indexOf('！') != -1) {
          y = x + str_sto.indexOf('！') + 1
          if (re.exec(content.substring(y, y + 1))) {
            y = x + str_sto.indexOf('！') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          else {
            y = x + 18
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
        }
        else if (str_sto.indexOf('？') != -1){
          y = x + str_sto.indexOf('？') + 1
          if (re.exec(content.substring(y, y + 1))) {
            y = x + str_sto.indexOf('？') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          else {
            y = x + 18
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
        }
        else if (re.exec(str_spa)) {
          y = x + 24
          if (content.substring(x,y).indexOf('。') != -1) {
            y = x + content.substring(x,y).indexOf('。') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          _array[i] = content.substring(x, y)
          x = y
          continue
        }
        else {
          y = x + 18
          _array[i] = content.substring(x, y)
          x = y
        }
      }
      array[m] = _array
      m++
    }
    // console.log((m - 1) * 375);
    return array
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9DFC7',
  },
  top: {
    height: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  chapterContent: {
    // backgroundColor: '#604733',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    height: Util.size.height - 70
  },
  chapterName: {
    fontSize: 10,
    color: '#A58F72',
  },
  bigChapterName: {
    fontSize: 22,
  },
  ficContent: {
    color: '#604733',
    fontSize: 19,
    lineHeight:34,
  },
  foot: {
    height: 12,
    marginLeft: 10,
    width: Dimensions.get('window').width - 20,
    flexDirection: 'row',
  },
  footLeft: {
    flex:1,
    width: 70,
  },
  footRight: {
    flex:1,
    textAlign: 'right',
  },
  alertContainer: {
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

function mapStateToProps(state) {
  return {
    chapterContent: state.chapterContent,
    navigationParams: state.navigationParams,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
