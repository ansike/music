/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-06-08 13:49:33
 * @LastEditTime: 2019-09-21 17:33:21
 */
// 使用 Web Audio API
const AudioContext = window.AudioContext
  || window.webkitAudioContext
  || window.mozAudioContext
  || window.oAudioContext
  || window.msAudioContext;

export const hasWebAudioAPI = {
  data: !!AudioContext && window.location.protocol.indexOf('http') !== -1,
};

export const music = {};
(() => {
  if (!hasWebAudioAPI.data) {
    return;
  }
  const url = './book.mp3';
  const context = new AudioContext();
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.responseType = 'arraybuffer';

  req.onload = (res) => {
    console.log(res);
    context.decodeAudioData(
      req.response,
      (buf) => {
        // 将拿到的audio解码转为buffer
        const getSource = () => {
          // 创建source源。
          const source = context.createBufferSource();
          source.buffer = buf;
          source.connect(context.destination);
          return source;
        };
        music.start = (start, length) => {
          if (length) {
            getSource().start(0, start, length);
          } else {
            getSource().start(0, start);
          }
        };
      },
      (error) => {
        if (window.console && window.console.error) {
          window.console.error(`音频: ${url} 读取错误`, error);
          hasWebAudioAPI.data = false;
        }
      },
    );
  };

  req.send();
})();
