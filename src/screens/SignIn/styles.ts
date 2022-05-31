import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from '../../theme';

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.primary};
`;

export const ContentLogo = styled.View`
    flex: 1;

    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: ${RFValue(90)}%;
    resize-mode: contain;
`;

export const SubTitle = styled.Text`
    width: ${RFValue(80)}%;

    text-align: right;

    font-size: ${RFValue(10)}px;
    color: ${theme.colors.secondary};
`;

export const Content = styled.View`
    height: 200px;

    padding: 20px;
    justify-content: center;
`;

export const Form = styled.View`
    padding: 20px;
`;