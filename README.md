# Location-based WebAR

展示 location-based WebAR，內容如下：  
* 畫面中箭頭一直指向使用者的目的地  
* 有一個 location marker 標示目的地  
* 地圖標示使用者目前位置，及目的地位置
* 計算使用者和目的地的距離


使用第三方套件主要有：  
* [A-FRAME](https://aframe.io/) for 3D 物件渲染
* [AR.js]([https://ar-js-org.github.io/AR.js-Docs/](https://ar-js-org.github.io/AR.js-Docs/location-based/)) for location-based AR
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript?hl=zh-tw) for 地圖顯示

## 執行
* 因為有用到 camera，所以需要 https 才可以執行
* Local 測試可以參考 Note 第二點
* 目前有開 Github Pages，連結在[這裡](https://osensetech.github.io/location-based-webar/) 

## Notes

1. 版本問題 [Location based example not working on Android #538](https://github.com/AR-js-org/AR.js/issues/538)
2. Needs https to test camera and GPS locally. [How to enable HTTPS on live server (Visual Studio Code)](https://medium.com/webisora/how-to-enable-https-on-live-server-visual-studio-code-5659fbc5542c)

```shell
openssl genrsa -aes256 -out localhost.key 2048  
openssl req -days 365 -new -newkey rsa:2048 -key localhost.key -x509 -out localhost.pem 
```
