import React, { Component } from 'react';
import './App.css';
import { Grid, Image, Button } from 'semantic-ui-react';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Grid>
          <Grid.Column width={10} className='video-player'>
            <Player
              playsInline
              poster="/assets/poster.png"
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
            <Grid className="video-buttons-group">
              <Grid.Column width={5}>
                <Button color="black" className="left floated">
                  Video 1
                </Button>
              </Grid.Column>
              <Grid.Column width={6}>
                <Button color="black">
                  Video 2
                </Button>
              </Grid.Column>
              <Grid.Column width={5}>
                <Button color="black" className="right floated">
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
              <Grid.Column width={8}>

              </Grid.Column>
              <Grid.Column width={8}>

              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
