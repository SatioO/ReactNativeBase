import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

function Row(props) {
  const styles = [
    {
      flex: 1,
      flexDirection: 'column',
      justifyContent: props.mainAxisAlignment,
      alignItems: props.crossAxisAlignment,
    },
  ];

  return (
    <View style={styles} {...props}>
      {props.children}
    </View>
  );
}

Row.defaultProps = {
  mainAxisAlignment: 'flex-start',
  crossAxisAlignment: 'flex-start',
};

Row.propTypes = {
  mainAxisAlignment: PropTypes.string,
  crossAxisAlignment: PropTypes.string,
};

export default Row;
