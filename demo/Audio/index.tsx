import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  type StyleProp,
  type TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import ThemeText from '../../components/ThemeText';
import css from '../../styles/css';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProgressBar from '../../components/ProgressBar';
import ExampleCard from '../../components/ExampleCard';

// 播放列表
const trackList = [
  {
    id: 'track-1',
    url: 'https://down.ear0.com:3321/preview?soundid=43908&type=mp3',
    album: '漫步于海岸线',
    title: '漫步于海岸线',
    artist: 'Q紫小生',
    artwork: 'https://www.ear0.com/cache/sound_photo/0/43/150/327521_43908.jpg',
    duration: 167,
    durationStr: '02:47',
  },
  {
    id: 'track-2',
    url: 'https://freesound-down.audiodown.com:3321/preview?file=AL%2FHome+%E2%80%93+Feel+Good+Background+Music+%EF%BD%9C+Sakura+Girl.mp3',
    album: 'Home',
    title: 'Home',
    artist: 'Sakura Girl',
    artwork:
      'https://freesound-api.gongyier.com:3321/sound/data/photo?photo=AL%2F1a8ce05c18aa7dd70a2e3fd9a6558449.jpg',
    duration: 192,
    durationStr: '03:16',
  },
  {
    id: 'track-3',
    url: 'https://freesound-down.audiodown.com:3321/preview?file=FTUM%2F%5BNo+Copyright+Background+Music%5D+Happy+Fun+Feel+Good+Guitar+%EF%BD%9C+Tides+%26+Smiles+by+Moavii.mp3',
    album: 'Tides & Smiles',
    title: 'Tides & Smiles',
    artist: 'Moavii',
    artwork:
      'https://freesound-api.gongyier.com:3321/sound/data/photo?photo=FTUM%2Fce04da10304d34798c71986004e9ce9b.jpg',
    duration: 78,
    durationStr: '01:18',
  },
  {
    id: 'track-4',
    url: 'https://freesound-down.audiodown.com:3321/preview?file=BR%2FMelodic+Uplifting+EDM+Copyright+Free+Music+%EF%BD%9C+Do+You+See+Me+%5BBass+Rebels%5D.mp3',
    album: 'Do You See Me',
    title: 'Do You See Me',
    artist: 'Bass Rebels',
    artwork:
      'https://freesound-api.gongyier.com:3321/sound/data/photo?photo=BR%2F09309b9417414a9f63d3cabb546041ff.jpg',
    duration: 138,
    durationStr: '02:18',
  },
  {
    id: 'track-5',
    url: 'https://freesound-down.audiodown.com:3321/preview?file=FTUM%2F%5BNo+Copyright+Background+Music%5D+Casual+Chill+Funky+Vlog+Instrumental+%EF%BD%9C+Good+Times+by+Moavii.mp3',
    album: 'Good Times',
    title: 'Good Times',
    artist: 'Moavii',
    artwork:
      'https://freesound-api.gongyier.com:3321/sound/data/photo?photo=FTUM%2Fde7dda3a736c2ab9dca52970ba8984e1.jpg',
    duration: 106,
    durationStr: '01:46',
  },
];

const repeatModeMap = {
  [RepeatMode.Off]: '顺序播放',
  [RepeatMode.Track]: '单曲循环',
  [RepeatMode.Queue]: '列表循环',
};

// 跳转到指定歌曲
async function skipTo(next: number, play: boolean) {
  // 如果当前播放的歌曲就是next，则不进行任何操作
  const currentIndex = await TrackPlayer.getActiveTrackIndex();
  if (currentIndex !== undefined && currentIndex === next) return;

  // 停止正在播放的歌曲
  const playbackState = await TrackPlayer.getPlaybackState();
  if (playbackState.state === State.Playing) {
    await TrackPlayer.stop();
  }

  // 跳转到指定歌曲
  await TrackPlayer.skip(next);

  if (play) {
    // 播放指定歌曲
    await playTrack();
  } else {
    // 停止预加载
    // await TrackPlayer.stop();
  }
}

// 播放或暂停当前播放的歌曲
async function playTrack() {
  const playbackState = await TrackPlayer.getPlaybackState();
  if (playbackState.state === State.Error) {
    console.log('Error', playbackState.error.message);
    await TrackPlayer.retry();
  } else if (playbackState.state === State.Playing) {
    console.log('pause');
    await TrackPlayer.pause();
  } else if (
    playbackState.state === State.Ready ||
    playbackState.state === State.Paused ||
    playbackState.state === State.Stopped ||
    playbackState.state === State.Loading
  ) {
    console.log('play');
    await TrackPlayer.play();
  }
}

// 播放列表行组件
const RowText = ({
  style,
  isCurrent,
  text,
}: {
  style?: StyleProp<TextStyle>;
  isCurrent?: boolean;
  text: string;
}) => {
  return (
    <ThemeText
      style={[css.flex_1, css.font_16, isCurrent ? css.tomato : {}, style]}
    >
      {text}
    </ThemeText>
  );
};

// 播放进度组件
const AudioProgress = () => {
  const progress = useProgress();
  const [position, setPosition] = useState(progress.position || 0);
  const seeking = useRef(false);
  useEffect(() => {
    if (!seeking.current) {
      setPosition(progress.position || 0);
    }
  }, [progress.position]);

  const onChange = useCallback((value: number) => {
    seeking.current = true;
    setPosition(value);
    TrackPlayer.seekTo(value).finally(() => {
      seeking.current = false;
    });
  }, []);

  return (
    <ProgressBar
      max={progress.duration}
      current={position}
      buffered={progress.buffered || 0}
      onChange={onChange}
    />
  );
};

