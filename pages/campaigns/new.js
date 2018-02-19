import React, { Component } from 'react';
import { Form, Button, Dropdown, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    units: 'Wei',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    let { minimumContribution } = this.state;
    minimumContribution =
      this.state.units === 'Wei'
        ? minimumContribution
        : web3.utils.toWei(minimumContribution, 'ether');
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });

      Router.pushRoute('/');
    } catch (err) {
      console.log(err.name);
      this.setState({ errorMessage: err.message.split('at Transaction')[0] });
    }
    this.setState({ loading: false });
  };
  render() {
    const options = [
      { key: 'Wei', text: 'Wei', value: 'Wei' },
      { key: 'Ether', text: 'Ether', value: 'Ether' }
    ];
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label={
                <Dropdown
                  defaultValue="Wei"
                  options={options}
                  onChange={event =>
                    this.setState({ units: event.target.value })
                  }
                />
              }
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
              labelPosition="right"
            />
          </Form.Field>
          <Message
            error
            header="Damn shawty"
            content={this.state.errorMessage}
          />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
