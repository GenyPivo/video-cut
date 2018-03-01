import React, { Component } from 'react';
import { Grid, Input, Button, Dimmer, Loader } from 'semantic-ui-react';
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import Common from "../common";

const videoRecords = [
  'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
  'http://media.w3.org/2010/05/bunny/trailer.mp4',
  'http://media.w3.org/2010/05/video/movie_300.webm'
];

class Recorder extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      source: videoRecords[0],
      current_video_index: 0,
      timer: 0,
      recording: false,
      stopped: false,
      start_time: 0,
      finish_time: 0,
      title: '',
      records: [],
      loading: true,
      playing_stop_at: false
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
  }

  componentDidMount() {
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    fetch(`/api/v1/video_records`, {
      method: 'get'
    }).then(Common.handleResponse).then(x => {
      this.setState({ records: x, loading: false})
    });
  }

  play() {
    this.refs.player.play();
  }

  pause() {
    this.refs.player.pause();
  }

  load() {
    this.refs.player.load();
  }

  changeCurrentTime(time) {
    this.refs.player.seek(time);
    this.play();
  }

  handleStateChange(state, prevState) {
    if (this.state.playing_stop_at && state.currentTime > this.state.playing_stop_at) {
      this.pause();
      this.setState({playing_stop_at: false});
    }
    this.setState({
      player: state
    });
  }

  changeSourceState(id) {
    this.setState({
      source: videoRecords[id],
      current_video_index: id
    });
    this.refs.player.load();
  }

  changeSource(id) {
    return () => this.changeSourceState(id);
  }

  handleKeyDown(e) {
    if (!this.state.recording) {
      switch(e.key) {
        case '1':
          this.changeSourceState(0);
          break;
        case '2':
          this.changeSourceState(1);
          break;
        case '3':
          this.changeSourceState(2);
          break;
      }
    }
  }

  handleRecordStart() {
    const title = `Video_${this.state.current_video_index + 1}_${Date.now()}`;
    this.setState({recording: true, start_time: this.state.player.currentTime, title: title});
    this.play();
  }

  handleRecordStop() {
    this.setState({ recording: false, stopped: true, finish_time: this.state.player.currentTime });
    this.pause();
  }

  handleSaveVideo() {
    const { start_time, finish_time, title } = this.state;
    const ci = this.state.current_video_index;
    const data = {
      start_time: start_time,
      finish_time: finish_time,
      title: title,
      video_type: ci
    };

    fetch(`/api/v1/video_records`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(Common.handleResponse).then(x => this.addRecord(x));
  }

  addRecord(record) {
    this.setState({ records: [record, ...this.state.records ], stopped: false })
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handlePlaySaved(record) {
    return () => {
      if (record.video_type !== this.state.current_video_index ) {
        this.changeSourceState(record.video_type);
      }
      this.setState({playing_stop_at: record.finish_time});
      this.changeCurrentTime(record.start_time);
    }
  }

  handleDismiss() {
    this.setState({stopped: false});
  }


  render() {
    return (
      <div>
        <Dimmer active={this.state.loading}>
          <Loader />
        </Dimmer>
        <Grid>
          <Grid.Column width={10} className='video-player'>
            <Player ref="player" autoPlay={!this.state.loading} muted aspectRatio="16:9">
              <source src={this.state.source}/>
            </Player>
            <Grid className="video-buttons-group">
              <Grid.Column width={5}>
                <Button color="black" disabled={this.state.recording}
                        className="left floated" onClick={this.changeSource(0)}>
                  Video 1
                </Button>
              </Grid.Column>
              <Grid.Column width={6}>
                <Button color="black" disabled={this.state.recording}  onClick={this.changeSource(1)}>
                  Video 2
                </Button>
              </Grid.Column>
              <Grid.Column width={5}>
                <Button color="black" disabled={this.state.recording} className="right floated" onClick={this.changeSource(2)}>
                  Video 3
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Grid.Row className="flex-center">
                {!this.state.recording ?
                  <Button color='red' className='control-button' onClick={this.handleRecordStart.bind(this)}>
                    Start recording
                  </Button> :
                  <Button color='grey' className='control-button' onClick={this.handleRecordStop.bind(this)}>
                    Stop recording
                  </Button>
                }
              </Grid.Row>
              {this.state.stopped &&
              <Grid.Row>
                <Grid.Column width={8}>
                  <Input value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Button color='blue' onClick={this.handleSaveVideo.bind(this)}>
                    Save
                  </Button>
                  <Button color='yellow' onClick={this.handleDismiss.bind(this)}>
                    Dismiss
                  </Button>
                </Grid.Column>
              </Grid.Row> }
              {this.state.records.map((rec) => {
                return (
                  <Grid.Row key={rec.id}>
                    <Grid.Column width={8}>
                      {rec.title}<br/>
                      Time: {Math.round(rec.start_time * 100) / 100}s - {Math.round(rec.finish_time * 100) / 100}s
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Button color='grey' onClick={this.handlePlaySaved(rec)}>
                        Play
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                );
              })}
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Recorder;
