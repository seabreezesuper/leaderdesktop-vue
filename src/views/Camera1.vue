<!-- 组件说明 -->
<template>
  <div class="main">
    <div id="mask"><img src="@/assets/img/AandB-transparent.gif" /></div>
    <tr>
      <video id="video" width="576" height="324" autoplay></video>
      <canvas id="canvas" width="300" height="300"></canvas>
    </tr>
    <tr>
      <button id="rec" @click="onBtnRecordClicked">Record</button>
      <button id="Snapshot" @click="onBtnSnapshotClicked">Snapshot</button>
      <button id="Face Scan" @click="onBtnFaceScanClicked">Face Scan</button>
      <button id="stop" @click="onBtnStopClicked" disabled>Stop</button>
      <span>{{ name }}</span>
    </tr>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      mediaStreamTrack: "",
      dashedRectWidth: 300,
      dashedRectHeight: 300,
      cameraWidth: 576,
      cameraHeight: 324,
      name: "",
    };
  },
  computed: {},
  methods: {
    onBtnRecordClicked() {
      var _this = this;
      var recBtn = document.querySelector("button#rec");
      var stopBtn = document.querySelector("button#stop");
      var video = document.getElementById("video");

      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            _this.mediaStreamTrack =
              typeof stream.stop === "function"
                ? stream
                : stream.getTracks()[1];
            video.srcObject = stream;
            _this.video = video;
            video.play();

            // 遮罩框随视频播放而显示
            video.oncanplaythrough = function() {
              var mask = document.getElementById("mask");
              mask.style.display = "block";
            };

            // 动画层

            recBtn.disabled = true;
            stopBtn.disabled = false;
          });
      }
    },
    onBtnStopClicked() {
      var recBtn = document.querySelector("button#rec");
      var stopBtn = document.querySelector("button#stop");

      // mediaRecorder.stop();
      this.mediaStreamTrack.stop();
      // _this.video.stop();

      // 隐藏遮罩框
      var mask = document.getElementById("mask");
      mask.style.display = "none";

      recBtn.disabled = false;
      stopBtn.disabled = true;
    },
    onBtnSnapshotClicked() {
      var _this = this;
      window.setInterval(function() {
        var video = document.getElementById("video");
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        var cw = _this.cameraWidth;
        var ch = _this.cameraHeight;
        var dw = _this.dashedRectWidth;
        var dh = _this.dashedRectHeight;

        context.drawImage(
          video,
          ((cw - dw) / 2) * 1.13,
          ((ch - dh) / 2) * 1.13,
          dw * 1.12,
          dh * 1.12,
          0,
          0,
          dw,
          dh
        );

        var param = new FormData();
        var src = canvas.toDataURL("image/png"); //这里转成的是base64的地址，直接用到img标签的src是可以显示图片的
        var blob = _this.dataURItoBlob(src);
        param.append("file", blob);

        // axios提交数据
        _this
          .axios({
            method: "post",
            url: "/snapshot",
            data: param,
          })
          .then((res) => {
            _this.name = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
    onBtnFaceScanClicked() {
      var _this = this;
      var count = 0;
      var timer = window.setInterval(function() {
        var video = document.getElementById("video");
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        var cw = _this.cameraWidth;
        var ch = _this.cameraHeight;
        var dw = _this.dashedRectWidth;
        var dh = _this.dashedRectHeight;

        context.drawImage(
          video,
          ((cw - dw) / 2) * 1.13,
          ((ch - dh) / 2) * 1.13,
          dw * 1.12,
          dh * 1.12,
          0,
          0,
          dw,
          dh
        );

        var param = new FormData();
        var src = canvas.toDataURL("image/png"); //这里转成的是base64的地址，直接用到img标签的src是可以显示图片的
        var blob = _this.dataURItoBlob(src);
        param.append("file", blob);
        param.append("number", count);

        // axios提交数据
        _this
          .axios({
            method: "post",
            url: "/faceScan",
            data: param,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        count++;

        if (count == 200) {
          clearInterval(timer);
          alert("人脸扫描结束！");
        }
      }, 100);
    },
    dataURItoBlob(dataURI) {
      // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
      // blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
      // console.log(dataURI);

      // atob()方法用于解码使用 base-64 编码的字符串。
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    },
    strokeDashedRect(ctx, x1, y1, x2, y2, dashLength) {
      this.drawDashLine(ctx, x1, y1, x1, y2, dashLength); //左边框
      this.drawDashLine(ctx, x1, y1, x2, y1, dashLength); //上边框
      this.drawDashLine(ctx, x2, y1, x2, y2, dashLength); //右边框
      this.drawDashLine(ctx, x1, y2, x2, y2, dashLength); //下边框
    },
    drawDashLine(ctx, x1, y1, x2, y2, dashLength) {
      //ctx 声明的canvas对象
      //x1,y1,x2,y2 起终点坐标
      //dashLength设置虚线中每一段的长度
      var dashLen = dashLength === undefined ? 5 : dashLength,
        xpos = x2 - x1, //得到横向的宽度;
        ypos = y2 - y1, //得到纵向的高度;
        numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
      //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
      for (var i = 0; i < numDashes; i++) {
        if (i % 2 === 0) {
          ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
          //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
        } else {
          ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
        }
      }
      ctx.stroke();
    },
  },
  mounted() {
    var cw = this.cameraWidth;
    var ch = this.cameraHeight;
    var dw = this.dashedRectWidth;
    var dh = this.dashedRectHeight;
    var mask = document.getElementById("mask");
    mask.style.top = (ch - dh) / 2 + "px";
    mask.style.left = (cw - dw) / 2 + "px";
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style>
.main {
  text-align: center;
}

canvas {
  border: 1px solid red;
}

#mask {
  top: 0px;
  left: 0px;
  width: 300px;
  height: 300px;
  border: 3px dashed red;
  position: absolute;
  animation: 3s grad infinite;
  display: none;
}

@keyframes rainbow {
  0% {
    background: #c00;
  }
  50% {
    background: orange;
  }
  100% {
    background: yellowgreen;
  }
}

@keyframes grad {
  0% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.20),
      rgba(0, 255, 0, 0.15),
      rgba(0, 255, 0, 0.10),
      rgba(0, 255, 0, 0)
    );
  }
  5% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.20),
      rgba(0, 255, 0, 0.15),
      rgba(0, 255, 0, 0.10)
    );
  }
  10% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.20),
      rgba(0, 255, 0, 0.15)
    );
  }
  15% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.20)
    );
  }
  20% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.25)
    );
  }
  25% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.30)
    );
  }
  30% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.35)
    );
  }
  35% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.20),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.40)
    );
  }
  40% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.15),
      rgba(0, 255, 0, 0.20),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.45)
    );
  }
  45% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0.10),
      rgba(0, 255, 0, 0.15),
      rgba(0, 255, 0, 0.20),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.65),
      rgba(0, 255, 0, 0.50)
    );
  }
  50% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0.10),
      rgba(0, 255, 0, 0.15),
      rgba(0, 255, 0, 0.20),
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0.30),
      rgba(0, 255, 0, 0.35),
      rgba(0, 255, 0, 0.40),
      rgba(0, 255, 0, 0.45),
      rgba(0, 255, 0, 0.50),
      rgba(0, 255, 0, 0.55)
    );
  }
  100% {
    background-image: linear-gradient(
      to right,
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0),
      rgba(0, 255, 0, 0)
    );
  }
}

span {
  color: white;
}
</style>
