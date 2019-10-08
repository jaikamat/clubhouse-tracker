import React from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

class CreateTable extends React.Component {
    state = { sort: 'name', direction: 'ascending' };

    handleSort = property => {
        const { sort, direction } = this.state;

        if (property === sort) {
            this.setState({
                sort: property,
                direction: direction === 'ascending' ? 'descending' : 'ascending'
            });
            return;
        }

        this.setState({ sort: property, direction: 'ascending' });
    };

    render() {
        const { headerText, data } = this.props;
        const { sort, direction } = this.state;

        if (data.length === 0) {
            data.push({
                name: 'No changes',
                qty: '-'
            });
        }

        const dataTransform = _.sortBy(data, sort);

        if (this.state.direction === 'descending') dataTransform.reverse();

        return (
            <Table celled compact unstackable inverted sortable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            rowSpan={3}
                            onClick={() => this.handleSort('name')}
                            sorted={sort === 'name' ? direction : null}
                        >
                            {headerText}
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            rowSpan={1}
                            onClick={() => this.handleSort('qty')}
                            sorted={sort === 'qty' ? direction : null}
                        >
                            #
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(dataTransform, ({ name, qty }, idx) => (
                        <Table.Row key={idx}>
                            <Table.Cell>{name}</Table.Cell>
                            <Table.Cell>{qty}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

export default CreateTable;
