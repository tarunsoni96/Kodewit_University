import React, { Component, Fragment } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import "Helpers/global";
import EStyleSheet from "react-native-extended-stylesheet";
import { Row, Grid, Col } from "react-native-easy-grid";
import TableRow from "AppLevelComponents/UI/Table/TableRow";
import TableRowHeader from "AppLevelComponents/UI/Table/TableRowHeader";
import TableContainer from "AppLevelComponents/UI/Table/TableContainer";

let gridColumnCounts = 3;

let row1 = ["Diwali", "12-08-19", "1"];
let row2 = ["Holi", "13-03-20", "1"];
let row3 = ["Holi", "13-03-20", "1"];
let row4 = ["Holi", "13-03-20", "1"];
let row5 = ["Holi", "13-03-20", "1"];
let row6 = ["Holi", "13-03-20", "1"];
let row7 = ["Holi", "13-03-20", "1"];

export default class HolidayTable extends Component {
  activatePack = () => {};
  render() {
    return (
      <TableContainer>
        <TableRowHeader
          columnCounts={gridColumnCounts}
          fontSize={14}
          columns={["Festival", "Date", "Holiday"]}
        />
        <TableRow
          activatePack={this.activatePack}
          columnCounts={gridColumnCounts}
          columns={row1}
        />

        <TableRow
          activatePack={this.activatePack}
          columnCounts={gridColumnCounts}
          columns={row2}
        />

        <TableRow
          activatePack={this.activatePack}
          columnCounts={gridColumnCounts}
          columns={row3}
        />

        <TableRow
          activatePack={this.activatePack}
          columnCounts={gridColumnCounts}
          columns={row4}
        />

        <TableRow
          activatePack={this.activatePack}
          columnCounts={gridColumnCounts}
          columns={row5}
        />

        <TableRow
          activatePack={this.activatePack}
          columnCounts={gridColumnCounts}
          columns={row6}
        />

        <TableRow
          activatePack={this.activatePack}
          columnCounts={gridColumnCounts}
          columns={row6}
        />

        
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
