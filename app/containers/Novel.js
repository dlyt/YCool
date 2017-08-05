import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  PixelRatio,
  ScrollView,
  View,
  Image,
  Text,
  ListView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback
} from 'react-native'

import Swipeout from 'react-native-swipeout'

class Novel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      loaded: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
    this.closeSwipeout = this.closeSwipeout.bind(this)
  }

  componentWillMount() {
    this.props.getBookshelfFirst()
  }

  bookshelfLists() {
    return Object.keys(this.props.searchedBookshelves).map(key => this.props.searchedBookshelves[key])
  }

  closeSwipeout() {
    // console.log(this);
  }

  delectNovel(id) {
    this.props.delect(id).then(
      (res) => this.props.getBookshelf()
    )
  }

  renderRow(list) {
    const that = this
    var swipeoutBtns = [
      {
        text: '删除',
        onPress: () => {that.delectNovel(list._id)}
      }
    ]
    return (
      <Swipeout
      refs='Swipeout'
      key={list._id}
      right={swipeoutBtns}
      autoClose={true}
      backgroundColor={'#ffffff'}>
        <TouchableOpacity
           onPress={ () => this.props.navigate({ key: 'Reader', id: list.novel._id, name: list.novel.name}) }
           style={[styles.item, styles.row]}>
          <View style={styles.left}>
            <Image style={styles.img} source={{uri: list.novel.img}} resizeMode="contain" />
          </View>
          <View >
            <Text style={styles.novelTitle}>{list.novel.name}</Text>
            <Text style={styles.text}>最新: {list.novel.lastChapterTitle}</Text>
            <View style={styles.row}>
              <Image style={styles.clock} source={require('../imgs/clock.png')} resizeMode="contain" />
              <Text style={styles.duration}>{list.novel.updateTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }

  renderBookshelfLists(lists) {
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        <TouchableOpacity
          style={styles.scrollSection}
          onPress={this.closeSwipeout}>
          <ListView
              enableEmptySections
              dataSource={this.state.dataSource.cloneWithRows(lists)}
              renderRow={this.renderRow.bind(this)} />
        </TouchableOpacity>
      </ScrollView>
    );
  }

   _onRefresh() {
    this.setState({isRefreshing: true});
    this.props.getBookshelfFirst()
    this.setState({
      loaded: this.state.loaded + 10,
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    });
  }

  render() {
    const lists = this.bookshelfLists()
    return (
      <View style={styles.scene}>
        <View style={styles.nav}>
          <View style={[styles.button]}>
            <TouchableOpacity style={styles.button} >
            </TouchableOpacity>
          </View>
          <View style={[styles.title]}>
            <Text style={styles.titleText}>Y酷小说</Text>
          </View>
          <View style={[styles.button]}>
            <TouchableOpacity
              style={styles.button}
              onPress={ () => this.props.navigate({ key: 'Search'}) }>
              <Image source={require('../imgs/search.png')} style={styles.rightButton} />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderBookshelfLists(lists)}
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
    marginTop: -20
  },
  rightButton: {
    marginTop: 25,
    marginRight: 5,
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
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
  btnText: {
    fontSize: 16,
    marginRight: 10,
    color: '#ffffff',
  },
  item: {
    height: 92,
    borderBottomLeftRadius: 20,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#A5A5A5',
  },
  row:{
    flexDirection: 'row',
  },
  left: {
    marginTop: 10
  },
  img:{
    height: 70,
    width:90,
  },
  text:{
    color: '#A5A5A5',
    marginTop: 6,
    fontSize: 12,
  },
  clock: {
    marginTop: 8,
  },
  duration: {
    marginLeft: 4,
    color: '#A5A5A5',
    marginTop: 9  ,
    fontSize: 12,
  },
  novelTitle:{
    fontSize:16,
    marginTop: 10,
  },
});

function mapStateToProps(state) {
  return {
    searchedBookshelves: state.searchedBookshelves
  };
}

export default connect(mapStateToProps)(Novel);
