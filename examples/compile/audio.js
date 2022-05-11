const Audio = document.querySelector("#audio");
const contorl = document.querySelector("#control");
const contorlDot = document.querySelector("#control-dot");
const contorlProgress = document.querySelector("#control-progress");
const contorlProgressBox = document.querySelector("#progress");
const current = document.querySelector("#current");
const duration = document.querySelector("#duration");

// 工具函数
// 时分秒转换
function transTime(value) {
  var time = "";
  var h = parseInt(`${value / 3600}`);
  value %= 3600;
  var m = parseInt(`${value / 60}`);
  var s = parseInt(`${value % 60}`);
  if (h > 0) {
    time = formatTime(h + ":" + m + ":" + s);
  } else {
    time = formatTime(m + ":" + s);
  }

  return time;
}
// 补零
function formatTime(value) {
  var time = "";
  var s = value.split(":");
  var i = 0;
  for (; i < s.length - 1; i++) {
    time += s[i].length === 1 ? "0" + s[i] : s[i];
    time += ":";
  }
  time += s[i].length === 1 ? "0" + s[i] : s[i];

  return time;
}
// 鼠标按下
contorlDot.addEventListener("mousedown", down, false);
contorlDot.addEventListener("touchstart", down, false);

// 开始拖动
document.addEventListener("mousemove", move, false);
document.addEventListener("touchmove", move, false);

// 拖动结束
document.addEventListener("mouseup", end, false);
document.addEventListener("touchend", end, false);

const position = {
  oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
  oriX: 0, // 移动开始时的x坐标
  maxLeft: 0, // 向左最大可拖动距离
  maxRight: 0, // 向右最大可拖动距离
};
let flag = false; // 标记是否拖动开始

const down = (event) => {
  if (!Audio.pause || Audio.currentTime !== 0) {
    flag = true;

    position.oriOffestLeft = contorlDot.offsetLeft;
    position.oriX = event.touches ? event.touches[0].clientX : event.clientX;
    // 要同时适配mousedown和touchstart事件
    position.maxLeft = position.oriOffestLeft;
    // 向左最大可拖动距离
    position.maxRight = contorlProgressBox.offsetWidth - position.oriOffestLeft; // 向右边最大可拖动距离

    if (event && event.preventDefault) event.preventDefault();
    else event.returnValue = false;

    if (event && event.stopPropagation) event.stopPropagation();
    else window.event.cancelBubble = true;
  }
};
const move = (event) => {
  if (flag) {
    let clientX = event.touches ? event.touches[0].clientX : event.clientX;
    let length = clientX - position.oriX;
    if (length > position.maxRight) {
      length = position.maxRight;
    } else if (length < -position.maxLeft) {
      length = -position.maxLeft;
    }

    let pgsWidth = parseFloat(
      window.getComputedStyle(contorlProgressBox, null).width.replace("px")
    );

    let rate = (position.oriOffestLeft + length) / pgsWidth;

    Audio.currentTime = Audio.duration * rate;
  }
};

const end = () => {
  flag = false;
};
