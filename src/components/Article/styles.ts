import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { theme } from '../../theme';

export const Container = styled.TouchableOpacity`
    flex-direction: row;

    width: 100%;
    height: 100px;

    padding: 10px;

    border-radius: 5px;

    margin-bottom: 20px;

    background-color: ${theme.colors.neutral};
`;

export const Image = styled.Image`
    width: 80px;
    height: 80px;
    margin-right: 10px;
    resize-mode: cover;
`;

export const Content = styled.View`
    flex: 1;
`;

export const ContentText = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-weight: 900;
    color: ${theme.colors.primary};
`;

export const SubTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.primary};
`;