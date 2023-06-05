# Location-based WebAR

## Notes

1. 版本問題 [Location based example not working on Android #538](https://github.com/AR-js-org/AR.js/issues/538)
2. Needs https to test camera and GPS locally. [How to enable HTTPS on live server (Visual Studio Code)](https://medium.com/webisora/how-to-enable-https-on-live-server-visual-studio-code-5659fbc5542c)

```shell
openssl genrsa -aes256 -out localhost.key 2048  
openssl req -days 365 -new -newkey rsa:2048 -key localhost.key -x509 -out localhost.pem 
```