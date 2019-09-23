import React from 'react';
import { Table } from 'semantic-ui-react';
import TableRow from './TableRow';

// Move out into stateless component
const CreateTable = props => {
    let rowData;

    if (props.data.length === 0) {
        rowData = [['No changes yet', '-']];
    } else {
        rowData = props.data;
    }

    return (
        <Table celled compact unstackable inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan={3}>{props.headerText}</Table.HeaderCell>
                    <Table.HeaderCell rowSpan={1}>#</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rowData.map((d, idx) => (
                    <TableRow key={idx} cardData={d} />
                ))}
            </Table.Body>
        </Table>
    );
};

export default CreateTable;
