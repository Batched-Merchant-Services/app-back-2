import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, BoxLevelBadge, DivSpace } from '@components';
import i18n from '@utils/i18n';
import { moneyFormatter } from '@utils/formatters';
import Styles from '@screens/levels/styles';

const LevelInfoElement = ({ level, maxAmount, maxCredits, term, points }) => {
  return (
    <View
      height-360
      width-265
      paddingV-24
      paddingL-15
      style={Styles.carouselCard}
    >
      <View flex left>
        <BoxLevelBadge level={level} />
        <DivSpace height-25 />
        <Text h16 medium>
          {i18n.t('levelDetails.component.current')}
        </Text>
        <DivSpace height-13 />
        <Text h10 regular textGray>
          {i18n.t('levelDetails.component.limit')}
        </Text>
        <Text h12 medium textGray>
          {moneyFormatter(maxAmount)} USD
        </Text>
        <DivSpace height-13 />
        <Text h10 regular textGray>
          {i18n.t('levelDetails.component.max')}
        </Text>
        <Text h12 medium textGray>
          {maxCredits}
        </Text>
        <DivSpace height-13 />
        <Text h10 regular textGray>
          {i18n.t('levelDetails.component.term')}
        </Text>
        <Text h12 medium textGray>
          {term}
        </Text>
        <DivSpace height-13 />
        <Text h10 regular textGray>
          {i18n.t('levelDetails.component.points')}
        </Text>
        <Text h12 medium textGray>
          {points}
        </Text>
        <DivSpace height-13 />

        <Text h10 medium>
          {i18n.t('levelDetails.component.note')}
        </Text>
      </View>
    </View>
  );
};

LevelInfoElement.propTypes = {
  level: PropTypes.number.isRequired
};

export default LevelInfoElement;
