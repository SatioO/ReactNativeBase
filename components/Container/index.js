import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

function getAlignment(alignment) {
  switch (alignment) {
    case 'topCenter':
      return { alignItems: 'center' };

    case 'topLeft':
      return { alignItems: 'flex-start' };

    case 'topRight':
      return { alignItems: 'flex-end' };

    case 'centerLeft':
      return { alignItems: 'flex-start', justifyContent: 'center' };

    case 'center':
      return { alignItems: 'center', justifyContent: 'center' };

    case 'centerRight':
      return { alignItems: 'flex-end', justifyContent: 'center' };

    case 'bottomLeft':
      return { alignItems: 'flex-start', justifyContent: 'flex-end' };

    case 'bottomCenter':
      return { alignItems: 'center', justifyContent: 'flex-end' };

    case 'bottomRight':
      return { alignItems: 'flex-right', justifyContent: 'flex-end' };

    default:
      return {};
  }
}

function Container(props) {
  const hasChild = React.Children.count(props.children);

  const styles = [
    (!props.height || !props.width) && !hasChild && { flex: 1 },
    props.height && { maxHeight: props.height },
    props.width && { maxWidth: props.width },
    props.color && { backgroundColor: props.color },
    !!hasChild && { alignSelf: 'flex-start' },
    !!props.alignment && getAlignment(props.alignment),
  ];

  return (
    <View style={styles} {...props}>
      {props.children}
    </View>
  );
}

Container.defaultProps = {};

Container.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  alignment: PropTypes.string,
  padding: PropTypes.number,
  margin: PropTypes.number,
};

export default Container;
