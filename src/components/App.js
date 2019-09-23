import React from 'react';
import axios from 'axios';
import CreateTable from './CreateTable';
import { Container, Header, Grid, Divider } from 'semantic-ui-react';

class App extends React.Component {
    state = { inventory_in: [], inventory_out: [] };

    async componentDidMount() {
        const res = await axios.get(
            'https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveChangeDataFromDB'
        );

        const inventory_in = Object.entries(res.data.inventory_in);
        const inventory_out = Object.entries(res.data.inventory_out);

        console.log(inventory_in, inventory_out);

        this.setState({ inventory_in: inventory_in, inventory_out: inventory_out });
    }

    render() {
        const inv_in = this.state.inventory_in;
        const inv_out = this.state.inventory_out;

        return (
            <Container style={{ marginTop: '20px' }}>
                <Header inverted as="h1">
                    <Header.Content>
                        <em>"Got a lot of good things on sale, stranger"</em>
                        <Header.Subheader>
                            The Clubhouse's daily Magic: The Gathering singles intake and sales, at
                            a glance
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider />
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <CreateTable headerText={'Inventory in'} data={inv_in} />
                        </Grid.Column>
                        <Grid.Column>
                            <CreateTable headerText={'Inventory out'} data={inv_out} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default App;
