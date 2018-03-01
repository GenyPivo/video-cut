import React, { Component } from 'react';
import { Grid, Button, Message } from 'semantic-ui-react';
import Common from "../common";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class AdminPanel extends Component {
  state = {
    loading: true,
    statData: {
      distribution: []
    },
    records: []
  };

  componentDidMount() {
    this.fetchStats();

    fetch('api/v1/video_records', {
      method: 'get'
    }).then(res => Common.handleResponse(res))
      .then(data => this.setState({ records: data }));
  }

  fetchStats() {
    fetch('api/v1/video_records/statistics', {
      method: 'get'
    }).then(res => Common.handleResponse(res))
      .then(data => this.setState({ statData: data }));
  }

  handleDelete = (record) => {

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        fetch(`api/v1/video_records/${record.id}`, {
          method: 'delete'
        }).then(res => Common.handleResponse(res))
          .then(() =>  {
            this.fetchStats();
            this.setState({ records: this.state.records.filter(r => r.id !== record.id) })
          });
      }
    });
  };

  render() {
    const { count, distribution, rate } = this.state.statData;

    return (
      <Grid>
        <Grid.Column width={8}>
          <Message
            info
            header='All records saved'
            content={count}
          />
          <Message
            info
            header='Rate'
            content={Math.round(rate * 1000) / 1000}
          />
          <Message positive>
            <Message.Header>Distribution</Message.Header>
            <ul className='distribution'>
              {distribution.map((el, index) => {
                return (
                  <li key={index}>
                    Video {index + 1} - <b>{Math.round(el/count * 100)}</b> %
                  </li>
                );
              })}
            </ul>
          </Message>
        </Grid.Column>
        <Grid.Column width={8}>
          {this.state.records.map((rec) => {
            return (
              <Grid key={rec.id}>
                <Grid.Column width={6}>
                  {rec.title}<br/>
                  Time: {Math.round(rec.start_time * 100) / 100}s - {Math.round(rec.finish_time * 100) / 100}s
                </Grid.Column>
                <Grid.Column width={8}>
                  <Button color='red' onClick={this.handleDelete.bind(this, rec)}>
                    Delete
                  </Button>
                </Grid.Column>
              </Grid>
            );
          })}
        </Grid.Column>
      </Grid>
    );
  }
}
