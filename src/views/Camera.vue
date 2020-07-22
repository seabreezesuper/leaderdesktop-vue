<!-- 组件说明 -->
<template>
  <div class="main">
    <div id="mask"></div>
    <tr>
      <video id="video" width="576" height="324" autoplay></video>
      <canvas id="canvas" width="300" height="50"></canvas>
    </tr>
    <tr>
      <button id="rec" @click="onBtnRecordClicked">Record</button>
      <button id="Snapshot" @click="onBtnSnapshotClicked">Snapshot</button>
      <button id="stop" @click="onBtnStopClicked" disabled>Stop</button>
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
      dashedRectHeight: 50,
      cameraWidth: 576,
      cameraHeight: 324,
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
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      var cw = this.cameraWidth;
      var ch = this.cameraHeight;
      var dw = this.dashedRectWidth;
      var dh = this.dashedRectHeight;

      context.drawImage(
        video,
        ((cw - dw) / 2)*1.13,
        ((ch - dh) / 2)*1.13,
        dw*1.12,
        dh*1.12,
        0,
        0,
        dw,
        dh
      );
      // context.strokeStyle = "#ffffff";
      // context.strokeRect(20,20,500,290);
      // this.drawDashLine(context,0,0,576,324,1);

      // this.strokeDashedRect(
      //   context,
      //   (cw - dw) / 2,
      //   (ch - dh) / 2,
      //   (cw - dw) / 2 + dw,
      //   (ch - dh) / 2 + dh,
      //   4
      // );
      // context.fillStyle = "rgba(255, 255, 255, 0.5)";
      // context.fillRect((cw - dw) / 2, (ch - dh) / 2, dw, dh);

      // context.rect((cw - dw) / 2, (ch - dh) / 2, dw, dh);
      // context.clip();

      var param = new FormData();
      var src = canvas.toDataURL("image/png"); //这里转成的是base64的地址，直接用到img标签的src是可以显示图片的
      var blob = this.dataURItoBlob(src);
      param.append("file", blob);

      // axios提交数据
      this.axios({
        method: "post",
        url: "/snapshot",
        data: param,
      })
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
    mask.style.top = (cw - dw) / 2  + "px";
    mask.style.left = (ch - dh) / 2  + "px";
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
  height: 50px;
  filter: alpha(opacity=80);
  opacity: 0.3;
  border: 3px dashed red;
  position: absolute;
  display: none;
}
</style>
