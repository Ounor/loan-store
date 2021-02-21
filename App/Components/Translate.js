import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import find from 'lodash/find';
import capitalize from 'lodash/capitalize';

class Translate extends Component {
  render() {
    const {style} = this.props;
    return (
      <Text style={[style]}>
        {capitalize(get(this.props.translate, this.props.value))}
      </Text>
    );
  }
}

const mapStateProps = (state) => ({
  translate: JSON.parse(
    get(
      find(state.coreData.countries, [
        'id',
        get(state.coreData, 'country', 'RU'),
      ]),
      'translate',
      get(state.coreData, 'countries[0].translate'),
    ) || {},
  ),
});

export default connect(mapStateProps, null)(Translate);
