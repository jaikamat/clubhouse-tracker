import React from 'react';
import axios from 'axios';
import CreateTable from './CreateTable';
import SearchBar from './Search';
import DateRangePicker from './DateRangePicker';
import { Container, Header, Grid, Divider } from 'semantic-ui-react';

// Maps the API response data into something usable for front-end sorting
const transformData = data => {
    return data.map(d => {
        return { name: d[0], qty: d[1] };
    });
};

class App extends React.Component {
    state = {
        inventory_in: [],
        inventory_out: [],
        searched: false
    };

    searchHistoricalData = async (date1, date2) => {
        const { data } = await axios.get(
            'https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveHistoricDateRange',
            {
                params: {
                    date1,
                    date2
                }
            }
        );

        const { inventory_in, inventory_out } = data;

        this.setState({
            inventory_in: inventory_in,
            inventory_out: inventory_out,
            searched: true
        });
    };

    render() {
        const { inventory_in, inventory_out, searched } = this.state;

        return (
            <Container style={{ marginTop: '20px' }}>
                <Header inverted as="h1">
                    <Header.Content>
                        <em>"Got a lot of good things on sale, stranger"</em>
                        <i className="ss ss-pmei ss-2x ss-uncommon"></i>
                        <Header.Subheader>
                            The Clubhouse's daily Magic: The Gathering singles intake and sales, at
                            a glance
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider />
                <Header inverted as="h3">
                    <Header.Content>Search for a card:</Header.Content>
                </Header>
                <SearchBar />
                <Divider />
                <Header inverted as="h3">
                    <DateRangePicker submit={this.searchHistoricalData} />
                </Header>
                {searched && (
                    <Grid stackable>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <CreateTable headerText={'Cards received'} data={inventory_in} />
                            </Grid.Column>
                            <Grid.Column>
                                <CreateTable headerText={'Cards sold'} data={inventory_out} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )}
            </Container>
        );
    }
}

export default App;
