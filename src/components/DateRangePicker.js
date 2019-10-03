import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

class DateRangePicker extends React.Component {
    state = { datesRange: '' };

    // need to mount a get length of historical data component to limit date selection

    handleDateSelect = (event, { value }) => {
        this.setState({ datesRange: value });
    };

    handleDateSubmit = () => {
        const [date1, date2] = this.state.datesRange.split(' - ');
        this.props.submit(date1, date2);
        this.setState({ datesRange: '' });
    };

    render() {
        const { datesRange } = this.state;

        return (
            <Form>
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
                            duration={20}
                            clearable={true}
                            closable={true}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button disabled={datesRange.length < 14} onClick={this.handleDateSubmit}>
                            Submit
                        </Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}

export default DateRangePicker;
