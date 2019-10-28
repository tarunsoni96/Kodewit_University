import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';
import CustomText from 'AppLevelComponents/UI/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from 'UIProps/Colors';
import ListItemSyllabus from './components/ListItemSyllabus';

import NetworkAwareContent from '../../../../UniversityComponents/NetworkAwareContent';
import {getCurriculam} from 'ServiceProviders/ApiCaller';
import {UserInfoConsumer} from '../../../../AppLevelComponents/Contexts/CxtUserInfo';
import NoDataView from '../../../../UniversityComponents/NoDataView';
import {ContentConsumer} from '../../../../AppLevelComponents/Contexts/CxtBoardContent';

let currentContext;
let contentContext;

let numColumns = 2;

const formatData = (data, columns) => {
  const numberOfFullRows = Math.floor(data.length / columns);
  let numberOfEleLastRow = data.length - numberOfFullRows * columns;
  while (numberOfEleLastRow !== columns && numberOfEleLastRow !== 0) {
    data.push({id: `blank`});
    numberOfEleLastRow += 1;
  }
  return data;
};

class Syllabus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isApiCall: true,
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = refresh => {
    contentContext.setContentRefresh('');

    this.setState({isApiCall: true});
    const {class_id} = currentContext.userData.section;
    const {session} = currentContext.userData.student_info;
    getCurriculam(class_id, session, refresh)
      .then(resp => {
        this.setState({isApiCall: false, data: resp});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  renderItem = ({item, index}) => {
    if (item.id == 'blank') {
      return <View style={styles.emptyView} />;
    } else {
      return (
        <ListItemSyllabus
          item={item}
          courseNo={item.id}
          courseName={item.title}
        />
      );
    }
  };
  render() {
    return (
      <UserInfoConsumer>
        {context => {
          currentContext = context;
          console.log(context.userData);
          return (
            <ContentConsumer>
              {context => {
                contentContext = context;
                if (contentContext.contentSetOnRefresh == 'Curriculum') {
                  this.getData(true);
                }
                return (
                  <NetworkAwareContent
                    data={this.state.data}
                    isApiCall={this.state.isApiCall}
                    apiFunc={this.getData}>
                    <View
                      style={{
                        width: '100%',
                        flex: 1,
                        alignItems: 'flex-start',
                      }}>
                      <CustomText
                        paddingHorizontal={8}
                        size={16}
                        font="AvenirLTStd-Heavy"
                        style={styles.msgTitle}
                        color={Colors.light}
                        text={`Class: ${currentContext.userData.section.class.class_number},  Session: ${currentContext.userData.student_info.session}`}
                      />
                      <View>
                        <FlatList
                          style={{flex: 1}}
                          data={formatData(this.state.data, numColumns)}
                          renderItem={this.renderItem}
                          numColumns={numColumns}
                        />

                        {/* <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    numColumns={2}
                  /> */}
                      </View>
                    </View>
                  </NetworkAwareContent>
                );
              }}
            </ContentConsumer>
          );
        }}
      </UserInfoConsumer>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem: global.rem,

  categoryScroller: {
    marginTop: '22rem',
    paddingBottom: 10,
  },

  grid: {
    width: '100%',
  },
  gridCol: {
    marginHorizontal: '8rem',
    justifyContent: 'space-between',
  },

  row: {
    flex: 0,
  },

  msgTitle: {
    marginVertical: 10,

    fontSize: 15,
  },

  emptyView: {
    padding: 10,
    paddingBottom: 6,
    width: '46.4%',
    margin: 7,
  },
});

export default withNavigation(Syllabus);
