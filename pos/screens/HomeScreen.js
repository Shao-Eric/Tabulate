import React from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase';
import DetailScreen from './DetailScreen';
import ItemDetail from '../components/ItemDetail';
import Header from '../components/Header';

export default class HomeScreen extends React.Component {
  state = {
    items: []
  };
  componentDidMount() {
    let ref = firebase.database().ref('Funtime Bar');
    ref.on('value', snapshot => {
      let result = snapshot.val();
      let list = [];
      let sublist = [];
      let counter = 0;
      for (let row of Object.keys(result)) {
        sublist.push(result[row]);
        if (counter === 2) {
          counter = 0;
          list.push(sublist);
          sublist = [];
        } else {
          counter++;
        }
      }
      list.push(sublist);
      this.setState({ items: list });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <FlatList
          style={{ flex: 1 }}
          data={this.state.items}
          renderItem={item => {
            console.log(item.item);
            return (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {item.item.map(item => <DetailScreen data={item} />)}
                {item.item.length === 2 && <View style={{ flex: 1 }} />}
                {item.item.length === 1 && (
                  <View style={{ flex: 2 }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 1 }} />
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = {
  viewContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};
