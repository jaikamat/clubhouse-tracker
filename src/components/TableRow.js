import React from 'react';
import { Table } from 'semantic-ui-react';

const TableRow = props => {
    const cardRowData = props.cardData;
    console.log(cardRowData);

    return (
        <Table.Row>
            <Table.Cell>{cardRowData[0]}</Table.Cell>
            <Table.Cell>{cardRowData[1]}</Table.Cell>
        </Table.Row>
    );
};

export default TableRow;
