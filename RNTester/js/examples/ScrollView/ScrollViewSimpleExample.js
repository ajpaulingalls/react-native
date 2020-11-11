/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');

const {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} = require('react-native');
const nullthrows = require('nullthrows');

const NUM_ITEMS = 20;

class ScrollViewSimpleExample extends React.Component<{...}> {
  makeItems: (nItems: number, styles: any) => Array<any> = (
    nItems: number,
    styles,
  ): Array<any> => {
    const items = [];
    for (let i = 0; i < nItems; i++) {
      items[i] = (
        <TouchableOpacity key={i} style={styles}>
          <Text>{'Item ' + i}</Text>
        </TouchableOpacity>
      );
    }
    return items;
  };

  render(): React.Node {
    let _scrollView: ?React.ElementRef<typeof ScrollView>;
    // One of the items is a horizontal scroll view
    const items = this.makeItems(NUM_ITEMS, styles.itemWrapper);
    items[4] = (
      <ScrollView key={'scrollView'} horizontal={true}>
        {this.makeItems(NUM_ITEMS, [
          styles.itemWrapper,
          styles.horizontalItemWrapper,
        ])}
      </ScrollView>
    );
    items.push(
      <ScrollView
        key={'scrollViewSnap'}
        horizontal
        snapToInterval={210.0}
        pagingEnabled>
        {this.makeItems(NUM_ITEMS, [
          styles.itemWrapper,
          styles.horizontalItemWrapper,
          styles.horizontalPagingItemWrapper,
        ])}
      </ScrollView>,
    );

    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollView => {
            _scrollView = scrollView;
          }}
          style={styles.verticalScrollView}
          onMomentumScrollEnd={() => {
            console.log('onMomentumScrollEnd');
          }}
          onMomentumScrollBegin={e => {
            console.log('onMomentumScrollBegin', e.nativeEvent);
          }}>
          {items}
        </ScrollView>
        <View style={styles.options}>
          <Button
            title="Animated Scroll to top"
            onPress={() => {
              nullthrows(_scrollView).scrollTo({x: 0, animated: true});
            }}
            style={styles.button}
          />
          <Button
            title="Animated Scroll to End"
            onPress={() => {
              nullthrows(_scrollView).scrollToEnd({animated: true});
            }}
            style={styles.button}
            color={'blue'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verticalScrollView: {
    margin: 10,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgb(239, 239, 244)',
    flex: 1,
  },
  itemWrapper: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#a52a2a',
    padding: 30,
    margin: 5,
  },
  horizontalItemWrapper: {
    padding: 50,
  },
  horizontalPagingItemWrapper: {
    width: 200,
  },
});

exports.title = '<ScrollViewSimpleExample>';
exports.description =
  'Component that enables scrolling through child components.';
exports.simpleExampleContainer = true;
exports.examples = [
  {
    title: 'Simple scroll view',
    render: function(): React.Element<typeof ScrollViewSimpleExample> {
      return <ScrollViewSimpleExample />;
    },
  },
];
