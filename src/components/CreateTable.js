import React from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

class CreateTable extends React.Component {
    render() {
        const { headerText, data } = this.props;

        if (data.length === 0) {
            data.push({
                name: 'No changes',
                qty: '-'
            });
        }

        return (
            <Table celled compact unstackable inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan={3}>{headerText}</Table.HeaderCell>
                        <Table.HeaderCell rowSpan={1}>#</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(data, ({ name, qty }) => (
                        <Table.Row key={name}>
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
