import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Util from '../util';
import Request from '../lib/request'
import {
  Animated,
  Easing,
  View,
  Image,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  TouchableOpacity,
  AsyncStorage,
  PanResponder,
} from 'react-native'
import Dimensions from 'Dimensions'

const tabWidth = Dimensions.get('window').width;


class Reader extends Component {

  constructor(props) {
    super(props)
    this.state={
      dataSource: new ListView.DataSource({
        rowHasChanged:    (row1, row2) => row1 !== row2
      }),
      offset:             new Animated.Value(0),
      opacity:            new Animated.Value(0),
      hide:               true,
      searching:          false,
      first:              true,
    }
    this.uuid = this.props.navigationParams.id
    this._data= []
    this.count = 0
    this.currentChapter = ''
    this.nextChapter = ''
    this.number = 0
    this.x = 0
    this.a = 0
    this.i = 0
  }

  componentWillMount() {
    this.props.getFirstRenderChapters(this.uuid)
  }


  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   console.log(this.props.firstRenderChapters);
  // }

  componentDidMount() {
    // console.log(this.props.firstRenderChapters);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  goDerictory() {
    this.iknow()
    this.props.navigate({
      key: 'Directory',
      id: this.props.navigationParams.id,
      name: this.props.navigationParams.name
    })
  }