const ProgressInfo = () => {
  const progress = useProgress();

  return (
    <ThemeText style={[css.font_16, css.mt_16]}>
      progress: {JSON.stringify(progress, null, 2)}
    </ThemeText>
  );
};

export default function Demo() {
  // 播放器初始化
  useEffect(() => {
    TrackPlayer.setupPlayer({ autoHandleInterruptions: true })
      .then(async () => {
        await TrackPlayer.setQueue(trackList);
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SeekTo,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            // Capability.JumpForward,
            // Capability.JumpBackward,
          ],
        });
        // await TrackPlayer.stop(); // 停止预加载
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  const [loading, setLoading] = useState(true);
  const activeTrack = useActiveTrack();
  const playbackState = usePlaybackState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Off);

  // 监听当前播放的歌曲
  useEffect(() => {
    TrackPlayer.getActiveTrackIndex().then(index => {
      if (index !== undefined) {
        setCurrentIndex(index);
      }
    });
  }, [activeTrack]);

  return (
    <ScrollView contentContainerStyle={[css.p_16, css.gap_24]}>
      {loading ? (
        <ThemeText>加载中...</ThemeText>
      ) : (
        <>
          <View style={[css.flex_row, css.items_center, css.justify_between]}>
            <View style={[css.flex_row, css.items_center, css.gap_8]}>
              <Ionicons
                name="musical-notes-outline"
                size={24}
                color={css.light.color}
              />
              <ThemeText style={css.font_24}>播放列表</ThemeText>
            </View>
            <TouchableOpacity
              style={[css.flex_row, css.items_center, css.gap_4]}
              onPress={async () => {
                const mode = (repeatMode + 1) % 3;
                await TrackPlayer.setRepeatMode(mode);
                setRepeatMode(mode);
              }}
            >
              <Ionicons
                name="repeat-outline"
                size={22}
                color={css.light.color}
              />
              <ThemeText style={css.font_16}>
                {repeatModeMap[repeatMode]}
              </ThemeText>
            </TouchableOpacity>
          </View>
          <View style={css.gap_8}>
            <View style={[css.flex_row, css.pb_8, css.border_bottom]}>
              <RowText style={css.flex_1} text="#" />
              <RowText style={css.flex_4} text="乐曲" />
              <RowText style={css.flex_4} text="分享者" />
              <RowText style={css.flex_2} text="时长" />
            </View>
            {trackList.map((track, index) => (
              <TouchableOpacity
                key={track.id}
                activeOpacity={0.5}
                onPress={() => {
                  skipTo(index, playbackState.state === State.Playing);
                }}
              >
                <View style={css.flex_row}>
                  <RowText
                    style={css.flex_1}
                    isCurrent={index === currentIndex}
                    text={`${index + 1}`}
                  />
                  <RowText
                    style={css.flex_4}
                    isCurrent={index === currentIndex}
                    text={track.title}
                  />
                  <RowText
                    style={css.flex_4}
                    isCurrent={index === currentIndex}
                    text={track.artist}
                  />
                  <RowText
                    style={css.flex_2}
                    isCurrent={index === currentIndex}
                    text={track.durationStr}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[css.gap_16, css.flex_row, css.mt_16]}>
            <Image
              style={[css.bg_darkgray]}
              src={activeTrack?.artwork}
              width={128}
              height={128}
              resizeMode="contain"
            />
            <View style={[css.flex_1, css.gap_8]}>
              <ThemeText style={css.font_16}>
                曲 &nbsp;&nbsp; 名：{activeTrack?.title}
              </ThemeText>
              <ThemeText style={css.font_16}>
                分享者：{activeTrack?.artist}
              </ThemeText>
              <ThemeText style={css.font_16}>
                时 &nbsp;&nbsp; 长：{activeTrack?.durationStr}
              </ThemeText>
              <View
                style={[css.gap_16, css.flex_row, css.h_48, css.items_center]}
              >
                <TouchableOpacity
                  onPress={() => {
                    let next = currentIndex - 1;
                    if (next < 0) {
                      next = trackList.length - 1;
                    }
                    skipTo(next, playbackState.state === State.Playing);
                  }}
                >
                  <Ionicons
                    name="play-skip-back"
                    size={32}
                    color={css.light.color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    // 如果播放列表已经结束，则跳到开头播放
                    const progress = await TrackPlayer.getProgress();
                    const { buffered, duration, position } = progress;
                    if (
                      playbackState.state === State.Paused &&
                      currentIndex === trackList.length - 1 &&
                      buffered === duration &&
                      duration - position < 0.1
                    ) {
                      skipTo(0, true);
                    } else {
                      playTrack();
                    }
                  }}
                >
                  <Ionicons
                    name={
                      playbackState.state === State.Playing ? 'pause' : 'play'
                    }
                    size={32}
                    color={css.light.color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let next = currentIndex + 1;
                    if (next >= trackList.length) {
                      next = 0;
                    }
                    skipTo(next, playbackState.state === State.Playing);
                  }}
                >
                  <Ionicons
                    name="play-skip-forward"
                    size={32}
                    color={css.light.color}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[css.mb_16]}>
            <AudioProgress key={activeTrack?.id || '0'} />
          </View>
          <ExampleCard title="播放进度信息" content={<ProgressInfo />} />
          <ExampleCard
            title="播放状态信息"
            content={
              <ThemeText style={css.font_16}>
                playbackState: {JSON.stringify(playbackState, null, 2)}
              </ThemeText>
            }
          />
          <ExampleCard
            title="当前曲目信息"
            content={
              <ThemeText style={css.font_16}>
                activeTrack: {JSON.stringify(activeTrack, null, 2)}
              </ThemeText>
            }
          />
        </>
      )}
    </ScrollView>
  );
}
