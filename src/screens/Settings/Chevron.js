import React from 'react'
import { Icon } from 'react-native-elements'
import COLORS from '../../consts/color'

const Chevron = () => (
  <Icon
    name="chevron-right"
    type="entypo"
    color={COLORS.pink}
    containerStyle={{ marginLeft: -15, width: 20 }}
  />
)

export default Chevron
