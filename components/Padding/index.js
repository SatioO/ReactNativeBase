import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

function Padding(props) {
  const styles = [{ padding: props.padding }];

  return (
    <View style={styles} {...props}>
      {props.children}
    </View>
  );
}

Padding.defaultProps = {};

Padding.propTypes = {
  //   padding: PropTypes.arrayOf(PropTypes.number),
};

export default Padding;
