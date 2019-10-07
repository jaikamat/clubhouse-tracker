import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { Form, Button, Header } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

class DateRangePicker extends React.Component {
    state = { datesRange: '', historicInventoryLength: 1, loading: false };

    async componentDidMount() {
        const { data } = await axios.get(
            'https://us-central1-clubhouse-inventory-tracker.cloudfunctions.net/retrieveHistoricDateRange'
        );
        this.setState({ historicInventoryLength: data.length });
    }

    handleDateSelect = (event, { value }) => {
        this.setState({ datesRange: value });
    };

    handleDateSubmit = async () => {
        this.setState({ loading: true });
        const [date1, date2] = this.state.datesRange.split(' - ');
        await this.props.submit(date1, date2);
        this.setState({ loading: false });
    };

    render() {
        const { datesRange, historicInventoryLength, loading } = this.state;

        return (
            <Form>
                <Header inverted>
                    <Header.Content>Inventory range search:</Header.Content>
                </Header>
                <Form.Group inline>
                    <Form.Field>
                        <DatesRangeInput
                            autoComplete="off"
                            dateFormat="MM-DD-YYYY"
                            name="datesRange"
                            animation="none"
                            placeholder="From - To"
                            value={this.state.datesRange}
                            iconPosition="left"
                            onChange={this.handleDateSelect}
                            allowSameEndDate={true}
                            pickerWidth="1000"
                            minDate={moment().subtract(historicInventoryLength, 'days')}
                            maxDate={moment().subtract(1, 'days')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button
                            disabled={datesRange.length < 14}
                            onClick={this.handleDateSubmit}
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}

export default DateRangePicker;
