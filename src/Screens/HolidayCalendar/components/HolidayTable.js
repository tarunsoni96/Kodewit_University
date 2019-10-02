import React, { Component, Fragment } from "react";
import "Helpers/global";
import EStyleSheet from "react-native-extended-stylesheet";
import TableRow from "AppLevelComponents/UI/Table/TableRow";
import TableRowHeader from "AppLevelComponents/UI/Table/TableRowHeader";
import TableContainer from "AppLevelComponents/UI/Table/TableContainer";
import HelperMethods from 'Helpers/Methods'
let gridColumnCounts = 3;
export default class HolidayTable extends Component {
  activatePack = () => {};

  populateRows () {
    const {data} = this.props
    let view = []
    data.map((item,index) => {
      let rowData = [item.title,HelperMethods.formatDate_DMY(item.holiday_date),1]
      view.push( <TableRow
        activatePack={this.activatePack}
        columnCounts={gridColumnCounts}
        columns={rowData}
      />)
    })
    return view
  }

  render() {
    return (
      <TableContainer>
        <TableRowHeader
          columnCounts={gridColumnCounts}
          fontSize={14}
          columns={["Festival", "Date", "Holiday"]}
        />
        {this.populateRows()}
      </TableContainer>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  gridContainer: {
    width: "100%",
    flex: null,
    flexDirection: "column"
  }
});
