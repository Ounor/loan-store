import React, {Component} from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RadioButton, Text, Checkbox} from 'react-native-paper';

import get from 'lodash/get';
import map from 'lodash/map';
import pull from 'lodash/pull';
import concat from 'lodash/concat';
import split from 'lodash/split';
import parseInt from 'lodash/parseInt';
import difference from 'lodash/difference';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

import {connect} from 'react-redux';
import Offer from '../Components/Offer';
import images from '../Themes/Images';
import styles from '../Containers/Styles/Styles';
import BottomModal from '../Components/BottomModal';
import {isEmpty} from 'ramda';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {adUnitId} from '../Lib/ads';
import LinearGradient from 'react-native-linear-gradient';

class OffersScreen extends Component {
  state = {
    isVisible: false,
    filteredOffers: {},
    selectedFilter: [],
    sortBy: 'rating',
  };

  componentDidMount() {
    this.setState({
      filteredOffers: this.props.offers,
    });
  }

  goBack = () => this.props.navigation.goBack();

  handleShowFilters = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  selectFilter = (id) => {
    const {offers} = this.props;
    const {selectedFilter, sortBy} = this.state;
    let filters = selectedFilter;
    const selected = Number(id);
    if (includes(selectedFilter, selected)) {
      filters = pull(filters, selected);
    } else {
      filters = concat(filters, selected);
    }

    const newOffers = filter(offers, (offer) => {
      const filterIdsArray = split(offer.filterIds, ',');
      const filterIntIdsArray = map(filterIdsArray, parseInt);
      return isEmpty(difference(filters, filterIntIdsArray));
    });

    this.setState(
      {
        filteredOffers: newOffers,
        selectedFilter: filters,
      },
      () => this.onValueChange(sortBy),
    );
  };

  applyFilters = () => {
    const {offers} = this.props;
    const {selectedFilter, sortBy} = this.state;
    const newOffers = filter(offers, (offer) => {
      const filterIdsArray = split(offer.filterIds, ',');
      const filterIntIdsArray = map(filterIdsArray, parseInt);
      return isEmpty(difference(selectedFilter, filterIntIdsArray));
    });
    this.setState(
      {
        filteredOffers: newOffers,
        selectedFilter: selectedFilter,
      },
      () => this.onValueChange(sortBy),
    );
  };

  onValueChange = (sort) => () => {
    const {filteredOffers} = this.state;
    if (sort === 'name' || sort === 'id') {
      this.setState({
        sortBy: sort,
        filteredOffers: orderBy(filteredOffers, sort, ['asc']),
      });
    } else {
      this.setState(
        {
          sortBy: sort,
          filteredOffers: this.props.offers,
        },
        () => this.applyFilters(),
      );
    }
  };

  renderFilters = () => {
    const {filters} = this.props;
    const {sortBy} = this.state;
    return (
      <ScrollView>
        <TouchableOpacity activeOpaity={1}>
          <View style={styles.row}>
            <Text style={styles.filterTitleModal}>Фильтры</Text>
          </View>
          {map(filters, (item) => {
            return (
              <TouchableOpacity
                style={[styles.row, styles.spaceBetween]}
                key={item.id}
                onPress={() => this.selectFilter(item.id)}>
                <Text style={{fontSize: 15, marginVertical: 8, width: '70%'}}>
                  {item.name}
                </Text>
                <Checkbox.Android
                  color="#43ba7b"
                  status={
                    includes(this.state.selectedFilter, Number(item.id))
                      ? 'checked'
                      : 'unchecked'
                  }
                />
              </TouchableOpacity>
            );
          })}
          <View style={styles.row}>
            <Text style={styles.filterTitleModal}>Сортировать по</Text>
          </View>
          <RadioButton.Group value={sortBy}>
            <TouchableOpacity
              onPress={this.onValueChange('rating')}
              style={[styles.row, styles.spaceBetween]}>
              <Text style={{fontSize: 15, marginVertical: 8, width: '70%'}}>
                По рейтингу
              </Text>
              <RadioButton color="#43ba7b" value="rating" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onValueChange('name')}
              style={[styles.row, styles.spaceBetween]}>
              <Text style={{fontSize: 15, marginVertical: 8, width: '70%'}}>
                По названию
              </Text>
              <RadioButton color="#43ba7b" value="name" />
            </TouchableOpacity>
          </RadioButton.Group>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  renderItem = ({item}) => {
    const available = this.props.available;
    return (
      <Offer
        isAvailable={available}
        isAdver={Number(item.isAdver)}
        navigation={this.props.navigation}
        item={item}
      />
    );
  };

  renderHeader = () => {
    const {filters, navigation} = this.props;
    const {isVisible} = this.state;
    return (
      <View style={styles.filterRow}>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.goBack}>
            <Image
              style={{width: 20, height: 20, marginVertical: 2}}
              source={images.back}
            />
          </TouchableOpacity>
          <Text style={styles.filterTitle}>{navigation.state.params.name}</Text>
        </View>
        {filters ? (
          <>
            <TouchableOpacity onPress={this.handleShowFilters}>
              <Image style={{width: 25, height: 25}} source={images.filter} />
            </TouchableOpacity>
            <BottomModal
              onHide={this.handleShowFilters}
              children={this.renderFilters()}
              styles={styles}
              visible={isVisible}
            />
          </>
        ) : null}
      </View>
    );
  };
  render() {
    const {filteredOffers} = this.state;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#1d0c3f', '#2b788f']}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          zIndex: 1,
          left: 0,
        }}>
        <FlatList
          stickyHeaderIndices={[0]}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item) => item.id}
          data={filteredOffers}
          renderItem={this.renderItem}
        />
        <View>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </LinearGradient>
    );
  }
}

const mapStateProps = (state, ownProps) => {
  const id = ownProps.navigation.state.params.id;
  const {coreData} = state;
  return {
    available: get(coreData, 'available', ''),
    offers: get(coreData.offersByType, id, {}),
    filters: get(coreData.filtersByType, id),
  };
};

export default connect(mapStateProps, null)(OffersScreen);
