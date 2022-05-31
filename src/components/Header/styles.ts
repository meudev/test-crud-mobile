import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

import { theme } from '../../theme';

export const Container = styled.View`
    width: 100%;
    height: ${Platform.OS === 'ios' ? 100 : 80}px;
    background-color: ${theme.colors.primary};
    padding: 0 20px;
`;

export const Content = styled.View`
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;

    margin-top: ${getStatusBarHeight() + 20}px;
`;

export const Title = styled.Text`
    margin-left: 20px;
    font-size: ${RFValue(20)}px;
    font-weight: 900;
    
    color: ${theme.colors.neutral};
`;

export const ButtonBack = styled.TouchableOpacity`
    
`;