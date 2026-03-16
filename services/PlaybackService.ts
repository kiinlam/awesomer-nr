import TrackPlayer, { Event } from 'react-native-track-player';

export default function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.log('Event.RemoteStop');
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    console.log('Event.RemoteNext');
    const queue = await TrackPlayer.getQueue();
    if (!queue.length) return;
    const index = await TrackPlayer.getActiveTrackIndex();
    if (index === undefined) return;
    if (index < queue.length - 1) {
      TrackPlayer.skipToNext();
    } else {
      // 播放第一首
      TrackPlayer.skip(0);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    console.log('Event.RemotePrevious');
    const queue = await TrackPlayer.getQueue();
    if (!queue.length) return;
    const index = await TrackPlayer.getActiveTrackIndex();
    if (index === undefined) return;
    if (index > 0) {
      TrackPlayer.skipToPrevious();
    } else {
      // 播放最后一首
      TrackPlayer.skip(queue.length - 1);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    console.log('Event.RemoteJumpForward', event);
    TrackPlayer.seekBy(event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    console.log('Event.RemoteJumpBackward', event);
    TrackPlayer.seekBy(-event.interval);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    console.log('Event.RemoteSeek', event);
    TrackPlayer.seekTo(event.position);
  });

  // 某些情况导致的中断，如来电，断开耳机
  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
    console.log('Event.RemoteDuck', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
    console.log('Event.PlaybackQueueEnded', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, event => {
    console.log('Event.PlaybackActiveTrackChanged', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, event => {
    console.log('Event.PlaybackProgressUpdated', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackPlayWhenReadyChanged, event => {
    console.log('Event.PlaybackPlayWhenReadyChanged', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackState, event => {
    console.log('Event.PlaybackState', event);
  });

  TrackPlayer.addEventListener(Event.MetadataChapterReceived, event => {
    console.log('Event.MetadataChapterReceived', event);
  });

  TrackPlayer.addEventListener(Event.MetadataTimedReceived, event => {
    console.log('Event.MetadataTimedReceived', event);
  });

  TrackPlayer.addEventListener(Event.MetadataCommonReceived, event => {
    console.log('Event.MetadataCommonReceived', event);
  });

  return () => {
    console.log('TrackPlayer.registerPlaybackService done!');
  };
}
