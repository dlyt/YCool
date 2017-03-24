/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
import Dimensions from 'Dimensions';
import React, { Component } from 'react';
import {
  PixelRatio,
  ActivityIndicatorIOS
  } from 'react-native';


module.exports = {
  navigationHeight: 44,
  navigationBarBGColor:'#3497FF',
  statusBarHeight: 20,
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  handleContent: function(content) {
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
  },
  /**
   * 基于fetch的get方法
   * @method post
   * @param {string} url
   * @param {function} callback 请求成功回调
   */
  get: function(url, successCallback, failCallback){
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        failCallback(err);
      });
  },
  /*loading效果*/
  loading: <ActivityIndicatorIOS color="#3E00FF" style={{marginTop:40}}/>
};
