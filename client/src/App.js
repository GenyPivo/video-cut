import React, { Component } from 'react';
import './App.css';
import { Grid, Input, Button } from 'semantic-ui-react';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";

const videoRecords = [
  'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
  'http://media.w3.org/2010/05/bunny/trailer.mp4',
  'http://media.w3.org/2010/05/video/movie_300.webm'
  ];

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      source: videoRecords[0],
      current_video_index: 0,
      timer: 0,
      recording: false,
      stopped: false,
      currentRecording: {},
      time: Date.now()
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
  }

  componentDidMount() {
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
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

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.refs.player.getState();
      const currentTime = player.currentTime;
      this.refs.player.seek(currentTime + seconds);
    };
  }

  handleStateChange(state, prevState) {
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
    console.log(e.key);
    switch(e.key) {
      case '1':
        this.changeSourceState(0);
        break;
      case '2':
        console.log(23);
        this.changeSourceState(1);
        break;
      case '3':
        this.changeSourceState(2);
        break;
    }
  }

  handleRecordStart() {
    this.setState({recording: true});
    this.setState({currentRecording: { start_time: this.state.player.currentTime }});
  }

  handleRecordStop() {
    this.setState({recording: false, stopped: true, currentRecording: { stop_time: this.state.player.currentTime }});
    this.pause();
  }

  handleSaveVideo() {

  }


  render() {
    const { current_video_index, time } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Grid>
          <Grid.Column width={10} className='video-player'>
            <Player ref="player" autoPlay muted aspectRatio="16:9">
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
              {this.state.stopped ?
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Input value={`Video_${current_video_index + 1}_${time}`} />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Button color='yellow' onClick={this.handleSaveVideo.bind(this)}>
                      Save
                    </Button>
                  </Grid.Column>
                </Grid.Row> :
              ''}
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
