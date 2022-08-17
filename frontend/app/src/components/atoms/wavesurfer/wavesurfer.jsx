import WaveSurfer from "wavesurfer.js";
import { useRef, useEffect, useState, useContext, useCallback } from "react";
// import Waveform from "./Waveform";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import MarkersPlugin from "wavesurfer.js/src/plugin/markers";
import Select from "react-select";
import { useKey } from "rooks";
import { Location, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { WidthChanger } from "../../../templates/WidthChanger";
import { AuthContext } from "../../../App";
{
  /* <script src="https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js" type="text/javascript"></script>  */
}

const LocationChange = (callback) => {
  const refCallback = useRef();
  const location = useLocation();

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  // ロケーションに変更があったときに処理実行
  useEffect(() => {
    if (refCallback.current) {
      refCallback.current(location);
    }
  }, [location]);
};

export default LocationChange;

export function WSF() {
  const [regionSwitch, setRegionSwitch] = useState(true);

  const [enabled, setEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);

  const onExit = () => {
    setEnabled(false);
  };
  const steps = [
    {
      element: "#file",
      intro:
        "使用したい音声ファイルを選択してください。（最大でも200Mバイトまで）",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element: "#region",
      intro:
        "区域内でループ再生ができます。範囲を移動・拡大縮小することができ、ボタンでOn/Offにできます。",
      position: "bottom",
    },
    {
      element: "#slider",
      intro: "波形の長さを調整できます。",
      position: "right",
    },
    {
      element: "#skipBack",
      intro:
        "5秒巻き戻しできます。さらに、キーボードの「左カーソル（<）」でも操作できます。",
      position: "right",
    },
    {
      element: "#playPause",
      intro:
        "再生・停止ができます。さらに、キーボードの「コントロールキー（ctrl）」でも操作できます。",
      position: "right",
    },
    {
      element: "#skipForward",
      intro:
        "5秒早送りできます。さらに、キーボードの「右カーソル（>）」でも操作できます。",
      position: "right",
    },
    {
      element: "#speed",
      intro: "再生速度を変更できます。",
      position: "right",
    },
    {
      element: "#text",
      intro: "文字を入力できます。",
      position: "right",
    },
  ];

  function handleRegion(e) {
    if (regionSwitch) {
      console.log(waveformRef.current);
      // WaveSurfer.remove();
      waveformRef.current.clearRegions();
      // RegionsPlugin.clear();
    } else {
      waveformRef.current.addRegion({
        start: 5,
        end: 7,
        loop: true,
        color: "hsla(200, 50%, 70%, 0.4)",
      });
    }
    setRegionSwitch(!regionSwitch);
    console.log(regionSwitch);

    // }, []);
  }

  const options = [
    { value: "0.5", label: "0.5" },
    { value: "0.75", label: "0.75" },
    { value: "1.0", label: "1.0" },
    { value: "1.25", label: "1.25" },
    { value: "1.5", label: "1.5" },
    { value: "1.75", label: "1.75" },
    { value: "2.0", label: "2.0" },
  ];

  function skipBackward() {
    // console.log(waveformRef.current.Prototype.skipBackward(5))
    // waveformRef.current.prototype.stop();
    waveformRef.current.skipBackward(5);
    console.log(waveformRef.current);
  }

  function KeyEventListener() {
    useKey(["Control"], handlePlayPause);
    useKey(["ArrowLeft"], skipBackward);
    useKey(["ArrowRight"], skipForward);
  }

  function skipForward() {
    waveformRef.current.skipForward(5);
  }

  function playbackRate(value) {
    console.log(value);
    console.log(value.value);
    console.log(waveformRef.current.Backend.prototype.setPlaybackRate);
    // WebAudio.setPlaybackRate(2.0)
    switch (value.value) {
      case 0.5:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 0.75:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 1.25:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 1.5:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 1.75:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 2.0:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      default:
        waveformRef.current.setPlaybackRate(value.value);
        // waveformRef.current.Backend.prototype.setPlaybackRate(value.value);

        console.log(waveformRef.current.setPlaybackRate);
        // console.log(waveformRef.current.Backend.prototype.setPlaybackRate(value.value));
        console.log(value.value);
        break;
    }
  }

  const waveformRef = useRef(null);
  var context = null;
  console.log(waveformRef);

  const handlePlayPause = () => {
    waveformRef.current.playPause();
    console.log("handlePlayPause");
  };
  //  const toggleTimeline = useCallback(() => {
  //   setTimelineVis(!timelineVis);
  // }, [timelineVis]);

  const handleChangeFile = (e) => {
    if (context == null) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();

      waveformRef.current = WaveSurfer.create({
        container: waveformRef.current,
        audioContext: context,
        barRadius: 3,
        cursorWidth: 1,
        height: 230,
        barMinHeight: 1,
        barGap: 1,
        waveColor: "gray",
        progressColor: "orange",
        scrollParent: true,
        backend: "MediaElementWebAudio",
        plugins: [
          RegionsPlugin.create({
            regions: [
              {
                start: 5,
                end: 7,
                loop: true,
                color: "hsla(200, 50%, 70%, 0.4)",
              },
            ],
          }),
        ],
      });
      var slider = document.querySelector("#slider");

      slider.oninput = function () {
        var zoomLevel = Number(slider.value);
        waveformRef.current.zoom(zoomLevel);
      };
      console.log(waveformRef);
    }

    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      // const corsAudio = new Audio(fileUrl);
      // corsAudio.crossOrigin = true;
      // console.log(corsAudio)
      // corsAudio.crossOrigin = true;
      // WaveSurfer.load(corsAudio);
      // waveformRef.current.load(corsAudio);
      //  const fileUrl = URL.createObjectURL(corsAudio)

      // const fileUrl = URL.createObjectURL(file)
      waveformRef.current.load(fileUrl);
      // console.log(fileUrl)
      console.log(waveformRef);
    }
  };

  return (
    <div>
      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
      />
      <div ref={waveformRef}></div>
      <Input
        id="file"
        type="file"
        accept="audio/*"
        onChange={(e) => handleChangeFile(e)}
      />
      <KeyEventListener />
      <Button
        id="region"
        color="primary"
        onClick={(regionSwitch) => handleRegion(regionSwitch)}
      >
        区域内ループ再生On/Off
      </Button>
      <input id="slider" type="range" min="1" max="100" />
      <Button id="skipBack" onClick={() => skipBackward()}>
        5秒戻る
      </Button>
      <Button id="playPause" color="primary" onClick={handlePlayPause}>
        スタート/ストップ
      </Button>
      <Button id="skipForward" onClick={() => skipForward()}>
        5秒進む
      </Button>
      <Select
        id="speed"
        options={options}
        onChange={(value) => playbackRate(value)}
        placeholder="再生速度を変更できます"
      />
      <TextField
        id="text"
        multiline={true}
        rows="5"
        fullWidth
        placeholder="ここに文字を入力できます"
      />
      <Button
        onClick={() => {
          setEnabled(true);
        }}
      >
        <QuestionMarkIcon />
        使い方
      </Button>
    </div>
    // <>
    //   <Container maxWidth="xl">

    //       <div ref={waveformRef}></div>

    //       <Button onClick={(e) => handleChangeFile(e)}>ロード</Button>
    //       {/* <Button onClick={handlePlayPause}>スタート/ストップ</Button> */}
    //       {/* <Outlet />  */}
    //       <KeyEventListener />
    //     <Button color="primary" onClick={(regionSwitch) => handleRegion(regionSwitch)}>区域内ループ再生On/Off</Button>
    //     <input id="slider" type="range" min="1" max="100" />
    //     <Button onClick={() => skipBackward()}>5秒戻る</Button>
    //     {/* <button onClick={handlePlayPause}>Play/Pause</button> */}
    //     <Button color="primary" onClick={handlePlayPause}>スタート/ストップ</Button>
    //     <Button onClick={() => skipForward()}><i class="fa fa-step-forward"></i>5秒進む</Button>
    //     <Select options={options} onChange={(value)=>playbackRate(value)} placeholder="再生速度を変更できます"/>
    //     {/* <textarea rows="10" cols="50" placeholder="ここに文字を入力出来ます"></textarea> */}
    //     <TextField multiline="true" rows="5" fullWidth="true" placeholder="ここに文字を入力できます" />
    //   </Container>
    // </>
  );
}
// ###########################################
export function WSF_stock(p_file) {
  const waveformRef = useRef(null);
  var context = null;

  // const [switchSP, setSwitchSP] = useState(false)

  const [enabled, setEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);

  const onExit = () => {
    setEnabled(false);
  };
  const steps = [
    {
      element: "#load",
      intro:
        "クリックで保存した音声を読み込みます。最初にクリックをお願いいたします。",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element: "#region",
      intro:
        "区域内でループ再生ができます。範囲を移動・拡大縮小することができ、ボタンでOn/Offにできます。",
      position: "bottom",
    },
    {
      element: "#slider",
      intro: "波形の長さを調整できます。",
      position: "right",
    },
    {
      element: "#skipBack",
      intro:
        "5秒巻き戻しできます。さらに、キーボードの「左カーソル（<）」でも操作できます。",
      position: "right",
    },
    {
      element: "#playPause",
      intro:
        "再生・停止ができます。さらに、キーボードの「コントロールキー（ctrl）」でも操作できます。",
      position: "right",
    },
    {
      element: "#skipForward",
      intro:
        "5秒早送りできます。さらに、キーボードの「右カーソル（>）」でも操作できます。",
      position: "right",
    },
    {
      element: "#speed",
      intro: "再生速度を変更できます。",
      position: "right",
    },
    {
      element: "#text",
      intro: "文字を入力できます。",
      position: "right",
    },
    {
      element: "#answer",
      intro: "クリックで保存した答えを表示できます。。",
      position: "right",
    },
  ];

  const { onPlaying, setOnPlaying } = useContext(AuthContext);
  const [showTheAnswer, setShowTheAnswer] = useState(false);

  const handlePlayPause = () => {
    // waveformRef.current.playPause();
    // console.log("handlePlayPause")
    if (onPlaying === false) {
      waveformRef.current.play();
      setOnPlaying(true);
    } else if (onPlaying === true) {
      console.log(waveformRef.current);
      waveformRef.current.pause();
      setOnPlaying(false);
    }

    console.log(onPlaying);
  };
  console.log(onPlaying);

  // const { onPlaying, setOnPlaying } = useContext(AuthContext);
  // useLocationChange((location) => {
  //   console.log(location.pathname)
  //   window.location.reload();
  // })
  console.log(onPlaying);
  const [regionSwitch, setRegionSwitch] = useState(true);

  function handleRegion(e) {
    if (regionSwitch) {
      console.log(waveformRef.current);
      // WaveSurfer.remove();
      waveformRef.current.clearRegions();
      // RegionsPlugin.clear();
    } else {
      waveformRef.current.addRegion({
        start: 5,
        end: 7,
        loop: true,
        color: "hsla(200, 50%, 70%, 0.4)",
      });
    }
    setRegionSwitch(!regionSwitch);
    console.log(regionSwitch);

    // }, []);
  }

  const options = [
    { value: "0.5", label: "0.5" },
    { value: "0.75", label: "0.75" },
    { value: "1.0", label: "1.0" },
    { value: "1.25", label: "1.25" },
    { value: "1.5", label: "1.5" },
    { value: "1.75", label: "1.75" },
    { value: "2.0", label: "2.0" },
  ];

  function skipBackward() {
    // console.log(waveformRef.current.Prototype.skipBackward(5))
    // waveformRef.current.prototype.stop();
    waveformRef.current.skipBackward(5);
    console.log(waveformRef.current);
  }

  function KeyEventListener() {
    useKey(["Control"], handlePlayPause);
    useKey(["ArrowLeft"], skipBackward);
    useKey(["ArrowRight"], skipForward);
  }

  function skipForward() {
    waveformRef.current.skipForward(5);
  }

  function playbackRate(value) {
    console.log(value);
    console.log(value.value);
    console.log(waveformRef.current.Backend.prototype.setPlaybackRate);
    // WebAudio.setPlaybackRate(2.0)
    switch (value.value) {
      case 0.5:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 0.75:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 1.25:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 1.5:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 1.75:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      case 2.0:
        waveformRef.current.Backend.prototype.setPlaybackRate(value.value);
        console.log(value.value);
        break;
      default:
        waveformRef.current.setPlaybackRate(value.value);
        // waveformRef.current.Backend.prototype.setPlaybackRate(value.value);

        console.log(waveformRef.current.setPlaybackRate);
        // console.log(waveformRef.current.Backend.prototype.setPlaybackRate(value.value));
        console.log(value.value);
        break;
    }
  }

  // const waveformRef = useRef(null);
  //    var context = null;
  //    console.log(waveformRef)

  //    const handlePlayPause = () => {
  //      waveformRef.current.playPause();
  //      console.log("handlePlayPause")
  //    }

  // useEffect(() => {
  //   handleGetLearningMaterials()
  // }, [])
  const { state } = useLocation();

  // バグで動いている可能性があるため、今後改善
  useEffect(() => {
    if (onPlaying === true) {
      console.log(onPlaying);

      window.history.pushState({}, "", window.location.href);
      // window.history.pushState(null, null, window.location.href);
      window.addEventListener("popstate", (e) => {
        // alert('ブラウザバックを使わないでください。');
        // window.location.reload();
        handlePlayPause();
        // waveformRef.current.pause()
        // setOnPlaying(false)
        // window.history.go(-1);
        // if (onPlaying===false) {
        //   window.history.go(-2);
        // }
        console.log(onPlaying);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPlaying]);

  // useCallback(handlePlayPause, [onPlaying])
  //   useEffect(() => {
  //   // 音声が再生されている最中は、ブラウザバックを禁止する

  //   window.history.pushState(null, null, window.location.href);
  //   window.addEventListener('popstate', (e) => {
  //     // alert('ブラウザバックを使わないでください。');
  //     // window.location.reload();
  //     handlePlayPause();
  //     // window.history.go(-1);

  //     // console.log(1)
  //   });
  // })
  // window.history.pushState(window.location.href);
  // useEffect(() => {
  //   handleGetLearningMaterials()
  // }, [])

  console.log(window.history);

  const handleChangeFile = (e) => {
    if (context == null) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();

      waveformRef.current = WaveSurfer.create({
        container: waveformRef.current,
        audioContext: context,
        barRadius: 3,
        cursorWidth: 1,
        height: 230,
        barMinHeight: 1,
        barGap: 1,
        waveColor: "gray",
        progressColor: "orange",
        scrollParent: true,
        // backend: 'MediaElementWebAudio',
        backend: "MediaElement",
        plugins: [
          RegionsPlugin.create({
            regions: [
              {
                start: 5,
                end: 7,
                loop: true,
                color: "hsla(200, 50%, 70%, 0.4)",
              },
            ],
          }),
        ],
      });
      console.log(waveformRef);
      console.log(p_file);
      console.log(state.state);
      console.log(state.state.file);

      // const NewFile = new File([state.state.file], state.state.body);
      // console.log(NewFile);
      // const corsAudio = new Audio(NewFile);
      const corsAudio = new Audio(state.state.file.url);
      // waveformRef.current.loadBlob(state.state.file);
      waveformRef.current.load(corsAudio);

      var slider = document.querySelector("#slider");

      slider.oninput = function () {
        var zoomLevel = Number(slider.value);
        waveformRef.current.zoom(zoomLevel);
      };
      console.log(waveformRef);
    }
    // LocationChange((location) => {
    //   console.log(location.pathname)
    //   window.location.reload();
    // })
    // setOnPlaying(true);
    // console.log(onPlaying)
  };
  return (
    <>
      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
      />
      <Container maxWidth={"xl"}>
        <div ref={waveformRef}></div>

        <Button id="load" size="large" onClick={(e) => handleChangeFile(e)}>
          ロード
        </Button>
        {/* <Button onClick={handlePlayPause}>スタート/ストップ</Button> */}
        {/* <Outlet />  */}
        <KeyEventListener />
        <Button
          id="region"
          sx={{ margin: 1 }}
          size="large"
          color="primary"
          onClick={(regionSwitch) => handleRegion(regionSwitch)}
        >
          区域内ループ再生On/Off
        </Button>
        <input id="slider" type="range" min="1" max="100" />
        <Button
          id="skipBack"
          sx={{ margin: 1 }}
          size="large"
          onClick={() => skipBackward()}
        >
          5秒戻る
        </Button>
        {/* <button onClick={handlePlayPause}>Play/Pause</button> */}
        <Button
          id="playPause"
          sx={{ margin: 1 }}
          size="large"
          color="primary"
          onClick={handlePlayPause}
        >
          スタート/ストップ
        </Button>
        <Button
          id="skipForward"
          sx={{ margin: 1 }}
          size="large"
          onClick={() => skipForward()}
        >
          5秒進む
        </Button>
        <Select
          id="speed"
          options={options}
          onChange={(value) => playbackRate(value)}
          placeholder="再生速度を変更できます"
        />
        {/* <textarea rows="10" cols="50" placeholder="ここに文字を入力出来ます"></textarea> */}
        <TextField
          id="text"
          multiline={true}
          rows="5"
          fullWidth
          placeholder="ここに文字を入力できます"
        />

        <WidthChanger>
          <Button
            id="answer"
            onClick={() =>
              showTheAnswer ? setShowTheAnswer(false) : setShowTheAnswer(true)
            }
          >
            答えを見る
          </Button>
          {showTheAnswer ? <h4>{state.state.answer}</h4> : <h4>答え</h4>}
        </WidthChanger>
        <Button
          onClick={() => {
            setEnabled(true);
          }}
        >
          <QuestionMarkIcon />
          使い方
        </Button>
      </Container>
    </>
  );
}