  goBack() {
    this.iknow()
    this.props.navigateBack({ key: 'ApplicationTabs'})
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  _concatData(newData) {
    this._data = this._data.concat(newData)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data)
    })
  }

  _unshiftData(newData) {
    const that = this
    newData = newData.concat(this._data)
    this._data = newData
    setTimeout(function () {
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(that._data),
        searching: false
      })
    }, 300);
  }

  componentWillUpdate(nextProps, nextState) {
    const that = this
    if (nextProps.navigationParams.first) {
      nextProps.navigationParams.first = false
      AsyncStorage.getItem('userToken')
        .then((token) => {
          Request.get(`/chapters/firstRender/${that.uuid}`, '', token)
            .then((data) => {
              let progress = data.response.progress
              this.number = data.response.chapters[0].number
              const lists = data.response.chapters
              let arr = []
              let content = that.nbsp2Space(lists[0].content)
              let _arr = Util.handleContent(content)
              that.currentChapter = _arr.length
              _arr.forEach( function(_item) {
                let chapterInfo = {
                  title: lists[0].title,
                  num: lists[0].number,
                  content: _item
                }
                arr.push(chapterInfo)
              })
              if (lists.length === 2) {
                content = that.nbsp2Space(lists[1].content)
                _arr = Util.handleContent(content)
                that.nextChapter = _arr.length
                _arr.forEach( function(_item) {
                  let chapterInfo = {
                    title: lists[1].title,
                    num: lists[1].number,
                    content: _item
                  }
                  arr.push(chapterInfo)
                })
              }
              that._data = arr
              let scrollView = that.refs.scrollView
              scrollView.scrollTo({x: progress * 375, y: 0, animated: false})
            })
        })

    }
    if (Object.keys(this.props.firstRenderChapters).length !== 0 && nextState.first) {
      this.setState({
        first: false
      })

      let progress = nextProps.firstRenderChapters.progress
      this.number = nextProps.firstRenderChapters.chapters[0].number
      const list = Object.keys(nextProps.firstRenderChapters).map(key => nextProps.firstRenderChapters[key])

      let arr = []
      if (list.length !== 0) {
        let content = that.nbsp2Space(list[0][0].content)
        let _arr = Util.handleContent(content)
        this.currentChapter = _arr.length
        _arr.forEach( function(_item) {
          let chapterInfo = {
            title: list[0][0].title,
            num: list[0][0].number,
            content: _item
          }
          arr.push(chapterInfo)
        })
        if(list[0].length === 2) {
          content = that.nbsp2Space(list[0][1].content)
          _arr = Util.handleContent(content)
          this.nextChapter = _arr.length
          _arr.forEach( function(_item) {
            let chapterInfo = {
              title: list[0][1].title,
              num: list[0][1].number,
              content: _item
            }
            arr.push(chapterInfo)
          })
        }
      }
      this._data = arr
      let scrollView = this.refs.scrollView
      scrollView.scrollTo({x: progress * 375, y: 0, animated: false})
    }
  }

  getContent(content) {
    let arr = []
    let _content = this.nbsp2Space(content)
    let _arr = Util.handleContent(_content)
    this.currentChapter = this.nextChapter
    this.nextChapter = _arr.length
    _arr.forEach( function(_item) {
      let _chapterInfo = {
        title: chapterInfo.title,
        num: chapterInfo.number,
        content: _item
      }
      arr.push(_chapterInfo)
    })
    return arr
  }

  handleScroll(e) {
    let arr = []
    let chapterInfo
    let listView = this.refs.listView
    let x = e.nativeEvent.contentOffset.x
    const that = this
    if (this.count === 0) {
      this.count = (this.currentChapter - 1) * 375
    }

    this.x = x
    if ( x > this.count) {
      this.a = this.count
      this.count += this.nextChapter * 375
      if (this.number + 2 < parseInt(this.props.firstRenderChapters.countChapter)) {
        let json = {
          novelId: that.uuid,
          num: that.number + 2
        }
        Request.post(`/chapters`, json)
          .then((data) => {
            chapterInfo = data.response
            that.number = that.number + 1
            const arr = that.getContent(chapterInfo.content)
            that._concatData(arr)
          })
      }
      else {
        this.a = 0
      }

      // if (this.number + 2 < parseInt(this.props.firstRenderChapters.countChapter)) {
      //   console.log(1);
      //   this.a = this.count
      //   this.count += this.nextChapter * 375
      //   let json = {
      //     novelId: that.uuid,
      //     num: that.number + 2
      //   }
      //   Request.post(`/chapters`, json)
      //     .then((data) => {
      //       chapterInfo = data.response
      //       that.number = that.number + 1
      //       const arr = that.getContent(chapterInfo.content)
      //       that._concatData(arr)
      //     })
      // }
      // else {
      //   console.log(2);
      //   this.a = this.count
      //   that.number = that.number + 1
      //   this.count += this.currentChapter * 375
      // }

    }

    if (x < 0 && this.number === 0) {
        alert('已是第一页')
    }


    if (x < 0) {
      this.i = 1
      let json = {
        novelId: that.uuid,
        num: that.number - 1
      }
      Request.post(`/chapters`, json)
        .then((data) => {
          chapterInfo = data.response
          that.number = that.number - 1
          let content = that.nbsp2Space(chapterInfo.content)
          let _arr = Util.handleContent(content)
          that.currentChapter = _arr.length
          that.nextChapter = that.currentChapter
          _arr.forEach( function(_item) {
            let _chapterInfo = {
              title: chapterInfo.title,
              num: chapterInfo.number,
              content: _item
            }
            arr.push(_chapterInfo)
          })
          that.setState({searching: true})
          that._unshiftData(arr)
        })
    }
  }

  renderListView () {
    return(
      <ListView
        enableEmptySections
        horizontal={true}
        pagingEnabled={true}
        initialListSize={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        dataSource={this.state.dataSource.cloneWithRows(this._data)}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }

  // List() {
  //   return Object.keys(this.props.firstRenderChapters).map(key => this.props.firstRenderChapters[key])
  // }

  loading() {
    return(
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: Util.size.height,width: tabWidth}}
          activeOpacity={1}
          onPress={ () => this.show() }
        >
          <Text>searching...</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderContent(rowData) {
    return(
      <View style={styles.container} >
        <View style={styles.top}>
          <Text style={styles.chapterName}>
            {rowData.title}
          </Text>
        </View>
        <View style={styles.chapterContent}>
          {rowData.content ? rowData.content.map((value, index,chapterContent) => {
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
            {rowData.num}/1022
          </Text>
        </View>
      </View>

    )
  }

  renderRow (rowData, sectionID, rowID, highlightRow) {
    return(
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
        style={{height: Util.size.height,width: tabWidth}}
        activeOpacity={1}
        onPress={ () => this.show() }>
          {this.renderContent(rowData)}
        </TouchableOpacity>
       </View>
    )
  }
  // {this.state.searching ? this.loading() : this.renderContent(rowData)}
  render() {
    return(
      <View style={styles.container} >
          <ScrollView
            ref='scrollView'
            scrollEventThrottle={800}
            horizontal={true}
            onScroll={(e)=>this.handleScroll(e)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true} 
          >
            {this.state.searching ? this.loading() : this.renderListView()}
          </ScrollView>
          { this.state.hide ? null : this.showReaderOptions() }
      </View>
    );
  }

  componentWillUnmount() {
    if (this.a !== 0) {
      this.a = this.a + 375
    }

    // if (this.i === 1) {
    //   this.a = this.a + 750
    // }

    const json = {
      novel: {
        id: this.uuid,
        num: this.number,
        x: this.x - this.a
      }
    }

    AsyncStorage.getItem('userToken')
      .then((token) => {
        Request.post(`/bookshelfs/change`, json, token)
          .then((res) => {
            return true
          })
      })
      .catch( (e) => {
        console.log(e);
      })
      // this.props.firstRenderChapters = {}
  }

  // {this.state.searching ? this.loading() : this.renderListView()}
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
          onPress={ () => { this.goBack() } }>
            <Image style={styles.backImg} source={require('../imgs/back.png')} />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
        style={{height: Util.size.height - 140}}
        onPress={this.iknow.bind(this)}>
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
    firstRenderChapters: state.firstRenderChapters,
    directory: state.directory,
    chapterInfo: state.chapterInfo,
    navigationParams: state.navigationParams,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
