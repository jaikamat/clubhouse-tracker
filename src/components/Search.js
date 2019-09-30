import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Search, Grid, Header, Label } from 'semantic-ui-react';

class SearchBar extends React.Component {
    state = {
        isLoading: false,
        term: '',
        autocomplete: [],
        results: [],
        inStockQty: null,
        soldQty: null,
        query: ''
    };

    async componentDidMount() {
        const totalInvRes = await axios.get(
            'https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveCardDataFromDB'
        );
        const historicInvRes = await axios.get(
            'https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveHistoricChangeData'
        );

        const allNames = Object.keys(totalInvRes.data).concat(
            Object.keys(historicInvRes.data.inventory_out)
        );

        const uniqNames = _.uniq(allNames);
        const formatArray = uniqNames.map(el => {
            return { title: el };
        });

        this.setState({ autocomplete: formatArray });
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, term: value });

        if (this.state.term.length < 1)
            // reset the state
            return this.setState({
                isLoading: false,
                term: '',
                results: [],
                inStockQty: null,
                soldQty: null,
                query: ''
            });

        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(this.state.term), 'i');
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(this.state.autocomplete, isMatch)
            });
        }, 300);
    };

    handleResultSelect = async (e, { result }) => {
        const query = result.title;
        const totalInv = await axios.get(
            'https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveCardDataFromDB'
        );

        const historicSales = await axios.get(
            'https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveHistoricChangeData'
        );

        const inStockQty = totalInv.data[query] ? totalInv.data[query] : 0;
        const soldQty = historicSales.data.inventory_out[query]
            ? historicSales.data.inventory_out[query]
            : 0;

        this.setState({ inStockQty, soldQty, query });
    };

    render() {
        let { isLoading, results, inStockQty, soldQty, query } = this.state;

        if (inStockQty === 0) {
            inStockQty = 'No';
        }
        if (soldQty === 0) {
            soldQty = 'None';
        }

        return (
            <Grid stackable={true}>
                <Grid.Row columns={1}>
                    <Grid.Column width={16}>
                        <Search
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                trailing: true
                            })}
                            onResultSelect={this.handleResultSelect}
                            loading={isLoading}
                            results={results}
                        />
                        {inStockQty && soldQty && (
                            <Header inverted>
                                <Header.Content>
                                    <div>
                                        {inStockQty} {inStockQty === 1 ? 'copy' : 'copies'} of{' '}
                                        <em>{query}</em> in stock.
                                        <br />
                                        {soldQty} sold within the past 60 days.
                                    </div>
                                </Header.Content>
                            </Header>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default SearchBar;
