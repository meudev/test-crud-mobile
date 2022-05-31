import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

import { theme } from '../../theme';

interface PropsImage {
    imgUrl: string;
}

export const Container = styled.View`
    flex: 1;
`;

export const ContentArticle = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center'
    },
    showsVerticalScrollIndicator: false
})``;

export const Thumbnail = styled.ImageBackground`
    width: 100%;
    height: 200px;
`;

export const ContentOptions = styled.View`
    flex: 1;
    justify-content: space-evenly;
    align-items: flex-end;

    padding-right: 10px;
`;

export const ContentText = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 20px;
`;

export const ArticleTitle = styled.Text`
    margin-top: 20px;
    font-size: ${RFValue(18)}px;
    font-weight: 900;
    color: ${theme.colors.primary};
`;

export const ArticleDescription = styled.Text`
    margin-top: 20px;
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.primary};
    text-align: justify;
`;

export const ArticleBody = styled.Text`
    margin-top: 20px;
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.primary};
    text-align: justify;
`;