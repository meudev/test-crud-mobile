import styled from 'styled-components/native'; 
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, Platform } from 'react-native';

import { ArticleDTO } from '../../dtos/ArticleDTO';

import { theme } from '../../theme';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: ${Platform.OS === 'ios' ? 100 : 80}px;
    background-color: ${theme.colors.primary};
    padding: 0 20px;
`;

export const Content = styled.View`
    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    margin-top: ${getStatusBarHeight() + 20}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(20)}px;

    color: ${theme.colors.neutral};
`;

export const Logout = styled.TouchableOpacity`
    
`;

export const ListArticles = styled(FlatList as new () => FlatList<ArticleDTO>).attrs({
    contentContainerStyle: {
        padding: 20
    },
    showsVerticalScrollIndicator: false
})``;

export const ButtonFloating = styled.TouchableOpacity`
    position: absolute;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    right: 30px;
    bottom: 30px;
    border-radius: 30px;

    background-color: ${theme.colors.secondary};
`;