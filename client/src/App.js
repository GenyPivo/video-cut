import React, { Component } from 'react';
import './App.css';
import { Grid, Image, Button } from 'semantic-ui-react';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";

const videoRecords = [
  'https://r4---sn-bpb5oxu-3c2z.googlevideo.com/videoplayback?ratebypass=yes&pl=24&initcwndbps=1203750&c=WEB&nh=%2CIgpwcjAyLmticDAzKgkxMjcuMC4wLjE&source=youtube&ipbits=0&mm=31%2C29&mn=sn-bpb5oxu-3c2z%2Csn-3c27sn7s&requiressl=yes&expire=1519329313&ei=wMuOWrKmO9L9yAXw6rHADg&ms=au%2Crdu&mt=1519307626&mv=m&dur=204.892&lmt=1507172164136254&key=yt6&ip=178.150.55.191&beids=%5B9466593%5D&id=o-AHjFFejwqe7AjZ9fz6dF1xljMa1_kR_wqPXLXmdAJl1H&itag=22&fvip=10&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&mime=video%2Fmp4&signature=99D6C76E1FA9A4A8DB7786D7639C089ED3DA42B0.0480ED8490B256E740512D9F32675D4220C5A06E&title=Arctic%20Monkeys%20-%20Teddy%20Picker%20(Official%20Video)',
  'https://r6---sn-bpb5oxu-3c26.googlevideo.com/videoplayback?mm=31%2C29&mn=sn-bpb5oxu-3c26%2Csn-3c27sn7d&key=yt6&ip=178.150.55.191&fvip=9&source=youtube&lmt=1517678748219208&dur=250.520&mt=1519307754&mv=m&ei=ccyOWvyyL9u_d5WdhKAG&id=o-AK7vUaKws2wpX62Q0IgjSkroRCROm3hr-amrgcdqonQE&ms=au%2Crdu&c=WEB&nh=%2CIgpwcjAyLmticDAzKgkxMjcuMC4wLjE&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&initcwndbps=1553750&ratebypass=yes&ipbits=0&mime=video%2Fmp4&clen=19227044&requiressl=yes&expire=1519329489&itag=18&pl=24&gir=yes&signature=366FE8F192EE687C345246C2BFDDC86322300812.2A70DD36AF5212D32F4A97D6DD8D06040956D46A&title=Coldplay%20-%20Up%26Up%20(Official%20Video)',
  'https://r6---sn-bpb5oxu-3c2l.googlevideo.com/videoplayback?expire=1519329813&ei=tc2OWsPXMY7KdJzup_AF&itag=18&requiressl=yes&initcwndbps=1440000&source=youtube&dur=253.376&clen=21289630&nh=%2CIgpwcjAyLmticDAzKgkxMjcuMC4wLjE&ipbits=0&c=WEB&ratebypass=yes&lmt=1507696948719296&fvip=6&ms=au%2Crdu&mv=m&mt=1519308042&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&pl=24&id=o-AGJYZGTrA0mHVmqU3mWKX4v8O0xu6zUOudM0D2-gCbnv&mime=video%2Fmp4&gir=yes&mm=31%2C29&mn=sn-bpb5oxu-3c2l%2Csn-3c27sn7r&ip=178.150.55.191&key=yt6&signature=DEA8A10280E15D9DC9CEA91FCF176A66805DC193.7DAB9853D35E0CC1DB22749EFC8E9E461BECC382&title=Imagine%20Dragons%20-%20Believer%20Acoustic'
  ];

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      source: videoRecords[0],
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
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

  seek(seconds) {
    return () => {
      this.refs.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.refs.player.getState();
      const playbackRate = player.playbackRate;
      this.refs.player.playbackRate = playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.refs.player.getState();
      const volume = player.volume;
      this.refs.player.volume = volume + steps;
    };
  }

  setMuted(muted) {
    return () => {
      this.refs.player.muted = muted;
    };
  }

  handleStateChange(state, prevState) {
    this.setState({
      player: state
    });
  }

  changeSourceState(id) {
    this.setState({
      source: videoRecords[id]
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


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Grid>
          <Grid.Column width={10} className='video-player'>
            <Player ref="player" autoPlay>
              <source src={this.state.source}/>
            </Player>
            <Grid className="video-buttons-group">
              <Grid.Column width={5}>
                <Button color="black" className="left floated" onClick={this.changeSource(0)}>
                  Video 1
                </Button>
              </Grid.Column>
              <Grid.Column width={6}>
                <Button color="black"  onClick={this.changeSource(1)}>
                  Video 2
                </Button>
              </Grid.Column>
              <Grid.Column width={5}>
                <Button color="black" className="right floated" onClick={this.changeSource(2)}>
                  Video 3
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Grid.Row className="flex-center">
                <Button color='red' className='control-button'>
                  Start recording
                </Button>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>

                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
